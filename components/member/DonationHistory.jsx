"use client";

/* ==========================================================
   Donation History
   All India Labour Party
   Production Ready
========================================================== */

import { useEffect, useState } from "react";

import {
  IndianRupee,
  CreditCard,
  CalendarDays,
  CircleCheck,
  Clock3,
  CircleX,
} from "lucide-react";

import styles from "./DonationHistory.module.css";

export default function DonationHistory() {
  const [donations, setDonations] = useState([]);

  const [pagination, setPagination] = useState(null);

  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* ==========================================================
     Load Donation History
  ========================================================== */

  useEffect(() => {
    loadDonations(page);
  }, [page]);

  async function loadDonations(currentPage) {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/member/donations?page=${currentPage}&limit=10`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        return;
      }

      setDonations(data.donations);

      setPagination(data.pagination);
    } catch (error) {
      console.error(error);

      setError("Unable to load donation history.");
    } finally {
      setLoading(false);
    }
  }

  /* ==========================================================
     Payment Status Badge
  ========================================================== */

  function renderStatus(status) {
    switch (status) {
      case "SUCCESS":
        return (
          <span className={`${styles.badge} ${styles.success}`}>
            <CircleCheck size={16} />
            Success
          </span>
        );

      case "VERIFIED":
        return (
          <span className={`${styles.badge} ${styles.verified}`}>
            <CircleCheck size={16} />
            Verified
          </span>
        );

      case "PENDING":
        return (
          <span className={`${styles.badge} ${styles.pending}`}>
            <Clock3 size={16} />
            Pending
          </span>
        );

      default:
        return (
          <span className={`${styles.badge} ${styles.failed}`}>
            <CircleX size={16} />
            Failed
          </span>
        );
    }
  }

  /* ==========================================================
     Loading
  ========================================================== */

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading Donation History...
      </div>
    );
  }

  /* ==========================================================
     Error
  ========================================================== */

  if (error) {
    return (
      <div className={styles.error}>
        {error}
      </div>
    );
  }

  return (
    <section className={styles.wrapper}>
      {/* ==========================================
          Header
      ========================================== */}

      <div className={styles.header}>
        <h2>Donation History</h2>

        <p>
          View all your donations made to the
          All India Labour Party.
        </p>
      </div>

      {/* ==========================================
          Empty State
      ========================================== */}

      {donations.length === 0 ? (
        <div className={styles.empty}>
          No donations found.
        </div>
      ) : (
        <>
          {/* ==========================================
              Table
          ========================================== */}

          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Amount</th>

                  <th>Method</th>

                  <th>Status</th>

                  <th>Transaction ID</th>

                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {donations.map((donation) => (
                  <tr key={donation._id}>
                    <td>
                      <div className={styles.amount}>
                        <IndianRupee size={16} />

                        {donation.amount.toLocaleString()}
                      </div>
                    </td>

                    <td>
                      <div className={styles.method}>
                        <CreditCard size={16} />

                        {donation.paymentMethod}
                      </div>
                    </td>

                    <td>
                      {renderStatus(
                        donation.paymentStatus
                      )}
                    </td>

                    <td>
                      {donation.transactionId ||
                        "--"}
                    </td>

                    <td>
                      <div className={styles.date}>
                        <CalendarDays size={16} />

                        {new Date(
                          donation.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ==========================================
              Pagination
          ========================================== */}

          {pagination &&
            pagination.totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  disabled={page === 1}
                  onClick={() =>
                    setPage(page - 1)
                  }
                >
                  Previous
                </button>

                <span>
                  Page {pagination.currentPage} of{" "}
                  {pagination.totalPages}
                </span>

                <button
                  disabled={
                    page ===
                    pagination.totalPages
                  }
                  onClick={() =>
                    setPage(page + 1)
                  }
                >
                  Next
                </button>
              </div>
            )}
        </>
      )}
    </section>
  );
}