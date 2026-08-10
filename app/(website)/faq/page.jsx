import FAQSection from "@/components/faq/FAQSection/FAQSection";
import FAQCTA from "@/components/faq/FAQCTA/FAQCTA";

export const metadata = {
  title: "Frequently Asked Questions | All India Labour Party",

  description:
    "Find answers to frequently asked questions about the All India Labour Party.",
};

export default function FAQPage() {
  return (
    <main>
      <FAQSection />

      <FAQCTA />
    </main>
  );
}