import Anthropic from "@anthropic-ai/sdk";
import { renderKnowledgeBaseMarkdown } from "@/lib/data/knowledge-base";
import { profile } from "@/lib/data/resume";

export const runtime = "nodejs";
export const maxDuration = 30;

interface IncomingMessage {
  role: "user" | "assistant";
  content: string;
}

const SYSTEM_PROMPT = `You are ${profile.assistantName}, the friendly AI assistant embedded on ${profile.name}'s personal portfolio website. Visitors may ask you anything about ${profile.name}'s professional background.

Rules:
- Answer ONLY using the resume knowledge base provided below. It is the complete and authoritative record of ${profile.name}'s skills, experience, education, and projects.
- If asked about a skill, technology, or experience that is NOT in the knowledge base, say honestly that it isn't part of ${profile.name}'s documented experience. Never invent or exaggerate skills, projects, or employers.
- Speak about ${profile.name} in the third person, in a warm, concise, professional tone.
- Keep answers focused and conversational — a few sentences unless the visitor asks for detail.
- If asked whether ${profile.name} would be a good fit for a role, reason from the concrete skills/experience in the knowledge base rather than giving generic reassurance.

--- RESUME KNOWLEDGE BASE ---
${renderKnowledgeBaseMarkdown()}
--- END KNOWLEDGE BASE ---`;

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json(
      { error: "Medo isn't configured yet — the site owner needs to add an API key." },
      { status: 503 }
    );
  }

  let messages: IncomingMessage[];
  try {
    const body = await req.json();
    messages = body.messages;
    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error("empty");
    }
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  let anthropicStream;
  try {
    anthropicStream = client.messages.stream({
      model: "claude-sonnet-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
    });
  } catch {
    return Response.json(
      { error: "Medo couldn't start responding. Please try again." },
      { status: 502 }
    );
  }

  const encoder = new TextEncoder();
  const body = new ReadableStream<Uint8Array>({
    start(controller) {
      anthropicStream.on("text", (delta) => {
        controller.enqueue(encoder.encode(delta));
      });
      anthropicStream.on("end", () => {
        controller.close();
      });
      anthropicStream.on("error", (err) => {
        controller.error(err);
      });
    },
    cancel() {
      anthropicStream.controller.abort();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
