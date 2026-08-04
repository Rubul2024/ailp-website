// ====================================================
// MissionVision Component
// Displays Mission, Vision and Core Values
// ====================================================

import styles from "./MissionVision.module.css";

// Import icons
import {
    FaBullseye,
    FaEye,
    FaHandshake
} from "react-icons/fa";

const cards = [
    {
        icon: <FaBullseye />,
        title: "Our Mission",
        description:
            "Empower every worker through employment opportunities, social justice and equal rights."
    },
    {
        icon: <FaEye />,
        title: "Our Vision",
        description:
            "To build a progressive, inclusive and self-reliant India where every citizen can grow with dignity."
    },
    {
        icon: <FaHandshake />,
        title: "Core Values",
        description:
            "Integrity, transparency, equality, teamwork and dedication towards national development."
    }
];

export default function MissionVision() {

    return (

        <section className={styles.section}>

            <div className="container">

                {/* Section Heading */}

                <h2 className="section-title">
                    Our Foundation
                </h2>

                <p className="section-subtitle">
                    Everything we do is guided by our mission,
                    vision and core values.
                </p>

                {/* Cards */}

                <div className={styles.grid}>

                    {cards.map((card, index) => (

                        <article
                            key={index}
                            className={styles.card}
                        >

                            <div className={styles.icon}>

                                {card.icon}

                            </div>

                            <h3>

                                {card.title}

                            </h3>

                            <p>

                                {card.description}

                            </p>

                        </article>

                    ))}

                </div>

            </div>

        </section>

    );

}