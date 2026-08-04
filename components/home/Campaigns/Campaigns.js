/*
==========================================================
AILP - Featured Campaigns Section
==========================================================

Purpose:
Displays the latest campaigns of the All India Labour Party.

Current:
- Uses static JavaScript data.

Future:
- Data will come from MongoDB.
- Images will come from Cloudinary.
- Admin Panel will manage campaigns.

==========================================================
*/

import Section from "@/components/common/Section/Section";
import Container from "@/components/common/Container/Container";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";

import CampaignCard from "./CampaignCard";

import styles from "./Campaigns.module.css";

/* =======================================================
   Temporary Campaign Data
======================================================= */

const campaigns = [
  {
    id: 1,
    title: "Employment for Every Youth",
    category: "Employment",
    status: "Active",
    description:
      "Creating employment opportunities through skill development, entrepreneurship and labour-friendly policies across India.",

    image: "/images/campaign1.jpg",

    buttonText: "Learn More",
    link: "/campaigns/employment-for-every-youth",
  },

  {
    id: 2,
    title: "Workers' Rights Awareness",

    category: "Labour Rights",

    status: "Ongoing",

    description:
      "Helping workers understand labour laws, minimum wages, workplace safety and social security benefits.",

    image: "/images/campaign2.jpg",

    buttonText: "Learn More",

    link: "/campaigns/workers-rights-awareness",
  },

  {
    id: 3,

    title: "Women Empowerment Mission",

    category: "Women",

    status: "Upcoming",

    description:
      "Encouraging education, leadership, entrepreneurship and financial independence for women.",

    image: "/images/campaign3.jpg",

    buttonText: "Learn More",

    link: "/campaigns/women-empowerment",
  },
];

/* =======================================================
   Campaigns Component
======================================================= */

export default function Campaigns() {
  return (
    <Section light>
      <Container>
        {/* ===============================
            Section Heading
        =============================== */}

        <SectionHeading
          badge="FEATURED CAMPAIGNS"
          title="Working Towards a Better Tomorrow"
          subtitle="Explore the ongoing campaigns of the All India Labour Party focused on employment, labour rights, social justice and national development."
        />

        {/* ===============================
            Campaign Grid
        =============================== */}

        <div className={styles.grid}>
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} campaign={campaign} />
          ))}
        </div>
      </Container>
    </Section>
  );
}