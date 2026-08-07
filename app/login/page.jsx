import LoginForm from "@/components/auth/LoginForm";

import styles from "./Login.module.css";

import {

  ShieldCheck,

  Users,

  BadgeCheck,

  HeartHandshake,

} from "lucide-react";

export const metadata = {

  title: "Member Login | All India Labour Party",

};

export default function LoginPage() {

  return (

    <main className={styles.page}>

      <div className={styles.container}>

        {/* =====================================
            Left Branding
        ====================================== */}

        <section className={styles.left}>

          <div className={styles.overlay}></div>

          <div className={styles.content}>

            <div className={styles.logo}>

              AIL<span>P</span>

            </div>

            <h1>

              Welcome Back

            </h1>

            <p>

              Sign in to access your member dashboard,

              complete your membership profile,

              download your Membership ID Card,

              and support the movement.

            </p>

            <div className={styles.features}>

              <div className={styles.feature}>

                <ShieldCheck size={22} />

                Secure Member Login

              </div>

              <div className={styles.feature}>

                <BadgeCheck size={22} />

                Digital Membership Card

              </div>

              <div className={styles.feature}>

                <Users size={22} />

                Member Dashboard

              </div>

              <div className={styles.feature}>

                <HeartHandshake size={22} />

                Donate & Support AILP

              </div>

            </div>

          </div>

        </section>

        {/* =====================================
            Right Login Form
        ====================================== */}

        <section className={styles.right}>

          <LoginForm />

        </section>

      </div>

    </main>

  );

}