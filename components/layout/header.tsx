import Link from "next/link";
import { BookOpen, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#courses", label: "Courses" },
  { href: "/tutor", label: "AI Tutor" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#0B0F19]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-semibold tracking-tight text-[#F9FAFB] transition-opacity hover:opacity-80"
        >
          <Sparkles className="size-5 text-[#8B5CF6]" />
          PhiloLearn
        </Link>
        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#F9FAFB]/70 transition-colors hover:text-[#F9FAFB]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button
          asChild
          size="sm"
          className="bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
        >
          <Link href="/#courses">
            <BookOpen className="size-4" />
            Start Learning
          </Link>
        </Button>
      </div>
    </header>
  );
}
