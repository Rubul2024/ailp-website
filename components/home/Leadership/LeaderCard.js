/*
====================================================
Leader Card Component

Reusable Card

Future Ready

Later data will come from MongoDB.
====================================================
*/

import Image from "next/image";
import Link from "next/link";

import {
    FaFacebookF,
    FaInstagram,
    FaXTwitter,
    FaLinkedinIn
} from "react-icons/fa6";

import styles from "./LeaderCard.module.css";

export default function LeaderCard({

    leader

}){

    return(

        <article className={styles.card}>

            {/* Image */}

            <div className={styles.imageWrapper}>

                <Image
                    src={leader.image}
                    alt={leader.name}
                    width={400}
                    height={450}
                    className={styles.image}
                />

            </div>

            {/* Content */}

            <div className={styles.content}>

                <h3>

                    {leader.name}

                </h3>

                <span>

                    {leader.designation}

                </span>

                <p>

                    {leader.description}

                </p>

                {/* Social */}

                <div className={styles.social}>

                    <a href="#">

                        <FaFacebookF/>

                    </a>

                    <a href="#">

                        <FaInstagram/>

                    </a>

                    <a href="#">

                        <FaXTwitter/>

                    </a>

                    <a href="#">

                        <FaLinkedinIn/>

                    </a>

                </div>

                <Link
                    href="/leadership"
                    className={styles.button}
                >

                    View Profile

                </Link>

            </div>

        </article>

    );

}

