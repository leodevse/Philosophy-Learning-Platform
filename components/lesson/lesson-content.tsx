import ReactMarkdown from "react-markdown";

interface LessonContentProps {
  content: string;
}

export function LessonContent({ content }: LessonContentProps) {
  return (
    <article className="prose prose-invert max-w-none prose-headings:font-heading prose-headings:text-[#F9FAFB] prose-p:text-[#F9FAFB]/80 prose-strong:text-[#F9FAFB] prose-a:text-[#8B5CF6]">
      <ReactMarkdown>{content}</ReactMarkdown>
    </article>
  );
}
