/* ==========================================================
   AILP ABOUT PAGE
   All India Labour Party
========================================================== */
import AboutHero from "@/components/about/AboutHero/AboutHero";
import AboutIntroduction from "@/components/about/AboutIntroduction/AboutIntroduction";
import AboutValues from "@/components/about/AboutValues/AboutValues";
import AboutMission from "@/components/about/AboutMission/AboutMission";
import AboutJourney from "@/components/about/AboutJourney/AboutJourney";

export const metadata = {
  title: "About Us | All India Labour Party",

  description:
    "Learn about the All India Labour Party, our purpose, values, mission and journey.",
};

export default function AboutPage() {
  return (
    <main>
      {/* ==================================================
          About Hero
      ================================================== */}

      <AboutHero />

      {/* ==================================================
          Who We Are
      ================================================== */}

      <AboutIntroduction />

      {/* ==================================================
          Our Values
      ================================================== */}

      <AboutValues />

      {/* ==================================================
          Our Mission
      ================================================== */}

      <AboutMission />

      {/* ==================================================
          Our Journey
      ================================================== */}

      <AboutJourney />
    </main>
  );
}
