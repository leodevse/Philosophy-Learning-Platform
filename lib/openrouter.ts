import { createOpenAI } from "@ai-sdk/openai";

/** Model mặc định — ID phải đúng slug OpenRouter (vd. openrouter/owl-alpha). */
export const DEFAULT_OPENROUTER_MODEL = "openrouter/owl-alpha";

/** Đọc lúc gọi API — không cache lúc build. */
export function getOpenRouterModel(): string {
  return process.env.OPENROUTER_MODEL?.trim() || DEFAULT_OPENROUTER_MODEL;
}

export function getOpenRouterApiKey(): string | undefined {
  return process.env.OPENROUTER_API_KEY;
}

export function createOpenRouterClient() {
  const apiKey = getOpenRouterApiKey();
  if (!apiKey) return null;

  return createOpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey,
    headers: {
      "HTTP-Referer":
        process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",
      "X-Title": process.env.OPENROUTER_APP_NAME ?? "Minh Triet Hoc Duong",
    },
  });
}
