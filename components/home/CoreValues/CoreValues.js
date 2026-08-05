"use client";

import Image from "next/image";
import styles from "./CoreValues.module.css";
import coreValues from "./coreValuesData";

export default function CoreValues() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.heading}>
          <span className={styles.badge}>
            OUR CORE VALUES
          </span>

          <h2>
            Principles That
            <br />
            Guide Our Journey
          </h2>

          <p>
            Our values inspire every decision, every campaign,
            and every effort towards building a stronger India.
          </p>
        </div>

        <div className={styles.circleLayout}>

          <div className={styles.centerLogo}>

            <Image
              src="/images/logo.png"
              alt="AILP"
              width={120}
              height={120}
            />

          </div>

          {coreValues.map((item) => (

            <div
              key={item.id}
              className={`${styles.valueCard} ${styles["item" + item.id]}`}
            >

              <div className={styles.icon}>
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}