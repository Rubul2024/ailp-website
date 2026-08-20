/* ==========================================================
   AILP ABOUT PAGE
   All India Labour Party
========================================================== */

import AboutHero from "@/components/About/AboutHero/AboutHero";

import AboutIntroduction from "@/components/About/AboutIntroduction/AboutIntroduction";

import AboutValues from "@/components/About/AboutValues/AboutValues";

import AboutMission from "@/components/About/AboutMission/AboutMission";

import AboutJourney from "@/components/About/AboutJourney/AboutJourney";

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