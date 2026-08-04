/*
====================================================
Leadership Section

Static Data

Later this array will come from MongoDB.

No UI changes required.
====================================================
*/

import Section from "@/components/common/Section/Section";
import Container from "@/components/common/Container/Container";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";

import LeaderCard from "./LeaderCard";

import styles from "./Leadership.module.css";

const leaders=[

{
name:"Leader Name",
designation:"National President",
description:"Committed to empowering workers and building a stronger India.",
image:"/images/leader1.jpg"
},

{
name:"Leader Name",
designation:"General Secretary",
description:"Dedicated to labour welfare and employment generation.",
image:"/images/leader2.jpg"
},

{
name:"Leader Name",
designation:"Vice President",
description:"Working towards equality, development and social justice.",
image:"/images/leader3.jpg"
}

];

export default function Leadership(){

return(

<Section light>

<Container>

<SectionHeading

badge="OUR LEADERSHIP"

title="Meet Our Leadership"

subtitle="Experienced leaders working together for employment, equality and national development."

/>

<div className={styles.grid}>

{

leaders.map((leader,index)=>(

<LeaderCard

key={index}

leader={leader}

/>

))

}

</div>

</Container>

</Section>

);

}