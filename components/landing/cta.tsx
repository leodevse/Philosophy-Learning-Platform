import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Cta() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-[#8B5CF6]/30 bg-gradient-to-br from-[#8B5CF6]/20 to-transparent px-8 py-16 text-center">
        <h2 className="font-heading text-3xl font-bold text-[#F9FAFB] sm:text-4xl">
          Begin Your Philosophical Journey
        </h2>
        <p className="mt-4 text-[#F9FAFB]/60">
          No account required. Your progress is saved locally as you learn.
        </p>
        <Button
          asChild
          size="lg"
          className="mt-8 bg-[#8B5CF6] hover:bg-[#7C3AED]"
        >
          <Link href="/#courses">Start Learning</Link>
        </Button>
      </div>
    </section>
  );
}
