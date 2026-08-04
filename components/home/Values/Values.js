"use client";

/*
==========================================================

WHAT WE STAND FOR

This section explains the core principles
of the All India Labour Party.

This is a reusable, production-ready component.

Later the values can come from MongoDB.

==========================================================
*/

import {
  FaBriefcase,
  FaScaleBalanced,
  FaGraduationCap,
  FaPeopleGroup,
  FaPersonDress,
  FaLeaf,
} from "react-icons/fa6";

import Section from "@/components/common/Section/Section";
import Container from "@/components/common/Container/Container";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";

import ValueCard from "./ValueCard";

import styles from "./Values.module.css";

/* ======================================================

Values Data

====================================================== */

const values = [
  {
    icon: <FaBriefcase />,

    title: "Employment",

    description:
      "Creating sustainable employment opportunities and improving the quality of work across India.",
  },

  {
    icon: <FaScaleBalanced />,

    title: "Labour Rights",

    description:
      "Protecting workers through fair wages, safe workplaces and equal rights.",
  },

  {
    icon: <FaGraduationCap />,

    title: "Skill Development",

    description:
      "Empowering youth with education, vocational training and lifelong learning.",
  },

  {
    icon: <FaPeopleGroup />,

    title: "Unity",

    description:
      "Building a stronger nation through harmony, inclusion and collective progress.",
  },

  {
    icon: <FaPersonDress />,

    title: "Women Empowerment",

    description:
      "Encouraging equal opportunities and leadership for women in every sector.",
  },

  {
    icon: <FaLeaf />,

    title: "Sustainable Growth",

    description:
      "Supporting balanced economic development while protecting our environment.",
  },
];

/* ====================================================== */

export default function Values() {
  return (
    <Section>
      <Container>
        {/* Section Heading */}

        <SectionHeading
          badge="OUR VALUES"
          title="What We Stand For"
          subtitle="Our commitment is to build an India where every worker, youth and citizen has equal opportunities, dignity and a brighter future."
        />

        {/* Values Grid */}

        <div className={styles.grid}>
          {values.map((item, index) => (
            <ValueCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
