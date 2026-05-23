import type { Course } from "@/types";

export const courses: Course[] = [
  {
    slug: "stoicism",
    title: "Stoicism",
    titleVi: "Đạo Đức Học Aristoteles",
    description: "Learn resilience, discipline, and calm in the face of chaos.",
    descriptionVi:
      "Nghiên cứu nền tảng về khái niệm Eudaimonia (hạnh phúc viên mãn) và con đường rèn luyện nhân đức trong tác phẩm Đạo đức học Nicomachean kinh điển.",
    image: "/courses/stoicism.jpg",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCDfMFVfRpvb7TbT4w4mebOEOzZ-ewbvSga0fdikU4MmRrexA5OMUuTEmfxE22rwl5eMx8tEyRtyB9WO8ESYDKrdsAaDeyjyi9L8PUf8i5goqMekBmBEupVJ0czv5gCZEv0xxfgncC-kefpwBZQOAl2LX_w3idUQP6C6FhiCYXfHxPj2U2cgp1d7jeLkaCu7Q7S9RIiQzNBgXpjHsb8HlG0I-iUrDOD5EvItLRtrffM9abuw8QIXA4O8TSFfbgDUJx6IHojI_M1eAn6",
    era: "codai",
    eraLabel: "Cổ đại",
    region: "tay",
    regionLabel: "Phương Tây",
    topics: ["daoduc"],
    topicLabels: ["Đạo đức học", "Phương Tây"],
    duration: "8 tuần",
    difficultyLabel: "Trung bình",
    featured: true,
  },
  {
    slug: "existentialism",
    title: "Existentialism",
    titleVi: "Nhập Môn Hiện Sinh",
    description: "Explore freedom, authenticity, and the search for meaning.",
    descriptionVi:
      "Từ Kierkegaard đến Sartre và Camus: Hành trình đi tìm ý nghĩa tồn tại của cá nhân trong một thế giới dường như phi lý và vắng bóng cội nguồn.",
    image: "/courses/existentialism.jpg",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNLhvBG5sMvkN91mFkI4aDRLN9QyL6xLAFtfi7GStK20E21Ri7qj-zRkMK92YkFd6y4COrkuD6ULLYNUJOuj4KXcnIwN__dbgMe3SJ9L8uZ94pSXfUuue_KkIJQBN1iYOxJzrUzF6bpzqXt4uj7x8BeWrqdomJISZrW0h13pnjHDOy9W_juJ6Z4Tk1_Xa6cviNmo-Rpdzyjc3_trCiEDYoBjUGX25He_jNdLUHbV1-wNF2r38sG54ehN5Ax5dtgfw0GBNqCjJextJz",
    era: "hiendai",
    eraLabel: "Hiện đại",
    region: "tay",
    regionLabel: "Phương Tây",
    topics: ["hiensinh"],
    topicLabels: ["Hiện sinh", "Phương Tây"],
    duration: "6 tuần",
    difficultyLabel: "Cơ bản",
  },
  {
    slug: "taoism",
    title: "Taoism",
    titleVi: "Triết Học Phật Giáo",
    description: "Discover harmony, flow, and wisdom in natural simplicity.",
    descriptionVi:
      "Tiếp cận các khái niệm cốt lõi như Vô ngã (Anatta), Duyên khởi và Không tính qua góc nhìn phân tích triết học và luận lý học nghiêm ngặt.",
    image: "/courses/taoism.jpg",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjAQMB3_1C50QvNaPGy27DW1wYzIi3Y6Y-8VFzHhKqCjg46o5afyAGNurMmNP9w3bWIDz7J3VWcLgrr1E9YCWgOg76CeZCSngucP_T9NJywFrm-aaPXghgZVoO1kk37RVmmnW1j_PPzNXVDWLb0IEndZ5L4tJN1EDyPSmWp5vPErgLzpBHkr6qTqRM6byY8HDlNJ1L1VbbrtuxNHR_jKqVuEyYdEup8-CCdbRPe38MxhEalXW0lbADJSrXQfoc_k06VSHK3cH7BN6O",
    era: "codai",
    eraLabel: "Cổ đại",
    region: "dong",
    regionLabel: "Phương Đông",
    topics: ["nhanthuc"],
    topicLabels: ["Nhận thức luận", "Phương Đông"],
    duration: "10 tuần",
    difficultyLabel: "Nâng cao",
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
