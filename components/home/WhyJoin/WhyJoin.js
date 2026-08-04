"use client";


/*
======================================================
Why Join AILP

Production Ready

Later:

Benefits can come from MongoDB.

======================================================
*/

import Link from "next/link";
import Image from "next/image";

import {
  FaBriefcase,
  FaScaleBalanced,
  FaUsers,
  FaPersonCircleCheck,
  FaArrowRight,
} from "react-icons/fa6";

import Section from "@/components/common/Section/Section";
import Container from "@/components/common/Container/Container";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";

import BenefitCard from "./BenefitCard";

import styles from "./WhyJoin.module.css";

/* ============================================= */

const benefits = [
  {
    icon: <FaBriefcase />,

    title: "Employment Opportunities",

    description:
      "Creating sustainable employment and supporting skill development across India.",
  },

  {
    icon: <FaScaleBalanced />,

    title: "Labour Rights",

    description:
      "Protecting workers through fair wages, safe workplaces and equal opportunities.",
  },

  {
    icon: <FaUsers />,

    title: "Social Justice",

    description:
      "Working for equality, dignity and inclusive growth for every citizen.",
  },

  {
    icon: <FaPersonCircleCheck />,

    title: "Women & Youth Empowerment",

    description:
      "Encouraging leadership, entrepreneurship and participation in nation building.",
  },
];

/* ============================================= */

export default function WhyJoin() {
  return (
    <Section light>
      <Container>
        <SectionHeading
          badge="WHY JOIN AILP"
          title="Together We Build A Better Future"
          subtitle="Join a movement dedicated to employment, labour welfare, social justice and inclusive national development."
        />

        <div className={styles.wrapper}>
          {/* Left */}

          <div className={styles.left}>
            <div className={styles.circleOne}></div>

            <div className={styles.circleTwo}></div>

           <Image
  src="/images/why-join.png"
  alt="Why Join AILP"
  width={520}
  height={520}
  className={styles.image}
/>
            
          </div>

          {/* Right */}

          <div className={styles.right}>
            {benefits.map((item, index) => (
              <BenefitCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}

            <Link href="/join" className={styles.button}>
              Become A Member
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
