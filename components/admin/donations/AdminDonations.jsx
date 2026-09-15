"use client";

/* ==========================================================
   AILP ADMIN DONATIONS — Manual UPI Verification Queue
========================================================== */

import { useCallback, useEffect, useState } from "react";

import {
  Search,
  RefreshCw,
  Eye,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  Clock3,
  CheckCircle2,
  XCircle,
  CalendarDays,
  Filter,
  AlertCircle,
  Check,
  X,
} from "lucide-react";

import styles from "./AdminDonations.module.css";

const STATUS_OPTIONS = [
  { value: "", label: "All Status" },
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
];

const DEFAULT_STATS = { pending: 0, verified: 0, rejected: 0, total: 0 };

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(amount) || 0);
}

function formatDateTime(date) {
  if (!date) return "—";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStatusClass(status) {
  switch (status) {
    case "verified":
      return styles.statusSuccess;
    case "pending":
      return styles.statusPending;
    case "rejected":
      return styles.statusFailed;
    default:
      return styles.statusUnknown;
  }
}

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [page, setPage] = useState(1);
  const [limit] = useState(20);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [selectedDonation, setSelectedDonation] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  const buildQuery = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    if (startDate) params.set("startDate", startDate);
    if (endDate) params.set("endDate", endDate);
    params.set("page", page.toString());
    params.set("limit", limit.toString());
    return params.toString();
  }, [search, status, startDate, endDate, page, limit]);

  const fetchDonations = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const query = buildQuery();
      const response = await fetch(`/api/admin/donations?${query}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load donations.");
      }

      setDonations(Array.isArray(data.donations) ? data.donations : []);
      setStats(data.stats || DEFAULT_STATS);
      setPagination(
        data.pagination || {
          page,
          limit,
          total: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        }
      );
    } catch (err) {
      console.error("Donations fetch error:", err);
      setError(err.message || "Unable to load donations.");
      setDonations([]);
    } finally {
      setLoading(false);
    }
  }, [buildQuery, page, limit]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  function handleSearch(event) {
    event.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function resetFilters() {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  }

  async function handleViewDonation(id) {
    try {
      setDetailsLoading(true);
      setSelectedDonation(null);
      setShowRejectBox(false);
      setRejectionReason("");

      const response = await fetch(`/api/admin/donations/${id}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to load donation.");
      }

      setSelectedDonation(data.donation);
    } catch (err) {
      console.error("Donation details error:", err);
      alert(err.message || "Unable to load donation details.");
    } finally {
      setDetailsLoading(false);
    }
  }

  function closeDetails() {
    setSelectedDonation(null);
    setShowRejectBox(false);
    setRejectionReason("");
  }

  async function handleReview(action) {
    if (!selectedDonation) return;

    try {
      setActionLoading(true);
      const response = await fetch(`/api/admin/donations/${selectedDonation._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ action, rejectionReason }),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to update donation.");
      }

      closeDetails();
      fetchDonations();
    } catch (err) {
      alert(err.message || "Unable to update donation.");
    } finally {
      setActionLoading(false);
    }
  }

  const statCards = [
    {
      title: "Pending Review",
      value: stats.pending,
      icon: Clock3,
      className: styles.statOrange,
      description: "Awaiting verification",
    },
    {
      title: "Verified",
      value: stats.verified,
      icon: CheckCircle2,
      className: styles.statSuccess,
      description: "Approved contributions",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: XCircle,
      className: styles.statRed,
      description: "Declined submissions",
    },
    {
      title: "Total Records",
      value: stats.total,
      icon: IndianRupee,
      className: styles.statBlue,
      description: "All donation submissions",
    },
  ];

  return (
    <section className={styles.page}>
      <div className={styles.pageHeader}>
        <div className={styles.titleRow}>
          <div className={styles.titleIcon}>
            <IndianRupee size={24} />
          </div>
          <div>
            <h1>Donation Review</h1>
            <p>Verify manual UPI contributions submitted by members and the public.</p>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button type="button" className={styles.refreshButton} onClick={fetchDonations} disabled={loading}>
            <RefreshCw size={17} className={loading ? styles.spinning : ""} />
            Refresh
          </button>
        </div>
      </div>

      <div className={styles.statsGrid}>
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className={styles.statCard}>
              <div className={`${styles.statIcon} ${card.className}`}>
                <Icon size={21} />
              </div>
              <div className={styles.statContent}>
                <span>{card.title}</span>
                <strong>{loading ? "..." : card.value}</strong>
                <small>{card.description}</small>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.filterCard}>
        <div className={styles.filterHeader}>
          <div>
            <h2>
              <Filter size={18} />
              Donation Submissions
            </h2>
            <p>Search and filter contributions pending or already reviewed.</p>
          </div>
          <button type="button" className={styles.resetButton} onClick={resetFilters}>
            Reset Filters
          </button>
        </div>

        <form onSubmit={handleSearch} className={styles.filters}>
          <div className={styles.searchWrapper}>
            <Search size={19} className={styles.searchIcon} />
            <input
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search donor, email, mobile or UTR..."
              aria-label="Search donations"
            />
            <button type="submit" className={styles.searchButton}>
              Search
            </button>
          </div>

          <div className={styles.filterField}>
            <label htmlFor="donation-status">Status</label>
            <select
              id="donation-status"
              value={status}
              onChange={(e) => {
                setStatus(e.target.value);
                setPage(1);
              }}
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value || "all"} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.filterField}>
            <label htmlFor="start-date">From</label>
            <div className={styles.dateInput}>
              <CalendarDays size={17} />
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          <div className={styles.filterField}>
            <label htmlFor="end-date">To</label>
            <div className={styles.dateInput}>
              <CalendarDays size={17} />
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
        </form>
      </div>

      {error && (
        <div className={styles.errorBox}>
          <AlertCircle size={19} />
          <div>
            <strong>Unable to load donations</strong>
            <p>{error}</p>
          </div>
          <button type="button" onClick={fetchDonations}>
            Try Again
          </button>
        </div>
      )}

      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <div>
            <h2>Donation Submissions</h2>
            <p>
              {pagination.total || 0} total record{pagination.total === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {loading ? (
          <div className={styles.loadingState}>
            <RefreshCw size={30} className={styles.spinning} />
            <p>Loading donations...</p>
          </div>
        ) : donations.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <IndianRupee size={30} />
            </div>
            <h3>No donations found</h3>
            <p>No donation records match your current search or filters.</p>
            <button type="button" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Donor</th>
                    <th>Amount</th>
                    <th>UTR</th>
                    <th>Member</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation._id}>
                      <td>
                        <div className={styles.donor}>
                          <div className={styles.avatar}>
                            {(donation.donorName || "D").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong>{donation.donorName || "Unknown Donor"}</strong>
                            <span>{donation.email || donation.phone || "No contact"}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong className={styles.amount}>{formatCurrency(donation.amount)}</strong>
                      </td>
                      <td>
                        <span className={styles.transaction}>{donation.utrNumber || "—"}</span>
                      </td>
                      <td>
                        <span className={styles.paymentMethod}>
                          {donation.member?.membershipId || "Guest"}
                        </span>
                      </td>
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusClass(donation.status)}`}>
                          {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <div className={styles.dateCell}>
                          <strong>{formatDateTime(donation.createdAt).split(", ").slice(0, 2).join(", ")}</strong>
                        </div>
                      </td>
                      <td>
                        <button
                          type="button"
                          className={styles.viewButton}
                          onClick={() => handleViewDonation(donation._id)}
                        >
                          <Eye size={16} />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.pagination}>
              <div className={styles.paginationInfo}>
                Showing <strong>{pagination.total === 0 ? 0 : (page - 1) * limit + 1}</strong> to{" "}
                <strong>{Math.min(page * limit, pagination.total)}</strong> of{" "}
                <strong>{pagination.total}</strong>
              </div>
              <div className={styles.paginationControls}>
                <button
                  type="button"
                  disabled={!pagination.hasPreviousPage || loading}
                  onClick={() => setPage((current) => Math.max(current - 1, 1))}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={18} />
                </button>
                <span>
                  Page <strong>{pagination.page || page}</strong> of{" "}
                  <strong>{pagination.totalPages || 1}</strong>
                </span>
                <button
                  type="button"
                  disabled={!pagination.hasNextPage || loading}
                  onClick={() => setPage((current) => current + 1)}
                  aria-label="Next page"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {(selectedDonation || detailsLoading) && (
        <div className={styles.modalOverlay} onClick={detailsLoading ? undefined : closeDetails}>
          <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
            {detailsLoading ? (
              <div className={styles.modalLoading}>
                <RefreshCw size={30} className={styles.spinning} />
                <p>Loading donation details...</p>
              </div>
            ) : (
              <>
                <div className={styles.modalHeader}>
                  <div>
                    <span>Donation Details</span>
                    <h2>{selectedDonation?.donorName || "Donation"}</h2>
                  </div>
                  <button type="button" onClick={closeDetails} className={styles.modalClose} aria-label="Close">
                    ×
                  </button>
                </div>

                {selectedDonation?.proofImage?.url && (
                  <a
                    href={selectedDonation.proofImage.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.proofLink}
                  >
                    <img
                      src={selectedDonation.proofImage.url}
                      alt="Payment proof screenshot"
                      className={styles.proofImage}
                    />
                  </a>
                )}

                <div className={styles.detailsGrid}>
                  <div className={styles.detailItem}>
                    <span>Donor Name</span>
                    <strong>{selectedDonation?.donorName || "—"}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Amount</span>
                    <strong className={styles.detailAmount}>{formatCurrency(selectedDonation?.amount)}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Email</span>
                    <strong>{selectedDonation?.email || "—"}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Phone</span>
                    <strong>{selectedDonation?.phone || "—"}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>UTR / Reference</span>
                    <strong>{selectedDonation?.utrNumber || "—"}</strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Member</span>
                    <strong>
                      {selectedDonation?.member
                        ? `${selectedDonation.member.fullName} (${selectedDonation.member.membershipId})`
                        : "Guest donor"}
                    </strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Status</span>
                    <strong>
                      <span className={`${styles.statusBadge} ${getStatusClass(selectedDonation?.status)}`}>
                        {selectedDonation?.status}
                      </span>
                    </strong>
                  </div>
                  <div className={styles.detailItem}>
                    <span>Submitted On</span>
                    <strong>{formatDateTime(selectedDonation?.createdAt)}</strong>
                  </div>
                  {selectedDonation?.message && (
                    <div className={styles.detailItem} style={{ gridColumn: "1 / -1" }}>
                      <span>Message</span>
                      <strong>{selectedDonation.message}</strong>
                    </div>
                  )}
                  {selectedDonation?.status === "rejected" && selectedDonation?.rejectionReason && (
                    <div className={styles.detailItem} style={{ gridColumn: "1 / -1" }}>
                      <span>Rejection Reason</span>
                      <strong>{selectedDonation.rejectionReason}</strong>
                    </div>
                  )}
                </div>

                {selectedDonation?.status === "pending" && (
                  <div className={styles.reviewActions}>
                    {showRejectBox && (
                      <textarea
                        className={styles.rejectReasonInput}
                        placeholder="Reason for rejection (optional)"
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows={2}
                      />
                    )}
                    <div className={styles.reviewButtonRow}>
                      {!showRejectBox ? (
                        <button
                          type="button"
                          className={styles.rejectButton}
                          onClick={() => setShowRejectBox(true)}
                          disabled={actionLoading}
                        >
                          <X size={16} /> Reject
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={styles.rejectButton}
                          onClick={() => handleReview("reject")}
                          disabled={actionLoading}
                        >
                          <X size={16} /> Confirm Rejection
                        </button>
                      )}
                      <button
                        type="button"
                        className={styles.approveButton}
                        onClick={() => handleReview("approve")}
                        disabled={actionLoading}
                      >
                        <Check size={16} /> Approve
                      </button>
                    </div>
                  </div>
                )}

                <div className={styles.modalFooter}>
                  <button type="button" onClick={closeDetails} className={styles.closeModalButton}>
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
