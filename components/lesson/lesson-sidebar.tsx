"use client";

import Link from "next/link";
import { CheckCircle2, Circle, PlayCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/progressStore";
import type { Lesson } from "@/types";

interface LessonSidebarProps {
  courseSlug: string;
  lessons: Lesson[];
  currentLessonId: number;
}

export function LessonSidebar({
  courseSlug,
  lessons,
  currentLessonId,
}: LessonSidebarProps) {
  const isLessonComplete = useProgressStore((s) => s.isLessonComplete);
  const completedCount = lessons.filter((l) =>
    isLessonComplete(courseSlug, l.id)
  ).length;
  const progressPercent =
    lessons.length > 0
      ? Math.round((completedCount / lessons.length) * 100)
      : 0;

  return (
    <aside className="hidden lg:flex lg:w-60 lg:shrink-0 lg:flex-col lg:gap-6 lg:sticky lg:top-32 lg:h-[calc(100vh-140px)] lg:overflow-y-auto lg:border-r lg:border-outline-variant/30 lg:pr-6">
      <p className="text-label-md uppercase tracking-widest text-on-surface-variant">
        Mục Lục Khóa Học
      </p>
      <nav className="flex flex-col gap-1">
        {lessons.map((item) => {
          const active = item.id === currentLessonId;
          const completed = isLessonComplete(courseSlug, item.id);

          return (
            <Link
              key={item.id}
              href={`/courses/${courseSlug}/lesson/${item.id}`}
              className={cn(
                "group -ml-2 flex items-start gap-3 rounded-lg px-2 py-2 transition-colors",
                active &&
                  "border-l-2 border-primary bg-surface-container/50 font-bold text-primary",
                !active &&
                  completed &&
                  "text-on-surface-variant hover:text-primary",
                !active && !completed && "text-outline hover:text-primary"
              )}
            >
              {active ? (
                <PlayCircle className="mt-0.5 size-[18px] shrink-0 fill-primary text-primary" />
              ) : completed ? (
                <CheckCircle2 className="mt-0.5 size-[18px] shrink-0 text-secondary" />
              ) : (
                <Circle className="mt-0.5 size-[18px] shrink-0 stroke-[1.5]" />
              )}
              <span className="text-label-md leading-tight">{item.titleVi}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-outline-variant/30 pt-8">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-caption text-on-surface-variant">
            Tiến độ khóa học
          </span>
          <span className="ml-auto text-caption font-bold text-primary">
            {progressPercent}%
          </span>
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-surface-variant">
          <div
            className="h-full rounded-full bg-secondary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
