// ======================================================
// Statistics Section
// Shows important achievements of AILP
// ======================================================

import styles from "./Statistics.module.css";

import {
  FaUsers,
  FaMapMarkedAlt,
  FaBullhorn,
  FaHandsHelping,
} from "react-icons/fa";

// Statistics data
const stats = [
  {
    icon: <FaUsers />,
    number: "10K+",
    title: "Active Members",
  },
  {
    icon: <FaMapMarkedAlt />,
    number: "20+",
    title: "States Covered",
  },
  {
    icon: <FaBullhorn />,
    number: "500+",
    title: "Campaigns",
  },
  {
    icon: <FaHandsHelping />,
    number: "100+",
    title: "Volunteers",
  },
];

export default function Statistics() {
  return (
    <section className={styles.statistics}>

      <div className="container">

        {/* Section Heading */}

        <h2 className="section-title">
          Our Impact Across India
        </h2>

        <p className="section-subtitle">
          Together we are building a stronger organization,
          empowering workers and creating positive change.
        </p>

        {/* Statistics Grid */}

        <div className={styles.grid}>

          {stats.map((item, index) => (

            <div
              key={index}
              className={styles.card}
            >

              {/* Icon */}

              <div className={styles.icon}>
                {item.icon}
              </div>

              {/* Number */}

              <h3>
                {item.number}
              </h3>

              {/* Title */}

              <p>
                {item.title}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}