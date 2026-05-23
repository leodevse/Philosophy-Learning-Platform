"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, Loader2, Send } from "lucide-react";

import { cn } from "@/lib/utils";

const WELCOME_TEXT =
  "Xin chào! Tôi là gia sư triết học của bạn. Hãy hỏi về Khắc kỷ, Hiện sinh, Đạo giáo — hoặc cách các ý tưởng này áp dụng vào đời sống hàng ngày.";

const SCROLL_THRESHOLD_PX = 96;

const initialMessages: UIMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    parts: [{ type: "text", text: WELCOME_TEXT }],
  },
];

function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => part.text)
    .join("");
}

function TypingLoader() {
  return (
    <div className="flex max-w-[min(100%,36rem)] items-center gap-2 rounded-2xl border border-outline-variant/50 bg-surface-container px-4 py-3">
      <span className="flex gap-1" aria-hidden>
        <span className="size-2 animate-bounce rounded-full bg-secondary [animation-delay:0ms]" />
        <span className="size-2 animate-bounce rounded-full bg-secondary [animation-delay:150ms]" />
        <span className="size-2 animate-bounce rounded-full bg-secondary [animation-delay:300ms]" />
      </span>
      <span className="text-caption text-on-surface-variant">Đang suy nghĩ…</span>
    </div>
  );
}

export function ChatInterface({ className }: { className?: string }) {
  const [input, setInput] = useState("");
  const [pinnedToBottom, setPinnedToBottom] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [emptyReply, setEmptyReply] = useState(false);

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: initialMessages,
    onError: () => setEmptyReply(false),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (isLoading) {
      setEmptyReply(false);
      return;
    }
    const last = messages[messages.length - 1];
    setEmptyReply(last?.role === "user");
  }, [isLoading, messages]);

  const isNearBottom = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return true;
    return (
      el.scrollHeight - el.scrollTop - el.clientHeight < SCROLL_THRESHOLD_PX
    );
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "auto") => {
    const el = scrollContainerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior });
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const onScroll = () => {
      setPinnedToBottom(isNearBottom());
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [isNearBottom]);

  useEffect(() => {
    if (!pinnedToBottom) return;
    scrollToBottom(isLoading ? "auto" : "smooth");
  }, [messages, status, pinnedToBottom, isLoading, scrollToBottom]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    setPinnedToBottom(true);
    setEmptyReply(false);
    sendMessage({ text });
    setInput("");
    requestAnimationFrame(() => scrollToBottom("smooth"));
  };

  return (
    <div
      className={cn(
        "relative flex h-[min(72dvh,720px)] max-h-[min(72dvh,720px)] min-h-[420px] flex-col overflow-hidden rounded-xl border border-outline-variant/50 bg-surface shadow-academic-sm",
        className
      )}
    >
      <div
        ref={scrollContainerRef}
        className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain scroll-smooth px-4 py-5 sm:px-6"
      >
        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          {messages.map((message) => {
            const text = getMessageText(message);
            if (!text) return null;

            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={cn(
                  "w-fit max-w-[min(100%,36rem)] rounded-2xl px-4 py-3 text-body-md leading-relaxed",
                  isUser
                    ? "ml-auto bg-primary text-on-primary"
                    : "mr-auto border border-outline-variant/50 bg-surface-container text-on-surface"
                )}
              >
                <p className="whitespace-pre-wrap">{text}</p>
              </div>
            );
          })}

          {isLoading && messages[messages.length - 1]?.role === "user" && (
            <TypingLoader />
          )}

          {(error || emptyReply) && (
            <p className="text-center text-caption text-destructive">
              {error?.message ||
                "Không nhận được câu trả lời. Trên Vercel: thêm OPENROUTER_API_KEY trong Settings, hoặc hỏi ngắn hơn (giới hạn 10 giây)."}
            </p>
          )}
        </div>
      </div>

      {!pinnedToBottom && (
        <button
          type="button"
          onClick={() => {
            setPinnedToBottom(true);
            scrollToBottom("smooth");
          }}
          className="absolute bottom-[5.25rem] left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-outline-variant/50 bg-surface px-3 py-1.5 text-caption text-on-surface shadow-academic-sm transition-colors hover:bg-surface-container"
          aria-label="Cuộn xuống tin nhắn mới"
        >
          <ArrowDown className="size-3.5" />
          Tin mới
        </button>
      )}

      <form
        className="shrink-0 border-t border-outline-variant/30 bg-surface-container-low p-4"
        onSubmit={handleSubmit}
      >
        <div className="mx-auto flex w-full max-w-2xl gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Đặt câu hỏi triết học…"
            rows={2}
            disabled={isLoading}
            className="min-h-0 flex-1 resize-none rounded-lg border border-outline-variant/50 bg-surface px-3 py-2.5 text-body-md text-on-surface outline-none transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-0 disabled:opacity-60"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex size-10 shrink-0 items-center justify-center self-end rounded-lg bg-primary text-on-primary transition-opacity hover:opacity-90 disabled:opacity-40"
            aria-label="Gửi tin nhắn"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4 stroke-[1.5]" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
