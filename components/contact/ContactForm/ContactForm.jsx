"use client";

/* ==========================================================
   AILP Contact Form
   Functional MongoDB Contact Form
========================================================== */

import { useState } from "react";

import {
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import styles from "./ContactForm.module.css";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
  website: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus({
      type: "",
      message: "",
    });

    setLoading(true);

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to send your message."
        );
      }

      setStatus({
        type: "success",

        message:
          "Thank you! Your message has been sent successfully. Our team will contact you soon.",
      });

      setForm(initialForm);
    } catch (error) {
      setStatus({
        type: "error",

        message:
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span>WRITE TO US</span>

        <h2>Send Us a Message</h2>

        <p>
          Fill out the form below and our team will
          get back to you.
        </p>
      </div>

      {status.message && (
        <div
          className={`${styles.message} ${
            status.type === "success"
              ? styles.success
              : styles.error
          }`}
          role="alert"
        >
          {status.type === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}

          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Honeypot */}

        <div className={styles.honeypot}>
          <label htmlFor="website">
            Website
          </label>

          <input
            id="website"
            name="website"
            value={form.website}
            onChange={handleChange}
            autoComplete="off"
            tabIndex="-1"
          />
        </div>

        <div className={styles.grid}>
          {/* Name */}

          <div className={styles.field}>
            <label htmlFor="name">
              Full Name
              <span>*</span>
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
              maxLength={100}
            />
          </div>

          {/* Email */}

          <div className={styles.field}>
            <label htmlFor="email">
              Email Address
              <span>*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              maxLength={150}
            />
          </div>

          {/* Phone */}

          <div className={styles.field}>
            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              maxLength={20}
            />
          </div>

          {/* Subject */}

          <div className={styles.field}>
            <label htmlFor="subject">
              Subject
              <span>*</span>
            </label>

            <input
              id="subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={handleChange}
              placeholder="What would you like to discuss?"
              required
              maxLength={200}
            />
          </div>
        </div>

        {/* Message */}

        <div className={styles.field}>
          <label htmlFor="message">
            Message
            <span>*</span>
          </label>

          <textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Write your message here..."
            rows="7"
            required
            maxLength={3000}
          />

          <small>
            Maximum 3000 characters.
          </small>
        </div>

        {/* Submit */}

        <button
          type="submit"
          className={styles.submit}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2
                size={19}
                className={styles.spinner}
              />

              Sending...
            </>
          ) : (
            <>
              Send Message
              <Send size={18} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}