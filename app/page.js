// Layout
import Header from "../components/layout/Header/Header";

// Home Sections

import Hero from "@/components/home/Hero/Hero";
import About from "@/components/home/About/About";
import Journey from "@/components/home/Journey/Journey";
import WhyJoin from "@/components/home/WhyJoin/WhyJoin";
import CoreValues from "@/components/home/CoreValues/CoreValues";
import Leadership from "@/components/home/Leadership/Leadership";
import IndiaMap from "@/components/home/IndiaMap/IndiaMap";
import LatestNews from "@/components/home/LatestNews/LatestNews";
import JoinCTA from "@/components/home/JoinCTA/JoinCTA";
import Subscribe from "@/components/home/Subscribe/Subscribe";
import Footer from "@/components/layout/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Banner */}
        <Hero />

        {/* About */}
        <About />

        {/* Journey */}
        <Journey />

        {/* Why Join */}
        <WhyJoin />

        {/* Core Values */}
        <CoreValues />

        {/* Leadership */}
        <Leadership />

        {/* India Map */}
        <IndiaMap />

        {/* Latest News */}
        <LatestNews />

        {/* Join CTA */}
        <JoinCTA />

        {/* Subscribe */}
        <Subscribe />

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
