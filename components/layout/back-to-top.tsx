"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-40 flex items-center gap-2 rounded border border-outline-variant/50 bg-surface px-4 py-2.5 text-label-md text-primary shadow-academic transition-colors hover:bg-surface-container hover:border-primary/30"
      aria-label="Cuộn lên đầu trang"
    >
      <ArrowUp className="size-4 stroke-[1.5]" />
      Lên đầu trang
    </button>
  );
}
