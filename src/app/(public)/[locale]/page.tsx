import LandingHeader from "@/components/home/LandingHeader";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import CTASection from "@/components/home/CTASection";
import FAQSection from "@/components/home/FAQSection";

export const runtime = "edge";
export default function LandingPage() {
  return (
    <div className="relative bg-[#fdf6f5] dark:bg-[#0a0a0a]">
      <LandingHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
}
