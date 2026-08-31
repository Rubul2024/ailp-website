"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Users,
  IndianRupee,
  Mail,
  Activity,
  RefreshCw,
  ArrowUpRight,
  CreditCard,
  Send,
  AlertCircle,
} from "lucide-react";
import styles from "./Dashboard.module.css";

export default function AdminDashboardPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/dashboard", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to load dashboard metrics.");
      }
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const { metrics, feeds } = data || {};

  return (
    <div className={styles.container}>
      {/* Top Banner */}
      <div className={styles.welcomeBanner}>
        <div className={styles.bannerText}>
          <h2>Executive Command Center</h2>
          <p>Real-time analytics across party membership, donations, and citizen inquiries.</p>
        </div>
        <button
          type="button"
          className={styles.refreshBtn}
          onClick={fetchDashboardData}
          disabled={loading}
        >
          <RefreshCw size={15} className={loading ? styles.spin : ""} />
          <span>{loading ? "Refreshing..." : "Sync Data"}</span>
        </button>
      </div>

      {error && (
        <div className={styles.errorAlert}>
          <AlertCircle size={18} />
          <span>{error}</span>
          <button onClick={fetchDashboardData} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      )}

      {/* KPI Cards Grid - Matching Members Page Design */}
      <div className={styles.statsGrid}>
        {/* Total Registered */}
        <div className={`${styles.statCard} ${styles.statBlue}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Total Registered</span>
            <span className={styles.statNumber}>
              {loading ? "..." : metrics?.totalMembers ?? 0}
            </span>
            <span className={styles.statHint}>
              {metrics?.activeMembers ?? 0} Verified Citizens
            </span>
          </div>
          <div className={styles.statIconBadge}>
            <Users size={22} />
          </div>
        </div>

        {/* Total Donations */}
        <div className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Donation Fund Total</span>
            <span className={styles.statNumber}>
              {loading ? "..." : `₹${(metrics?.totalRevenue ?? 0).toLocaleString("en-IN")}`}
            </span>
            <span className={styles.statHint}>
              {metrics?.totalDonations ?? 0} Contributions recorded
            </span>
          </div>
          <div className={styles.statIconBadge}>
            <IndianRupee size={22} />
          </div>
        </div>

        {/* Citizen Messages */}
        <div className={`${styles.statCard} ${styles.statOrange}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Citizen Messages</span>
            <span className={styles.statNumber}>
              {loading ? "..." : metrics?.totalContacts ?? 0}
            </span>
            <span className={styles.statHint}>Inquiries awaiting response</span>
          </div>
          <div className={styles.statIconBadge}>
            <Mail size={22} />
          </div>
        </div>

        {/* Platform Status */}
        <div className={`${styles.statCard} ${styles.statPurple}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Platform & Database</span>
            <span className={styles.statNumber}>Active</span>
            <span className={styles.statHint}>Database Synced</span>
          </div>
          <div className={styles.statIconBadge}>
            <Activity size={22} />
          </div>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className={styles.quickBar}>
        <span className={styles.quickBarTitle}>Quick Management:</span>
        <div className={styles.quickActionsList}>
          <Link href="/admin/members" className={styles.quickLink}>
            <Users size={15} />
            <span>Manage Members</span>
          </Link>
          <Link href="/admin/donation" className={styles.quickLink}>
            <CreditCard size={15} />
            <span>Verify Donations</span>
          </Link>
          <Link href="/admin/contact" className={styles.quickLink}>
            <Mail size={15} />
            <span>Citizen Inquiries</span>
          </Link>
          <Link href="/admin/newsletter" className={styles.quickLink}>
            <Send size={15} />
            <span>Newsletter List</span>
          </Link>
        </div>
      </div>

      {/* 2-Column Activity Feeds */}
      <div className={styles.feedGrid}>
        {/* Recent Members */}
        <div className={styles.feedCard}>
          <div className={styles.feedHeader}>
            <div>
              <h3>Recent Member Registrations</h3>
              <p>Latest citizens joined AILP</p>
            </div>
            <Link href="/admin/members" className={styles.viewAllBtn}>
              <span>All Members</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>ID</th>
                  <th>District / State</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className={styles.loadingCell}>
                      <RefreshCw size={16} className={styles.spin} />
                      <span>Loading records...</span>
                    </td>
                  </tr>
                ) : feeds?.recentMembers?.length > 0 ? (
                  feeds.recentMembers.map((m) => {
                    const statusKey = (m.status || "active").toLowerCase();
                    return (
                      <tr key={m._id || m.memberId}>
                        <td>
                          <div className={styles.userCell}>
                            <div className={styles.userAvatar}>
                              {m.fullName?.charAt(0)?.toUpperCase() || "M"}
                            </div>
                            <div>
                              <span className={styles.userName}>{m.fullName}</span>
                              <span className={styles.userMeta}>{m.email || m.mobile}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={styles.idBadge}>{m.memberId || "PENDING"}</span>
                        </td>
                        <td>
                          <div className={styles.locationMeta}>
                            <span>{m.district || "—"}</span>
                            <small>{m.state || "Assam"}</small>
                          </div>
                        </td>
                        <td>
                          <span className={`${styles.statusPill} ${styles[statusKey] || styles.active}`}>
                            <span className={styles.statusDot} />
                            {m.status || "Active"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className={styles.emptyCell}>
                      No recent member records.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Citizen Contact Inquiries */}
        <div className={styles.feedCard}>
          <div className={styles.feedHeader}>
            <div>
              <h3>Citizen Contact Inquiries</h3>
              <p>Direct submissions from website contact form</p>
            </div>
            <Link href="/admin/contact" className={styles.viewAllBtn}>
              <span>Open Inbox</span>
              <ArrowUpRight size={15} />
            </Link>
          </div>

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sender</th>
                  <th>Subject</th>
                  <th>Received</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="3" className={styles.loadingCell}>
                      <RefreshCw size={16} className={styles.spin} />
                      <span>Loading messages...</span>
                    </td>
                  </tr>
                ) : feeds?.recentContacts?.length > 0 ? (
                  feeds.recentContacts.map((c) => (
                    <tr key={c._id}>
                      <td>
                        <div className={styles.userCell}>
                          <div className={`${styles.userAvatar} ${styles.avatarPurple}`}>
                            {c.name?.charAt(0)?.toUpperCase() || "C"}
                          </div>
                          <div>
                            <span className={styles.userName}>{c.name}</span>
                            <span className={styles.userMeta}>{c.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={styles.subjectText}>
                          {c.subject || "General Enquiry"}
                        </span>
                      </td>
                      <td>
                        <span className={styles.dateMeta}>
                          {c.createdAt
                            ? new Date(c.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                              })
                            : "—"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className={styles.emptyCell}>
                      No inquiries received yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}