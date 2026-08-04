// Layout
import Header from "../components/Header/Header";

// Home Sections
import Hero from "../components/Hero/Hero";
import Features from "../components/Features/Features";
import About from "../components/About/About";
import MissionVision from "../components/MissionVision/MissionVision";
import Statistics from "../components/Statistics/Statistics";

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

      </main>
    </>
  );
}