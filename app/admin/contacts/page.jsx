"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import {
  Search,
  RefreshCw,
  Mail,
  MailOpen,
  Trash2,
  Eye,
  X,
  Phone,
  Calendar,
  AlertCircle,
  Inbox,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Reply,
} from "lucide-react";
import styles from "./Contact.module.css";

export default function AdminContactPage() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  // Filters
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL"); // ALL | UNREAD | READ

  // Selected Message for Modal Viewer
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchMessages = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: search.trim(),
        filter,
      });

      const res = await fetch(`/api/admin/contact?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load messages.");
      }

      setMessages(data.messages || []);
      setUnreadCount(data.unreadCount || 0);
      setPagination(data.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        fetchMessages(1);
      });
    }, 350);
    return () => clearTimeout(handler);
  }, [fetchMessages]);

  // Toggle Read/Unread
  const handleToggleRead = async (id, isRead) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/contact", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, isRead }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to update status.");
      }

      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, isRead } : m))
      );
      setUnreadCount((prev) => (isRead ? Math.max(0, prev - 1) : prev + 1));

      if (selectedMsg?._id === id) {
        setSelectedMsg((prev) => ({ ...prev, isRead }));
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Message
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/contact?id=${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete message.");
      }

      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selectedMsg?._id === id) {
        setSelectedMsg(null);
      }
      fetchMessages(pagination.page);
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // Open Message and automatically mark as read
  const handleOpenMessage = (msg) => {
    setSelectedMsg(msg);
    if (!msg.isRead) {
      handleToggleRead(msg._id, true);
    }
  };

  return (
    <div className={styles.container}>
      {/* Top Stat Banner */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statBlue}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Total Inquiries</span>
            <span className={styles.statNumber}>{pagination.total}</span>
            <span className={styles.statHint}>Citizen contact submissions</span>
          </div>
          <div className={styles.statIconBadge}>
            <Inbox size={22} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statOrange}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Unread Messages</span>
            <span className={styles.statNumber}>{unreadCount}</span>
            <span className={styles.statHint}>Awaiting administrator review</span>
          </div>
          <div className={styles.statIconBadge}>
            <Mail size={22} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Responded / Processed</span>
            <span className={styles.statNumber}>{Math.max(0, pagination.total - unreadCount)}</span>
            <span className={styles.statHint}>Archived inquiries</span>
          </div>
          <div className={styles.statIconBadge}>
            <CheckCircle2 size={22} />
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className={styles.filterCard}>
        <div className={styles.searchBox}>
          <Search size={17} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by sender name, email, subject, or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.selectWrapper}>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className={styles.customSelect}
            >
              <option value="ALL">All Inquiries</option>
              <option value="UNREAD">Unread Only</option>
              <option value="READ">Read / Processed</option>
            </select>
          </div>

          <button
            type="button"
            className={styles.refreshButton}
            onClick={() => fetchMessages(pagination.page)}
            disabled={loading}
            title="Refresh Inquiries"
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

      {/* Messages Table */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Sender</th>
                <th>Subject</th>
                <th>Contact</th>
                <th>Status</th>
                <th>Received Date</th>
                <th className={styles.alignRight}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className={styles.emptyCell}>
                    <div className={styles.loadingRow}>
                      <RefreshCw size={18} className={styles.spin} />
                      <span>Loading contact inquiries...</span>
                    </div>
                  </td>
                </tr>
              ) : messages.length > 0 ? (
                messages.map((m) => (
                  <tr
                    key={m._id}
                    className={!m.isRead ? styles.unreadRow : ""}
                    onClick={() => handleOpenMessage(m)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <div className={styles.senderCell}>
                        <div className={`${styles.avatar} ${!m.isRead ? styles.avatarUnread : ""}`}>
                          {m.name?.charAt(0)?.toUpperCase() || "C"}
                        </div>
                        <div>
                          <strong className={styles.senderName}>{m.name}</strong>
                          <span className={styles.senderEmail}>{m.email}</span>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className={styles.subjectCell}>
                        <span className={styles.subjectTitle}>{m.subject || "No Subject"}</span>
                        <p className={styles.messageSnippet}>{m.message}</p>
                      </div>
                    </td>

                    <td>
                      <span className={styles.phoneText}>{m.mobile || "—"}</span>
                    </td>

                    <td>
                      <span className={`${styles.statusPill} ${m.isRead ? styles.pillRead : styles.pillUnread}`}>
                        <span className={styles.statusDot} />
                        {m.isRead ? "Read" : "New"}
                      </span>
                    </td>

                    <td>
                      <span className={styles.dateText}>
                        {m.createdAt
                          ? new Date(m.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                          : "—"}
                      </span>
                    </td>

                    <td>
                      <div className={styles.actionsCell} onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          className={styles.actionBtn}
                          onClick={() => handleOpenMessage(m)}
                          title="View Message"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          className={styles.actionBtn}
                          onClick={() => handleToggleRead(m._id, !m.isRead)}
                          title={m.isRead ? "Mark as Unread" : "Mark as Read"}
                        >
                          {m.isRead ? <Mail size={15} /> : <MailOpen size={15} />}
                        </button>

                        <button
                          type="button"
                          className={`${styles.actionBtn} ${styles.dangerBtn}`}
                          onClick={() => handleDelete(m._id)}
                          title="Delete Message"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.emptyCell}>
                    No citizen inquiries found matching the filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className={styles.footerBar}>
          <span className={styles.showingText}>
            Showing{" "}
            <strong>
              {messages.length ? (pagination.page - 1) * pagination.limit + 1 : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(pagination.page * pagination.limit, pagination.total)}
            </strong>{" "}
            of <strong>{pagination.total}</strong> messages
          </span>

          <div className={styles.paginationActions}>
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => fetchMessages(pagination.page - 1)}
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
              onClick={() => fetchMessages(pagination.page + 1)}
              disabled={pagination.page >= pagination.totalPages || loading}
            >
              <span>Next</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Message Reader Modal */}
      {selectedMsg && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedMsg(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <div>
                <h3>Citizen Inquiry Details</h3>
                <span className={styles.modalDate}>
                  Received on{" "}
                  {new Date(selectedMsg.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={() => setSelectedMsg(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.senderHeaderCard}>
                <div className={styles.modalAvatar}>
                  {selectedMsg.name?.charAt(0)?.toUpperCase() || "C"}
                </div>
                <div>
                  <h4 className={styles.modalSenderName}>{selectedMsg.name}</h4>
                  <div className={styles.modalSenderMeta}>
                    <span>
                      <Mail size={13} /> {selectedMsg.email}
                    </span>
                    {selectedMsg.mobile && (
                      <span>
                        <Phone size={13} /> {selectedMsg.mobile}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.subjectBlock}>
                <label>Subject</label>
                <h4>{selectedMsg.subject}</h4>
              </div>

              <div className={styles.messageBlock}>
                <label>Message Content</label>
                <div className={styles.messageContent}>
                  {selectedMsg.message}
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              <a
                href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject)}`}
                className={styles.replyBtn}
              >
                <Reply size={15} />
                <span>Reply via Email</span>
              </a>

              <button
                type="button"
                className={styles.deleteModalBtn}
                onClick={() => handleDelete(selectedMsg._id)}
              >
                <Trash2 size={15} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}