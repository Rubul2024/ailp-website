"use client";

import { useEffect, useState } from "react";

import styles from "./Newsletter.module.css";

export default function NewsletterPage() {

  const [subscribers, setSubscribers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  async function loadSubscribers(currentPage = page) {

    try {

      setLoading(true);

      setError("");

      const response = await fetch(

        `/api/admin/newsletter?page=${currentPage}&limit=10&search=${encodeURIComponent(search)}`,

        {

          credentials: "include",

        }

      );

      const data = await response.json();

      if (!data.success) {

        setError(data.message);

        return;

      }

      setSubscribers(data.subscribers);

      setTotalPages(data.totalPages);

      setPage(data.currentPage);

    }

    catch {

      setError("Unable to load subscribers.");

    }

    finally {

      setLoading(false);

    }

  }

  useEffect(() => {

    loadSubscribers(1);

  }, []);

  function handleSearch(event) {

    event.preventDefault();

    loadSubscribers(1);

  }

  function handleRefresh() {

    loadSubscribers(page);

  }

  function handleView(subscriber) {

    alert(

      `Newsletter Subscriber\n\n${subscriber.email}`

    );

  }

  function handleDelete(subscriber) {

    const confirmDelete = window.confirm(

      `Delete ${subscriber.email}?`

    );

    if (!confirmDelete) return;

    alert(

      "Delete API will be added in the next lesson."

    );

  }

  if (loading) {

    return (

      <div className={styles.loading}>

        <h2>

          Loading Subscribers...

        </h2>

      </div>

    );

  }

  if (error) {

    return (

      <div className={styles.empty}>

        <h2>

          {error}

        </h2>

      </div>

    );

  }

  return (

    <div className={styles.page}>

      {/* Header */}

      <div className={styles.topBar}>

        <div className={styles.title}>

          <h1>

            Newsletter Subscribers

          </h1>

          <p>

            Manage all newsletter subscriptions.

          </p>

        </div>

        <form

          className={styles.actions}

          onSubmit={handleSearch}

        >

          <input

            type="text"

            placeholder="Search email..."

            className={styles.searchBox}

            value={search}

            onChange={(event) =>

              setSearch(event.target.value)

            }

          />

          <button

            type="submit"

            className={styles.button}

          >

            Search

          </button>

          <button

            type="button"

            className={styles.button}

            onClick={handleRefresh}

          >

            Refresh

          </button>

        </form>

      </div>

      {/* Table */}

      <div className={styles.card}>

        <table className={styles.table}>

          <thead>

            <tr>

              <th>#</th>

              <th>Email Address</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {subscribers.length === 0 ? (

              <tr>

                <td

                  colSpan="4"

                  className={styles.empty}

                >

                  No Subscribers Found

                </td>

              </tr>

            ) : (

              subscribers.map(

                (subscriber, index) => (

                  <tr

                    key={subscriber._id}

                  >

                    <td>

                      {(page - 1) * 10 +

                        index +

                        1}

                    </td>

                    <td>

                      {subscriber.email}

                    </td>

                    <td>

                      <span

                        className={styles.badge}

                      >

                        Active

                      </span>

                    </td>

                    <td>

                      <div

                        className={styles.buttons}

                      >

                        <button

                          className={styles.view}

                          onClick={() =>

                            handleView(

                              subscriber

                            )

                          }

                        >

                          View

                        </button>

                        <button

                          className={styles.delete}

                          onClick={() =>

                            handleDelete(

                              subscriber

                            )

                          }

                        >

                          Delete

                        </button>

                      </div>

                    </td>

                  </tr>

                )

              )

            )}

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      <div className={styles.pagination}>

        <button

          className={styles.pageButton}

          disabled={page === 1}

          onClick={() =>

            loadSubscribers(page - 1)

          }

        >

          Previous

        </button>

        <span>

          Page {page} of {totalPages}

        </span>

        <button

          className={styles.pageButton}

          disabled={page >= totalPages}

          onClick={() =>

            loadSubscribers(page + 1)

          }

        >

          Next

        </button>

      </div>

    </div>

  );

}