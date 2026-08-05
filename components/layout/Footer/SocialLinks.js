"use client";

import Link from "next/link";
import styles from "./Footer.module.css";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { FaXTwitter } from "react-icons/fa6";

export default function SocialLinks() {
  return (
    <div className={styles.socialIcons}>
      <Link
        href="https://facebook.com"
        target="_blank"
        aria-label="Facebook"
      >
        <FaFacebookF />
      </Link>

      <Link
        href="https://instagram.com"
        target="_blank"
        aria-label="Instagram"
      >
        <FaInstagram />
      </Link>

      <Link
        href="https://x.com"
        target="_blank"
        aria-label="X"
      >
        <FaXTwitter />
      </Link>

      <Link
        href="https://youtube.com"
        target="_blank"
        aria-label="YouTube"
      >
        <FaYoutube />
      </Link>

      <Link
        href="https://linkedin.com"
        target="_blank"
        aria-label="LinkedIn"
      >
        <FaLinkedinIn />
      </Link>
    </div>
  );
}