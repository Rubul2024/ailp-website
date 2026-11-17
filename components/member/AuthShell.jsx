/* ==========================================================
   Member Auth Shell
   Shared layout for the member login and registration pages:
   branded panel (desktop: left half, phone: compact header)
   + form panel.
========================================================== */

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import styles from "./MemberAuth.module.css";

const SUPPORT_EMAIL = "allindialabourpartyailp@gmail.com";

/**
 * @param {object} props
 * @param {string} props.kicker      small pill above the brand title
 * @param {string} props.brandTitle  headline on the brand panel
 * @param {{icon: any, title: string, text: string}[]} props.items
 * @param {boolean} [props.numbered] show items as numbered steps
 * @param {string} props.title       form heading (the page h1)
 * @param {string} props.subtitle
 * @param {React.ReactNode} props.children
 * @param {boolean} [props.wide]     wider form column (for longer forms)
 */
export default function AuthShell({ kicker, brandTitle, items, numbered = false, title, subtitle, children, wide = false }) {
  const year = new Date().getFullYear();

  return (
    <div className={styles.page}>
      {/* ---------- Brand panel ---------- */}
      <aside className={styles.brand}>
        <Image
          src="/images/hero/hero.jpg"
          alt=""
          fill
          priority
          sizes="(max-width: 960px) 100vw, 46vw"
          className={styles.brandImage}
        />
        <div className={styles.brandShade} aria-hidden="true" />

        <div className={styles.brandInner}>
          <Link href="/" className={styles.brandLogo}>
            <span className={styles.logoDisc}>
              <img src="/images/ailp-symbol-logo.svg" alt="" width={44} height={44} />
            </span>
            <span className={styles.logoText}>
              <strong>All India Labour Party</strong>
              <small>Member Portal</small>
            </span>
          </Link>

          <div className={styles.brandBody}>
            <span className={styles.kicker}>
              <span className={styles.dot} aria-hidden="true" /> {kicker}
            </span>
            <p className={styles.brandTitle}>{brandTitle}</p>

            <ul className={styles.highlights}>
              {items.map(({ icon: Icon, title: itemTitle, text }, i) => (
                <li key={itemTitle}>
                  <span className={`${styles.hlIcon} ${numbered ? styles.hlStep : ""}`}>
                    {numbered ? i + 1 : <Icon size={18} aria-hidden="true" />}
                  </span>
                  <span>
                    <strong>{itemTitle}</strong>
                    <small>{text}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className={styles.brandFoot}>Regd. No. 56/119/2018-18/PPS-I</p>
        </div>
        <span className={styles.tricolor} aria-hidden="true" />
      </aside>

      {/* ---------- Form panel ---------- */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <Link href="/" className={styles.backLink}>
            <ArrowLeft size={16} aria-hidden="true" /> Back to website
          </Link>
        </div>

        <div className={`${styles.panel} ${wide ? styles.panelWide : ""}`}>
          <div className={styles.head}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>

          {children}
        </div>

        <footer className={styles.footer}>
          <span>© {year} All India Labour Party</span>
          <span className={styles.footSep} aria-hidden="true">
            ·
          </span>
          <span>
            Need help? <a href={`mailto:${SUPPORT_EMAIL}`}>Contact support</a>
          </span>
        </footer>
      </main>
    </div>
  );
}
