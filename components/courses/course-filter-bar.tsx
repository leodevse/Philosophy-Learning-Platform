"use client";

import { Search } from "lucide-react";

import type { CourseEra, CourseRegion, CourseTopic } from "@/types";

export interface CourseFilters {
  search: string;
  region: CourseRegion | "";
  era: CourseEra | "";
  topic: CourseTopic | "";
}

interface CourseFilterBarProps {
  filters: CourseFilters;
  onChange: (filters: CourseFilters) => void;
}

export function CourseFilterBar({ filters, onChange }: CourseFilterBarProps) {
  const update = (patch: Partial<CourseFilters>) => {
    onChange({ ...filters, ...patch });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-outline-variant/40 bg-surface-container-low p-2 shadow-[0_4px_20px_rgba(26,46,68,0.03)] md:flex-row md:p-4">
      <div className="relative flex flex-grow items-center border-b border-outline-variant px-2 py-2 transition-all duration-200 focus-within:border-b-2 focus-within:border-primary md:rounded-none md:border-b md:bg-transparent">
        <Search className="mr-3 size-5 shrink-0 stroke-[1.5] text-outline" />
        <input
          type="search"
          value={filters.search}
          onChange={(e) => update({ search: e.target.value })}
          placeholder="Tìm kiếm tựa đề, triết gia..."
          className="w-full border-none bg-transparent p-0 text-body-md text-on-surface outline-none placeholder:text-on-surface-variant/50 focus:ring-0"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row md:w-auto">
        <FilterSelect
          value={filters.region}
          onChange={(v) => update({ region: v as CourseRegion | "" })}
          options={[
            { value: "", label: "Khu vực" },
            { value: "dong", label: "Phương Đông" },
            { value: "tay", label: "Phương Tây" },
          ]}
        />
        <FilterSelect
          value={filters.era}
          onChange={(v) => update({ era: v as CourseEra | "" })}
          options={[
            { value: "", label: "Thời kỳ" },
            { value: "codai", label: "Cổ đại" },
            { value: "trungco", label: "Trung cổ" },
            { value: "hiendai", label: "Hiện đại" },
          ]}
        />
        <FilterSelect
          value={filters.topic}
          onChange={(v) => update({ topic: v as CourseTopic | "" })}
          options={[
            { value: "", label: "Chủ đề" },
            { value: "daoduc", label: "Đạo đức học" },
            { value: "nhanthuc", label: "Nhận thức luận" },
            { value: "hiensinh", label: "Hiện sinh" },
            { value: "chinhtri", label: "Chính trị học" },
          ]}
        />
      </div>
    </div>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="relative flex-1 border-b border-outline-variant transition-all duration-200 focus-within:border-b-2 focus-within:border-primary sm:w-40">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select-minimal w-full cursor-pointer border-none bg-transparent p-2 pl-0 pr-8 text-label-md text-on-surface outline-none focus:ring-0"
      >
        {options.map((opt) => (
          <option key={opt.value || "all"} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
