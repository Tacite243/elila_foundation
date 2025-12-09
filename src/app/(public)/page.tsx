import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import DonationSection from "@/components/DonationSection";
import FaqSection from "@/components/FaqSection";
import LatestArticles from "@/components/LatestArticles";
import OurCultureSection from "@/components/OurCultureSection";
import ProgrammeSection from "@/components/ProgrammeSection";
import TeamSection from "@/components/TeamSection";
import VisionMission from "@/components/VisionMission";
import dynamic from "next/dynamic";
const HeroSection = dynamic(() => import("@/components/HeroSection"));

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <LatestArticles />
      <VisionMission />
      <AboutSection />
      <ProgrammeSection />
      <DonationSection />
      <OurCultureSection />
      <FaqSection />
      <TeamSection />
      <ContactSection />
    </main>
  );
}
