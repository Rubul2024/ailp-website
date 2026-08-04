/*
==========================================================
News Card Component

Purpose:
Displays a single news article.

Later the data will come from MongoDB.

==========================================================
*/

import Image from "next/image";
import Link from "next/link";

import { FaCalendarAlt } from "react-icons/fa";

import styles from "./NewsCard.module.css";

export default function NewsCard({ article }) {

    return (

        <article className={styles.card}>

            {/* ===========================
                News Image
            =========================== */}

            <div className={styles.imageWrapper}>

                <Image
                    src={article.image}
                    alt={article.title}
                    width={600}
                    height={400}
                    className={styles.image}
                />

            </div>

            {/* ===========================
                Content
            =========================== */}

            <div className={styles.content}>

                <span className={styles.category}>

                    {article.category}

                </span>

                <h3>

                    {article.title}

                </h3>

                <div className={styles.meta}>

                    <FaCalendarAlt />

                    <span>{article.date}</span>

                </div>

                <p>

                    {article.description}

                </p>

                <Link
                    href="/news"
                    className={styles.button}
                >

                    Read More →

                </Link>

            </div>

        </article>

    );

}