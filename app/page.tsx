import { FeaturedSchools } from "@/components/home/featured-schools";
import { HeroSection } from "@/components/home/hero-section";
import { QuoteSection } from "@/components/home/quote-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedSchools />
      <QuoteSection />
    </>
  );
}
