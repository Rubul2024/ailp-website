import styles from "./loading.module.css";

export default function Loading() {

  return (

    <main className={styles.page}>

      <div className={styles.card}>

        <div className={styles.loader}></div>

        <h1 className={styles.title}>

          Loading...

        </h1>

        <p className={styles.subtitle}>

          Please wait while we securely load the

          administrator dashboard.

        </p>

        <div className={styles.progress}>

          <span></span>

        </div>

        <div className={styles.footer}>

          All India Labour Party Admin Panel

        </div>

      </div>

    </main>

  );

}