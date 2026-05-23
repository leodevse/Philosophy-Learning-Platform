import { notFound } from "next/navigation";

import { LessonDetail } from "@/components/lesson/lesson-detail";
import { getCourseBySlug } from "@/data/courses";
import { getLesson, getLessonsByCourse, getNextLesson } from "@/data/lessons";

interface LessonPageProps {
  params: Promise<{ slug: string; id: string }>;
}

export async function generateMetadata({ params }: LessonPageProps) {
  const { slug, id } = await params;
  const lesson = getLesson(slug, Number(id));
  return {
    title: lesson
      ? `${lesson.titleVi} — Minh Triết Học Đường`
      : "Bài học",
  };
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug, id } = await params;
  const lessonId = Number(id);
  if (Number.isNaN(lessonId)) notFound();

  const course = getCourseBySlug(slug);
  const lesson = getLesson(slug, lessonId);
  if (!course || !lesson) notFound();

  const lessons = getLessonsByCourse(slug);
  const nextLesson = getNextLesson(slug, lessonId);

  return (
    <LessonDetail
      course={course}
      lesson={lesson}
      lessons={lessons}
      nextLesson={nextLesson}
    />
  );
}
