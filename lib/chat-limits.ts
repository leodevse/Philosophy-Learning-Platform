export function getChatLimits() {
  const onVercel = process.env.VERCEL === "1";

  if (onVercel) {
    return { maxOutputTokens: 350, maxMessages: 6, useQuickReply: true };
  }

  return { maxOutputTokens: 1200, maxMessages: 20, useQuickReply: false };
}
