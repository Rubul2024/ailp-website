import styles from "./Features.module.css";

const features = [
  {
    icon: "💼",
    title: "Employment",
    description:
      "Creating employment opportunities and supporting every worker with dignity.",
  },
  {
    icon: "👥",
    title: "Unity",
    description:
      "Building a strong and united workforce across every state of India.",
  },
  {
    icon: "🎓",
    title: "Skill Development",
    description:
      "Helping youth and workers improve their skills for a better future.",
  },
  {
    icon: "⚖️",
    title: "Social Justice",
    description:
      "Ensuring equal rights, equal opportunities and social justice for everyone.",
  },
  {
    icon: "❤️",
    title: "Worker Welfare",
    description:
      "Providing support, security and welfare programs for workers and their families.",
  },
  {
    icon: "🇮🇳",
    title: "Nation Building",
    description:
      "Working together to build a stronger, self-reliant and prosperous India.",
  },
];

export default function Features() {
  return (
    <section className={styles.featuresSection}>

      <div className="container">

        <h2 className="section-title">
          Why Join All India Labour Party?
        </h2>

        <p className="section-subtitle">
          Together we work for employment, equality,
          social justice and national development.
        </p>

        <div className={styles.grid}>

          {features.map((feature, index) => (

            <article
              key={index}
              className={`${styles.card} fade-in`}
            >

              <div className={styles.icon}>
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </article>

          ))}

        </div>

      </div>

    </section>
  );
}