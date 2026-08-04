/*
======================================================
Benefit Card

Reusable card for each benefit.

Later this data will come from MongoDB.

======================================================
*/

import styles from "./BenefitCard.module.css";

export default function BenefitCard({

    icon,

    title,

    description

}){

    return(

        <article className={styles.card}>

            {/* Icon */}

            <div className={styles.icon}>

                {icon}

            </div>

            {/* Text */}

            <div>

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