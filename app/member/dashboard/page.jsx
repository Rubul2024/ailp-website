"use client";

import styles from "./Dashboard.module.css";

import {
  UserCheck,
  CreditCard,
  IndianRupee,
  BadgeCheck,
  ArrowRight,
  User,
} from "lucide-react";

export default function MemberDashboard() {

  const member = {

    fullName: "Welcome Member",

    membershipStatus: "REGISTERED",

    profileCompleted: false,

    membershipId: "Not Generated",

    totalDonation: 0,

  };

  return (

    <div className={styles.dashboard}>

      {/* Hero */}

      <section className={styles.hero}>

        <div>

          <h1>

            Welcome,

            <span>

              {member.fullName}

            </span>

          </h1>

          <p>

            Complete your profile to generate your
            Digital Membership Card.

          </p>

        </div>

        <button className={styles.completeButton}>

          Complete Profile

          <ArrowRight size={18} />

        </button>

      </section>

      {/* Statistics */}

      <section className={styles.statistics}>

        <div className={styles.card}>

          <div className={styles.iconBlue}>

            <UserCheck size={26} />

          </div>

          <div>

            <h3>

              Profile

            </h3>

            <p>

              {

                member.profileCompleted

                ? "Completed"

                : "Pending"

              }

            </p>

          </div>

        </div>

        <div className={styles.card}>

          <div className={styles.iconGreen}>

            <BadgeCheck size={26} />

          </div>

          <div>

            <h3>

              Status

            </h3>

            <p>

              {member.membershipStatus}

            </p>

          </div>

        </div>

        <div className={styles.card}>

          <div className={styles.iconOrange}>

            <CreditCard size={26} />

          </div>

          <div>

            <h3>

              Membership ID

            </h3>

            <p>

              {member.membershipId}

            </p>

          </div>

        </div>

        <div className={styles.card}>

          <div className={styles.iconPurple}>

            <IndianRupee size={26} />

          </div>

          <div>

            <h3>

              Donation

            </h3>

            <p>

              ₹{member.totalDonation}

            </p>

          </div>

        </div>

      </section>

      {/* Two Column */}

      <section className={styles.grid}>

        {/* Membership Card */}

        <div className={styles.membershipCard}>

          <h2>

            Digital Membership Card

          </h2>

          <div className={styles.cardPreview}>

            <User

              size={70}

            />

            <h3>

              Membership Card

            </h3>

            <p>

              Complete your profile to
              generate your Digital Card.

            </p>

          </div>

          <button>

            Generate Membership Card

          </button>

        </div>

        {/* Quick Actions */}

        <div className={styles.actions}>

          <h2>

            Quick Actions

          </h2>

          <button>

            Complete Profile

          </button>

          <button>

            Download Membership Card

          </button>

          <button>

            Donate Now

          </button>

          <button>

            View Donation History

          </button>

        </div>

      </section>

    </div>

  );

}