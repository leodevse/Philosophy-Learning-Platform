import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { CourseDetailProgress } from "@/components/courses/course-detail-progress";
import { CourseLessonList } from "@/components/courses/course-lesson-list";
import { getCourseBySlug } from "@/data/courses";
import { getLessonsByCourse } from "@/data/lessons";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  return {
    title: course
      ? `${course.titleVi} — Minh Triết Học Đường`
      : "Khóa học",
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const courseLessons = getLessonsByCourse(slug);
  const firstLesson = courseLessons[0];

  return (
    <div className="container-page py-12 md:py-16">
      <Link
        href="/courses"
        className="inline-flex items-center gap-1 text-label-md text-on-surface-variant transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4 stroke-[1.5]" />
        Quay lại danh mục
      </Link>

      <p className="mt-8 text-label-md uppercase tracking-widest text-secondary">
        Khóa học
      </p>
      <h1 className="text-headline-lg mt-2 text-primary">{course.titleVi}</h1>
      <p className="text-body-lg mt-4 max-w-2xl text-on-surface-variant">
        {course.descriptionVi}
      </p>

      <div className="mt-10 max-w-xl">
        <CourseDetailProgress
          courseSlug={slug}
          totalLessons={courseLessons.length}
        />
      </div>

      {firstLesson && (
        <div className="mt-8">
          <Link
            href={`/courses/${slug}/lesson/${firstLesson.id}`}
            className="inline-flex items-center rounded bg-primary px-8 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
          >
            Bắt đầu bài học đầu tiên
          </Link>
        </div>
      )}

      <h2 className="text-headline-md mt-12 text-on-surface">Danh sách bài học</h2>
      <div className="mt-6 max-w-2xl">
        <CourseLessonList courseSlug={slug} lessons={courseLessons} />
      </div>
    </div>
  );
}
