import LoginForm from "@/components/auth/LoginForm";
import styles from "./Login.module.css";

import {
  ShieldCheck,
  BadgeCheck,
  Users,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Member Login | All India Labour Party",
  description:
    "Sign in to your All India Labour Party member account.",
};

export default function MemberLoginPage() {
  return (
    <main className={styles.page}>

      {/* ==========================================
          Background Effects
      ========================================== */}

      <div className={styles.backgroundGlowOne}></div>
      <div className={styles.backgroundGlowTwo}></div>
      <div className={styles.gridPattern}></div>

      {/* ==========================================
          Main Container
      ========================================== */}

      <div className={styles.container}>

        {/* ==========================================
            LEFT BRANDING
        ========================================== */}

        <section className={styles.brandSection}>

          <div className={styles.brandContent}>

            {/* Logo */}

            <div className={styles.logoWrapper}>
              <img
                src="/images/logo.png"
                alt="All India Labour Party"
                className={styles.logo}
              />
            </div>

            {/* Portal Badge */}

            <div className={styles.badge}>
              <span></span>
              AILP MEMBER PORTAL
            </div>

            {/* Heading */}

            <h1>
              Welcome
              <span> Back.</span>
            </h1>

            <p className={styles.brandDescription}>
              Access your member dashboard, manage your membership,
              download your digital ID card and stay connected with
              the All India Labour Party.
            </p>

            {/* Features */}

            <div className={styles.features}>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <ShieldCheck />
                </div>

                <div>
                  <h3>Secure Member Login</h3>
                  <p>
                    Your account is protected with secure authentication.
                  </p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <BadgeCheck />
                </div>

                <div>
                  <h3>Digital Membership Card</h3>
                  <p>
                    Access and download your membership ID card.
                  </p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <Users />
                </div>

                <div>
                  <h3>Member Dashboard</h3>
                  <p>
                    Manage your profile and membership information.
                  </p>
                </div>
              </div>

              <div className={styles.feature}>
                <div className={styles.featureIcon}>
                  <HeartHandshake />
                </div>

                <div>
                  <h3>Support the Movement</h3>
                  <p>
                    Stay connected and support AILP initiatives.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Message */}

            <div className={styles.brandFooter}>
              <span>
                Together for Employment, Equality & Social Justice.
              </span>

              <ArrowRight />
            </div>

          </div>

        </section>

        {/* ==========================================
            RIGHT LOGIN
        ========================================== */}

        <section className={styles.loginSection}>

          <div className={styles.loginHeader}>

            <div className={styles.loginBadge}>
              MEMBER LOGIN
            </div>

            <h2>
              Sign in to your{" "}
              <span>AILP account</span>
            </h2>

            <p>
              Enter your registered email address and password
              to continue.
            </p>

          </div>

          {/* Existing Functional Login Form */}

          <div className={styles.formWrapper}>
            <LoginForm />
          </div>

          {/* Security */}

          <div className={styles.securityNotice}>
            <ShieldCheck />

            <span>
              Your login information is securely protected.
            </span>
          </div>

        </section>

      </div>

    </main>
  );
}