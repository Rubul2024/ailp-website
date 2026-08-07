"use client";

import Link from "next/link";

import { AlertTriangle } from "lucide-react";

import styles from "./error.module.css";

export default function Error({

  error,

  reset,

}) {

  return (

    <main className={styles.page}>

      <div className={styles.card}>

        <div className={styles.icon}>

          <AlertTriangle size={50} />

        </div>

        <h1 className={styles.title}>

          Something Went Wrong

        </h1>

        <p className={styles.subtitle}>

          An unexpected error occurred while loading this page.

          Please try again.

        </p>

        {process.env.NODE_ENV === "development" && error?.message && (

          <div className={styles.errorBox}>

            <strong>Error:</strong>

            <br />

            {error.message}

          </div>

        )}

        <div className={styles.actions}>

          <button

            onClick={() => reset()}

            className={styles.retry}

          >

            Try Again

          </button>

          <Link

            href="/admin/dashboard"

            className={styles.home}

          >

            Dashboard

          </Link>

        </div>

        <div className={styles.footer}>

          © 2026 All India Labour Party

        </div>

      </div>

    </main>

  );

}