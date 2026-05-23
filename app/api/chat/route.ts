import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";

import {
  createOpenRouterClient,
  getOpenRouterApiKey,
  getOpenRouterModel,
} from "@/lib/openrouter";
import { getChatLimits } from "@/lib/chat-limits";
import { TUTOR_SYSTEM_PROMPT } from "@/lib/prompts";

const limits = getChatLimits();

export const maxDuration = 10;
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!getOpenRouterApiKey()) {
    return new Response(
      JSON.stringify({
        error:
          "Chưa có OPENROUTER_API_KEY. Đăng ký miễn phí tại https://openrouter.ai/keys rồi thêm vào .env.local.",
      }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const openrouter = createOpenRouterClient();
  if (!openrouter) {
    return new Response(
      JSON.stringify({ error: "Không khởi tạo được OpenRouter client." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  const { messages: allMessages }: { messages: UIMessage[] } = await req.json();
  const messages = allMessages.slice(-limits.maxMessages);

  if (!messages?.length) {
    return new Response(JSON.stringify({ error: "No messages provided." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    // .chat() → /chat/completions (đúng với OpenRouter; không dùng Responses API)
    const result = streamText({
      model: openrouter.chat(getOpenRouterModel()),
      system: TUTOR_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: limits.maxOutputTokens,
      ...(limits.streamTimeoutMs != null && {
        timeout: limits.streamTimeoutMs,
      }),
      abortSignal: req.signal,
      onError: ({ error }) => {
        console.error("[chat] stream error:", error);
      },
    });

    return result.toUIMessageStreamResponse({
      headers: {
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "OpenRouter request failed.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
