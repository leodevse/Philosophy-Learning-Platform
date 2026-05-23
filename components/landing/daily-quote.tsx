const quotes = [
  {
    text: "He who has a why to live can bear almost any how.",
    author: "Friedrich Nietzsche",
  },
  {
    text: "You have power over your mind—not outside events. Realize this, and you will find strength.",
    author: "Marcus Aurelius",
  },
  {
    text: "Nature does not hurry, yet everything is accomplished.",
    author: "Lao Tzu",
  },
];

export function DailyQuote() {
  const dayIndex = new Date().getDate() % quotes.length;
  const quote = quotes[dayIndex];

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#8B5CF6]/20 bg-[#111827] px-8 py-12 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-[#8B5CF6]">
          Daily Quote
        </p>
        <blockquote className="mt-6 font-heading text-2xl leading-relaxed text-[#F9FAFB] sm:text-3xl">
          &ldquo;{quote.text}&rdquo;
        </blockquote>
        <cite className="mt-4 block text-sm not-italic text-[#F9FAFB]/50">
          — {quote.author}
        </cite>
      </div>
    </section>
  );
}
