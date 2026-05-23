"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProgressStore } from "@/store/progressStore";
import type { QuizQuestion } from "@/types";

interface QuizPlayerProps {
  courseSlug: string;
  lessonId: number;
  questions: QuizQuestion[];
}

export function QuizPlayer({
  courseSlug,
  lessonId,
  questions,
}: QuizPlayerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const completeLesson = useProgressStore((s) => s.completeLesson);
  const setQuizScore = useProgressStore((s) => s.setQuizScore);

  const question = questions[currentIndex];
  const total = questions.length;

  const handleSelect = (option: string) => {
    if (selected || finished) return;
    setSelected(option);
    if (option === question.answer) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      return;
    }

    setFinished(true);
    setQuizScore(courseSlug, lessonId, correctCount);
    if (correctCount >= Math.ceil(total / 2)) {
      completeLesson(courseSlug, lessonId);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setFinished(false);
  };

  if (!question) {
    return (
      <p className="text-[#F9FAFB]/70">No quiz available for this lesson.</p>
    );
  }

  if (finished) {
    const passed = correctCount >= Math.ceil(total / 2);
    return (
      <Card className="border-white/10 bg-[#111827]">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB]">Quiz complete</CardTitle>
          <CardDescription className="text-[#F9FAFB]/70">
            You scored {correctCount} out of {total}
            {passed ? " — lesson marked complete." : " — retry to pass."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={handleRetry}
            className="border-white/10"
          >
            <RotateCcw className="size-4" />
            Retry
          </Button>
          <Button asChild className="bg-[#8B5CF6] hover:bg-[#7C3AED]">
            <Link href={`/courses/${courseSlug}/lesson/${lessonId}`}>
              Back to lesson
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href={`/courses/${courseSlug}`}>Course overview</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  const isCorrect = selected === question.answer;
  const showResult = selected !== null;

  return (
    <Card className="border-white/10 bg-[#111827]">
      <CardHeader>
        <CardDescription>
          Question {currentIndex + 1} of {total}
        </CardDescription>
        <CardTitle className="text-lg text-[#F9FAFB]">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-2">
          {question.options.map((option) => {
            const isSelected = selected === option;
            const isAnswer = option === question.answer;
            return (
              <li key={option}>
                <button
                  type="button"
                  disabled={showResult}
                  onClick={() => handleSelect(option)}
                  className={cn(
                    "w-full rounded-lg border px-4 py-3 text-left text-sm transition-all",
                    "border-white/10 text-[#F9FAFB]/90 hover:border-[#8B5CF6]/50",
                    isSelected &&
                      !showResult &&
                      "border-[#8B5CF6] bg-[#8B5CF6]/10",
                    showResult &&
                      isAnswer &&
                      "border-emerald-500/50 bg-emerald-500/10",
                    showResult &&
                      isSelected &&
                      !isAnswer &&
                      "border-red-500/50 bg-red-500/10"
                  )}
                >
                  {option}
                </button>
              </li>
            );
          })}
        </ul>
        {showResult && (
          <p
            className={cn(
              "text-sm font-medium",
              isCorrect ? "text-emerald-400" : "text-amber-400"
            )}
          >
            {isCorrect ? "Correct!" : `The answer is: ${question.answer}`}
          </p>
        )}
        {showResult && (
          <Button
            onClick={handleNext}
            className="w-full bg-[#8B5CF6] hover:bg-[#7C3AED] sm:w-auto"
          >
            {currentIndex < total - 1 ? "Next question" : "See score"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
