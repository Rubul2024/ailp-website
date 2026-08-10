/* ==========================================================
   AILP CONTACT PAGE
   All India Labour Party
========================================================== */

import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo/ContactInfo";
import ContactForm from "@/components/contact/ContactForm/ContactForm";

export const metadata = {
  title: "Contact Us",

  description:
    "Contact the All India Labour Party for questions, suggestions, membership information and general enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />

      <section
        style={{
          padding: "110px 20px",
          background: "#ffffff",
        }}
      >
        <div
          style={{
            width: "min(1250px, 92%)",
            margin: "auto",
            display: "grid",
            gridTemplateColumns: "0.85fr 1.15fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          <ContactInfo />

          <ContactForm />
        </div>
      </section>
    </>
  );
}