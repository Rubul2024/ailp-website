import Link from "next/link";

export const metadata = {
  title: "Sitemap | All India Labour Party",
  description:
    "Explore the pages and resources available on the All India Labour Party website.",
};

import styles from "./Sitemap.module.css";

const sections = [
  {
    title: "Main Pages",
    description: "Explore the main sections of the AILP website.",
    links: [
      { title: "Home", href: "/" },
      { title: "About", href: "/about" },
      { title: "Leadership", href: "/leadership" },
      { title: "News", href: "/news" },
      { title: "Gallery", href: "/gallery" },
      { title: "Contact", href: "/contact" },
    ],
  },

  {
    title: "Our Purpose",
    description: "Learn about the values and direction of AILP.",
    links: [
      { title: "Our Mission", href: "/mission" },
      { title: "Our Vision", href: "/vision" },
      { title: "FAQ", href: "/faq" },
    ],
  },

  {
    title: "Get Involved",
    description: "Become part of the AILP community.",
    links: [
      { title: "Join Membership", href: "/join" },
      { title: "Donate", href: "/donate" },
      { title: "Contact Us", href: "/contact" },
    ],
  },

  {
    title: "Legal",
    description: "Read our website policies and legal information.",
    links: [
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms & Conditions", href: "/terms" },
      { title: "Disclaimer", href: "/disclaimer" },
      { title: "Sitemap", href: "/sitemap" },
    ],
  },

  {
    title: "Member Portal",
    description: "Access membership services and your profile.",
    links: [
      { title: "Member Login", href: "/member/login" },
      { title: "Join Membership", href: "/member/register" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <main className={styles.page}>
      {/* ==========================================
          Hero
      ========================================== */}

      <section className={styles.hero}>
        <div className={styles.container}>
          <span className={styles.badge}>EXPLORE AILP</span>

          <h1>Website Sitemap</h1>

          <p>
            Find your way around the All India Labour Party website
            and quickly access the information and services you need.
          </p>
        </div>
      </section>

      {/* ==========================================
          Sitemap
      ========================================== */}

      <section className={styles.content}>
        <div className={styles.grid}>
          {sections.map((section, index) => (
            <div className={styles.card} key={section.title}>
              <div className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </div>

              <h2>{section.title}</h2>

              <p>{section.description}</p>

              <ul>
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <span>{link.title}</span>
                      <strong>→</strong>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}