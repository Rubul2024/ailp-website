/* ==========================================================
   Join Membership Page
   All India Labour Party
   Production Ready
========================================================== */

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  IdCard,
  ShieldCheck,
  Users,
} from "lucide-react";

import styles from "./JoinMembership.module.css";

export const metadata = {
  title: "Join Membership | All India Labour Party",
  description:
    "Join the All India Labour Party and become part of a movement working for employment, equality, workers' rights and social justice.",
};

export default function JoinMembershipPage() {
  const benefits = [
    {
      icon: Users,
      title: "Be Part of the Movement",
      description:
        "Become part of a growing community committed to employment, equality and social justice.",
    },
    {
      icon: BriefcaseBusiness,
      title: "Support Workers",
      description:
        "Stand with workers and support initiatives focused on dignity, opportunity and fair treatment.",
    },
    {
      icon: HeartHandshake,
      title: "Community Participation",
      description:
        "Take part in public and community activities that contribute to a stronger India.",
    },
    {
      icon: IdCard,
      title: "Digital Membership Card",
      description:
        "After successful registration, access your official digital AILP membership card through the member portal.",
    },
  ];

  const steps = [
    {
      number: "01",
      icon: FileCheck2,
      title: "Complete Registration",
      description:
        "Fill in your membership registration details accurately.",
    },
    {
      number: "02",
      icon: BadgeCheck,
      title: "Membership Created",
      description:
        "Your membership information is securely registered in the AILP system.",
    },
    {
      number: "03",
      icon: IdCard,
      title: "Access Your Card",
      description:
        "Log in to the Member Portal to complete your profile and access your digital membership card.",
    },
  ];

  return (
    <main className={styles.page}>
      {/* ==================================================
          HERO
      ================================================== */}

      <section className={styles.hero}>
        <div className={styles.heroGlowOne}></div>
        <div className={styles.heroGlowTwo}></div>

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <span className={styles.eyebrow}>
              <ShieldCheck size={17} />
              AILP MEMBERSHIP
            </span>

            <h1>
              Join the Movement.
              <span> Build a Stronger India.</span>
            </h1>

            <p>
              Become a member of the All India Labour Party and stand together
              for employment, workers&apos; rights, equality and social justice.
            </p>

            <div className={styles.heroActions}>
              <Link
                href="/member/register"
                className={styles.primaryButton}
              >
                Start Membership Registration
                <ArrowRight size={19} />
              </Link>

              <Link
                href="/about"
                className={styles.secondaryButton}
              >
                Learn About AILP
              </Link>
            </div>

            <div className={styles.trustRow}>
              <div>
                <CheckCircle2 size={18} />
                <span>Simple Registration</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Secure Information</span>
              </div>

              <div>
                <CheckCircle2 size={18} />
                <span>Digital Membership Card</span>
              </div>
            </div>
          </div>

          {/* Visual Card */}

          <div className={styles.heroVisual}>
            <div className={styles.visualGlow}></div>

            <div className={styles.membershipPreview}>
              <div className={styles.previewTop}>
                <div className={styles.previewLogo}>
                  AILP
                </div>

                <span>MEMBERSHIP</span>
              </div>

              <div className={styles.previewBody}>
                <div className={styles.avatarPlaceholder}>
                  <Users size={42} />
                </div>

                <div className={styles.previewInfo}>
                  <small>MEMBER</small>
                  <strong>YOUR NAME</strong>

                  <small>MEMBERSHIP ID</small>
                  <b>AILPXXXXXXXX</b>
                </div>
              </div>

              <div className={styles.previewBottom}>
                <span>ALL INDIA LABOUR PARTY</span>

                <BadgeCheck size={22} />
              </div>
            </div>

            <div className={styles.floatingBadge}>
              <ShieldCheck size={19} />

              <div>
                <strong>Secure Membership</strong>
                <span>Your information is protected</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================
          INTRO
      ================================================== */}

      <section className={styles.intro}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeading}>
            <span>WHY JOIN AILP?</span>

            <h2>
              Your participation can help
              <strong> shape a better future.</strong>
            </h2>

            <p>
              Membership is an opportunity to stand together with people who
              believe in employment, equality, dignity and social justice.
            </p>
          </div>

          <div className={styles.benefitsGrid}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <article
                  className={styles.benefitCard}
                  key={benefit.title}
                >
                  <div className={styles.benefitIcon}>
                    <Icon size={25} />
                  </div>

                  <h3>{benefit.title}</h3>

                  <p>{benefit.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          HOW IT WORKS
      ================================================== */}

      <section className={styles.process}>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionHeading}>
            <span>HOW IT WORKS</span>

            <h2>
              Become a member in
              <strong> three simple steps.</strong>
            </h2>

            <p>
              Our membership journey is designed to be straightforward and
              convenient.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <article
                  className={styles.stepCard}
                  key={step.number}
                >
                  <div className={styles.stepNumber}>
                    {step.number}
                  </div>

                  <div className={styles.stepIcon}>
                    <Icon size={25} />
                  </div>

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================================================
          MEMBERSHIP INFORMATION
      ================================================== */}

      <section className={styles.infoSection}>
        <div className={styles.infoContainer}>
          <div className={styles.infoIcon}>
            <ShieldCheck size={30} />
          </div>

          <div className={styles.infoContent}>
            <span>BEFORE YOU REGISTER</span>

            <h2>Keep your information ready</h2>

            <p>
              Please provide accurate information during registration. Your
              membership information will be used to maintain your official
              member profile.
            </p>
          </div>

          <Link
            href="/member/register"
            className={styles.infoButton}
          >
            Continue to Registration
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ==================================================
          FINAL CTA
      ================================================== */}

      <section className={styles.cta}>
        <div className={styles.ctaGlow}></div>

        <div className={styles.ctaContent}>
          <span>READY TO JOIN?</span>

          <h2>
            Stand together for a
            <br />
            stronger and more inclusive India.
          </h2>

          <p>
            Start your AILP membership registration today.
          </p>

          <Link
            href="/member/register"
            className={styles.ctaButton}
          >
            Join AILP Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}