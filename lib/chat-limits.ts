/** Giới hạn khi chạy trên Vercel (Hobby ~10s). Local dùng giá trị rộng hơn. */
export function getChatLimits() {
  const onVercel = process.env.VERCEL === "1";

  if (onVercel) {
    return { maxOutputTokens: 400, maxMessages: 6 };
  }

  return { maxOutputTokens: 1200, maxMessages: 20 };
}
