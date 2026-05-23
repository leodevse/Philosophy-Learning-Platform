import { CourseCard } from "@/components/course/course-card";
import { courses } from "@/data/courses";

export function FeaturedCourses() {
  return (
    <section id="courses" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-heading text-3xl font-bold text-[#F9FAFB]">
          Featured Courses
        </h2>
        <p className="mt-2 text-[#F9FAFB]/60">
          Three traditions. One platform. Begin anywhere.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
