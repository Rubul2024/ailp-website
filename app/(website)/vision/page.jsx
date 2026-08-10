import VisionHero from "@/components/vision/VisionHero/VisionHero";

import VisionGoals from "@/components/vision/VisionGoals/VisionGoals";

import VisionCTA from "@/components/vision/VisionCTA/VisionCTA";

export const metadata = {
  title:
    "Our Vision | All India Labour Party",

  description:
    "Discover the vision of the All India Labour Party for a stronger, more inclusive and socially just India.",
};

export default function VisionPage() {
  return (
    <main>
      <VisionHero />

      <VisionGoals />

      <VisionCTA />
    </main>
  );
}