import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 sm:py-32">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_#8B5CF6/20_0%,_transparent_50%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#8B5CF6] animate-in fade-in slide-in-from-bottom-4 duration-700">
          Philosophy · AI · Wisdom
        </p>
        <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-[#F9FAFB] sm:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          Explore Philosophy Through AI
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#F9FAFB]/60 animate-in fade-in duration-700 delay-300">
          Journey through Stoicism, Existentialism, and Taoism with interactive
          lessons, quizzes, and a personal AI tutor.
        </p>
        <div className="mt-10 animate-in fade-in duration-700 delay-500">
          <Button
            asChild
            size="lg"
            className="h-12 bg-[#8B5CF6] px-8 text-base hover:bg-[#7C3AED]"
          >
            <Link href="/#courses">
              Start Learning
              <ArrowRight className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
