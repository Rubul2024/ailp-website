"use client";

import {
  BriefcaseBusiness,
  Scale,
  UsersRound,
  GraduationCap,
  HeartHandshake,
  Building2,
} from "lucide-react";

import styles from "./MissionPillars.module.css";

const pillars = [
  {
    icon: BriefcaseBusiness,
    title: "Employment",
    text:
      "Promoting meaningful employment opportunities and supporting a stronger workforce.",
  },

  {
    icon: Scale,
    title: "Workers' Rights",
    text:
      "Working towards dignity, fairness and protection of workers and their interests.",
  },

  {
    icon: UsersRound,
    title: "Equality",
    text:
      "Building an inclusive society where every citizen receives equal opportunity.",
  },

  {
    icon: GraduationCap,
    title: "Education & Skills",
    text:
      "Encouraging education, vocational development and skills that improve livelihoods.",
  },

  {
    icon: HeartHandshake,
    title: "Social Justice",
    text:
      "Standing for fairness, dignity and social justice for communities across India.",
  },

  {
    icon: Building2,
    title: "Nation Building",
    text:
      "Contributing to a stronger India through responsible participation and development.",
  },
];

export default function MissionPillars() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>OUR COMMITMENTS</span>

          <h2>
            What Our Mission
            <strong> Stands For</strong>
          </h2>

          <p>
            Our work is guided by a commitment to people,
            opportunity, dignity and a stronger future.
          </p>
        </div>

        <div className={styles.grid}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;

            return (
              <article
                key={pillar.title}
                className={styles.card}
              >
                <div className={styles.icon}>
                  <Icon size={25} />
                </div>

                <h3>{pillar.title}</h3>

                <p>{pillar.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}