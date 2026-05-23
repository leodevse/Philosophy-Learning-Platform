"use client";

import Link from "next/link";
import { CheckCircle2, Circle, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/progressStore";
import type { Lesson } from "@/types";

interface CourseLessonListProps {
  courseSlug: string;
  lessons: Lesson[];
}

export function CourseLessonList({
  courseSlug,
  lessons,
}: CourseLessonListProps) {
  const isLessonComplete = useProgressStore((s) => s.isLessonComplete);

  return (
    <ul className="space-y-3">
      {lessons.map((lesson, index) => {
        const done = isLessonComplete(courseSlug, lesson.id);
        return (
          <li key={lesson.id}>
            <Link
              href={`/courses/${courseSlug}/lesson/${lesson.id}`}
              className="group flex items-center gap-4 rounded-lg border border-outline-variant/50 bg-surface px-5 py-4 transition-all hover:border-primary/30 hover:shadow-academic-sm"
            >
              {done ? (
                <CheckCircle2 className="size-5 shrink-0 text-secondary" />
              ) : (
                <Circle className="size-5 shrink-0 stroke-[1.5] text-outline" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-on-surface group-hover:text-primary">
                  {lesson.titleVi}
                </p>
                <p className="text-caption text-on-surface-variant">
                  Bài {index + 1}
                  {done ? " · Đã hoàn thành" : ""}
                </p>
              </div>
              <ChevronRight
                className={cn(
                  "size-5 shrink-0 stroke-[1.5] text-outline transition-colors",
                  "group-hover:text-primary"
                )}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
