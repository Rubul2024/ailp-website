/*
==========================================================
Gallery Section

Currently:
Uses static data.

Later:
Will use MongoDB + Cloudinary.

==========================================================
*/

import Section from "@/components/common/Section/Section";
import Container from "@/components/common/Container/Container";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";

import GalleryCard from "./GalleryCard";

import styles from "./Gallery.module.css";

/* Gallery Data */

const gallery = [

{
title:"Membership Campaign",
category:"Campaign",
image:"/images/gallery1.jpg"
},

{
title:"Workers Meeting",
category:"Meeting",
image:"/images/gallery2.jpg"
},

{
title:"National Conference",
category:"Conference",
image:"/images/gallery3.jpg"
},

{
title:"Youth Program",
category:"Event",
image:"/images/gallery4.jpg"
},

{
title:"Labour Awareness",
category:"Awareness",
image:"/images/gallery5.jpg"
},

{
title:"Public Gathering",
category:"Event",
image:"/images/gallery6.jpg"
}

];

export default function Gallery(){

return(

<Section light>

<Container>

<SectionHeading

badge="PHOTO GALLERY"

title="Our Activities"

subtitle="Explore campaigns, meetings, public events and activities of the All India Labour Party."

/>

<div className={styles.grid}>

{

gallery.map((item,index)=>(

<GalleryCard

key={index}

item={item}

/>

))

}

</div>

</Container>

</Section>

);

}