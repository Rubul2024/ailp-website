/*
==========================================================
Latest News Section

Later:

const news = await getLatestNews();

UI will remain unchanged.

==========================================================
*/

import Section from "@/components/common/Section/Section";
import Container from "@/components/common/Container/Container";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";

import NewsCard from "./NewsCard";

import styles from "./News.module.css";

/* -----------------------------------------
   Temporary Data
----------------------------------------- */

const news = [

{
title:"Membership Drive Started",
category:"Campaign",
date:"04 August 2026",
description:"Join the All India Labour Party membership campaign across India.",
image:"/images/news1.jpg"
},

{
title:"National Workers Meeting",
category:"Event",
date:"01 August 2026",
description:"Leaders discussed employment generation and labour welfare initiatives.",
image:"/images/news2.jpg"
},

{
title:"Youth Employment Program",
category:"Announcement",
date:"28 July 2026",
description:"New initiatives launched for skill development and employment.",
image:"/images/news3.jpg"
}

];

export default function News(){

return(

<Section>

<Container>

<SectionHeading

badge="LATEST NEWS"

title="Latest News & Announcements"

subtitle="Stay updated with the latest activities, campaigns and announcements from the All India Labour Party."

/>

<div className={styles.grid}>

{

news.map((article,index)=>(

<NewsCard

key={index}

article={article}

/>

))

}

</div>

</Container>

</Section>

);

}