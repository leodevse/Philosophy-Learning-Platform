import { ChatInterface } from "@/components/ai/chat-interface";

export const metadata = {
  title: "Gia sư AI — Minh Triết Học Đường",
  description:
    "Trò chuyện với gia sư triết học AI — giải thích rõ ràng, ví dụ thực tế.",
};

export default function TutorPage() {
  return (
    <div className="container-page py-8 md:py-12">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <header className="space-y-3 border-b border-outline-variant/30 pb-8">
          <p className="text-label-md uppercase tracking-widest text-secondary">
            Gia sư AI
          </p>
          <h1 className="text-headline-lg text-primary">
            Hỏi đáp cùng gia sư triết học
          </h1>
          <p className="max-w-2xl text-body-lg text-on-surface-variant">
            Đặt câu hỏi về Khắc kỷ, Hiện sinh, Đạo giáo — gia sư trả lời từng
            đoạn để bạn theo dõi và suy ngẫm cùng nội dung.
          </p>
          <p className="max-w-2xl text-caption text-on-surface-variant/80">
            Mỗi lượt trả lời ngắn gọn (2–3 ý chính). Muốn đi sâu hơn, hãy hỏi
            tiếp từng phần.
          </p>
        </header>

        <ChatInterface />
      </div>
    </div>
  );
}
