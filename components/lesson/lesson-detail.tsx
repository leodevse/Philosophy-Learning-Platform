import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Clock, Eye } from "lucide-react";

import { LessonActions } from "@/components/lesson/lesson-actions";
import { LessonProse } from "@/components/lesson/lesson-prose";
import { LessonReflection } from "@/components/lesson/lesson-reflection";
import { LessonSidebar } from "@/components/lesson/lesson-sidebar";
import { getLessonMeta } from "@/lib/lesson-display";
import type { Course } from "@/types";
import type { Lesson } from "@/types";

interface LessonDetailProps {
  course: Course;
  lesson: Lesson;
  lessons: Lesson[];
  nextLesson?: Lesson;
}

export function LessonDetail({
  course,
  lesson,
  lessons,
  nextLesson,
}: LessonDetailProps) {
  const meta = getLessonMeta(lesson, course);

  return (
    <div className="container-page flex items-start gap-6 py-12">
      <LessonSidebar
        courseSlug={course.slug}
        lessons={lessons}
        currentLessonId={lesson.id}
      />

      <article className="mx-auto min-w-0 flex-1 max-w-[720px]">
        <nav
          className="mb-6 flex flex-wrap items-center gap-2 text-caption uppercase tracking-wider text-on-surface-variant"
          aria-label="Breadcrumb"
        >
          <Link
            href="/courses"
            className="transition-colors hover:text-primary"
          >
            {meta.breadcrumbParent}
          </Link>
          <ChevronRight className="size-3.5 stroke-[1.5]" />
          <span className="font-medium text-primary">
            {meta.breadcrumbCurrent}
          </span>
        </nav>

        <header className="mb-10">
          <span className="mb-4 inline-block rounded-full bg-secondary-container px-3 py-1 text-caption text-on-secondary-container">
            {meta.category}
          </span>
          <h1 className="text-headline-lg mb-6 text-on-surface">
            {lesson.titleVi}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-label-md text-on-surface-variant">
            <span className="flex items-center gap-1">
              <Clock className="size-4 stroke-[1.5]" />
              {meta.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="size-4 stroke-[1.5]" />
              {meta.views}
            </span>
          </div>
        </header>

        {meta.imageUrl && (
          <figure className="mb-12">
            <div className="relative h-[320px] w-full overflow-hidden rounded-xl bg-surface-variant md:h-[400px]">
              <Image
                src={meta.imageUrl}
                alt={lesson.titleVi}
                fill
                className="object-cover opacity-90"
                sizes="720px"
                priority
              />
            </div>
            <figcaption className="mt-3 text-center text-caption italic text-on-surface-variant">
              {meta.imageCaption}
            </figcaption>
          </figure>
        )}

        <LessonProse content={lesson.content} />

        <LessonReflection
          courseSlug={course.slug}
          lessonId={lesson.id}
          questions={meta.reflectionQuestions}
        />

        <LessonActions
          courseSlug={course.slug}
          lessonId={lesson.id}
          nextLessonId={nextLesson?.id}
        />
      </article>
    </div>
  );
}
