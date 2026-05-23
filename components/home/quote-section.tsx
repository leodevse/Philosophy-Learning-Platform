import { Quote } from "lucide-react";

export function QuoteSection() {
  return (
    <section className="relative px-4 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-primary opacity-[0.02]" />
      <div className="relative z-10 mx-auto max-w-[720px] text-center">
        <Quote
          className="mx-auto mb-6 block size-12 text-outline-variant/50 stroke-[1]"
          aria-hidden
        />
        <blockquote className="text-headline-lg mb-8 text-primary italic md:text-[40px] md:leading-[1.2]">
          &ldquo;Cuộc sống không được kiểm chứng thì không đáng sống.&rdquo;
        </blockquote>
        <cite className="flex items-center justify-center gap-4 text-body-lg text-on-surface-variant not-italic">
          <span className="h-px w-8 bg-outline-variant" />
          Socrates
          <span className="h-px w-8 bg-outline-variant" />
        </cite>
      </div>
    </section>
  );
}
