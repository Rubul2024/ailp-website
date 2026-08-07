"use client";

import { useEffect, useState } from "react";

import { Users, IndianRupee, Mail, Bell, RefreshCw } from "lucide-react";

import styles from "./Dashboard.module.css";

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setLoading(true);

      setError("");

      const response = await fetch("/api/admin/dashboard", {
        credentials: "include",
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        return;
      }

      setDashboard(data);
    } catch (error) {
      setError("Unable to load dashboard.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  const cards = [
    {
      title: "Members",

      value: dashboard.statistics.totalMembers,

      icon: Users,

      color: styles.blue,
    },

    {
      title: "Donations",

      value: dashboard.statistics.totalDonations,

      icon: IndianRupee,

      color: styles.green,
    },

    {
      title: "Contacts",

      value: dashboard.statistics.totalContacts,

      icon: Mail,

      color: styles.orange,
    },

    {
      title: "Newsletter",

      value: dashboard.statistics.totalNewsletter,

      icon: Bell,

      color: styles.purple,
    },
  ];

  return (
    <div className={styles.dashboard}>
      {/* Top */}

      <div className={styles.topBar}>
        <div className={styles.title}>
          <h1>Dashboard</h1>

          <p>Welcome to All India Labour Party Admin Panel</p>
        </div>

        <button className={styles.refreshButton} onClick={loadDashboard}>
          <RefreshCw size={18} />
          Refresh
        </button>
      </div>

      {/* Cards */}

      <div className={styles.cardGrid}>
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div key={card.title} className={styles.card}>
              <div className={styles.cardLeft}>
                <p>{card.title}</p>

                <h2>{card.value}</h2>
              </div>

              <div className={`${styles.iconBox} ${card.color}`}>
                <Icon size={30} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Members */}

      <div className={styles.tableCard}>
        <div className={styles.tableTitle}>
          <h2>Recent Members</h2>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>

              <th>Email</th>

              <th>Membership ID</th>
            </tr>
          </thead>

          <tbody>
            {dashboard.recentMembers.length === 0 ? (
              <tr>
                <td colSpan="3">No Members Found</td>
              </tr>
            ) : (
              dashboard.recentMembers.map((member) => (
                <tr key={member._id}>
                  <td>{member.fullName}</td>

                  <td>{member.email}</td>

                  <td>{member.membershipId}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
