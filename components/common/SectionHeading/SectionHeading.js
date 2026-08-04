// ======================================================
// Reusable Section Heading Component
// ======================================================

import styles from "./SectionHeading.module.css";

export default function SectionHeading({
    badge,
    title,
    subtitle,
    center = true
}) {

    return (

        <div
            className={
                center
                    ? styles.center
                    : styles.left
            }
        >

            {/* Badge */}

            {badge && (

                <span className={styles.badge}>

                    {badge}

                </span>

            )}

            {/* Title */}

            <h2 className={styles.title}>

                {title}

            </h2>

            {/* Subtitle */}

            <p className={styles.subtitle}>

                {subtitle}

            </p>

        </div>

    );

}