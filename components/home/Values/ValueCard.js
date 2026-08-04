/*
==========================================================
ValueCard Component

Reusable card for the "What We Stand For" section.

This component receives:
1. icon
2. title
3. description

Later, this data can come from MongoDB.

==========================================================
*/

import styles from "./ValueCard.module.css";

export default function ValueCard({

    icon,

    title,

    description

}) {

    return (

        <article className={styles.card}>

            {/* Icon */}

            <div className={styles.icon}>

                {icon}

            </div>

            {/* Content */}

            <div className={styles.content}>

                <h3>

                    {title}

                </h3>

                <p>

                    {description}

                </p>

            </div>

        </article>

    );

}