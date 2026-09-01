import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";

export const metadata = {
  title: {
    default: "All India Labour Party (AILP) | Official Party Portal",
    template: "%s | All India Labour Party (AILP)",
  },
  description:
    "Official website of All India Labour Party (AILP). Dedicated to employment, equality, workers' rights, and social justice across India. Election Symbol: Glass (গ্লাস).",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "All India Labour Party (AILP) | Official Party Portal",
    description:
      "Working for workers, employment, equality, and social justice. Join the nationwide movement for a stronger, inclusive India.",
    url: "https://ailp.org",
    siteName: "All India Labour Party",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/ailp-symbol-logo.svg",
        width: 800,
        height: 800,
        alt: "All India Labour Party Official Election Symbol",
      },
    ],
  },
};

export default function WebsiteLayout({ children }) {
  return (
    <>
      {/* Official AILP Header */}
      <Header />

      {/* Page Content Container */}
      <main>{children}</main>

      {/* Official AILP Footer */}
      <Footer />
    </>
  );
}