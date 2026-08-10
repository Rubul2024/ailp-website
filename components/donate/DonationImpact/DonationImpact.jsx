import {
  Users,
  Megaphone,
  MapPinned,
  HandHeart,
} from "lucide-react";

import styles from "./DonationImpact.module.css";

const impacts = [
  {
    icon: Users,
    title: "Grassroots Work",
    text: "Help us strengthen our connection with workers and communities.",
  },
  {
    icon: Megaphone,
    title: "Public Outreach",
    text: "Support awareness campaigns and public engagement initiatives.",
  },
  {
    icon: MapPinned,
    title: "Wider Reach",
    text: "Help expand our presence and activities across more regions.",
  },
  {
    icon: HandHeart,
    title: "Community Support",
    text: "Contribute towards initiatives focused on dignity and social justice.",
  },
];

export default function DonationImpact() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span>YOUR CONTRIBUTION</span>

          <h2>
            Where Your Support
            <strong> Makes an Impact</strong>
          </h2>

          <p>
            Every contribution can help us continue our work
            with workers, communities and citizens.
          </p>
        </div>

        <div className={styles.grid}>
          {impacts.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className={styles.card}
              >
                <div className={styles.icon}>
                  <Icon size={23} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.text}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}