/* ==========================================================
   Member Dashboard
   All India Labour Party
========================================================== */

import Sidebar from "@/components/member/Sidebar";
import Header from "@/components/member/Header";
import DashboardOverview from "@/components/member/DashboardOverview";

import styles from "./Dashboard.module.css";

export const metadata = {
  title: "Member Dashboard | All India Labour Party",
  description: "AILP Member Dashboard",
};

export default function MemberDashboardPage() {
  return (
    <div className={styles.container}>
      {/* ==========================================
          Sidebar
      ========================================== */}

      <aside className={styles.sidebar}>
        <Sidebar />
      </aside>

      {/* ==========================================
          Main Content
      ========================================== */}

      <main className={styles.main}>
        {/* Header */}

        <Header />

        {/* Dashboard Overview */}

        <DashboardOverview />
      </main>
    </div>
  );
}