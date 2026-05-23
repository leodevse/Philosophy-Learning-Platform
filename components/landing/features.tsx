import { Brain, BookOpen, HelpCircle } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI Tutor",
    description:
      "Ask questions and explore ideas with a philosophy tutor powered by AI.",
  },
  {
    icon: BookOpen,
    title: "Interactive Lessons",
    description:
      "Read curated lessons on Stoicism, Existentialism, and Taoism at your pace.",
  },
  {
    icon: HelpCircle,
    title: "Philosophy Quizzes",
    description:
      "Test your understanding after each lesson and track your progress.",
  },
];

export function Features() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-heading text-3xl font-bold text-[#F9FAFB]">
          Learn your way
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="border-white/10 bg-[#111827] transition-all hover:border-[#8B5CF6]/30"
            >
              <CardHeader>
                <Icon className="mb-2 size-8 text-[#8B5CF6]" />
                <CardTitle className="text-[#F9FAFB]">{title}</CardTitle>
                <CardDescription className="text-[#F9FAFB]/60">
                  {description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
