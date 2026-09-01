import Image from "next/image";
import {
  ShieldCheck,
  Scale,
  Users2,
  Heart,
  TrendingUp,
  Briefcase,
  Award,
} from "lucide-react";
import styles from "./CoreValues.module.css";

const CORE_VALUES = [
  {
    id: "nation",
    title: "Nation First",
    description: "Building a stronger, self-reliant, and inclusive India for every citizen.",
    icon: ShieldCheck,
    colorClass: styles.navyTheme,
  },
  {
    id: "integrity",
    title: "Integrity",
    description: "Unwavering commitment to transparency, honesty, and constitutional ethics.",
    icon: Scale,
    colorClass: styles.blueTheme,
  },
  {
    id: "unity",
    title: "Unity",
    description: "Standing collectively for workers, youth, farmers, and marginalized communities.",
    icon: Users2,
    colorClass: styles.saffronTheme,
  },
  {
    id: "equality",
    title: "Equality",
    description: "Ensuring dignity, equal pay, and equal rights irrespective of background.",
    icon: Heart,
    colorClass: styles.roseTheme,
  },
  {
    id: "development",
    title: "Development",
    description: "Sustainable economic progress driven by education, industry, and welfare.",
    icon: TrendingUp,
    colorClass: styles.emeraldTheme,
  },
  {
    id: "employment",
    title: "Employment",
    description: "Expanding livelihood opportunities, worker protections, and fair wages.",
    icon: Briefcase,
    colorClass: styles.indigoTheme,
  },
];

export default function CoreValues() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.container}>
        {/* Section Header with Official Party Emblem */}
        <div className={styles.headerArea}>
          <div className={styles.emblemBadgeWrap}>
            <div className={styles.partyEmblemCircle}>
              <Image
                src="/images/ailp-symbol-logo.svg"
                alt="All India Labour Party Official Symbol"
                width={52}
                height={52}
                priority
                className={styles.emblemImg}
              />
            </div>
          </div>

          <span className={styles.categoryPill}>
            <Award size={13} /> Official Party Ideology
          </span>

          <h2 className={styles.sectionTitle}>
            Our Core <span className={styles.highlight}>Principles</span>
          </h2>

          <p className={styles.sectionSubtitle}>
            Founded on constitutional democracy, secularism, and unwavering dedication to the working class of India.
          </p>

          <div className={styles.tricolorLine} />
        </div>

        {/* 3x2 Symmetrical Modern Grid */}
        <div className={styles.valuesGrid}>
          {CORE_VALUES.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={styles.valueCard}>
                <div className={`${styles.iconWrap} ${item.colorClass}`}>
                  <Icon size={24} />
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
                <div className={styles.cardAccentBar} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}