import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ailp.org";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "All India Labour Party",
  description: "Official Website of All India Labour Party (AILP)",
  icons: {
    icon: [
      { url: "/images/ailp-symbol-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/images/ailp-symbol-logo.svg",
    apple: "/images/ailp-symbol-logo.svg",
  },
};

export const viewport = {
  themeColor: "#0F172A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PoliticalParty",
    name: "All India Labour Party",
    alternateName: ["AILP", "All India Labour Party (AILP)"],
    url: BASE_URL,
    logo: `${BASE_URL}/images/ailp-symbol-logo.svg`,
    description:
      "Official Political Party in India dedicated to worker rights, employment, social justice, and national economic equality.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "UTTAR KUMROKHALI, Narendrapur",
      addressLocality: "Kolkata, South 24 Parganas",
      postalCode: "700103",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-7896043734",
      contactType: "Party Secretariat",
      email: "allindialabourpartyailp@gmail.com",
      availableLanguage: ["English", "Bengali", "Hindi"],
    },
  };

  return (
    <html lang="en" dir="ltr" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}