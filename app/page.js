// Layout
import Header from "../components/layout/Header/Header";

// Home Sections
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import About from "../components/About/About";
import MissionVision from "../components/MissionVision/MissionVision";
import Statistics from "../components/Statistics/Statistics";
import Leadership from "@/components/home/Leadership/Leadership";
import News from "@/components/home/News/News";
import Gallery from "@/components/home/Gallery/Gallery";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Banner */}
        <Hero />

        {/* Features */}
        <Features />

        {/* About */}
        <About />

        {/* Mission & Vision */}
        <MissionVision />

        {/* Statistics */}
        <Statistics />

        {/* Leadership */}
        <Leadership />

        {/* News */}
        <News />

        {/* Gallery */}
        <Gallery />
        
      </main>
    </>
  );
}
