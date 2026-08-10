"use client";

/* ==========================================================
   AILP PUBLIC WEBSITE
   FOOTER

   All India Labour Party
   Modern / Professional / Responsive
========================================================== */

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUp,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
  Clock3,
} from "lucide-react";

import styles from "./Footer.module.css";

import {
  quickLinks,
  resources,
  contact,
} from "./footerData";

import SocialLinks from "./SocialLinks";


/* ==========================================================
   COMPONENT
========================================================== */

export default function Footer() {

  /* ========================================================
     Back To Top
  ======================================================== */

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }


  return (
    <footer className={styles.footer}>

      {/* ====================================================
          Decorative Top Accent
      ==================================================== */}

      <div
        className={styles.topAccent}
        aria-hidden="true"
      />


      {/* ====================================================
          Main Footer
      ==================================================== */}

      <div className={styles.container}>

        {/* ==================================================
            Brand Column
        ================================================== */}

        <div className={styles.brandColumn}>

          <Link
            href="/"
            className={styles.logo}
            aria-label="All India Labour Party Home"
          >
            <Image
              src="/images/logo.png"
              alt="All India Labour Party"
              width={180}
              height={64}
              priority
            />
          </Link>


          <p className={styles.description}>
            Working for workers, employment,
            equality and social justice.
            Together we are building a stronger,
            fairer and more inclusive India.
          </p>


          {/* ==================================================
              Social Links
          ================================================== */}

         

        </div>


        {/* ==================================================
            Quick Links
        ================================================== */}

        <div className={styles.column}>

          <h3>
            Quick Links
          </h3>

          <div className={styles.headingLine} />

          <ul>

            {quickLinks.map((item) => (
              <li key={item.title}>

                <Link href={item.href}>
                  {item.title}
                </Link>

              </li>
            ))}

          </ul>

        </div>


        {/* ==================================================
            Resources
        ================================================== */}

        <div className={styles.column}>

          <h3>
            Resources
          </h3>

          <div className={styles.headingLine} />

          <ul>

            {resources.map((item) => (
              <li key={item.title}>

                <Link href={item.href}>
                  {item.title}
                </Link>

              </li>
            ))}

          </ul>


          {/* ==================================================
              Donate
          ================================================== */}

          <Link
            href="/donate"
            className={styles.donateButton}
          >
            <HeartHandshake
              size={17}
              aria-hidden="true"
            />

            <span>
              Donate Now
            </span>
          </Link>

        </div>


        {/* ==================================================
            Contact
        ================================================== */}

        <div className={styles.column}>

          <h3>
            Contact Us
          </h3>

          <div className={styles.headingLine} />


          <ul className={styles.contactList}>

            {/* Address */}

            <li>

              <span className={styles.contactIcon}>
                <MapPin
                  size={17}
                  aria-hidden="true"
                />
              </span>

              <span>
                {contact?.address ||
                  "Your Office Address"}
              </span>

            </li>


            {/* Phone */}

            <li>

              <span className={styles.contactIcon}>
                <Phone
                  size={17}
                  aria-hidden="true"
                />
              </span>

              <a href="tel:+911234567890">
                {contact?.phone ||
                  "+91 12345 67890"}
              </a>

            </li>


            {/* Email */}

            <li>

              <span className={styles.contactIcon}>
                <Mail
                  size={17}
                  aria-hidden="true"
                />
              </span>

              <a href="mailto:info@ailp.org">
                {contact?.email ||
                  "info@ailp.org"}
              </a>

            </li>


            {/* Office Hours */}

            <li>

              <span className={styles.contactIcon}>
                <Clock3
                  size={17}
                  aria-hidden="true"
                />
              </span>

              <span>
                Mon - Sat
                <br />
                9:00 AM – 6:00 PM
              </span>

            </li>

          </ul>

        </div>

      </div>


      {/* ====================================================
          Social Section
      ==================================================== */}

      <div className={styles.socialSection}>

        <div className={styles.socialInner}>

          <div>
            <strong>
              Connect With AILP
            </strong>

            <span>
              Follow our journey and stay connected.
            </span>
          </div>

          <SocialLinks />

        </div>

      </div>


      {/* ====================================================
          Bottom Footer
      ==================================================== */}

      <div className={styles.bottom}>

        <div className={styles.bottomInner}>

          <p>
            © {new Date().getFullYear()}{" "}
            All India Labour Party.
            All Rights Reserved.
          </p>


          <div className={styles.bottomLinks}>

            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>

            <Link href="/disclaimer">
              Disclaimer
            </Link>

            <Link href="/sitemap">
              Sitemap
            </Link>

          </div>

        </div>

      </div>


      {/* ====================================================
          Back To Top
      ==================================================== */}

      <button
        type="button"
        className={styles.scrollTop}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        <ArrowUp
          size={19}
          aria-hidden="true"
        />
      </button>

    </footer>
  );
}