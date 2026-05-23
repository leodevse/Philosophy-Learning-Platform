"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { toLessonKey } from "@/lib/lesson-key";

interface ProgressState {
  completedLessons: string[];
  quizScores: Record<string, number>;
  completeLesson: (course: string, lessonId: number) => void;
  setQuizScore: (course: string, lessonId: number, score: number) => void;
  isLessonComplete: (course: string, lessonId: number) => boolean;
  getQuizScore: (course: string, lessonId: number) => number | undefined;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizScores: {},

      completeLesson: (course, lessonId) => {
        const key = toLessonKey(course, lessonId);
        set((state) => ({
          completedLessons: state.completedLessons.includes(key)
            ? state.completedLessons
            : [...state.completedLessons, key],
        }));
      },

      setQuizScore: (course, lessonId, score) => {
        const key = toLessonKey(course, lessonId);
        set((state) => ({
          quizScores: { ...state.quizScores, [key]: score },
        }));
      },

      isLessonComplete: (course, lessonId) => {
        return get().completedLessons.includes(toLessonKey(course, lessonId));
      },

      getQuizScore: (course, lessonId) => {
        return get().quizScores[toLessonKey(course, lessonId)];
      },
    }),
    { name: "philosophy-progress" }
  )
);
