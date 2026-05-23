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
import { TUTOR_SYSTEM_PROMPT } from "@/lib/prompts";

export const maxDuration = 30;

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

  const { messages }: { messages: UIMessage[] } = await req.json();

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
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "OpenRouter request failed.";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
