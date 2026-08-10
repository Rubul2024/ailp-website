"use client";

/* ==========================================================
   Member Digital Membership Card
   All India Labour Party
   Production Ready
========================================================== */

import { useEffect, useState } from "react";


import MembershipCard from "@/components/member/MembershipCard";

import styles from "./CardPage.module.css";

export default function MemberCardPage() {

  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ==========================================================
     Load Member
  ========================================================== */

  useEffect(() => {
    loadMember();
  }, []);

  async function loadMember() {

    try {

      const response = await fetch(
        "/api/member/me",
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setMember(data.member);
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  }

  /* ==========================================================
     Loading
  ========================================================== */

  if (loading) {

    return (
      <main className={styles.loading}>
        Loading Membership Card...
      </main>
    );

  }

  /* ==========================================================
     Error
  ========================================================== */

  if (!member) {

    return (
      <main className={styles.loading}>
        Unable to load Membership Card.
      </main>
    );

  }

  /* ==========================================================
     Page
  ========================================================== */

  return (

    <main className={styles.page}>

     

      <section className={styles.hero}>

        <div>

          <h1>
            Digital Membership Card
          </h1>

          <p>

            View, download and print your official
            All India Labour Party Membership Card.

          </p>

        </div>

      </section>

      <MembershipCard
        member={member}
      />

    </main>

  );

}