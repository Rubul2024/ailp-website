"use client";

import {
  Briefcase,
  ShieldCheck,
  Landmark,
  Users,
} from "lucide-react";

import styles from "./VisionGoals.module.css";

const goals = [
  {
    icon: Briefcase,
    number: "01",
    title: "Opportunity for All",
    text:
      "A future where people have access to meaningful employment and opportunities to improve their lives.",
  },

  {
    icon: ShieldCheck,
    number: "02",
    title: "Dignity & Security",
    text:
      "A society where workers and citizens can live and work with dignity, fairness and security.",
  },

  {
    icon: Users,
    number: "03",
    title: "Inclusive Growth",
    text:
      "Development that reaches communities across India and creates opportunities for wider participation.",
  },

  {
    icon: Landmark,
    number: "04",
    title: "Stronger India",
    text:
      "A prosperous and socially just India strengthened by responsible citizens and a productive workforce.",
  },
];

export default function VisionGoals() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>OUR ASPIRATIONS</span>

          <h2>
            The India We
            <strong> Aspire To Build</strong>
          </h2>

          <p>
            Our vision is centered on people,
            opportunity, dignity and sustainable
            national progress.
          </p>
        </div>

        <div className={styles.grid}>
          {goals.map((goal) => {
            const Icon = goal.icon;

            return (
              <article
                className={styles.card}
                key={goal.number}
              >
                <div className={styles.top}>
                  <span>
                    {goal.number}
                  </span>

                  <div className={styles.icon}>
                    <Icon size={23} />
                  </div>
                </div>

                <h3>{goal.title}</h3>

                <p>{goal.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}