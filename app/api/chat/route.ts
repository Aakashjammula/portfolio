import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const conversations: Record<string, any[]> = {};

// Allow streaming responses up to 60 seconds
export const maxDuration = 60; // 60 seconds

// Create a new ratelimiter, that allows 20 requests per 10 hours
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20, "10 h"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});

export async function POST(req: NextRequest) {
    try {
        const ip = (req as any).ip ?? req.headers.get("x-forwarded-for") ?? "127.0.0.1";
        const { success, limit, remaining, reset } = await ratelimit.limit(ip);

        if (!success) {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, {
                status: 429,
                headers: {
                    "X-RateLimit-Limit": limit.toString(),
                    "X-RateLimit-Remaining": remaining.toString(),
                    "X-RateLimit-Reset": reset.toString(),
                }
            });
        }

        const { q, sessionId = "default", history = [] } = await req.json();
        if (!q) {
            return NextResponse.json({ error: "Message required" }, { status: 400 });
        }

        if (!conversations[sessionId]) {
            conversations[sessionId] = [];
        }

        // 🔹 1. Initialize Embeddings
        const embeddings = new GoogleGenerativeAIEmbeddings({
            apiKey: process.env.GOOGLE_API_KEY,
            model: "models/gemini-embedding-001",
        });

        // 🔹 2. Embed user query
        const queryEmbedding = await embeddings.embedQuery(q);

        // 🔹 3. Query Pinecone
        const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
        const index = pc.index("resume");

        const results = await index.query({
            vector: queryEmbedding,
            topK: 3, // Reduced from 4 to save tokens
            includeMetadata: true,
        });

        const retrievedContext = results.matches
            ?.map((m) => m.metadata?.text)
            .join("\n\n");

        // 🔹 4. Build system message with retrieved chunks
        const systemMessage = new SystemMessage({
            content: `You are Aakash Jammula's portfolio AI assistant. Answer using ONLY the resume context below.
            
            RULES:
            - If valid, be concise, professional, and factual.
            - If unrelated to Aakash, polite refusal.
            - No fabrication.
            - Guide to resume: https://tinyurl.com/aakash-jammula-resume

            CONTEXT:
            ${retrievedContext}`,
        });


        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            apiKey: process.env.GOOGLE_API_KEY,
        });

        const userMessage = new HumanMessage(q);

        // Limit history to last 6 messages (3 turns) + current query
        const recentHistory = history.slice(-6).map((msg: any) => {
            if (msg.role === "user") return new HumanMessage(msg.parts);
            return new AIMessage(msg.parts);
        });

        const stream = await model.stream([systemMessage, ...recentHistory, userMessage]);

        // Create a new stream for the response
        const responseStream = new ReadableStream({
            async start(controller) {
                const encoder = new TextEncoder();
                let fullResponse = "";
                try {
                    for await (const chunk of stream) {
                        const content = chunk.content;
                        if (content) {
                            const text = typeof content === 'string' ? content : "";
                            fullResponse += text;
                            controller.enqueue(encoder.encode(text));
                        }
                    }

                    // Update history with new interaction
                    // Limit stored conversation to last 10 turns to prevent memory overflow
                    if (conversations[sessionId].length > 20) {
                        conversations[sessionId] = conversations[sessionId].slice(-20);
                    }
                    conversations[sessionId].push(userMessage, new AIMessage(fullResponse));

                    controller.close();
                } catch (e) {
                    controller.error(e);
                }
            },
        });

        return new NextResponse(responseStream, {
            headers: {
                "Content-Type": "text/plain; charset=utf-8",
                "X-RateLimit-Limit": limit.toString(),
                "X-RateLimit-Remaining": remaining.toString(),
                "X-RateLimit-Reset": reset.toString(),
            }
        });

    } catch (error: any) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
