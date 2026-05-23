import Link from "next/link";
import { Landmark } from "lucide-react";

import { BackToTop } from "@/components/layout/back-to-top";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 w-full border-t border-outline-variant/50 bg-surface-container-low">
      <BackToTop />
      <div className="container-page grid grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <Link
            href="/"
            className="flex items-center gap-2 font-serif text-headline-md font-bold tracking-tight text-primary"
          >
            <Landmark className="size-6 stroke-[1.5] text-primary" />
            Minh Triết Học Đường
          </Link>
          <p className="max-w-sm text-body-md text-on-surface-variant">
            © {new Date().getFullYear()} Minh Triết Học Đường. Kiến tạo chiều
            sâu tâm hồn qua tri thức cổ điển.
          </p>
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:mt-0">
          <Link
            href="#"
            className="text-label-md text-on-surface-variant/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Tài nguyên học thuật
          </Link>
          <Link
            href="#"
            className="text-label-md text-on-surface-variant/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Chính sách bảo mật
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3 lg:mt-0">
          <Link
            href="#"
            className="text-label-md text-on-surface-variant/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Liên hệ
          </Link>
          <Link
            href="#"
            className="text-label-md text-on-surface-variant/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Hướng dẫn nghiên cứu
          </Link>
          <Link
            href="#"
            className="text-label-md text-on-surface-variant/80 underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            Bản tin triết học
          </Link>
        </div>
      </div>
    </footer>
  );
}
