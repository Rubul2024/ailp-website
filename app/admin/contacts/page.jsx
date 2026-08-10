"use client";

import { useEffect, useState } from "react";

import styles from "./Contact.module.css";

export default function ContactPage() {
  const [contacts, setContacts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  async function loadContacts() {
    try {
      setLoading(true);

      setError("");

      const response = await fetch(
        `/api/admin/contact?search=${search}`,

        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        return;
      }

      setContacts(data.contacts);
    } catch (error) {
      setError("Unable to load contact messages.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadContacts();
  }, []);

  function handleSearch(e) {
    e.preventDefault();

    loadContacts();
  }

  async function deleteMessage(id) {
    const confirmDelete = window.confirm("Delete this contact message?");

    if (!confirmDelete) return;

    alert("Delete API will be connected in next lesson.");
  }

  if (loading) {
    return (
      <div className={styles.empty}>
        <h2>Loading Contact Messages...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.empty}>
        <h2>{error}</h2>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Top */}

      <div className={styles.topBar}>
        <div className={styles.title}>
          <h1>Contact Messages</h1>

          <p>Manage all contact enquiries</p>
        </div>

        <form className={styles.actions} onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchBox}
          />

          <button className={styles.refreshButton} type="submit">
            Search
          </button>
        </form>
      </div>

      {/* Table */}

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>

              <th>Name</th>

              <th>Email</th>

              <th>Mobile</th>

              <th>Subject</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="7" className={styles.empty}>
                  No Contact Messages Found
                </td>
              </tr>
            ) : (
              contacts.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>

                  <td>{item.fullName}</td>

                  <td>{item.email}</td>

                  <td>{item.mobile}</td>

                  <td>{item.subject}</td>

                  <td>
                    <span className={styles.badge}>New</span>
                  </td>

                  <td>
                    <div className={styles.actionButtons}>
                      <button className={styles.viewBtn}>View</button>

                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteMessage(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
