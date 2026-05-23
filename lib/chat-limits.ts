/** Vercel set VERCEL=1 khi chạy trên production/preview. */
const onVercel = process.env.VERCEL === "1";

export type ChatLimits = {
  maxDurationSec: number;
  maxOutputTokens: number;
  streamTimeoutMs: number | undefined;
  maxMessages: number;
};

/** Local: không giới hạn sớm. Vercel Hobby: ngắn gọn, tối đa ~10s/function. */
export function getChatLimits(): ChatLimits {
  if (onVercel) {
    return {
      maxDurationSec: 10,
      maxOutputTokens: 512,
      streamTimeoutMs: undefined,
      maxMessages: 8,
    };
  }

  return {
    maxDurationSec: 60,
    maxOutputTokens: 1200,
    streamTimeoutMs: undefined,
    maxMessages: 20,
  };
}
