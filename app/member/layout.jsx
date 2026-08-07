"use client";

import { usePathname } from "next/navigation";

import MemberSidebar from "@/components/member/MemberSidebar";
import MemberHeader from "@/components/member/MemberHeader";

import styles from "./MemberLayout.module.css";

export default function MemberLayout({

  children,

}) {

  const pathname = usePathname();

  /*
  |--------------------------------------------------------
  | Pages that should NOT use Member Layout
  |--------------------------------------------------------
  */

  const authPages = [

    "/member/login",

    "/member/register",

    "/member/forgot-password",

  ];

  if (authPages.includes(pathname)) {

    return children;

  }

  return (

    <div className={styles.layout}>

      <MemberSidebar />

      <div className={styles.content}>

        <MemberHeader />

        <main className={styles.main}>

          {children}

        </main>

      </div>

    </div>

  );

}