import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Course } from "@/types";

const courseGradients: Record<string, string> = {
  stoicism: "from-violet-900/80 via-indigo-950 to-[#0B0F19]",
  existentialism: "from-rose-900/60 via-slate-900 to-[#0B0F19]",
  taoism: "from-emerald-900/60 via-teal-950 to-[#0B0F19]",
};

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const gradient =
    courseGradients[course.slug] ?? "from-[#8B5CF6]/40 to-[#0B0F19]";

  return (
    <Link href={`/courses/${course.slug}`} className="group block">
      <Card className="h-full border-white/10 bg-[#111827] transition-all duration-300 hover:-translate-y-1 hover:border-[#8B5CF6]/40 hover:shadow-lg hover:shadow-[#8B5CF6]/10">
        <div
          className={`h-32 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-[1.02]`}
        />
        <CardHeader>
          <CardTitle className="text-lg text-[#F9FAFB]">{course.title}</CardTitle>
          <CardDescription className="text-[#F9FAFB]/60">
            {course.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-[#8B5CF6] transition-gap group-hover:gap-2">
            Explore course
            <ArrowRight className="size-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
