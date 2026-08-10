"use client";

/* ==========================================================
   AILP Contact Information
========================================================== */

import {
  MapPin,
  Phone,
  Mail,
  Clock3,
} from "lucide-react";

import styles from "./ContactInfo.module.css";

const contactItems = [
  {
    icon: MapPin,
    title: "Office Address",
    text: "All India Labour Party",
    subtext: "India",
  },

  {
    icon: Phone,
    title: "Phone",
    text: "+91 12345 67890",
    subtext: "Mon - Sat, 9:00 AM - 6:00 PM",
  },

  {
    icon: Mail,
    title: "Email",
    text: "info@ailp.org",
    subtext: "We usually reply within 1-2 business days.",
  },

  {
    icon: Clock3,
    title: "Office Hours",
    text: "Monday - Saturday",
    subtext: "9:00 AM - 6:00 PM",
  },
];

export default function ContactInfo() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.heading}>
        <span>GET IN TOUCH</span>

        <h2>
          Contact
          <br />
          <strong>Our Team</strong>
        </h2>

        <p>
          Whether you have a question about our
          organisation, membership or initiatives,
          our team is here to help.
        </p>
      </div>

      <div className={styles.list}>
        {contactItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              className={styles.item}
              key={item.title}
            >
              <div className={styles.icon}>
                <Icon size={21} />
              </div>

              <div>
                <h3>{item.title}</h3>

                <p>{item.text}</p>

                <span>{item.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}