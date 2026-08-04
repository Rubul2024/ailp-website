import Image from "next/image";
import styles from "./About.module.css";

const points = [
  "Employment Opportunities",
  "Workers' Rights",
  "Social Justice",
  "National Development",
];

export default function About() {
  return (
    <section className={styles.about}>

      <div className={`container ${styles.container}`}>

        <div className={styles.imageSection}>

          <Image
            src="/images/about.jpg"
            alt="About AILP"
            width={600}
            height={650}
          />

        </div>

        <div className={styles.content}>

          <span className={styles.tag}>
            ABOUT AILP
          </span>

          <h2>
            Together We Build a Better Future
          </h2>

          <p>
            All India Labour Party is committed to empowering
            workers, creating employment opportunities,
            protecting labour rights and strengthening India's
            future through equality, development and social justice.
          </p>

          <div className={styles.list}>

            {points.map((item) => (

              <div
                key={item}
                className={styles.item}
              >

                <span>✓</span>

                <p>{item}</p>

              </div>

            ))}

          </div>

          <a
            href="/about"
            className={styles.button}
          >
            Learn More
          </a>

        </div>

      </div>

    </section>
  );
}