import type { QuizQuestion } from "@/types";

export const quizzes: QuizQuestion[] = [
  {
    lessonId: 1,
    course: "stoicism",
    question: "Who was Marcus Aurelius?",
    options: ["Roman Emperor", "Greek playwright", "Egyptian priest"],
    answer: "Roman Emperor",
  },
  {
    lessonId: 1,
    course: "stoicism",
    question: "According to Stoicism, what is the highest good?",
    options: ["Virtue", "Wealth", "Pleasure"],
    answer: "Virtue",
  },
  {
    lessonId: 2,
    course: "stoicism",
    question: "The dichotomy of control separates things into what two categories?",
    options: [
      "What we control vs. what we do not",
      "Good vs. evil",
      "Mind vs. body",
    ],
    answer: "What we control vs. what we do not",
  },
  {
    lessonId: 3,
    course: "stoicism",
    question: "What does 'memento mori' remind us of?",
    options: [
      "The inevitability of death",
      "The power of memory",
      "Roman military tactics",
    ],
    answer: "The inevitability of death",
  },
  {
    lessonId: 1,
    course: "existentialism",
    question: "Who famously stated that existence precedes essence?",
    options: ["Jean-Paul Sartre", "Plato", "Confucius"],
    answer: "Jean-Paul Sartre",
  },
  {
    lessonId: 2,
    course: "existentialism",
    question: "Camus described the tension between human longing and a silent world as:",
    options: ["The absurd", "The sublime", "The dialectic"],
    answer: "The absurd",
  },
  {
    lessonId: 1,
    course: "taoism",
    question: "Wu wei is best described as:",
    options: [
      "Effortless, natural action",
      "Strict moral discipline",
      "Debate and argument",
    ],
    answer: "Effortless, natural action",
  },
  {
    lessonId: 2,
    course: "taoism",
    question: "Yin and yang represent:",
    options: [
      "Complementary aspects of a whole",
      "Good defeating evil",
      "Heaven rejecting earth",
    ],
    answer: "Complementary aspects of a whole",
  },
];

export function getQuizzesForLesson(
  courseSlug: string,
  lessonId: number
): QuizQuestion[] {
  return quizzes.filter(
    (q) => q.course === courseSlug && q.lessonId === lessonId
  );
}
