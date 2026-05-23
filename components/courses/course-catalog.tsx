"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

import { courses } from "@/data/courses";
import {
  CourseFilterBar,
  type CourseFilters,
} from "@/components/courses/course-filter-bar";
import { CourseCatalogCard } from "@/components/courses/course-catalog-card";

const INITIAL_FILTERS: CourseFilters = {
  search: "",
  region: "",
  era: "",
  topic: "",
};

const PAGE_SIZE = 6;

export function CourseCatalog() {
  const [filters, setFilters] = useState<CourseFilters>(INITIAL_FILTERS);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [filters]);

  const filtered = useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    return courses.filter((course) => {
      if (filters.region && course.region !== filters.region) return false;
      if (filters.era && course.era !== filters.era) return false;
      if (filters.topic && !course.topics.includes(filters.topic)) return false;
      if (!q) return true;
      const haystack = [
        course.titleVi,
        course.descriptionVi,
        ...course.topicLabels,
        course.eraLabel,
        course.regionLabel,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [filters]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <section className="container-page py-12 md:py-16">
        <div className="mb-10 max-w-[720px]">
          <h1 className="text-headline-lg mb-4 text-primary">
            Khám Phá Tri Thức
          </h1>
          <p className="text-body-lg text-on-surface-variant">
            Tìm kiếm và lựa chọn các khóa học từ những tư tưởng lớn nhất của
            nhân loại, được thiết kế cho sự tĩnh tại và tập trung chuyên sâu.
          </p>
        </div>
        <CourseFilterBar filters={filters} onChange={setFilters} />
      </section>

      <section className="container-page pb-24">
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-body-md text-on-surface-variant">
            Không tìm thấy khóa học phù hợp. Hãy thử điều chỉnh bộ lọc.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((course) => (
              <CourseCatalogCard key={course.slug} course={course} />
            ))}
          </div>
        )}

        {hasMore && (
          <div className="mt-16 flex justify-center">
            <button
              type="button"
              onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
              className="flex items-center gap-2 rounded border border-outline-variant/50 px-6 py-2 text-label-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
            >
              Xem thêm
              <ChevronDown className="size-[18px] stroke-[1.5]" />
            </button>
          </div>
        )}
      </section>
    </>
  );
}
