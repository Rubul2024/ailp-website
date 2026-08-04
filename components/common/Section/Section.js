/*
==========================================================
Reusable Section Wrapper

Every section should use this.

Benefits

✔ Equal spacing

✔ Equal alignment

✔ Clean Code

==========================================================
*/

import styles from "./Section.module.css";

export default function Section({

    children,

    light=false

}){

    return(

        <section
            className={
                light
                ? styles.light
                : styles.section
            }
        >

            {children}

        </section>

    );

}