// ======================================================
// Section Decoration
// Decorative blurred background elements
// ======================================================

import styles from "./SectionDecoration.module.css";

export default function SectionDecoration() {
    return (

        <>

            {/* Top Left Glow */}

            <div className={styles.glowOne}></div>

            {/* Bottom Right Glow */}

            <div className={styles.glowTwo}></div>

        </>

    );
}