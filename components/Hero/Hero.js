import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        
        {/* Left Side */}
        <div className={styles.heroContent}>

          <span className={styles.badge}>
            🇮🇳 All India Labour Party
          </span>

          <h1 className={`${styles.title} fade-in`}>
            Building a Stronger Future
            <span> for Every Worker</span>
          </h1>

          <p className={`${styles.description} zoom-in`}>
            Together we work towards employment, equality,
            social justice and a stronger India for every citizen.
          </p>

          <div className={styles.buttons}>

            <a href="/join" className={styles.primaryButton}>
              Join Party
            </a>

            <a href="/about" className={styles.secondaryButton}>
              Learn More
            </a>

          </div>

          <div className={styles.stats}>

            <div>
              <h3>10K+</h3>
              <p>Members</p>
            </div>

            <div>
              <h3>20+</h3>
              <p>States</p>
            </div>

            <div>
              <h3>50+</h3>
              <p>Districts</p>
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className={styles.heroImage}>

          <Image
            src="/images/hero-image.jpg"
            alt="AILP Hero"
            width={600}
            height={600}
            priority
          />

        </div>

      </div>
    </section>
  );
}