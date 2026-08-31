"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import {
  Search,
  Download,
  RefreshCw,
  Mail,
  Trash2,
  AlertCircle,
  Users,
  CheckCircle2,
  XCircle,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
  Send,
  Calendar,
} from "lucide-react";
import styles from "./Newsletter.module.css";

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  // Filters
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  const [actionLoading, setActionLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const fetchSubscribers = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: search.trim(),
        status: selectedStatus,
      });

      const res = await fetch(`/api/admin/newsletter?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load subscribers.");
      }

      setSubscribers(data.subscribers || []);
      setActiveCount(data.activeCount || 0);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, selectedStatus]);

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        fetchSubscribers(1);
      });
    }, 350);
    return () => clearTimeout(handler);
  }, [fetchSubscribers]);

  const handleStatusToggle = async (id, newStatus) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/newsletter", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not update status.");
      }

      setSubscribers((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status: newStatus } : s))
      );
      if (newStatus === "Active") {
        setActiveCount((prev) => prev + 1);
      } else {
        setActiveCount((prev) => Math.max(0, prev - 1));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to remove this subscriber?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/newsletter?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete subscriber.");
      }

      setSubscribers((prev) => prev.filter((s) => s._id !== id));
      fetchSubscribers(pagination.page);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleExportCSV = async () => {
    setExporting(true);
    try {
      const params = new URLSearchParams({
        export: "true",
        search: search.trim(),
        status: selectedStatus,
      });

      const res = await fetch(`/api/admin/newsletter?${params.toString()}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!data.success || !data.subscribers?.length) {
        alert("No subscribers found to export.");
        return;
      }

      const headers = ["Email Address", "Status", "Source", "Subscribed Date"];
      const rows = data.subscribers.map((s) => [
        `"${s.email || ""}"`,
        `"${s.status || "Active"}"`,
        `"${s.source || "Website Footer"}"`,
        `"${s.createdAt ? new Date(s.createdAt).toLocaleDateString("en-IN") : ""}"`,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute(
        "download",
        `AILP_Newsletter_Subscribers_${new Date().toISOString().slice(0, 10)}.csv`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to export: " + err.message);
    } finally {
      setExporting(false);
    }
  };

  const inactiveCount = Math.max(0, pagination.total - activeCount);

  return (
    <div className={styles.container}>
      {/* Top Stat Cards Grid */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statBlue}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Total Subscribers</span>
            <span className={styles.statNumber}>{pagination.total}</span>
            <span className={styles.statHint}>Audience reach</span>
          </div>
          <div className={styles.statIconBadge}>
            <Users size={22} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Active Audience</span>
            <span className={styles.statNumber}>{activeCount}</span>
            <span className={styles.statHint}>Receiving party broadcasts</span>
          </div>
          <div className={styles.statIconBadge}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statOrange}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Unsubscribed</span>
            <span className={styles.statNumber}>{inactiveCount}</span>
            <span className={styles.statHint}>Opted out of emails</span>
          </div>
          <div className={styles.statIconBadge}>
            <XCircle size={22} />
          </div>
        </div>
      </div>

      {/* Filter & Action Toolbar */}
      <div className={styles.filterCard}>
        <div className={styles.searchBox}>
          <Search size={17} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by subscriber email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.selectWrapper}>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.customSelect}
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Unsubscribed">Unsubscribed</option>
            </select>
          </div>

          <button
            type="button"
            className={styles.exportButton}
            onClick={handleExportCSV}
            disabled={exporting || loading}
          >
            <Download size={15} />
            <span>{exporting ? "Exporting..." : "Export CSV"}</span>
          </button>

          <button
            type="button"
            className={styles.refreshButton}
            onClick={() => fetchSubscribers(pagination.page)}
            disabled={loading}
            title="Refresh Subscribers"
          >
            <RefreshCw size={16} className={loading ? styles.spin : ""} />
          </button>
        </div>
      </div>

      {error && (
        <div className={styles.errorAlert}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Main Subscribers Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Subscriber Email</th>
                <th>Subscription Source</th>
                <th>Status</th>
                <th>Subscribed Date</th>
                <th className={styles.alignRight}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className={styles.emptyCell}>
                    <div className={styles.loadingRow}>
                      <RefreshCw size={18} className={styles.spin} />
                      <span>Loading subscriber database...</span>
                    </div>
                  </td>
                </tr>
              ) : subscribers.length > 0 ? (
                subscribers.map((s, idx) => {
                  const itemIndex = (pagination.page - 1) * pagination.limit + idx + 1;
                  const isActive = (s.status || "Active") === "Active";

                  return (
                    <tr key={s._id}>
                      <td className={styles.indexCell}>{itemIndex}</td>

                      <td>
                        <div className={styles.emailCell}>
                          <div className={styles.mailIconCircle}>
                            <Mail size={15} />
                          </div>
                          <strong>{s.email}</strong>
                        </div>
                      </td>

                      <td>
                        <span className={styles.sourceText}>{s.source || "Website Footer"}</span>
                      </td>

                      <td>
                        <span
                          className={`${styles.statusPill} ${
                            isActive ? styles.pillActive : styles.pillInactive
                          }`}
                        >
                          <span className={styles.statusDot} />
                          {s.status || "Active"}
                        </span>
                      </td>

                      <td>
                        <span className={styles.dateText}>
                          {s.createdAt
                            ? new Date(s.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </span>
                      </td>

                      <td>
                        <div className={styles.actionsCell}>
                          {isActive ? (
                            <button
                              type="button"
                              className={`${styles.actionBtn} ${styles.warningHover}`}
                              onClick={() => handleStatusToggle(s._id, "Unsubscribed")}
                              disabled={actionLoading}
                              title="Unsubscribe Member"
                            >
                              <UserX size={15} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className={`${styles.actionBtn} ${styles.successHover}`}
                              onClick={() => handleStatusToggle(s._id, "Active")}
                              disabled={actionLoading}
                              title="Reactivate Subscription"
                            >
                              <UserCheck size={15} />
                            </button>
                          )}

                          <button
                            type="button"
                            className={`${styles.actionBtn} ${styles.dangerHover}`}
                            onClick={() => handleDelete(s._id)}
                            disabled={actionLoading}
                            title="Delete Subscriber"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className={styles.emptyCell}>
                    No newsletter subscribers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer & Pagination */}
        <div className={styles.footerBar}>
          <span className={styles.showingText}>
            Showing{" "}
            <strong>
              {subscribers.length ? (pagination.page - 1) * pagination.limit + 1 : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </strong>{" "}
            of <strong>{pagination.total}</strong> subscribers
          </span>

          <div className={styles.paginationActions}>
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => fetchSubscribers(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
            >
              <ChevronLeft size={15} />
              <span>Previous</span>
            </button>

            <span className={styles.pageStatus}>
              Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages}</strong>
            </span>

            <button
              type="button"
              className={styles.pageButton}
              onClick={() => fetchSubscribers(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || loading}
            >
              <span>Next</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}