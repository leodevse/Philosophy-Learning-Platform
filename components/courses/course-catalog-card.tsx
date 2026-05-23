import Image from "next/image";
import Link from "next/link";
import { BarChart3, Clock } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Course } from "@/types";

interface CourseCatalogCardProps {
  course: Course;
}

export function CourseCatalogCard({ course }: CourseCatalogCardProps) {
  const primaryTopic = course.topicLabels[0];
  const secondaryTag = course.topicLabels[1] ?? course.regionLabel;

  return (
    <Link href={`/courses/${course.slug}`} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-lg border border-outline-variant/50 bg-surface transition-all duration-300 hover:shadow-academic">
        <div className="relative h-48 overflow-hidden bg-surface-container">
          <Image
            src={course.imageUrl}
            alt={course.titleVi}
            fill
            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <span
            className={cn(
              "absolute top-4 left-4 rounded-full border px-3 py-1 text-label-md backdrop-blur-sm",
              course.era === "hiendai"
                ? "border-outline-variant/50 bg-surface-container-high text-on-surface"
                : "border-secondary-fixed/50 bg-secondary-container text-on-secondary-container"
            )}
          >
            {course.eraLabel}
          </span>
        </div>

        <div className="flex flex-grow flex-col p-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <span className="rounded border border-secondary/30 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-secondary">
              {primaryTopic}
            </span>
            <span className="rounded border border-outline/30 px-2 py-0.5 text-xs font-medium uppercase tracking-wider text-outline">
              {secondaryTag}
            </span>
          </div>

          <h2 className="text-headline-md mb-3 leading-snug text-primary transition-colors group-hover:text-surface-tint">
            {course.titleVi}
          </h2>
          <p className="text-body-md mb-6 line-clamp-3 text-on-surface-variant">
            {course.descriptionVi}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-outline-variant/30 pt-4">
            <span className="flex items-center gap-1.5 text-caption text-on-surface-variant">
              <Clock className="size-4 stroke-[1.5]" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1.5 text-caption text-on-surface-variant">
              <BarChart3 className="size-4 stroke-[1.5]" />
              {course.difficultyLabel}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
