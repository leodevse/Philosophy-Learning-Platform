import Link from "next/link";
import {
  ArrowUpRight,
  Brain,
  Landmark,
  Leaf,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface SchoolCard {
  slug: string;
  icon: LucideIcon;
  category: string;
  categoryVariant: "sage" | "neutral";
  title: string;
  description: string;
  featured?: boolean;
}

const schools: SchoolCard[] = [
  {
    slug: "stoicism",
    icon: Landmark,
    category: "Cổ đại",
    categoryVariant: "sage",
    title: "Chủ nghĩa Khắc kỷ",
    description:
      "Rèn luyện bản lĩnh, sự tự chủ và khả năng đối mặt với nghịch cảnh thông qua việc tập trung vào những gì ta có thể kiểm soát.",
    featured: true,
  },
  {
    slug: "existentialism",
    icon: Brain,
    category: "Hiện đại",
    categoryVariant: "neutral",
    title: "Hiện sinh chủ nghĩa",
    description:
      "Khám phá ý nghĩa của tự do cá nhân, trách nhiệm và việc tự kiến tạo bản ngã trong một thế giới dường như vắng bóng ý nghĩa định trước.",
  },
  {
    slug: "taoism",
    icon: Leaf,
    category: "Phương Đông",
    categoryVariant: "neutral",
    title: "Triết học Phương Đông",
    description:
      "Hòa hợp với tự nhiên, tìm kiếm sự cân bằng và thấu hiểu Đạo thông qua các hệ tư tưởng Lão Trang, Phật giáo và Nho giáo.",
  },
];

export function FeaturedSchools() {
  return (
    <section
      id="truong-phai"
      className="bg-surface-container-low px-4 py-20 md:px-12 md:py-24"
    >
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-16 max-w-[720px] text-center">
          <h2 className="text-headline-lg mb-4 text-primary">
            Trường Phái Nổi Bật
          </h2>
          <p className="text-body-md text-on-surface-variant">
            Khám phá các hệ tư tưởng đã định hình nhận thức của nhân loại về thế
            giới và nhân sinh quan qua các thời kỳ.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {schools.map((school) => (
            <SchoolCard key={school.slug} school={school} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SchoolCard({ school }: { school: SchoolCard }) {
  const Icon = school.icon;

  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-xl border border-outline-variant/30 bg-surface p-8 shadow-academic-sm transition-shadow duration-300 hover:shadow-academic",
        school.featured && "border-l-4 border-l-primary"
      )}
    >
      <div className="mb-6 flex items-start justify-between">
        <Icon
          className={cn(
            "size-8 stroke-[1.25]",
            school.featured ? "text-primary" : "text-on-surface-variant"
          )}
        />
        <span
          className={cn(
            "rounded px-2 py-1 text-[10px] font-medium uppercase tracking-wider",
            school.categoryVariant === "sage"
              ? "bg-secondary-container text-on-secondary-container"
              : "bg-surface-container-highest text-on-surface-variant"
          )}
        >
          {school.category}
        </span>
      </div>
      <h3 className="text-headline-md mb-3 text-on-surface">{school.title}</h3>
      <p className="text-body-md mb-6 grow text-on-surface-variant">
        {school.description}
      </p>
      <Link
        href={`/courses/${school.slug}`}
        className={cn(
          "inline-flex items-center gap-2 text-label-md transition-all",
          school.featured
            ? "text-primary underline-offset-4 group-hover:underline decoration-primary/50"
            : "text-on-surface-variant group-hover:text-primary"
        )}
      >
        Tìm hiểu thêm
        <ArrowUpRight className="size-4 stroke-[1.5]" />
      </Link>
    </article>
  );
}
