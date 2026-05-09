import { streamText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import { NextRequest } from "next/server";
import { buildPrompt, selectModel, AIAction } from "@/lib/ai";

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 20;
const WINDOW_MS = 60 * 60 * 1000;

function isRateLimited(ip: string): { limited: boolean; resetIn: number } {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, resetIn: 0 };
  }

  if (entry.count >= LIMIT) {
    return { limited: true, resetIn: Math.ceil((entry.resetAt - now) / 60000) };
  }

  entry.count++;
  return { limited: false, resetIn: 0 };
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { limited, resetIn } = isRateLimited(ip);

  if (limited) {
    return new Response(
      JSON.stringify({ error: `Rate limit reached. Try again in ${resetIn} minutes.` }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  const { action, code, language, userMessage, output, stdin, targetLanguage } = await request.json();

  const prompt = buildPrompt({ action, code, language, userMessage, output, stdin, targetLanguage });
  const model = selectModel(action as AIAction);

  const result = await streamText({
    model: anthropic(model),
    prompt,
    maxTokens: 1024,
  });

  return result.toDataStreamResponse();
}
