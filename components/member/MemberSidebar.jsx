"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {

LayoutDashboard,

BadgeCheck,

User,

IndianRupee,

Settings,

LogOut,

ChevronRight,

} from "lucide-react";

import styles from "./MemberSidebar.module.css";

const menus=[

{

title:"Dashboard",

href:"/member/dashboard",

icon:LayoutDashboard,

},

{

title:"Membership Card",

href:"/member/membership",

icon:BadgeCheck,

},

{

title:"My Profile",

href:"/member/profile",

icon:User,

},

{

title:"Donation",

href:"/member/donation",

icon:IndianRupee,

},

{

title:"Settings",

href:"/member/settings",

icon:Settings,

},

];

export default function MemberSidebar(){

const pathname=usePathname();

const router=useRouter();

async function handleLogout(){

try{

await fetch(

"/api/auth/logout",

{

method:"POST",

credentials:"include",

}

);

router.push("/member/login");

router.refresh();

}

catch{

alert("Logout failed.");

}

}

return(

<aside className={styles.sidebar}>

<div className={styles.logoArea}>

<div className={styles.logo}>

AIL<span>P</span>

</div>

<p>

Member Portal

</p>

</div>

<nav className={styles.menu}>

{

menus.map(item=>{

const Icon=item.icon;

const active=pathname===item.href;

return(

<Link

key={item.href}

href={item.href}

className={`${styles.item} ${active?styles.active:""}`}

>

<div className={styles.left}>

<Icon size={21}/>

<span>

{item.title}

</span>

</div>

<ChevronRight size={18}/>

</Link>

);

})

}

</nav>

<div className={styles.bottom}>

<button

className={styles.logout}

onClick={handleLogout}

>

<LogOut size={20}/>

Logout

</button>

</div>

</aside>

);

}