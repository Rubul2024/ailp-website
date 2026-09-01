"use client";

import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  HeartHandshake,
  ArrowUp,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaXTwitter,
} from "react-icons/fa6";
import styles from "./Footer.module.css";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={styles.footer}>
      {/* Indian Tricolor Top Ribbon Line */}
      <div className={styles.tricolorRibbon} />

      <div className={styles.container}>
        {/* Main Footer 4-Column Grid */}
        <div className={styles.footerGrid}>
          
          {/* Column 1: Brand, Big Logo & Mission */}
          <div className={styles.brandCol}>
            <Link href="/" className={styles.logoLink} aria-label="AILP Home">
              <div className={styles.logoBadge}>
                <Image
                  src="/images/ailp-symbol-logo.svg"
                  alt="All India Labour Party Election Symbol"
                  width={64}
                  height={64}
                  priority
                  className={styles.logoSvg}
                />
              </div>

              <div className={styles.brandTitleWrap}>
                <div className={styles.brandTopRow}>
                  <span className={styles.brandMain}>ALL INDIA</span>
                  <span className={styles.tagAilp}>AILP</span>
                </div>
                <span className={styles.brandSub}>LABOUR PARTY</span>
              </div>
            </Link>

            <p className={styles.brandDesc}>
              Working for workers, employment, equality and social justice.
              Together we are building a stronger, fairer and more inclusive
              India.
            </p>
          </div>

          {/* Column 2: Quick Links (Single Dot Icon) */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>About</span>
                </Link>
              </li>
              <li>
                <Link href="/leadership" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>Leadership</span>
                </Link>
              </li>
              <li>
                <Link href="/news" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>News</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>Gallery</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources & Donate */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Resources</h4>
            <ul className={styles.linkList}>
              <li>
                <Link href="/join-membership" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>Join Membership</span>
                </Link>
              </li>
              <li>
                <Link href="/mission" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>Our Mission</span>
                </Link>
              </li>
              <li>
                <Link href="/vision" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>Our Vision</span>
                </Link>
              </li>
              <li>
                <Link href="/news" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>Latest News</span>
                </Link>
              </li>
              <li>
                <Link href="/faq" className={styles.pageLink}>
                  <span className={styles.linkDot} />
                  <span>FAQ</span>
                </Link>
              </li>
            </ul>

            <div className={styles.donateWrap}>
              <Link href="/donate" className={styles.donateBtn}>
                <HeartHandshake size={16} />
                <span>Donate Now</span>
              </Link>
            </div>
          </div>

          {/* Column 4: Official Contact Information */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li>
                <div className={styles.contactIcon}>
                  <MapPin size={16} />
                </div>
                <span>
                  UTTAR KUMROKHALI, Narendrapur, South 24 Parganas, Kolkata 700103
                </span>
              </li>
              <li>
                <div className={styles.contactIcon}>
                  <Phone size={16} />
                </div>
                <div className={styles.phoneStack}>
                  <a href="tel:+917896043734">+91 7896043734</a>
                  <a href="tel:+917003433713">+91 7003433713</a>
                </div>
              </li>
              <li>
                <div className={styles.contactIcon}>
                  <Mail size={16} />
                </div>
                <a
                  href="mailto:allindialabourpartyailp@gmail.com"
                  className={styles.contactEmail}
                >
                  allindialabourpartyailp@gmail.com
                </a>
              </li>
              <li>
                <div className={styles.contactIcon}>
                  <Clock size={16} />
                </div>
                <span>Mon – Sat: 9:00 AM – 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Bar */}
        <div className={styles.socialBar}>
          <div>
            <h5 className={styles.socialTitle}>Connect With AILP</h5>
            <p className={styles.socialSubtitle}>
              Follow our official channels and stay updated on national campaigns.
            </p>
          </div>

          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook" className={styles.socialIconBtn}>
              <FaFacebookF size={14} />
            </a>
            <a href="#" aria-label="Instagram" className={styles.socialIconBtn}>
              <FaInstagram size={14} />
            </a>
            <a href="#" aria-label="X" className={styles.socialIconBtn}>
              <FaXTwitter size={14} />
            </a>
            <a href="#" aria-label="YouTube" className={styles.socialIconBtn}>
              <FaYoutube size={14} />
            </a>
            <a href="#" aria-label="LinkedIn" className={styles.socialIconBtn}>
              <FaLinkedinIn size={14} />
            </a>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copyrightText}>
            © {new Date().getFullYear()} All India Labour Party. All Rights Reserved.
          </p>

          <div className={styles.legalLinks}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/sitemap.xml">Sitemap</Link>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      <button
        type="button"
        className={styles.scrollTopBtn}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}