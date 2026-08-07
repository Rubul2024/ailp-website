import RegisterForm from "@/components/auth/RegisterForm";

import styles from "./Register.module.css";

import {

  ShieldCheck,

  Users,

  BadgeCheck,

  HeartHandshake,

} from "lucide-react";

export const metadata = {

  title: "Register | All India Labour Party",

};

export default function RegisterPage() {

  return (

    <main className={styles.page}>

      <div className={styles.container}>

        {/* =========================
            Left Section
        ========================== */}

        <section className={styles.left}>

          <div className={styles.overlay}></div>

          <div className={styles.content}>

            <div className={styles.logo}>

              AIL<span>P</span>

            </div>

            <h1>

              Join the

              <br />

              All India Labour Party

            </h1>

            <p>

              Become a registered member of

              All India Labour Party and

              participate in building a stronger,

              fairer and more inclusive India.

            </p>

            <div className={styles.features}>

              <div className={styles.feature}>

                <ShieldCheck size={22} />

                <span>

                  Secure Member Registration

                </span>

              </div>

              <div className={styles.feature}>

                <BadgeCheck size={22} />

                <span>

                  Digital Membership Card

                </span>

              </div>

              <div className={styles.feature}>

                <Users size={22} />

                <span>

                  Member Dashboard Access

                </span>

              </div>

              <div className={styles.feature}>

                <HeartHandshake size={22} />

                <span>

                  Support Labour Rights

                </span>

              </div>

            </div>

          </div>

        </section>

        {/* =========================
            Right Section
        ========================== */}

        <section className={styles.right}>

          <RegisterForm />

        </section>

      </div>

    </main>

  );

}