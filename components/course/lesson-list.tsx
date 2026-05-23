"use client";

import Link from "next/link";
import { CheckCircle2, Circle } from "lucide-react";

import type { Lesson } from "@/types";
import { useProgressStore } from "@/store/progressStore";

interface LessonListProps {
  courseSlug: string;
  lessons: Lesson[];
}

export function LessonList({ courseSlug, lessons }: LessonListProps) {
  const isLessonComplete = useProgressStore((s) => s.isLessonComplete);

  return (
    <ul className="space-y-3">
      {lessons.map((lesson) => {
        const done = isLessonComplete(courseSlug, lesson.id);
        return (
          <li key={lesson.id}>
            <Link
              href={`/courses/${courseSlug}/lesson/${lesson.id}`}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827] px-4 py-3 transition-all hover:border-[#8B5CF6]/40 hover:bg-[#111827]/80"
            >
              {done ? (
                <CheckCircle2 className="size-5 shrink-0 text-[#8B5CF6]" />
              ) : (
                <Circle className="size-5 shrink-0 text-[#F9FAFB]/30" />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-medium text-[#F9FAFB]">{lesson.title}</p>
                <p className="text-sm text-[#F9FAFB]/50">
                  Lesson {lesson.id}
                  {done ? " · Completed" : ""}
                </p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
