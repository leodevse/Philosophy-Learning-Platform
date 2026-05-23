import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDEr1Y79ouY9jupe3VHcgiFZQW2O7hbiL0GsW2OUCy3L445l0H9VilD1ZEj4k7gqEuNan0tRF-ukwi7rUCdLMYKH26O227seoccxAoPO8XfegBo0OjlLVCkY5uwMO91DwJIMtG_q-KaBBPkvFWNcGDSc6M41VYfxhV-IKFxY_h7xRSaguXopfULqbNS07ZtKEhEShETxVMgCJNCiEIX8R2Cxo60Zbx9Fuk2gfVqng6GRomatStBuPXdelqPR8EZb78Sh3a7NK4w_1y6";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32">
      <div className="container-page">
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12 md:gap-6">
          <div className="z-10 md:col-span-7">
            <span className="mb-6 inline-block rounded-full bg-secondary-container px-3 py-1 text-caption uppercase tracking-wider text-on-secondary-container">
              Nền tảng học tập triết học
            </span>
            <h1 className="text-display-lg mb-6 text-primary">
              Khám Phá Chiều Sâu Tri Thức
            </h1>
            <p className="text-body-lg mb-10 max-w-2xl text-on-surface-variant">
              Tìm thấy sự tĩnh tại và minh triết trong một thế giới ồn ào thông
              qua việc nghiên cứu chuyên sâu về triết học cổ điển. Một không
              gian được thiết kế cho sự suy ngẫm tĩnh lặng và phát triển tư
              duy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 rounded bg-primary px-8 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
              >
                Bắt đầu ngay
                <ArrowRight className="size-[18px] stroke-[1.5]" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center rounded border border-outline px-8 py-3 text-label-md text-on-surface transition-colors hover:bg-surface-container"
              >
                Tìm hiểu chương trình
              </Link>
            </div>
          </div>

          <div className="relative hidden md:col-span-5 md:block">
            <div className="absolute -top-10 -right-10 size-64 rounded-full bg-surface-container-high opacity-50 blur-3xl" />
            <div className="absolute right-20 bottom-0 size-48 rounded-full bg-secondary-fixed-dim opacity-30 blur-2xl" />
            <Image
              src={HERO_IMAGE}
              alt="Kiến trúc cổ điển — biểu tượng triết học"
              width={600}
              height={500}
              className="relative z-10 h-[500px] w-full rounded-xl border border-outline-variant/30 object-cover sepia-[10%] grayscale-[20%] shadow-academic"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
