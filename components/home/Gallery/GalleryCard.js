/*
==========================================================
Gallery Card Component

Purpose:
Displays one gallery image.

Future:
The image, title, and category will come from MongoDB.

==========================================================
*/

import Image from "next/image";
import styles from "./GalleryCard.module.css";

export default function GalleryCard({ item }) {

    return (

        <article className={styles.card}>

            {/* Image Wrapper */}

            <div className={styles.imageWrapper}>

                <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={450}
                    className={styles.image}
                />

                {/* Overlay */}

                <div className={styles.overlay}>

                    <span className={styles.category}>
                        {item.category}
                    </span>

                    <h3>{item.title}</h3>

                </div>

            </div>

        </article>

    );

}