"use client";

import { useEffect, useState } from "react";
import { Brain } from "lucide-react";

interface LessonReflectionProps {
  courseSlug: string;
  lessonId: number;
  questions: string[];
}

function notesKey(courseSlug: string, lessonId: number) {
  return `reflection-${courseSlug}-${lessonId}`;
}

export function LessonReflection({
  courseSlug,
  lessonId,
  questions,
}: LessonReflectionProps) {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(notesKey(courseSlug, lessonId));
    if (saved) setNotes(saved);
  }, [courseSlug, lessonId]);

  const handleChange = (value: string) => {
    setNotes(value);
    localStorage.setItem(notesKey(courseSlug, lessonId), value);
  };

  return (
    <section className="relative mt-16 overflow-hidden rounded-xl border border-outline-variant/50 bg-surface-container-low shadow-[0_4px_20px_rgba(26,46,68,0.03)]">
      <span
        className="absolute inset-y-0 left-0 w-1 bg-primary"
        aria-hidden
      />
      <div className="p-8 md:p-10">
        <div className="mb-6 flex items-center gap-3">
          <Brain className="size-7 stroke-[1.5] text-primary" />
          <h3 className="text-headline-md text-on-surface">Câu hỏi suy ngẫm</h3>
        </div>
        <div className="space-y-6 text-body-md text-on-surface-variant">
          {questions.map((question, index) => (
            <div key={index} className="flex items-start gap-4">
              <span className="mt-1 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary-container text-label-md font-bold text-on-secondary-container">
                {index + 1}
              </span>
              <p>{question}</p>
            </div>
          ))}
          <div className="mt-8">
            <label
              htmlFor="reflection-notes"
              className="mb-2 block text-label-md text-on-surface"
            >
              Ghi chú cá nhân (Chỉ bạn nhìn thấy)
            </label>
            <textarea
              id="reflection-notes"
              value={notes}
              onChange={(e) => handleChange(e.target.value)}
              rows={3}
              placeholder="Viết suy nghĩ của bạn tại đây..."
              className="w-full resize-none border-0 border-b border-outline-variant bg-transparent px-0 py-3 text-body-md text-on-surface transition-colors placeholder:text-outline-variant focus:border-primary focus:ring-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
