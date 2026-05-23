src/
├── app/
│   ├── api/
│   │   └── chat/
│   ├── courses/
│   │   └── [slug]/
│   ├── tutor/
│   ├── quiz/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── course/
│   ├── lesson/
│   ├── quiz/
│   └── ai/
│
├── data/
│   ├── courses.ts
│   ├── lessons.ts
│   └── quizzes.ts
│
├── lib/
│   ├── openai.ts
│   ├── utils.ts
│   └── prompts.ts
│
├── store/
│   └── progressStore.ts
│
└── types/
4. THIẾT KẾ UI
THEME
Visual direction:
dark mode
cosmic
intellectual
minimal
FONT

Dùng:

Inter

hoặc:

Space Grotesk
COLORS
Background: #0B0F19
Card: #111827
Accent: #8B5CF6
Text: #F9FAFB
PHẦN QUAN TRỌNG

UI phải:

sạch,
cinematic,
smooth animation,
mobile responsive.
5. LANDING PAGE
Sections
HERO

Text:

Explore Philosophy Through AI

Button:

Start Learning
FEATURED COURSES

Cards:

Stoicism
Existentialism
Taoism
DAILY QUOTE

Ví dụ:

“He who has a why to live can bear almost any how.”

FEATURES

3 cards:

AI Tutor
Interactive Lessons
Philosophy Quizzes
CTA
Begin Your Philosophical Journey
6. COURSE SYSTEM
DATA STRUCTURE
courses.ts
export const courses = [
 {
   slug: "stoicism",
   title: "Stoicism",
   description: "Learn resilience and discipline.",
   image: "/stoic.jpg",
 },
]
COURSE PAGE

Route:

/courses/[slug]

Hiển thị:

course info
lessons
progress
7. LESSON SYSTEM
LESSON PAGE

Route:

/courses/[slug]/lesson/[id]
CONTENT FORMAT
lessons.ts
export const lessons = [
 {
   id: 1,
   course: "stoicism",
   title: "What is Stoicism?",
   content: `
Stoicism teaches emotional resilience...
`,
 }
]
HIỂN THỊ
markdown content
progress bar
next lesson button
8. QUIZ SYSTEM
DATA
export const quizzes = [
 {
   lessonId: 1,
   question: "Who was Marcus Aurelius?",
   options: [
     "Roman Emperor",
     "Scientist",
     "Artist"
   ],
   answer: "Roman Emperor"
 }
]
QUIZ UI
multiple choice
selected state
score
retry
FLOW
Lesson
→ Quiz
→ Score
→ Complete lesson
9. PROGRESS TRACKING
DÙNG LOCAL STORAGE

Không cần database.

ZUSTAND STORE
progressStore.ts

Lưu:

completed lessons
quiz scores
USER FLOW
Complete lesson
→ save progress
→ update UI