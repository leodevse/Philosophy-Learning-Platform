import ReactMarkdown from "react-markdown";

interface LessonProseProps {
  content: string;
}

export function LessonProse({ content }: LessonProseProps) {
  return (
    <div className="space-y-6 text-body-lg text-on-surface">
      <ReactMarkdown
        components={{
          h2: ({ children }) => (
            <h2 className="text-headline-md mt-12 mb-6 text-primary">
              {children}
            </h2>
          ),
          p: ({ children }) => (
            <p className="leading-[1.8]">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-on-surface">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="mt-4 list-disc space-y-3 pl-6 text-body-md">
              {children}
            </ul>
          ),
          li: ({ children }) => <li>{children}</li>,
          blockquote: ({ children }) => (
            <blockquote className="relative my-10 rounded-r-xl border-l-4 border-primary bg-surface-container p-6 pr-12 shadow-[0_4px_20px_rgba(26,46,68,0.02)] md:p-8">
              <div className="text-body-lg italic text-on-surface-variant [&>p]:mb-4 [&>p:last-child]:mb-0">
                {children}
              </div>
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
