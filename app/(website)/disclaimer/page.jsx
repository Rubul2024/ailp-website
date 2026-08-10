import LegalPage from "@/components/common/LegalPage/LegalPage";

export const metadata = {
  title: "Disclaimer | All India Labour Party",
  description:
    "Disclaimer for the official All India Labour Party website.",
};

const sections = [
  {
    title: "General Information",
    paragraphs: [
      "The information published on this website is provided for general informational and organizational purposes. While reasonable efforts are made to maintain the information, we do not guarantee that every item will always be complete, current or error-free.",
    ],
  },

  {
    title: "Political and Organizational Information",
    paragraphs: [
      "Information relating to the All India Labour Party, its policies, campaigns, activities, programs and organizational initiatives is published to inform members, supporters and the general public.",
    ],
  },

  {
    title: "No Professional Advice",
    paragraphs: [
      "Information provided on this website should not be interpreted as legal, financial, medical or other professional advice. Users should obtain appropriate professional advice where necessary.",
    ],
  },

  {
    title: "External Websites",
    paragraphs: [
      "Our website may contain links to external websites operated by third parties. We do not control those websites and are not responsible for their content, availability, security or privacy practices.",
    ],
  },

  {
    title: "Membership Information",
    paragraphs: [
      "Information submitted by users during membership registration is the responsibility of the person submitting the information. Users should ensure that all information is accurate before submitting a form.",
    ],
  },

  {
    title: "Donation Information",
    paragraphs: [
      "Donation information displayed on the website is provided to assist users with contribution-related processes. Users should verify payment details before completing a transaction.",
    ],
  },

  {
    title: "Website Availability",
    paragraphs: [
      "We make reasonable efforts to keep the website accessible, but temporary interruptions may occur due to maintenance, technical problems, network issues or circumstances beyond our control.",
    ],
  },

  {
    title: "Changes to This Disclaimer",
    paragraphs: [
      "This Disclaimer may be updated whenever necessary. Any revised version will be published on this page.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <LegalPage
      badge="LEGAL NOTICE"
      title="Disclaimer"
      description="Important information about the use of content and services provided through this website."
      lastUpdated="August 2026"
      sections={sections}
    />
  );
}