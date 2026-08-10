"use client";

import { useMemo, useState } from "react";

import {
  ChevronDown,
  HelpCircle,
  SearchX,
} from "lucide-react";

import FAQHero from "../FAQHero/FAQHero";

import styles from "./FAQSection.module.css";

const FAQ_DATA = [
  {
    category: "Membership",
    question: "How can I become a member of AILP?",
    answer:
      "You can join the All India Labour Party by completing the online membership registration form. After submitting your details, your membership information can be accessed through the member portal.",
  },

  {
    category: "Membership",
    question: "Who can join the All India Labour Party?",
    answer:
      "Anyone who supports the principles, objectives and democratic values of the All India Labour Party can explore membership and participation through the official membership process.",
  },

  {
    category: "Membership",
    question: "How do I access my member profile?",
    answer:
      "Registered members can sign in through the Member Login section and access their profile, membership information and available member services.",
  },

  {
    category: "Membership",
    question: "Can I update my membership information?",
    answer:
      "Yes. Members can access their profile through the member portal and update the information that is available for editing.",
  },

  {
    category: "Membership Card",
    question: "Will I receive a digital membership card?",
    answer:
      "Eligible members can access their digital membership card through the member portal. The card contains membership information and a verification QR code.",
  },

  {
    category: "Membership Card",
    question: "How can I verify a membership card?",
    answer:
      "The QR code displayed on the digital membership card can be scanned to access the relevant membership verification page.",
  },

  {
    category: "Donations",
    question: "How can I support AILP financially?",
    answer:
      "You can support the organisation through the official donation options provided on the website. Please use only the official donation channels.",
  },

  {
    category: "Donations",
    question: "Can I make a donation online?",
    answer:
      "Yes. The website can provide online donation options through the official donation page.",
  },

  {
    category: "Participation",
    question: "How can I participate in AILP activities?",
    answer:
      "You can participate by becoming a member, engaging with local activities, supporting campaigns and contributing to community initiatives.",
  },

  {
    category: "General",
    question: "Where can I learn about the mission of AILP?",
    answer:
      "You can visit the Our Mission and Our Vision pages to learn more about the organisation's objectives, principles and long-term direction.",
  },

  {
    category: "General",
    question: "How can I contact AILP?",
    answer:
      "You can contact the organisation through the official Contact page. Submit your message through the contact form and the appropriate team can review your enquiry.",
  },

  {
    category: "General",
    question: "Where can I find the latest AILP updates?",
    answer:
      "Visit the News section of the website for the latest announcements, activities, campaigns and other updates.",
  },
];

const CATEGORIES = [
  "All",
  "Membership",
  "Membership Card",
  "Donations",
  "Participation",
  "General",
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("All");

  const filteredFAQs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return FAQ_DATA.filter((item) => {
      const matchesCategory =
        category === "All" ||
        item.category === category;

      const matchesSearch =
        !query ||
        item.question
          .toLowerCase()
          .includes(query) ||
        item.answer
          .toLowerCase()
          .includes(query) ||
        item.category
          .toLowerCase()
          .includes(query);

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [search, category]);

  function toggleFAQ(index) {
    setActiveIndex((previous) =>
      previous === index
        ? null
        : index
    );
  }

  function handleSearch(value) {
    setSearch(value);

    setActiveIndex(null);
  }

  function handleCategoryChange(value) {
    setCategory(value);

    setActiveIndex(null);
  }

  return (
    <>
      <FAQHero
        searchValue={search}
        onSearch={handleSearch}
      />

      <section className={styles.section}>
        <div className={styles.container}>

          {/* Heading */}

          <div className={styles.heading}>
            <span>FAQ</span>

            <h2>
              Answers to Your
              <strong> Questions</strong>
            </h2>

            <p>
              Browse our frequently asked questions
              or search for something specific.
            </p>
          </div>

          {/* Category Filter */}

          <div
            className={styles.categories}
            role="tablist"
            aria-label="FAQ categories"
          >
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={
                  category === item
                    ? styles.categoryActive
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(item)
                }
              >
                {item}
              </button>
            ))}
          </div>

          {/* FAQ List */}

          <div className={styles.list}>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map(
                (item, index) => {
                  const isOpen =
                    activeIndex === index;

                  return (
                    <article
                      key={`${item.category}-${item.question}`}
                      className={`${styles.item} ${
                        isOpen
                          ? styles.itemOpen
                          : ""
                      }`}
                    >
                      <button
                        type="button"
                        className={styles.question}
                        onClick={() =>
                          toggleFAQ(index)
                        }
                        aria-expanded={isOpen}
                      >
                        <div className={styles.questionLeft}>
                          <span className={styles.number}>
                            {String(
                              index + 1
                            ).padStart(2, "0")}
                          </span>

                          <div>
                            <small>
                              {item.category}
                            </small>

                            <strong>
                              {item.question}
                            </strong>
                          </div>
                        </div>

                        <span
                          className={
                            styles.chevron
                          }
                        >
                          <ChevronDown
                            size={20}
                          />
                        </span>
                      </button>

                      <div
                        className={
                          styles.answerWrapper
                        }
                      >
                        <div
                          className={
                            styles.answer
                          }
                        >
                          <p>
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                }
              )
            ) : (
              <div className={styles.empty}>
                <div className={styles.emptyIcon}>
                  <SearchX size={30} />
                </div>

                <h3>
                  No questions found
                </h3>

                <p>
                  Try a different search term
                  or select another category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setCategory("All");
                    setActiveIndex(null);
                  }}
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>

          {/* Result Count */}

          <div className={styles.resultCount}>
            Showing{" "}
            <strong>
              {filteredFAQs.length}
            </strong>{" "}
            of{" "}
            <strong>
              {FAQ_DATA.length}
            </strong>{" "}
            questions
          </div>

        </div>
      </section>
    </>
  );
}