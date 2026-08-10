"use client";

import Link from "next/link";
import Image from "next/image";

import styles from "./Header.module.css";

export default function Logo() {
  return (
    <Link
      href="/"
      className={styles.logo}
      aria-label="All India Labour Party Home"
    >
      <Image
        src="/images/logo.png"
        alt="All India Labour Party"
        width={170}
        height={60}
        priority
      />
    </Link>
  );
}