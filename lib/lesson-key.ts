import type { LessonKey } from "@/types";

export function toLessonKey(course: string, lessonId: number): LessonKey {
  return `${course}-${lessonId}`;
}
