// Home Sections
import Hero from "@/components/home/Hero/Hero";
import About from "@/components/about/About";
import Journey from "@/components/home/Journey/Journey";
import WhyJoin from "@/components/home/WhyJoin/WhyJoin";
import CoreValues from "@/components/home/CoreValues/CoreValues";
import Leadership from "@/components/home/Leadership/Leadership";
import IndiaMap from "@/components/home/IndiaMap/IndiaMap";
import LatestNews from "@/components/home/LatestNews/LatestNews";
import Subscribe from "@/components/home/Subscribe/Subscribe";

export default function Home() {
  return (
    <>
      {/* Hero Banner */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Journey Section */}
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

      {/* Subscribe */}
      <Subscribe />
    </>
  );
}