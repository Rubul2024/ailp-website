import Link from "next/link";

import {
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import styles from "./FAQCTA.module.css";

export default function FAQCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        <div className={styles.icon}>
          <MessageCircle size={27} />
        </div>

        <div className={styles.content}>
          <span>STILL NEED HELP?</span>

          <h2>
            Can't Find Your Answer?
          </h2>

          <p>
            If you have another question, our
            Contact page is the best place to
            send us your enquiry.
          </p>
        </div>

        <Link
          href="/contact"
          className={styles.button}
        >
          Contact Us

          <ArrowRight size={18} />
        </Link>

      </div>
    </section>
  );
}