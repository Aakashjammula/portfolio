import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const conversations: Record<string, any[]> = {};

// Create a new ratelimiter, that allows 10 requests per 10 hours
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "10 h"),
    analytics: true,
    prefix: "@upstash/ratelimit",
});

export async function POST(req: NextRequest) {
    try {
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
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
            topK: 4,
            includeMetadata: true,
        });

        const retrievedContext = results.matches
            ?.map((m) => m.metadata?.text)
            .join("\n\n");

        // 🔹 4. Build system message with retrieved chunks
        const systemMessage = new SystemMessage({
            content: `
        You are an AI assistant for Aakash Jammula's portfolio website.

        PRIMARY ROLE:
        Answer questions strictly using the provided resume context retrieved from the vector database.

        BEHAVIOR RULES:

        1. If the question is related to Aakash Jammula, his skills, projects, education, or experience:
        - Answer using only the provided resume context.
        - Keep responses concise, professional, and factual.
        - Do not fabricate information.
        - You may guide users to download the resume:
        https://tinyurl.com/aakash-jammula-resume

        2. If the question is unrelated to Aakash Jammula or his resume (e.g., math, general knowledge, random topics):
        - Politely respond that you are a portfolio assistant and can only help with questions about Aakash Jammula.
        - Encourage the user to ask about his background, skills, or projects.

        IMPORTANT:
        - Do not use external knowledge.
        - If the answer is not present in the provided context, say that the information is not available in the resume.
        - Base your response strictly on the retrieved context below.

        RESUME CONTEXT:
        ${retrievedContext}
        `,
        });


        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            apiKey: process.env.GOOGLE_API_KEY,
        });

        const userMessage = new HumanMessage(q);

        // Convert history to LangChain messages
        const historyMessages = history.map((msg: any) => {
            if (msg.role === "user") return new HumanMessage(msg.parts);
            return new AIMessage(msg.parts);
        });

        const response = await model.invoke([systemMessage, ...historyMessages, userMessage]);

        conversations[sessionId].push(userMessage, response);

        return NextResponse.json({
            answer: response.content,
        }, {
            headers: {
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
