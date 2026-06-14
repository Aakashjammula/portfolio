import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Pinecone } from "@pinecone-database/pinecone";
import { HumanMessage, SystemMessage, AIMessage } from "@langchain/core/messages";
import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Module-level singletons — reused across requests in the same Lambda instance
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY! });
const pineconeIndex = pc.index("resume");
const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "models/gemini-embedding-001",
});



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

        const body = await req.json();
        const q: string = body.q ?? "";
        const history: { role: string; parts: string }[] = body.history ?? [];

        if (!q || typeof q !== "string") {
            return NextResponse.json({ error: "Message required" }, { status: 400 });
        }
        // Prevent excessively long inputs (prompt injection / abuse guard)
        if (q.length > 1000) {
            return NextResponse.json({ error: "Message too long" }, { status: 400 });
        }



        // 🔹 1. Embed user query (uses module-level singleton)
        const queryEmbedding = await embeddings.embedQuery(q);

        // 🔹 2. Query Pinecone (uses module-level singleton)
        const results = await pineconeIndex.query({
            vector: queryEmbedding,
            topK: 3,
            includeMetadata: true,
        });

        const retrievedContext = results.matches
            ?.map((m) => m.metadata?.text)
            .join("\n\n");

        // 🔹 4. Build system message with retrieved chunks
        const systemMessage = new SystemMessage({
            content: `You are the AI assistant for Aakash Jammula’s portfolio website.

========================
CORE INSTRUCTION
========================
Answer strictly and only using the provided RESUME CONTEXT.
Do NOT use external knowledge.
Do NOT infer beyond the text.
Do NOT assume missing information.

If the answer is not explicitly present in the RESUME CONTEXT, respond exactly with:
"This information is not available in the resume."

========================
SCOPE LIMITATION
========================
You may only answer questions related to:
- Aakash Jammula
- His education
- His experience
- His projects
- His certifications
- His skills
- His languages

If the question is unrelated (math, coding help, general knowledge, politics, etc.), respond exactly with:
"I am Aakash Jammula’s portfolio assistant and can only answer questions about his background, skills, and projects."

Do not provide additional commentary.

========================
GROUNDING RULE
========================
Every answer must be directly supported by the RESUME CONTEXT.
Do not generate information that is not explicitly written.
Do not summarize beyond what is stated.
Do not embellish.

========================
STYLE RULES
========================
- Keep responses concise.
- Use short professional paragraphs.
- No bullet points.
- No emojis.
- No explanations of your reasoning.
- No meta commentary.

========================
OPTIONAL
========================
When relevant, you may append:
"You can download the full resume here: https://tinyurl.com/aakash-jammula-resume"

========================
RESUME CONTEXT
========================
${retrievedContext}`,
        });


        const model = new ChatGoogleGenerativeAI({
            model: "gemini-2.5-flash",
            apiKey: process.env.GOOGLE_API_KEY,
        });

        const userMessage = new HumanMessage(q);

        // Limit history to last 6 messages (3 turns) + current query
        const recentHistory = history.slice(-6).map((msg: { role: string; parts: string }) => {
            if (msg.role === "user") return new HumanMessage(String(msg.parts));
            return new AIMessage(String(msg.parts));
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

    } catch (error: unknown) {
        // Log internally but never expose raw error messages to the client
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "An internal error occurred. Please try again later." },
            { status: 500 }
        );
    }
}
