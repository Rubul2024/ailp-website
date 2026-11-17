"use client";

/* ==========================================================
   Member Context
   One shared copy of the logged-in member for the whole
   portal shell (sidebar, header and pages).
========================================================== */

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MemberContext = createContext({
  member: null,
  loading: true,
  error: "",
  refresh: async () => null,
  setMember: () => {},
});

/* Pure fetch — no React state, so it is safe to call from effects. */
async function fetchMember() {
  try {
    const res = await fetch("/api/member/profile", {
      credentials: "include",
      cache: "no-store",
    });

    if (res.status === 401) return { unauthorized: true };

    const data = await res.json();
    if (!res.ok || !data.success || !data.member) {
      return { error: data.message || "Unable to load your account." };
    }
    return { member: data.member };
  } catch {
    return { error: "Unable to reach the server. Please check your connection." };
  }
}

export function MemberProvider({ children }) {
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apply = useCallback(
    (result) => {
      if (result.unauthorized) {
        router.replace("/member/login");
        return null;
      }
      if (result.member) setMember(result.member);
      setError(result.error || "");
      setLoading(false);
      return result.member || null;
    },
    [router]
  );

  const refresh = useCallback(async () => apply(await fetchMember()), [apply]);

  useEffect(() => {
    let alive = true;
    fetchMember().then((result) => {
      if (alive) apply(result);
    });
    return () => {
      alive = false;
    };
  }, [apply]);

  return (
    <MemberContext.Provider value={{ member, loading, error, refresh, setMember }}>
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  return useContext(MemberContext);
}
