"use client";

import { Progress } from "@/components/ui/progress";
import { useProgressStore } from "@/store/progressStore";

interface CourseProgressProps {
  courseSlug: string;
  totalLessons: number;
}

export function CourseProgress({ courseSlug, totalLessons }: CourseProgressProps) {
  const completedLessons = useProgressStore((s) => s.completedLessons);

  const completed = completedLessons.filter((key) =>
    key.startsWith(`${courseSlug}-`)
  ).length;
  const percent =
    totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[#F9FAFB]/70">Course progress</span>
        <span className="font-medium text-[#8B5CF6]">
          {completed}/{totalLessons} lessons
        </span>
      </div>
      <Progress value={percent} className="h-2 bg-white/10 [&>div]:bg-[#8B5CF6]" />
    </div>
  );
}
