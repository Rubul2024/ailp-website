"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./Header.module.css";

const menu=[

{title:"Home",href:"/"},

{title:"About",href:"/about"},

{title:"Leadership",href:"/leadership"},

{title:"News",href:"/news"},

{title:"Gallery",href:"/gallery"},

{title:"Contact",href:"/contact"}

];

export default function Navigation(){

const pathname=usePathname();

return(

<nav className={styles.navigation}>

{

menu.map((item)=>(

<Link

key={item.title}

href={item.href}

className={`${styles.navLink} ${pathname===item.href ? styles.active : ""}`}

>

{item.title}

</Link>

))

}

</nav>

);

}