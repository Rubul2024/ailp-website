import Link from "next/link";
import { KeyRound, ArrowLeft } from "lucide-react";

import styles from "./ForgotPassword.module.css";

export const metadata = {
  title: "Forgot Password | All India Labour Party",
  description: "Password recovery for All India Labour Party members.",
};

export default function ForgotPasswordPage() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.icon}>
          <KeyRound size={26} aria-hidden="true" />
        </div>
        <h1 className={styles.title}>Forgot Password</h1>
        <p className={styles.description}>
          Password recovery is coming soon. In the meantime, please contact your GP/Block coordinator or
          the party office for help regaining access to your account.
        </p>
        <Link href="/member/login" className={styles.backLink}>
          <ArrowLeft size={16} aria-hidden="true" />
          <span>Back to Member Login</span>
        </Link>
      </div>
    </div>
  );
}
