import PageLayout from "@/components/PageLayout";
import HeroSection from "@/components/HeroSection";
import HomeAbout from "@/components/home/HomeAbout";
import HomeObjectives from "@/components/home/HomeObjectives";
import HomeStats from "@/components/home/HomeStats";
import HomeNews from "@/components/home/HomeNews";
import HomeSocial from "@/components/home/HomeSocial";

const Index = () => (
  <PageLayout>
    <HeroSection />
    <HomeAbout />
    <HomeObjectives />
    <HomeStats />
    <HomeNews />
    <HomeSocial />
  </PageLayout>
);

export default Index;
