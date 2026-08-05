"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBullhorn, FaXmark } from "react-icons/fa6";

import announcements from "./announcements";
import styles from "./AnnouncementBar.module.css";

export default function AnnouncementBar() {

    const [visible, setVisible] = useState(true);

    if (!visible) return null;

    return (

        <section className={styles.bar}>

            <div className={styles.container}>

                <div className={styles.icon}>

                    <FaBullhorn />

                </div>

                <div className={styles.ticker}>

                    <div className={styles.track}>

                        {[...announcements, ...announcements].map((item, index) => (

                            <span
                                key={index}
                                className={styles.item}
                            >

                                {item}

                            </span>

                        ))}

                    </div>

                </div>

                <Link
                    href="/join"
                    className={styles.join}
                >

                    Join Now

                </Link>

                <button

                    className={styles.close}

                    onClick={() => setVisible(false)}

                    aria-label="Close announcement"

                >

                    <FaXmark />

                </button>

            </div>

        </section>

    );

}