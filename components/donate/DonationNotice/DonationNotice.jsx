import {
  Info,
  ShieldAlert,
} from "lucide-react";

import styles from "./DonationNotice.module.css";

export default function DonationNotice() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.notice}>
          <div className={styles.icon}>
            <Info size={21} />
          </div>

          <div>
            <h3>Important Contribution Information</h3>

            <p>
              Contributions to a political party are subject
              to applicable laws, rules and eligibility
              requirements. Please provide accurate donor
              information when making a contribution.
            </p>
          </div>
        </div>

        <div className={styles.warning}>
          <ShieldAlert size={19} />

          <p>
            Please do not make a contribution on behalf of
            another person or entity unless permitted by
            applicable law. Foreign contributions are subject
            to separate legal requirements.
          </p>
        </div>
      </div>
    </section>
  );
}