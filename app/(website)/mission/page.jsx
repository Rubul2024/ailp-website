import MissionHero from "@/components/mission/MissionHero/MissionHero";

import MissionPillars from "@/components/mission/MissionPillars/MissionPillars";

import MissionCTA from "@/components/mission/MissionCTA/MissionCTA";

export const metadata = {
  title:
    "Our Mission | All India Labour Party",

  description:
    "Learn about the mission and commitments of the All India Labour Party.",
};

export default function MissionPage() {
  return (
    <main>
      <MissionHero />

      <MissionPillars />

      <MissionCTA />
    </main>
  );
}