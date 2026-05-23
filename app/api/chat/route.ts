import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import { getChatLimits } from "@/lib/chat-limits";
import {
  createOpenRouterClient,
  getOpenRouterApiKey,
  getOpenRouterModel,
} from "@/lib/openrouter";
import { TUTOR_SYSTEM_PROMPT } from "@/lib/prompts";

/** Phải là số cố định — Next.js không cho gán từ biến (lỗi deploy Vercel). */
export const maxDuration = 10;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!getOpenRouterApiKey()) {
    return Response.json(
      {
        error:
          "Chưa có OPENROUTER_API_KEY trên Vercel. Thêm trong Settings → Environment Variables.",
      },
      { status: 503 }
    );
  }

  const openrouter = createOpenRouterClient();
  if (!openrouter) {
    return Response.json(
      { error: "Không khởi tạo được OpenRouter client." },
      { status: 503 }
    );
  }

  const { messages: allMessages }: { messages: UIMessage[] } = await req.json();
  const limits = getChatLimits();
  const messages = allMessages.slice(-limits.maxMessages);

  if (!messages?.length) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  try {
    const result = streamText({
      model: openrouter.chat(getOpenRouterModel()),
      system: TUTOR_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: limits.maxOutputTokens,
      abortSignal: req.signal,
      onError: ({ error }) => {
        console.error("[chat] stream error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      headers: {
        "Cache-Control": "no-cache, no-transform",
        "X-Accel-Buffering": "no",
      },
      onError: (err) =>
        err instanceof Error
          ? err.message
          : "Lỗi OpenRouter. Kiểm tra API key và model.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "OpenRouter request failed.";
    return Response.json({ error: message }, { status: 500 });
  }
}
