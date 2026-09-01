"use client";

import { useEffect, useState, useCallback, useTransition } from "react";
import {
  Search,
  Download,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye,
  X,
  UserCheck,
  UserX,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Briefcase,
  AlertCircle,
  ShieldCheck,
  Users,
  CheckCircle2,
  XCircle,
  Globe2,
  ExternalLink,
} from "lucide-react";
import styles from "./Members.module.css";

export default function AdminMembersPage() {
  const [members, setMembers] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  const [stats, setStats] = useState({ totalRegistered: 0, activeMembers: 0, inactiveMembers: 0, totalStates: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, startTransition] = useTransition();

  // Filters
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Modal & Actions
  const [selectedMember, setSelectedMember] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Helper to extract photo URL safely from string or object
  const getPhotoUrl = (photo) => {
    if (!photo) return null;
    if (typeof photo === "string") return photo;
    if (typeof photo === "object" && photo.url) return photo.url;
    return null;
  };

  // Helper to determine active/inactive status across different schema patterns
  const isMemberActive = (m) => {
    if (typeof m.isActive === "boolean") return m.isActive;
    if (m.status) return m.status.toLowerCase() === "active";
    return true;
  };

  const getMemberId = (m) => m.membershipId || m.memberId || "PENDING";

  const fetchMembers = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        search: search.trim(),
        state: selectedState,
        status: selectedStatus,
      });

      const res = await fetch(`/api/admin/members?${params.toString()}`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to load members.");
      }

      const memberList = data.members || data.data || [];
      setMembers(memberList);

      setPagination(
        data.pagination || {
          page,
          limit: 10,
          total: memberList.length,
          totalPages: 1,
        }
      );

      if (data.stats) {
        setStats(data.stats);
      }

      if (data.availableStates && Array.isArray(data.availableStates)) {
        setAvailableStates(data.availableStates);
      } else {
        const statesFromList = Array.from(new Set(memberList.map((m) => m.state).filter(Boolean)));
        setAvailableStates(statesFromList);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, selectedState, selectedStatus]);

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        fetchMembers(1);
      });
    }, 350);
    return () => clearTimeout(handler);
  }, [fetchMembers]);

  // Robust Status Toggle
  const handleStatusToggle = async (member, newStatusIsActive) => {
    if (!member || (!member._id && !member.membershipId && !member.memberId)) {
      alert("Invalid member record.");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/admin/members", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          id: member._id,
          memberId: member.membershipId || member.memberId,
          isActive: newStatusIsActive,
          status: newStatusIsActive ? "Active" : "Inactive",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not update status.");
      }

      setMembers((prev) =>
        prev.map((m) =>
          m._id === member._id ? { ...m, isActive: newStatusIsActive, status: newStatusIsActive ? "Active" : "Inactive" } : m
        )
      );

      if (selectedMember && selectedMember._id === member._id) {
        setSelectedMember((prev) => ({
          ...prev,
          isActive: newStatusIsActive,
          status: newStatusIsActive ? "Active" : "Inactive",
        }));
      }
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
        state: selectedState,
        status: selectedStatus,
      });

      const res = await fetch(`/api/admin/members?${params.toString()}`, {
        credentials: "include",
      });
      const data = await res.json();
      const exportList = data.members || data.data || [];

      if (!exportList.length) {
        alert("No records found to export.");
        return;
      }

      const headers = [
        "Membership ID",
        "Full Name",
        "Email",
        "Mobile",
        "Gender",
        "DOB",
        "District",
        "State",
        "Pincode",
        "Occupation",
        "Status",
        "Registration Date",
      ];

      const rows = exportList.map((m) => [
        `"${getMemberId(m)}"`,
        `"${m.fullName || ""}"`,
        `"${m.email || ""}"`,
        `"${m.mobile || ""}"`,
        `"${m.gender || ""}"`,
        `"${m.dateOfBirth ? new Date(m.dateOfBirth).toLocaleDateString("en-IN") : ""}"`,
        `"${m.district || ""}"`,
        `"${m.state || ""}"`,
        `"${m.pincode || ""}"`,
        `"${m.occupation || ""}"`,
        `"${isMemberActive(m) ? "Active" : "Inactive"}"`,
        `"${m.createdAt || m.joinDate ? new Date(m.createdAt || m.joinDate).toLocaleDateString("en-IN") : ""}"`,
      ]);

      const csvContent =
        "data:text/csv;charset=utf-8," +
        [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `AILP_Members_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to export: " + err.message);
    } finally {
      setExporting(false);
    }
  };

  const totalRegisteredCount = stats.totalRegistered || pagination.total || members.length;
  const totalActiveCount = stats.activeMembers || members.filter(isMemberActive).length;
  const totalInactiveCount = stats.inactiveMembers || members.filter((m) => !isMemberActive(m)).length;

  return (
    <div className={styles.container}>
      {/* Top Stat Cards */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statBlue}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Total Registered</span>
            <span className={styles.statNumber}>{totalRegisteredCount}</span>
            <span className={styles.statHint}>Verified Citizens</span>
          </div>
          <div className={styles.statIconBadge}>
            <Users size={22} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statGreen}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Active Members</span>
            <span className={styles.statNumber}>{totalActiveCount}</span>
            <span className={styles.statHint}>Fully authorized</span>
          </div>
          <div className={styles.statIconBadge}>
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statOrange}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Inactive / Pending</span>
            <span className={styles.statNumber}>{totalInactiveCount}</span>
            <span className={styles.statHint}>Suspended or review</span>
          </div>
          <div className={styles.statIconBadge}>
            <XCircle size={22} />
          </div>
        </div>

        <div className={`${styles.statCard} ${styles.statPurple}`}>
          <div className={styles.statContent}>
            <span className={styles.statTitle}>Regions & States</span>
            <span className={styles.statNumber}>{stats.totalStates || availableStates.length || 1}</span>
            <span className={styles.statHint}>Pan-India Presence</span>
          </div>
          <div className={styles.statIconBadge}>
            <Globe2 size={22} />
          </div>
        </div>
      </div>

      {/* Filter & Action Toolbar */}
      <div className={styles.filterCard}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by name, ID, phone, district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.selectWrapper}>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className={styles.customSelect}
            >
              <option value="ALL">All States</option>
              {availableStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.selectWrapper}>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className={styles.customSelect}
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="REGISTERED">Registered</option>
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
            onClick={() => fetchMembers(pagination.page)}
            disabled={loading}
            title="Refresh List"
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

      {/* Main Members Data Grid */}
      <div className={styles.tableCard}>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Member Info</th>
                <th>Membership ID</th>
                <th>Contact Details</th>
                <th>Location</th>
                <th>Status</th>
                <th>Joined Date</th>
                <th className={styles.alignRight}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className={styles.emptyCell}>
                    <div className={styles.loadingRow}>
                      <RefreshCw size={20} className={styles.spin} />
                      <span>Fetching members...</span>
                    </div>
                  </td>
                </tr>
              ) : members.length > 0 ? (
                members.map((m) => {
                  const active = isMemberActive(m);
                  const photoUrl = getPhotoUrl(m.photo);
                  const displayId = getMemberId(m);

                  return (
                    <tr key={m._id || displayId}>
                      <td>
                        <div className={styles.memberInfo}>
                          <div className={styles.avatarWrap}>
                            {photoUrl ? (
                              <img
                                src={photoUrl}
                                alt={m.fullName || "Member"}
                                className={styles.avatarImg}
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                  if (e.currentTarget.nextSibling) {
                                    e.currentTarget.nextSibling.style.display = "flex";
                                  }
                                }}
                              />
                            ) : null}
                            <div
                              className={styles.avatarFallback}
                              style={{ display: photoUrl ? "none" : "flex" }}
                            >
                              {m.fullName?.charAt(0)?.toUpperCase() || "M"}
                            </div>
                          </div>
                          <div>
                            <div className={styles.memberName}>{m.fullName || "Unnamed Member"}</div>
                            <div className={styles.memberSub}>{m.occupation || "Party Member"}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span className={styles.idBadge}>
                          {displayId}
                        </span>
                      </td>

                      <td>
                        <div className={styles.contactCell}>
                          <span className={styles.phoneText}>
                            <Phone size={12} className={styles.miniIcon} />
                            {m.mobile || "—"}
                          </span>
                          <span className={styles.emailText}>
                            <Mail size={12} className={styles.miniIcon} />
                            {m.email || "—"}
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className={styles.locationCell}>
                          <span className={styles.districtText}>{m.district || "—"}</span>
                          <span className={styles.stateBadge}>{m.state || "India"}</span>
                        </div>
                      </td>

                      <td>
                        <span className={`${styles.statusPill} ${active ? styles.active : styles.inactive}`}>
                          <span className={styles.statusDot} />
                          {active ? "Active" : "Inactive"}
                        </span>
                      </td>

                      <td>
                        <span className={styles.dateText}>
                          {m.createdAt || m.joinDate
                            ? new Date(m.createdAt || m.joinDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "—"}
                        </span>
                      </td>

                      <td>
                        <div className={styles.actionsCell}>
                          <button
                            type="button"
                            className={styles.actionBtn}
                            onClick={() => setSelectedMember(m)}
                            title="View Profile"
                          >
                            <Eye size={15} />
                          </button>

                          {active ? (
                            <button
                              type="button"
                              className={`${styles.actionBtn} ${styles.dangerHover}`}
                              onClick={() => handleStatusToggle(m, false)}
                              disabled={actionLoading}
                              title="Deactivate Member"
                            >
                              <UserX size={15} />
                            </button>
                          ) : (
                            <button
                              type="button"
                              className={`${styles.actionBtn} ${styles.successHover}`}
                              onClick={() => handleStatusToggle(m, true)}
                              disabled={actionLoading}
                              title="Activate Member"
                            >
                              <UserCheck size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className={styles.emptyCell}>
                    No registered members matching criteria.
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
              {members.length ? (pagination.page - 1) * pagination.limit + 1 : 0}
            </strong>{" "}
            to{" "}
            <strong>
              {Math.min(pagination.page * pagination.limit, pagination.total || members.length)}
            </strong>{" "}
            of <strong>{pagination.total || members.length}</strong> members
          </span>

          <div className={styles.paginationActions}>
            <button
              type="button"
              className={styles.pageButton}
              onClick={() => fetchMembers(pagination.page - 1)}
              disabled={pagination.page <= 1 || loading}
            >
              <ChevronLeft size={15} />
              <span>Previous</span>
            </button>

            <span className={styles.pageStatus}>
              Page <strong>{pagination.page}</strong> of <strong>{pagination.totalPages || 1}</strong>
            </span>

            <button
              type="button"
              className={styles.pageButton}
              onClick={() => fetchMembers(pagination.page + 1)}
              disabled={pagination.page >= (pagination.totalPages || 1) || loading}
            >
              <span>Next</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div className={styles.modalBackdrop} onClick={() => setSelectedMember(null)}>
          <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalBanner}>
              <div className={styles.modalBannerContent}>
                <div className={styles.avatarModal}>
                  {getPhotoUrl(selectedMember.photo) ? (
                    <img src={getPhotoUrl(selectedMember.photo)} alt={selectedMember.fullName} />
                  ) : (
                    <div>{selectedMember.fullName?.charAt(0)?.toUpperCase() || "M"}</div>
                  )}
                </div>
                <div className={styles.bannerInfo}>
                  <h3 className={styles.modalName}>{selectedMember.fullName}</h3>
                  <p className={styles.modalOccupation}>
                    {selectedMember.occupation || "Party Member"}
                  </p>
                  <span className={styles.modalSubId}>
                    <ShieldCheck size={14} /> ID: {getMemberId(selectedMember)}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setSelectedMember(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.statusRow}>
                <span className={styles.statusLabel}>Current Status:</span>
                <span
                  className={`${styles.statusPill} ${
                    isMemberActive(selectedMember) ? styles.active : styles.inactive
                  }`}
                >
                  <span className={styles.statusDot} />
                  {isMemberActive(selectedMember) ? "Active" : "Inactive"}
                </span>
              </div>

              <div className={styles.metaGrid}>
                <div className={styles.metaBox}>
                  <div className={styles.metaIconWrap}>
                    <Phone size={16} />
                  </div>
                  <div>
                    <label>Mobile Number</label>
                    <p>{selectedMember.mobile || "—"}</p>
                  </div>
                </div>

                <div className={styles.metaBox}>
                  <div className={styles.metaIconWrap}>
                    <Mail size={16} />
                  </div>
                  <div>
                    <label>Email Address</label>
                    <p>{selectedMember.email || "—"}</p>
                  </div>
                </div>

                <div className={styles.metaBox}>
                  <div className={styles.metaIconWrap}>
                    <Calendar size={16} />
                  </div>
                  <div>
                    <label>Date of Birth</label>
                    <p>
                      {selectedMember.dateOfBirth
                        ? new Date(selectedMember.dateOfBirth).toLocaleDateString("en-IN")
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className={styles.metaBox}>
                  <div className={styles.metaIconWrap}>
                    <Briefcase size={16} />
                  </div>
                  <div>
                    <label>Gender & Guardian</label>
                    <p>
                      {selectedMember.gender || "—"} • {selectedMember.fatherName || "—"}
                    </p>
                  </div>
                </div>

                <div className={`${styles.metaBox} ${styles.fullWidth}`}>
                  <div className={styles.metaIconWrap}>
                    <MapPin size={16} />
                  </div>
                  <div>
                    <label>Registered Address</label>
                    <p>
                      {[
                        selectedMember.address,
                        selectedMember.village || selectedMember.villageCity,
                        selectedMember.district,
                        selectedMember.state,
                        selectedMember.pincode,
                      ]
                        .filter(Boolean)
                        .join(", ") || "No address on record"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.modalFooter}>
              {(selectedMember.cardUrl || selectedMember.cardPdf) && (
                <a
                  href={selectedMember.cardUrl || selectedMember.cardPdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pdfBtn}
                >
                  <ExternalLink size={15} />
                  <span>Download ID Card</span>
                </a>
              )}

              {isMemberActive(selectedMember) ? (
                <button
                  type="button"
                  className={styles.btnDanger}
                  onClick={() => handleStatusToggle(selectedMember, false)}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Updating..." : "Deactivate Member"}
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.btnSuccess}
                  onClick={() => handleStatusToggle(selectedMember, true)}
                  disabled={actionLoading}
                >
                  {actionLoading ? "Updating..." : "Activate Member"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}