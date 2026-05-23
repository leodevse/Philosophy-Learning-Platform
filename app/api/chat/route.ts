import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateId,
  generateText,
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

/** Số cố định — Next.js không cho gán từ biến. Hobby Vercel tối đa 10. */
export const maxDuration = 10;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const streamHeaders = {
  "Cache-Control": "no-cache, no-transform",
  "X-Accel-Buffering": "no",
};

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

  const model = openrouter.chat(getOpenRouterModel());
  const modelMessages = await convertToModelMessages(messages);

  try {
    // Vercel Hobby: stream hay timeout → gọi 1 lần, trả cả đoạn (nhanh hơn)
    if (limits.useQuickReply) {
      const { text } = await generateText({
        model,
        system: TUTOR_SYSTEM_PROMPT,
        messages: modelMessages,
        maxOutputTokens: limits.maxOutputTokens,
        abortSignal: req.signal,
      });

      const stream = createUIMessageStream({
        originalMessages: messages,
        execute: ({ writer }) => {
          const id = generateId();
          writer.write({ type: "text-start", id });
          writer.write({ type: "text-delta", id, delta: text });
          writer.write({ type: "text-end", id });
        },
      });

      return createUIMessageStreamResponse({
        stream,
        headers: streamHeaders,
      });
    }

    const result = streamText({
      model,
      system: TUTOR_SYSTEM_PROMPT,
      messages: modelMessages,
      maxOutputTokens: limits.maxOutputTokens,
      abortSignal: req.signal,
      onError: ({ error }) => {
        console.error("[chat] stream error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      headers: streamHeaders,
      onError: (err) =>
        err instanceof Error
          ? err.message
          : "Lỗi OpenRouter. Kiểm tra API key và model.",
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "OpenRouter request failed.";
    console.error("[chat]", message);
    return Response.json({ error: message }, { status: 500 });
  }
}
