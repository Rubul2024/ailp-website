"use client";

import {

Users,

UserCheck,

UserPlus,

UserX,

} from "lucide-react";

import styles from "./MemberStats.module.css";

export default function MemberStats({

statistics,

}){

const cards=[

{

title:"Total Members",

value:statistics.total,

icon:Users,

color:styles.blue,

},

{

title:"Active Members",

value:statistics.active,

icon:UserCheck,

color:styles.green,

},

{

title:"New This Month",

value:statistics.new,

icon:UserPlus,

color:styles.orange,

},

{

title:"Inactive",

value:statistics.inactive,

icon:UserX,

color:styles.red,

},

];

return(

<div className={styles.wrapper}>

{cards.map((item)=>{

const Icon=item.icon;

return(

<div

key={item.title}

className={styles.card}

>

<div className={styles.content}>

<h4>

{item.title}

</h4>

<h2>

{item.value}

</h2>

</div>

<div

className={`${styles.icon} ${item.color}`}

>

<Icon size={30}/>

</div>

</div>

);

})}

</div>

);

}