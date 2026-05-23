import { createOpenAI } from "@ai-sdk/openai";

/** Local dev — model mạnh, không bị giới hạn 10s. */
export const DEFAULT_OPENROUTER_MODEL = "openrouter/owl-alpha";

/**
 * Model nhanh cho Vercel Hobby (~10s).
 * Đặt OPENROUTER_MODEL_FAST trên Vercel nếu muốn đổi model khác.
 */
export const VERCEL_FAST_MODEL = "google/gemini-2.0-flash-lite-001:free";

export function getOpenRouterModel(): string {
  if (process.env.VERCEL === "1") {
    // Hobby 10s — không dùng owl-alpha (quá chậm). Chỉ OPENROUTER_MODEL_FAST hoặc model nhanh mặc định.
    return process.env.OPENROUTER_MODEL_FAST?.trim() || VERCEL_FAST_MODEL;
  }
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
