import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import SkillBag from "@/components/SkillBag";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <SkillBag />
      <Projects />
      <Timeline />
      <Footer />
    </main>
  );
};

export default Index;
