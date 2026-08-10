"use client";

/* ==========================================================
   AILP Admin Contact Management
========================================================== */

import { useEffect, useState } from "react";

import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  Mail,
  Phone,
  CalendarDays,
  X,
  CheckCircle2,
  Clock3,
  MessageCircle,
  Archive,
} from "lucide-react";

import styles from "./AdminContacts.module.css";

const STATUS_OPTIONS = [
  "ALL",
  "NEW",
  "READ",
  "REPLIED",
  "CLOSED",
];

export default function AdminContacts() {
  const [contacts, setContacts] =
    useState([]);

  const [statistics, setStatistics] =
    useState({
      total: 0,
      NEW: 0,
      READ: 0,
      REPLIED: 0,
      CLOSED: 0,
    });

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("ALL");

  const [loading, setLoading] =
    useState(true);

  const [selectedContact, setSelectedContact] =
    useState(null);

  const [actionLoading, setActionLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /* ========================================================
     Load Contacts
  ======================================================== */

  async function loadContacts() {
    setLoading(true);
    setError("");

    try {
      const params =
        new URLSearchParams();

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      if (status !== "ALL") {
        params.set("status", status);
      }

      const response = await fetch(
        `/api/admin/contacts?${params.toString()}`,
        {
          credentials: "include",

          cache: "no-store",
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to load contacts."
        );
      }

      setContacts(
        data.contacts || []
      );

      setStatistics(
        data.statistics || {
          total: 0,
          NEW: 0,
          READ: 0,
          REPLIED: 0,
          CLOSED: 0,
        }
      );
    } catch (error) {
      console.error(
        "Admin Contacts Error:",
        error
      );

      setError(
        error.message ||
          "Unable to load contact messages."
      );
    } finally {
      setLoading(false);
    }
  }

  /* ========================================================
     Initial Load
  ======================================================== */

  useEffect(() => {
    loadContacts();
  }, [status]);

  /* ========================================================
     Update Status
  ======================================================== */

  async function updateStatus(
    id,
    newStatus
  ) {
    setActionLoading(true);

    try {
      const response = await fetch(
        `/api/admin/contacts/${id}`,
        {
          method: "PATCH",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to update status."
        );
      }

      setSelectedContact(
        data.contact
      );

      await loadContacts();
    } catch (error) {
      alert(
        error.message ||
          "Unable to update contact."
      );
    } finally {
      setActionLoading(false);
    }
  }

  /* ========================================================
     Delete Contact
  ======================================================== */

  async function deleteContact(id) {
    const confirmed =
      window.confirm(
        "Are you sure you want to permanently delete this contact message?"
      );

    if (!confirmed) {
      return;
    }

    setActionLoading(true);

    try {
      const response = await fetch(
        `/api/admin/contacts/${id}`,
        {
          method: "DELETE",

          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (
        !response.ok ||
        !data.success
      ) {
        throw new Error(
          data.message ||
            "Unable to delete contact."
        );
      }

      setSelectedContact(null);

      await loadContacts();
    } catch (error) {
      alert(
        error.message ||
          "Unable to delete contact."
      );
    } finally {
      setActionLoading(false);
    }
  }

  /* ========================================================
     Search
  ======================================================== */

  function handleSearch(event) {
    event.preventDefault();

    loadContacts();
  }

  /* ========================================================
     Status Badge
  ======================================================== */

  function getStatusClass(
    contactStatus
  ) {
    switch (contactStatus) {
      case "NEW":
        return styles.statusNew;

      case "READ":
        return styles.statusRead;

      case "REPLIED":
        return styles.statusReplied;

      case "CLOSED":
        return styles.statusClosed;

      default:
        return "";
    }
  }

  /* ========================================================
     Date
  ======================================================== */

  function formatDate(date) {
    if (!date) {
      return "N/A";
    }

    return new Date(
      date
    ).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  return (
    <section className={styles.page}>
      {/* ====================================================
          Header
      ==================================================== */}

      <div className={styles.header}>
        <div>
          <span className={styles.eyebrow}>
            ADMINISTRATION
          </span>

          <h1>
            Contact Messages
          </h1>

          <p>
            Manage enquiries and messages
            received from the AILP website.
          </p>
        </div>

        <button
          className={styles.refreshButton}
          onClick={loadContacts}
          disabled={loading}
        >
          <RefreshCw
            size={17}
            className={
              loading
                ? styles.spin
                : ""
            }
          />

          Refresh
        </button>
      </div>

      {/* ====================================================
          Statistics
      ==================================================== */}

      <div className={styles.stats}>
        <StatCard
          icon={<Mail size={20} />}
          title="Total"
          value={statistics.total}
        />

        <StatCard
          icon={<Clock3 size={20} />}
          title="New"
          value={statistics.NEW}
          className={styles.newStat}
        />

        <StatCard
          icon={
            <Eye size={20} />
          }
          title="Read"
          value={statistics.READ}
        />

        <StatCard
          icon={
            <MessageCircle size={20} />
          }
          title="Replied"
          value={statistics.REPLIED}
        />

        <StatCard
          icon={
            <Archive size={20} />
          }
          title="Closed"
          value={statistics.CLOSED}
        />
      </div>

      {/* ====================================================
          Toolbar
      ==================================================== */}

      <div className={styles.toolbar}>
        <form
          className={styles.search}
          onSubmit={handleSearch}
        >
          <Search size={18} />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search name, email or subject..."
          />

          <button type="submit">
            Search
          </button>
        </form>

        <div className={styles.filters}>
          {STATUS_OPTIONS.map(
            (option) => (
              <button
                key={option}
                type="button"
                className={
                  status === option
                    ? styles.filterActive
                    : ""
                }
                onClick={() =>
                  setStatus(option)
                }
              >
                {option}
              </button>
            )
          )}
        </div>
      </div>

      {/* ====================================================
          Error
      ==================================================== */}

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {/* ====================================================
          Table
      ==================================================== */}

      <div className={styles.tableCard}>
        {loading ? (
          <div className={styles.loading}>
            <RefreshCw
              size={25}
              className={styles.spin}
            />

            Loading contact messages...
          </div>
        ) : contacts.length === 0 ? (
          <div className={styles.empty}>
            <Mail size={40} />

            <h3>
              No contact messages
            </h3>

            <p>
              There are no messages
              matching your current
              filters.
            </p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Member</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map(
                  (contact) => (
                    <tr key={contact._id}>
                      <td>
                        <div
                          className={
                            styles.person
                          }
                        >
                          <strong>
                            {
                              contact.name
                            }
                          </strong>

                          <span>
                            {
                              contact.email
                            }
                          </span>

                          {contact.phone && (
                            <small>
                              {
                                contact.phone
                              }
                            </small>
                          )}
                        </div>
                      </td>

                      <td>
                        <strong>
                          {
                            contact.subject
                          }
                        </strong>
                      </td>

                      <td>
                        <p
                          className={
                            styles.messagePreview
                          }
                        >
                          {
                            contact.message
                          }
                        </p>
                      </td>

                      <td>
                        <span
                          className={`${styles.status} ${getStatusClass(
                            contact.status
                          )}`}
                        >
                          {
                            contact.status
                          }
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            styles.date
                          }
                        >
                          {
                            formatDate(
                              contact.createdAt
                            )
                          }
                        </span>
                      </td>

                      <td>
                        <div
                          className={
                            styles.rowActions
                          }
                        >
                          <button
                            type="button"
                            title="View Message"
                            onClick={() =>
                              setSelectedContact(
                                contact
                              )
                            }
                          >
                            <Eye
                              size={17}
                            />
                          </button>

                          <button
                            type="button"
                            title="Delete"
                            className={
                              styles.deleteButton
                            }
                            onClick={() =>
                              deleteContact(
                                contact._id
                              )
                            }
                          >
                            <Trash2
                              size={17}
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ====================================================
          Message Drawer
      ==================================================== */}

      {selectedContact && (
        <div
          className={styles.overlay}
          onClick={() =>
            setSelectedContact(null)
          }
        >
          <aside
            className={styles.drawer}
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div
              className={
                styles.drawerHeader
              }
            >
              <div>
                <span>
                  CONTACT MESSAGE
                </span>

                <h2>
                  {
                    selectedContact.subject
                  }
                </h2>
              </div>

              <button
                type="button"
                onClick={() =>
                  setSelectedContact(
                    null
                  )
                }
              >
                <X size={20} />
              </button>
            </div>

            <div
              className={
                styles.drawerBody
              }
            >
              <div
                className={
                  styles.contactPerson
                }
              >
                <h3>
                  {
                    selectedContact.name
                  }
                </h3>

                <a
                  href={`mailto:${selectedContact.email}`}
                >
                  <Mail size={16} />

                  {
                    selectedContact.email
                  }
                </a>

                {selectedContact.phone && (
                  <a
                    href={`tel:${selectedContact.phone}`}
                  >
                    <Phone size={16} />

                    {
                      selectedContact.phone
                    }
                  </a>
                )}
              </div>

              <div
                className={
                  styles.drawerMeta
                }
              >
                <span>
                  <CalendarDays
                    size={16}
                  />

                  {formatDate(
                    selectedContact.createdAt
                  )}
                </span>

                <span
                  className={`${styles.status} ${getStatusClass(
                    selectedContact.status
                  )}`}
                >
                  {
                    selectedContact.status
                  }
                </span>
              </div>

              <div
                className={
                  styles.fullMessage
                }
              >
                <h4>
                  Message
                </h4>

                <p>
                  {
                    selectedContact.message
                  }
                </p>
              </div>

              {/* Status Actions */}

              <div
                className={
                  styles.statusActions
                }
              >
                <h4>
                  Update Status
                </h4>

                <div>
                  <button
                    disabled={
                      actionLoading
                    }
                    onClick={() =>
                      updateStatus(
                        selectedContact._id,
                        "READ"
                      )
                    }
                  >
                    <Eye size={16} />
                    Mark Read
                  </button>

                  <button
                    disabled={
                      actionLoading
                    }
                    onClick={() =>
                      updateStatus(
                        selectedContact._id,
                        "REPLIED"
                      )
                    }
                  >
                    <CheckCircle2
                      size={16}
                    />
                    Replied
                  </button>

                  <button
                    disabled={
                      actionLoading
                    }
                    onClick={() =>
                      updateStatus(
                        selectedContact._id,
                        "CLOSED"
                      )
                    }
                  >
                    <Archive size={16} />
                    Close
                  </button>
                </div>
              </div>

              <button
                className={
                  styles.drawerDelete
                }
                disabled={
                  actionLoading
                }
                onClick={() =>
                  deleteContact(
                    selectedContact._id
                  )
                }
              >
                <Trash2 size={17} />
                Delete Message
              </button>
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}

/* ==========================================================
   Statistics Card
========================================================== */

function StatCard({
  icon,
  title,
  value,
  className = "",
}) {
  return (
    <div
      className={`${styles.statCard} ${className}`}
    >
      <div className={styles.statIcon}>
        {icon}
      </div>

      <div>
        <span>{title}</span>

        <strong>{value}</strong>
      </div>
    </div>
  );
}