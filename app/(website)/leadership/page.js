/* ==========================================================
   AILP LEADERSHIP PAGE
========================================================== */

import LeadershipHero from "@/components/leadership/LeadershipHero/LeadershipHero";
import PartyPresident from "@/components/leadership/PartyPresident/PartyPresident";
import NationalLeadership from "@/components/leadership/NationalLeadership/NationalLeadership";
import LeadershipCTA from "@/components/leadership/LeadershipCTA/LeadershipCTA";

export const metadata = {
  title: "Leadership",

  description:
    "Meet the leadership of the All India Labour Party and learn about the people working for employment, equality and social justice.",
};

export default function LeadershipPage() {
  return (
    <>
      <LeadershipHero />

      <PartyPresident />

      <NationalLeadership />

      <LeadershipCTA />
    </>
  );
}