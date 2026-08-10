"use client";

/* ==========================================================
   AILP ADMIN DONATIONS
   All India Labour Party

   Part 2
   - Statistics
   - Search
   - Status Filter
   - Date Filter
   - Pagination
   - CSV Export
   - Responsive UI
========================================================== */

import { useCallback, useEffect, useState } from "react";

import {
  Search,
  RefreshCw,
  Download,
  Eye,
  ChevronLeft,
  ChevronRight,
  IndianRupee,
  CreditCard,
  Clock3,
  CheckCircle2,
  XCircle,
  RotateCcw,
  CalendarDays,
  Filter,
  AlertCircle,
} from "lucide-react";

import styles from "./AdminDonations.module.css";

/* ==========================================================
   STATUS OPTIONS
========================================================== */

const STATUS_OPTIONS = [
  {
    value: "",
    label: "All Status",
  },
  {
    value: "CAPTURED",
    label: "Successful",
  },
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "FAILED",
    label: "Failed",
  },
  {
    value: "REFUNDED",
    label: "Refunded",
  },
];

/* ==========================================================
   DEFAULT STATISTICS
========================================================== */

const DEFAULT_STATS = {
  total: 0,
  successful: 0,
  pending: 0,
  failed: 0,
  refunded: 0,
  totalAmount: 0,
  pendingAmount: 0,
  refundedAmount: 0,
};

/* ==========================================================
   FORMAT CURRENCY
========================================================== */

function formatCurrency(amount, currency = "INR") {
  const numericAmount = Number(amount) || 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}

/* ==========================================================
   FORMAT DATE
========================================================== */

function formatDate(date) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/* ==========================================================
   FORMAT DATE + TIME
========================================================== */

function formatDateTime(date) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/* ==========================================================
   STATUS LABEL
========================================================== */

function getStatusLabel(status) {
  const labels = {
    CAPTURED: "Successful",
    PENDING: "Pending",
    FAILED: "Failed",
    REFUNDED: "Refunded",
  };

  return labels[status] || status || "Unknown";
}

/* ==========================================================
   STATUS CLASS
========================================================== */

function getStatusClass(status) {
  switch (status) {
    case "CAPTURED":
      return styles.statusSuccess;

    case "PENDING":
      return styles.statusPending;

    case "FAILED":
      return styles.statusFailed;

    case "REFUNDED":
      return styles.statusRefunded;

    default:
      return styles.statusUnknown;
  }
}

/* ==========================================================
   ADMIN DONATIONS COMPONENT
========================================================== */

export default function AdminDonations() {
  /* ========================================================
     Donations
  ======================================================== */

  const [donations, setDonations] = useState([]);

  /* ========================================================
     Statistics
  ======================================================== */

  const [stats, setStats] =
    useState(DEFAULT_STATS);

  /* ========================================================
     Loading
  ======================================================== */

  const [loading, setLoading] =
    useState(true);

  const [statsLoading, setStatsLoading] =
    useState(true);

  /* ========================================================
     Error
  ======================================================== */

  const [error, setError] =
    useState("");

  /* ========================================================
     Search / Filters
  ======================================================== */

  const [searchInput, setSearchInput] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");

  /* ========================================================
     Pagination
  ======================================================== */

  const [page, setPage] =
    useState(1);

  const [limit] =
    useState(20);

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 20,
      total: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    });

  /* ========================================================
     Details Modal
  ======================================================== */

  const [selectedDonation, setSelectedDonation] =
    useState(null);

  const [detailsLoading, setDetailsLoading] =
    useState(false);

  /* ========================================================
     Build Query
  ======================================================== */

  const buildQuery = useCallback(
    (includePagination = true) => {
      const params =
        new URLSearchParams();

      if (search) {
        params.set("search", search);
      }

      if (status) {
        params.set("status", status);
      }

      if (startDate) {
        params.set(
          "startDate",
          startDate
        );
      }

      if (endDate) {
        params.set(
          "endDate",
          endDate
        );
      }

      if (includePagination) {
        params.set(
          "page",
          page.toString()
        );

        params.set(
          "limit",
          limit.toString()
        );
      }

      return params.toString();
    },
    [
      search,
      status,
      startDate,
      endDate,
      page,
      limit,
    ]
  );

  /* ========================================================
     Fetch Statistics
  ======================================================== */

  const fetchStats = useCallback(
    async () => {
      try {
        setStatsLoading(true);

        const response =
          await fetch(
            "/api/admin/donations/stats",
            {
              method: "GET",
              credentials: "include",
              cache: "no-store",
            }
          );

        const data =
          await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to load donation statistics."
          );
        }

        setStats(
          data.stats || DEFAULT_STATS
        );
      } catch (error) {
        console.error(
          "Donation statistics error:",
          error
        );
      } finally {
        setStatsLoading(false);
      }
    },
    []
  );

  /* ========================================================
     Fetch Donations
  ======================================================== */

  const fetchDonations = useCallback(
    async () => {
      try {
        setLoading(true);
        setError("");

        const query =
          buildQuery(true);

        const response =
          await fetch(
            `/api/admin/donations?${query}`,
            {
              method: "GET",
              credentials: "include",
              cache: "no-store",
            }
          );

        const data =
          await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Unable to load donations."
          );
        }

        setDonations(
          Array.isArray(data.donations)
            ? data.donations
            : []
        );

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
      } catch (error) {
        console.error(
          "Donations fetch error:",
          error
        );

        setError(
          error.message ||
            "Unable to load donations."
        );

        setDonations([]);
      } finally {
        setLoading(false);
      }
    },
    [
      buildQuery,
      page,
      limit,
    ]
  );

  /* ========================================================
     Initial Load + Filter Changes
  ======================================================== */

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  /* ========================================================
     Apply Search
  ======================================================== */

  function handleSearch(event) {
    event.preventDefault();

    setPage(1);
    setSearch(
      searchInput.trim()
    );
  }

  /* ========================================================
     Status Change
  ======================================================== */

  function handleStatusChange(event) {
    setStatus(
      event.target.value
    );

    setPage(1);
  }

  /* ========================================================
     Start Date
  ======================================================== */

  function handleStartDate(event) {
    setStartDate(
      event.target.value
    );

    setPage(1);
  }

  /* ========================================================
     End Date
  ======================================================== */

  function handleEndDate(event) {
    setEndDate(
      event.target.value
    );

    setPage(1);
  }

  /* ========================================================
     Reset Filters
  ======================================================== */

  function resetFilters() {
    setSearchInput("");
    setSearch("");
    setStatus("");
    setStartDate("");
    setEndDate("");
    setPage(1);
  }

  /* ========================================================
     Refresh
  ======================================================== */

  async function handleRefresh() {
    await Promise.all([
      fetchStats(),
      fetchDonations(),
    ]);
  }

  /* ========================================================
     Export CSV
  ======================================================== */

  function handleExport() {
    const query =
      buildQuery(false);

    window.location.href =
      `/api/admin/donations/export${
        query
          ? `?${query}`
          : ""
      }`;
  }

  /* ========================================================
     View Donation
  ======================================================== */

  async function handleViewDonation(id) {
    try {
      setDetailsLoading(true);
      setSelectedDonation(null);

      const response =
        await fetch(
          `/api/admin/donations/${id}`,
          {
            method: "GET",
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
            "Unable to load donation."
        );
      }

      setSelectedDonation(
        data.donation
      );
    } catch (error) {
      console.error(
        "Donation details error:",
        error
      );

      alert(
        error.message ||
          "Unable to load donation details."
      );
    } finally {
      setDetailsLoading(false);
    }
  }

  /* ========================================================
     Close Details
  ======================================================== */

  function closeDetails() {
    setSelectedDonation(null);
  }

  /* ========================================================
     Statistics Cards
  ======================================================== */

  const statCards = [
    {
      title: "Total Donations",
      value: stats.total,
      icon: CreditCard,
      className: styles.statBlue,
      description: "All donation records",
    },

    {
      title: "Total Collected",
      value: formatCurrency(
        stats.totalAmount
      ),
      icon: IndianRupee,
      className: styles.statGreen,
      description: "Successful payments",
    },

    {
      title: "Successful",
      value: stats.successful,
      icon: CheckCircle2,
      className: styles.statSuccess,
      description: "Captured payments",
    },

    {
      title: "Pending",
      value: stats.pending,
      icon: Clock3,
      className: styles.statOrange,
      description: "Awaiting payment",
    },

    {
      title: "Failed",
      value: stats.failed,
      icon: XCircle,
      className: styles.statRed,
      description: "Unsuccessful payments",
    },

    {
      title: "Refunded",
      value: stats.refunded,
      icon: RotateCcw,
      className: styles.statPurple,
      description: "Refunded payments",
    },
  ];

  /* ========================================================
     Render
  ======================================================== */

  return (
    <section className={styles.page}>
      {/* ==================================================
          Page Header
      ================================================== */}

      <div className={styles.pageHeader}>
        <div>
          <div className={styles.titleRow}>
            <div className={styles.titleIcon}>
              <IndianRupee size={24} />
            </div>

            <div>
              <h1>Donations</h1>

              <p>
                Manage and monitor all AILP
                donation transactions.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.refreshButton}
            onClick={handleRefresh}
            disabled={
              loading ||
              statsLoading
            }
          >
            <RefreshCw
              size={17}
              className={
                loading
                  ? styles.spinning
                  : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            className={styles.exportButton}
            onClick={handleExport}
          >
            <Download size={17} />

            Export CSV
          </button>
        </div>
      </div>

      {/* ==================================================
          Statistics
      ================================================== */}

      <div className={styles.statsGrid}>
        {statCards.map(
          (card) => {
            const Icon =
              card.icon;

            return (
              <div
                key={card.title}
                className={styles.statCard}
              >
                <div
                  className={`${styles.statIcon} ${card.className}`}
                >
                  <Icon size={21} />
                </div>

                <div
                  className={
                    styles.statContent
                  }
                >
                  <span>
                    {card.title}
                  </span>

                  <strong>
                    {statsLoading
                      ? "..."
                      : card.value}
                  </strong>

                  <small>
                    {card.description}
                  </small>
                </div>
              </div>
            );
          }
        )}
      </div>

      {/* ==================================================
          Filters
      ================================================== */}

      <div className={styles.filterCard}>
        <div className={styles.filterHeader}>
          <div>
            <h2>
              <Filter size={18} />

              Donation Records
            </h2>

            <p>
              Search and filter your
              donation transactions.
            </p>
          </div>

          <button
            type="button"
            className={styles.resetButton}
            onClick={resetFilters}
          >
            Reset Filters
          </button>
        </div>

        <form
          onSubmit={handleSearch}
          className={styles.filters}
        >
          {/* Search */}

          <div
            className={
              styles.searchWrapper
            }
          >
            <Search
              size={19}
              className={
                styles.searchIcon
              }
            />

            <input
              type="search"
              value={searchInput}
              onChange={(event) =>
                setSearchInput(
                  event.target.value
                )
              }
              placeholder="Search donor, email, mobile, receipt or transaction..."
              aria-label="Search donations"
            />

            <button
              type="submit"
              className={
                styles.searchButton
              }
            >
              Search
            </button>
          </div>

          {/* Status */}

          <div
            className={
              styles.filterField
            }
          >
            <label htmlFor="donation-status">
              Status
            </label>

            <select
              id="donation-status"
              value={status}
              onChange={
                handleStatusChange
              }
            >
              {STATUS_OPTIONS.map(
                (option) => (
                  <option
                    key={
                      option.value ||
                      "all"
                    }
                    value={
                      option.value
                    }
                  >
                    {option.label}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Start Date */}

          <div
            className={
              styles.filterField
            }
          >
            <label htmlFor="start-date">
              From
            </label>

            <div
              className={
                styles.dateInput
              }
            >
              <CalendarDays
                size={17}
              />

              <input
                id="start-date"
                type="date"
                value={
                  startDate
                }
                onChange={
                  handleStartDate
                }
              />
            </div>
          </div>

          {/* End Date */}

          <div
            className={
              styles.filterField
            }
          >
            <label htmlFor="end-date">
              To
            </label>

            <div
              className={
                styles.dateInput
              }
            >
              <CalendarDays
                size={17}
              />

              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={
                  handleEndDate
                }
              />
            </div>
          </div>
        </form>
      </div>

      {/* ==================================================
          Error
      ================================================== */}

      {error && (
        <div
          className={styles.errorBox}
        >
          <AlertCircle size={19} />

          <div>
            <strong>
              Unable to load donations
            </strong>

            <p>{error}</p>
          </div>

          <button
            type="button"
            onClick={
              fetchDonations
            }
          >
            Try Again
          </button>
        </div>
      )}

      {/* ==================================================
          Table Card
      ================================================== */}

      <div className={styles.tableCard}>
        <div
          className={
            styles.tableHeader
          }
        >
          <div>
            <h2>
              Donation Transactions
            </h2>

            <p>
              {pagination.total || 0}{" "}
              total record
              {pagination.total ===
              1
                ? ""
                : "s"}
            </p>
          </div>
        </div>

        {/* ==================================================
            Loading
        ================================================== */}

        {loading ? (
          <div
            className={
              styles.loadingState
            }
          >
            <RefreshCw
              size={30}
              className={
                styles.spinning
              }
            />

            <p>
              Loading donations...
            </p>
          </div>
        ) : donations.length ===
          0 ? (
          /* ================================================
             Empty
          ================================================ */

          <div
            className={
              styles.emptyState
            }
          >
            <div
              className={
                styles.emptyIcon
              }
            >
              <CreditCard
                size={30}
              />
            </div>

            <h3>
              No donations found
            </h3>

            <p>
              No donation records match
              your current search or
              filters.
            </p>

            <button
              type="button"
              onClick={
                resetFilters
              }
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* ==========================================
                Desktop Table
            ========================================== */}

            <div
              className={
                styles.tableWrapper
              }
            >
              <table
                className={
                  styles.table
                }
              >
                <thead>
                  <tr>
                    <th>
                      Receipt
                    </th>

                    <th>
                      Donor
                    </th>

                    <th>
                      Amount
                    </th>

                    <th>
                      Payment
                    </th>

                    <th>
                      Transaction
                    </th>

                    <th>
                      Status
                    </th>

                    <th>
                      Date
                    </th>

                    <th>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {donations.map(
                    (donation) => (
                      <tr
                        key={
                          donation._id
                        }
                      >
                        {/* Receipt */}

                        <td>
                          <span
                            className={
                              styles.receipt
                            }
                          >
                            {donation.receiptNumber ||
                              "—"}
                          </span>
                        </td>

                        {/* Donor */}

                        <td>
                          <div
                            className={
                              styles.donor
                            }
                          >
                            <div
                              className={
                                styles.avatar
                              }
                            >
                              {(
                                donation.fullName ||
                                "D"
                              )
                                .charAt(
                                  0
                                )
                                .toUpperCase()}
                            </div>

                            <div>
                              <strong>
                                {donation.fullName ||
                                  "Unknown Donor"}
                              </strong>

                              <span>
                                {donation.email ||
                                  "No email"}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Amount */}

                        <td>
                          <strong
                            className={
                              styles.amount
                            }
                          >
                            {formatCurrency(
                              donation.amount,
                              donation.currency ||
                                "INR"
                            )}
                          </strong>
                        </td>

                        {/* Payment */}

                        <td>
                          <span
                            className={
                              styles.paymentMethod
                            }
                          >
                            {donation.paymentMethod ||
                              "—"}
                          </span>
                        </td>

                        {/* Transaction */}

                        <td>
                          <span
                            className={
                              styles.transaction
                            }
                            title={
                              donation.transactionId ||
                              donation.razorpayPaymentId ||
                              ""
                            }
                          >
                            {donation.transactionId ||
                              donation.razorpayPaymentId ||
                              "—"}
                          </span>
                        </td>

                        {/* Status */}

                        <td>
                          <span
                            className={`${styles.statusBadge} ${getStatusClass(
                              donation.status
                            )}`}
                          >
                            {getStatusLabel(
                              donation.status
                            )}
                          </span>
                        </td>

                        {/* Date */}

                        <td>
                          <div
                            className={
                              styles.dateCell
                            }
                          >
                            <strong>
                              {formatDate(
                                donation.createdAt
                              )}
                            </strong>

                            <span>
                              {formatDateTime(
                                donation.createdAt
                              ).split(
                                ", "
                              )[1] ||
                                ""}
                            </span>
                          </div>
                        </td>

                        {/* Action */}

                        <td>
                          <button
                            type="button"
                            className={
                              styles.viewButton
                            }
                            onClick={() =>
                              handleViewDonation(
                                donation._id
                              )
                            }
                            aria-label={`View donation ${
                              donation.receiptNumber ||
                              donation._id
                            }`}
                          >
                            <Eye
                              size={16}
                            />

                            View
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* ==========================================
                Pagination
            ========================================== */}

            <div
              className={
                styles.pagination
              }
            >
              <div
                className={
                  styles.paginationInfo
                }
              >
                Showing{" "}
                <strong>
                  {pagination.total ===
                  0
                    ? 0
                    : (page - 1) *
                        limit +
                      1}
                </strong>{" "}
                to{" "}
                <strong>
                  {Math.min(
                    page * limit,
                    pagination.total
                  )}
                </strong>{" "}
                of{" "}
                <strong>
                  {pagination.total}
                </strong>
              </div>

              <div
                className={
                  styles.paginationControls
                }
              >
                <button
                  type="button"
                  disabled={
                    !pagination.hasPreviousPage ||
                    loading
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        Math.max(
                          current - 1,
                          1
                        )
                    )
                  }
                  aria-label="Previous page"
                >
                  <ChevronLeft
                    size={18}
                  />
                </button>

                <span>
                  Page{" "}
                  <strong>
                    {pagination.page ||
                      page}
                  </strong>{" "}
                  of{" "}
                  <strong>
                    {pagination.totalPages ||
                      1}
                  </strong>
                </span>

                <button
                  type="button"
                  disabled={
                    !pagination.hasNextPage ||
                    loading
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        current + 1
                    )
                  }
                  aria-label="Next page"
                >
                  <ChevronRight
                    size={18}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ==================================================
          Donation Details Modal
      ================================================== */}

      {(selectedDonation ||
        detailsLoading) && (
        <div
          className={
            styles.modalOverlay
          }
          onClick={
            detailsLoading
              ? undefined
              : closeDetails
          }
        >
          <div
            className={
              styles.modal
            }
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {detailsLoading ? (
              <div
                className={
                  styles.modalLoading
                }
              >
                <RefreshCw
                  size={30}
                  className={
                    styles.spinning
                  }
                />

                <p>
                  Loading donation
                  details...
                </p>
              </div>
            ) : (
              <>
                <div
                  className={
                    styles.modalHeader
                  }
                >
                  <div>
                    <span>
                      Donation Details
                    </span>

                    <h2>
                      {selectedDonation?.receiptNumber ||
                        "Donation"}
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={
                      closeDetails
                    }
                    className={
                      styles.modalClose
                    }
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <div
                  className={
                    styles.detailsGrid
                  }
                >
                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Donor Name
                    </span>

                    <strong>
                      {selectedDonation?.fullName ||
                        "—"}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Amount
                    </span>

                    <strong
                      className={
                        styles.detailAmount
                      }
                    >
                      {formatCurrency(
                        selectedDonation?.amount,
                        selectedDonation?.currency ||
                          "INR"
                      )}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Email
                    </span>

                    <strong>
                      {selectedDonation?.email ||
                        "—"}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Mobile
                    </span>

                    <strong>
                      {selectedDonation?.mobile ||
                        "—"}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Payment Method
                    </span>

                    <strong>
                      {selectedDonation?.paymentMethod ||
                        "—"}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Status
                    </span>

                    <strong>
                      <span
                        className={`${styles.statusBadge} ${getStatusClass(
                          selectedDonation?.status
                        )}`}
                      >
                        {getStatusLabel(
                          selectedDonation?.status
                        )}
                      </span>
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Razorpay Order ID
                    </span>

                    <strong>
                      {selectedDonation?.razorpayOrderId ||
                        "—"}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Razorpay Payment ID
                    </span>

                    <strong>
                      {selectedDonation?.razorpayPaymentId ||
                        "—"}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Transaction ID
                    </span>

                    <strong>
                      {selectedDonation?.transactionId ||
                        "—"}
                    </strong>
                  </div>

                  <div
                    className={
                      styles.detailItem
                    }
                  >
                    <span>
                      Donation Date
                    </span>

                    <strong>
                      {formatDateTime(
                        selectedDonation?.createdAt
                      )}
                    </strong>
                  </div>
                </div>

                <div
                  className={
                    styles.modalFooter
                  }
                >
                  <button
                    type="button"
                    onClick={
                      closeDetails
                    }
                    className={
                      styles.closeModalButton
                    }
                  >
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