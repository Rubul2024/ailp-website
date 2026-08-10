import LegalPage from "@/components/common/LegalPage/LegalPage";

export const metadata = {
  title: "Terms & Conditions | All India Labour Party",
  description:
    "Terms and Conditions governing the use of the All India Labour Party website.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    paragraphs: [
      "By accessing or using the All India Labour Party website, you agree to comply with these Terms and Conditions. If you do not agree with these terms, please do not use the website.",
    ],
  },

  {
    title: "Use of the Website",
    paragraphs: [
      "The website is provided to share information about the All India Labour Party, its activities, membership opportunities, campaigns, policies, news and other organizational information.",
    ],
  },

  {
    title: "Membership Registration",
    paragraphs: [
      "Users providing information for membership registration are responsible for ensuring that the information submitted is accurate and complete.",
      "Membership registration does not authorize a user to impersonate another individual or misuse another person's information.",
    ],
  },

  {
    title: "Donations",
    paragraphs: [
      "Users making donations through the website are responsible for providing accurate information and using authorized payment methods. Donation transactions may be subject to the terms and policies of the applicable payment provider.",
    ],
  },

  {
    title: "Website Content",
    paragraphs: [
      "Content published on this website is intended for informational and organizational purposes. We may update, modify or remove website content at any time without prior notice.",
    ],
  },

  {
    title: "Prohibited Activities",
    paragraphs: [
      "Users must not use this website for unlawful purposes, fraudulent activities, unauthorized access, harassment, distribution of malicious software or any activity that may interfere with the operation or security of the website.",
    ],
  },

  {
    title: "Intellectual Property",
    paragraphs: [
      "Unless otherwise stated, website content including text, graphics, logos, designs, photographs and other materials is owned by or used by All India Labour Party with appropriate rights or permissions.",
    ],
  },

  {
    title: "External Links",
    paragraphs: [
      "The website may contain links to external websites or services. All India Labour Party is not responsible for the content, availability or privacy practices of third-party websites.",
    ],
  },

  {
    title: "Limitation of Liability",
    paragraphs: [
      "We make reasonable efforts to maintain the availability and accuracy of the website. However, we do not guarantee that the website will always be available, error-free or free from interruptions.",
    ],
  },

  {
    title: "Changes to These Terms",
    paragraphs: [
      "These Terms and Conditions may be modified from time to time. Continued use of the website after changes are published constitutes acceptance of the updated terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      badge="LEGAL INFORMATION"
      title="Terms & Conditions"
      description="Please review the terms governing your use of the All India Labour Party website."
      lastUpdated="August 2026"
      sections={sections}
    />
  );
}