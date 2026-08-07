"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import styles from "./not-found.module.css";

export default function NotFound() {

  const router = useRouter();

  return (

    <main className={styles.page}>

      <div className={styles.card}>

        <div className={styles.code}>

          404

        </div>

        <h1 className={styles.title}>

          Page Not Found

        </h1>

        <p className={styles.subtitle}>

          Sorry, the page you're looking for doesn't exist or may have been moved.

          Please return to the dashboard or go back to the previous page.

        </p>

        <div className={styles.actions}>

          <Link
            href="/admin/dashboard"
            className={styles.primary}
          >
            Dashboard
          </Link>

          <button
            className={styles.secondary}
            onClick={() => router.back()}
          >
            Go Back
          </button>

        </div>

        <div className={styles.footer}>

          © 2026 All India Labour Party Admin Panel

        </div>

      </div>

    </main>

  );

}