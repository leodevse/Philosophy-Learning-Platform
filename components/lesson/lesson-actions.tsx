"use client";

import Link from "next/link";
import { ArrowRight, CheckCheck } from "lucide-react";

import { useProgressStore } from "@/store/progressStore";

interface LessonActionsProps {
  courseSlug: string;
  lessonId: number;
  nextLessonId?: number;
}

export function LessonActions({
  courseSlug,
  lessonId,
  nextLessonId,
}: LessonActionsProps) {
  const completeLesson = useProgressStore((s) => s.completeLesson);
  const isComplete = useProgressStore((s) =>
    s.isLessonComplete(courseSlug, lessonId)
  );

  return (
    <div className="mt-16 flex flex-col items-center justify-center border-t border-outline-variant/30 pt-8">
      <button
        type="button"
        onClick={() => completeLesson(courseSlug, lessonId)}
        className="flex items-center gap-3 rounded bg-primary px-10 py-4 text-label-md font-medium text-on-primary shadow-[0_4px_20px_rgba(26,46,68,0.15)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-container"
      >
        <CheckCheck className="size-5 stroke-[1.5]" />
        {isComplete ? "Đã hoàn thành bài học" : "Hoàn thành bài học"}
      </button>
      <Link
        href={
          nextLessonId
            ? `/courses/${courseSlug}/lesson/${nextLessonId}`
            : `/courses/${courseSlug}`
        }
        className="mt-6 flex items-center gap-2 text-label-md text-on-surface-variant transition-colors hover:text-primary"
      >
        {nextLessonId ? "Chuyển sang bài tiếp theo" : "Quay lại khóa học"}
        <ArrowRight className="size-[18px] stroke-[1.5]" />
      </Link>
    </div>
  );
}
