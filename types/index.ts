export type CourseEra = "codai" | "trungco" | "hiendai";
export type CourseRegion = "dong" | "tay";
export type CourseTopic =
  | "daoduc"
  | "nhanthuc"
  | "hiensinh"
  | "chinhtri";

export interface Course {
  slug: string;
  title: string;
  description: string;
  image: string;
  titleVi: string;
  descriptionVi: string;
  imageUrl: string;
  era: CourseEra;
  eraLabel: string;
  region: CourseRegion;
  regionLabel: string;
  topics: CourseTopic[];
  topicLabels: string[];
  duration: string;
  difficultyLabel: string;
  featured?: boolean;
}

export interface Lesson {
  id: number;
  course: string;
  title: string;
  titleVi: string;
  content: string;
  category?: string;
  breadcrumbParent?: string;
  breadcrumbCurrent?: string;
  readTime?: string;
  views?: string;
  imageUrl?: string;
  imageCaption?: string;
  reflectionQuestions?: string[];
}

export interface QuizQuestion {
  lessonId: number;
  course: string;
  question: string;
  options: string[];
  answer: string;
}

export type LessonKey = `${string}-${number}`;
