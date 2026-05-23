import { redirect } from "next/navigation";

interface QuizPageProps {
  params: Promise<{ lessonId: string }>;
  searchParams: Promise<{ course?: string }>;
}

/** Quiz tạm tắt — chuyển về trang bài học */
export default async function QuizPage({
  params,
  searchParams,
}: QuizPageProps) {
  const { lessonId } = await params;
  const { course: courseSlug } = await searchParams;

  if (courseSlug && lessonId) {
    redirect(`/courses/${courseSlug}/lesson/${lessonId}`);
  }

  redirect("/courses");
}
