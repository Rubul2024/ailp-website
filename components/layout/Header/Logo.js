"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./Header.module.css";

export default function Logo() {
  return (
    <Link href="/" className={styles.logoLink} aria-label="All India Labour Party Home">
      {/* Symbol Emblem with Glow Ring */}
      <div className={styles.logoBadge}>
        <Image
          src="/images/ailp-symbol-logo.svg"
          alt="AILP Election Symbol"
          width={52}
          height={52}
          priority
          className={styles.logoSvg}
        />
      </div>

      {/* Official Party Typography */}
      <div className={styles.brandTitleWrap}>
        <div className={styles.brandTopRow}>
          <span className={styles.brandMain}>ALL INDIA</span>
          <span className={styles.tagAilp}>AILP</span>
        </div>
        <span className={styles.brandSub}>LABOUR PARTY</span>
      </div>
    </Link>
  );
}