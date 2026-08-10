import LegalPage from "@/components/common/LegalPage/LegalPage";

export const metadata = {
  title: "Privacy Policy | All India Labour Party",
  description:
    "Privacy Policy of the All India Labour Party website.",
};

const sections = [
  {
    title: "Introduction",
    paragraphs: [
      "All India Labour Party respects the privacy of visitors, members, supporters and users of this website. This Privacy Policy explains how information provided through our website may be collected, used and protected.",
    ],
  },

  {
    title: "Information We Collect",
    paragraphs: [
      "We may collect information that you voluntarily provide when using our services, including membership registration, contact forms, donation forms, newsletter subscriptions and other online services.",
    ],
    list: [
      "Name and contact information",
      "Email address and mobile number",
      "Address and other membership information",
      "Donation and transaction-related information",
      "Information submitted through contact or enquiry forms",
    ],
  },

  {
    title: "How We Use Information",
    paragraphs: [
      "Information submitted through the website may be used to process membership applications, respond to enquiries, provide requested services, communicate important information and maintain our website and organizational records.",
    ],
  },

  {
    title: "Membership Information",
    paragraphs: [
      "Information submitted during membership registration may be used to create and maintain your membership record and generate your digital membership identification card.",
    ],
  },

  {
    title: "Donation Information",
    paragraphs: [
      "Donation-related information may be used to process, verify and maintain records of contributions. Payment information may also be processed through authorized payment service providers.",
    ],
  },

  {
    title: "Cookies and Website Technology",
    paragraphs: [
      "Our website may use cookies and similar technologies to maintain functionality, improve user experience and understand how visitors interact with the website.",
    ],
  },

  {
    title: "Data Security",
    paragraphs: [
      "We take reasonable technical and organizational measures to protect information submitted through the website. However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
    ],
  },

  {
    title: "Third-Party Services",
    paragraphs: [
      "Certain website services may be provided through third-party platforms such as payment processors, email services, cloud storage providers or analytics services. Such services may process information according to their own privacy policies.",
    ],
  },

  {
    title: "Changes to This Policy",
    paragraphs: [
      "This Privacy Policy may be updated from time to time to reflect changes to our services, technology or legal requirements. Updated versions will be published on this page.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      badge="LEGAL & PRIVACY"
      title="Privacy Policy"
      description="Learn how All India Labour Party handles information provided through this website."
      lastUpdated="August 2026"
      sections={sections}
    />
  );
}