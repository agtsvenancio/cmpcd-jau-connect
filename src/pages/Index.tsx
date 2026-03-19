import SiteHeader from "@/components/SiteHeader";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ObjectivesSection from "@/components/ObjectivesSection";
import DataSection from "@/components/DataSection";
import TransparencySection from "@/components/TransparencySection";
import SiteFooter from "@/components/SiteFooter";

const Index = () => (
  <>
    <SiteHeader />
    <main>
      <HeroSection />
      <AboutSection />
      <ObjectivesSection />
      <DataSection />
      <TransparencySection />
    </main>
    <SiteFooter />
  </>
);

export default Index;
