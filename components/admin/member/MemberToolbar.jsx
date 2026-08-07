"use client";

import {
  Search,
  RefreshCw,
  Download,
  UserPlus,
  Filter,
} from "lucide-react";

import styles from "./MemberToolbar.module.css";

export default function MemberToolbar({

  search,
  setSearch,
  onSearch,
  onRefresh,
  onExport,
  onAdd,

}) {

  return (

    <div className={styles.toolbar}>

      {/* Left */}

      <form
        className={styles.searchForm}
        onSubmit={onSearch}
      >

        <div className={styles.searchBox}>

          <Search
            size={18}
            className={styles.searchIcon}
          />

          <input

            type="text"

            placeholder="Search by Name, Email or Membership ID"

            value={search}

            onChange={(event) =>
              setSearch(event.target.value)
            }

          />

        </div>

      </form>

      {/* Right */}

      <div className={styles.actions}>

        <button
          type="button"
          className={styles.filter}
        >

          <Filter size={18} />

          Filter

        </button>

        <button
          type="button"
          className={styles.export}
          onClick={onExport}
        >

          <Download size={18} />

          Export

        </button>

        <button
          type="button"
          className={styles.refresh}
          onClick={onRefresh}
        >

          <RefreshCw size={18} />

        </button>

        <button
          type="button"
          className={styles.add}
          onClick={onAdd}
        >

          <UserPlus size={18} />

          Add Member

        </button>

      </div>

    </div>

  );

}