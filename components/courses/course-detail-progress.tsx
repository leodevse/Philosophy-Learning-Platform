"use client";

import { useProgressStore } from "@/store/progressStore";

interface CourseDetailProgressProps {
  courseSlug: string;
  totalLessons: number;
}

export function CourseDetailProgress({
  courseSlug,
  totalLessons,
}: CourseDetailProgressProps) {
  const completedLessons = useProgressStore((s) => s.completedLessons);

  const completed = completedLessons.filter((key) =>
    key.startsWith(`${courseSlug}-`)
  ).length;
  const percent =
    totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-on-surface-variant">Tiến độ khóa học</span>
        <span className="font-medium text-primary">
          {completed}/{totalLessons} bài học
        </span>
      </div>
      <div className="h-1 w-full overflow-hidden rounded-full bg-surface-variant">
        <div
          className="h-full rounded-full bg-secondary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
