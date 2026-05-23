import type { Course } from "@/types";
import type { Lesson } from "@/types";

export function getLessonMeta(lesson: Lesson, course: Course) {
  return {
    category: lesson.category ?? course.topicLabels[0] ?? "Triết học",
    breadcrumbParent: lesson.breadcrumbParent ?? "Triết học phương Tây",
    breadcrumbCurrent: lesson.breadcrumbCurrent ?? course.regionLabel,
    readTime: lesson.readTime ?? "25 phút đọc",
    views: lesson.views ?? "1.2k lượt xem",
    imageUrl: lesson.imageUrl ?? course.imageUrl,
    imageCaption:
      lesson.imageCaption ??
      "Minh họa triết học — Minh Triết Học Đường",
    reflectionQuestions: lesson.reflectionQuestions ?? [
      "Điều gì trong bài học này khiến bạn suy ngẫm nhiều nhất?",
      "Bạn sẽ áp dụng ý tưởng này vào cuộc sống hàng ngày như thế nào?",
    ],
  };
}
