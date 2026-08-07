"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import styles from "./AuthButtons.module.css";

export default function AuthButtons() {

  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {

    checkLogin();

  }, []);

  async function checkLogin() {

    try {

      const response = await fetch(

        "/api/member/me",

        {

          credentials: "include",

        }

      );

      const data = await response.json();

      setLoggedIn(data.success);

    }

    catch {

      setLoggedIn(false);

    }

  }

  async function logout() {

    await fetch(

      "/api/auth/logout",

      {

        method:"POST",

        credentials:"include",

      }

    );

    router.refresh();

    router.push("/");

  }

  if(loggedIn){

    return(

      <div className={styles.group}>

        <Link

          href="/member/dashboard"

          className={styles.dashboard}

        >

          Dashboard

        </Link>

        <Link

          href="/member/profile"

          className={styles.profile}

        >

          My Profile

        </Link>

        <button

          onClick={logout}

          className={styles.logout}

        >

          Logout

        </button>

      </div>

    );

  }

  return(

    <div className={styles.group}>

      <Link

        href="/member/register"

        className={styles.join}

      >

        Join AILP

      </Link>

      <Link

        href="/member/login"

        className={styles.login}

      >

        Member Login

      </Link>

    </div>

  );

}