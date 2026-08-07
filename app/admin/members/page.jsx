"use client";

import { useEffect, useState } from "react";
import { User, RefreshCw } from "lucide-react";
import styles from "./Members.module.css";
import MemberViewModal from "@/components/admin/member/MemberViewModal";
import MemberStats from "@/components/admin/member/MemberStats";
import MemberToolbar from "@/components/admin/member/MemberToolbar";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  /* ==========================================
   Member Statistics
========================================== */

  const statistics = {
    total: members.length,

    active: members.filter((member) => member.isActive !== false).length,

    new: members.filter((member) => {
      if (!member.createdAt) return false;

      const createdDate = new Date(member.createdAt);

      const currentDate = new Date();

      return (
        createdDate.getMonth() === currentDate.getMonth() &&
        createdDate.getFullYear() === currentDate.getFullYear()
      );
    }).length,

    inactive: members.filter((member) => member.isActive === false).length,
  };

  async function loadMembers(currentPage = page) {
    try {
      setLoading(true);

      setError("");

      const response = await fetch(
        `/api/admin/members?page=${currentPage}&limit=10&search=${encodeURIComponent(search)}`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.message);

        return;
      }

      setMembers(data.members);

      setTotalPages(data.totalPages);

      setPage(data.currentPage);
    } catch {
      setError("Unable to load members.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMembers(1);
  }, []);

  function handleSearch(event) {
    event.preventDefault();

    loadMembers(1);
  }

  function handleRefresh() {
    loadMembers(page);
  }

  function handleExport() {
    alert("CSV Export will be added in the next lesson.");
  }

  function handleAdd() {
    alert("Add Member form will be added in the next lesson.");
  }

  function handleView(member) {
    setSelectedMember(member);
  }

  function handleEdit(member) {
    alert(`Edit Member\n\n${member.fullName}`);
  }

  function handleDelete(member) {
    const confirmDelete = window.confirm(`Delete ${member.fullName}?`);

    if (!confirmDelete) return;

    alert("Delete API will be added in the next lesson.");
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        <h2>Loading Members...</h2>
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
      {/* Header */}

      <div className={styles.topBar}>
        <div className={styles.title}>
          <h1>Members Management</h1>

          <p>Manage all registered party members.</p>
        </div>

        <MemberToolbar
          search={search}
          setSearch={setSearch}
          onSearch={handleSearch}
          onRefresh={handleRefresh}
          onExport={handleExport}
          onAdd={handleAdd}
        />
      </div>

      {/* Member Statistics */}

      <MemberStats statistics={statistics} />

      {/* Table */}

      <div className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>

              <th>Member</th>

              <th>Email</th>

              <th>Membership ID</th>

              <th>Status</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {members.length === 0 ? (
              <tr>
                <td colSpan="6" className={styles.empty}>
                  No Members Found
                </td>
              </tr>
            ) : (
              members.map((member, index) => (
                <tr key={member._id}>
                  <td>{(page - 1) * 10 + index + 1}</td>

                  <td>
                    <div className={styles.member}>
                      <div className={styles.avatar}>
                        <User size={22} />
                      </div>

                      <div>
                        <strong>{member.fullName}</strong>
                      </div>
                    </div>
                  </td>

                  <td>{member.email}</td>

                  <td>{member.membershipId}</td>

                  <td>
                    <span className={styles.badge}>Active</span>
                  </td>

                  <td>
                    <div className={styles.buttons}>
                      <button
                        className={styles.view}
                        onClick={() => handleView(member)}
                      >
                        View
                      </button>

                      <button
                        className={styles.edit}
                        onClick={() => handleEdit(member)}
                      >
                        Edit
                      </button>

                      <button
                        className={styles.delete}
                        onClick={() => handleDelete(member)}
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

      {/* Pagination */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <button
          className={styles.refreshButton}
          disabled={page === 1}
          onClick={() => loadMembers(page - 1)}
        >
          Previous
        </button>

        <span
          style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 600,
          }}
        >
          Page {page} of {totalPages}
        </span>

        <button
          className={styles.refreshButton}
          disabled={page >= totalPages}
          onClick={() => loadMembers(page + 1)}
        >
          Next
        </button>
      </div>
      <MemberViewModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}
