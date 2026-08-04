// ==========================================
// Reusable Button
// ==========================================

import Link from "next/link";

import styles from "./Button.module.css";

export default function Button({

    text,

    href,

    primary = true

}){

    return(

        <Link

            href={href}

            className={
                primary
                ? styles.primary
                : styles.secondary
            }

        >

            {text}

        </Link>

    );

}
