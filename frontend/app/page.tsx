// app/page.tsx (Landing Page utama)
import HeroSection from "@/components/Sections/HeroSection";
import FeaturesSection from "@/components/Sections/FeaturesSection";
import HowItWorks from "@/components/Sections/HowItWorks";
import CTASection from "@/components/Sections/CTASection";
import Footer from "@/components/Sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}