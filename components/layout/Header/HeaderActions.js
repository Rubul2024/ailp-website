import Link from "next/link";
import styles from "./Header.module.css";

export default function HeaderActions() {

    return (

        <div className={styles.actions}>

            <Link

                href="/join"

                className={styles.joinButton}

            >

                Join AILP

            </Link>

            <Link

                href="/donate"

                className={styles.donateButton}

            >

                Donate

            </Link>

        </div>

    );

}