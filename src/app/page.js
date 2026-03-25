import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BentoGrid from "./components/BentoGrid";
import TechStack from "./components/TechStack";
import ProgramsSection from "./components/ProgramsSection";
import DataPipeline from "./components/DataPipeline";
import DetailedCurriculum from "./components/DetailedCurriculum";
import RoadmapSection from "./components/RoadmapSection";
import TestimonialsSection from "./components/TestimonialsSection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative bg-void text-starlight">
      <Navbar />
      <HeroSection />
      <TechStack />
      <BentoGrid />
      <ProgramsSection />
      <DataPipeline />
      <DetailedCurriculum />
      <RoadmapSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
