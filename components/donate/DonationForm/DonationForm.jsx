"use client";

import { useState } from "react";

import {
  CreditCard,
  User,
  Mail,
  Phone,
  MapPin,
  IndianRupee,
  ShieldCheck,
  LoaderCircle,
} from "lucide-react";

import styles from "./DonationForm.module.css";

const amounts = [
  500,
  1000,
  2000,
  5000,
  10000,
];

export default function DonationForm() {
  const [amount, setAmount] = useState(1000);

  const [customAmount, setCustomAmount] =
    useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    pan: "",
  });

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function selectAmount(value) {
    setAmount(value);

    setCustomAmount("");
  }

  function handleCustomAmount(event) {
    const value = event.target.value;

    setCustomAmount(value);

    if (value) {
      setAmount(Number(value));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    const finalAmount = Number(
      customAmount || amount
    );

    if (!finalAmount || finalAmount < 1) {
      setMessage(
        "Please enter a valid donation amount."
      );

      return;
    }

    if (!form.fullName.trim()) {
      setMessage("Please enter your full name.");

      return;
    }

    if (!form.email.trim()) {
      setMessage("Please enter your email address.");

      return;
    }

    if (!form.mobile.trim()) {
      setMessage("Please enter your mobile number.");

      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/donation/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount: finalAmount,
            ...form,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to create donation order."
        );
      }

      await openRazorpay(data.order);
    } catch (error) {
      setMessage(
        error.message ||
          "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  }

  function openRazorpay(order) {
    if (!window.Razorpay) {
      setMessage(
        "Payment system is loading. Please try again."
      );

      setLoading(false);

      return;
    }

    const options = {
      key: order.key,

      amount: order.amount,

      currency: order.currency,

      name: "All India Labour Party",

      description: "Political Party Contribution",

      order_id: order.id,

      image: "/images/logo/logo.png",

      prefill: {
        name: form.fullName,

        email: form.email,

        contact: form.mobile,
      },

      theme: {
        color: "#0b4ea2",
      },

      handler: async function (response) {
        try {
          const verifyResponse = await fetch(
            "/api/donation/verify",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                ...response,

                amount: order.amount,

                donor: form,
              }),
            }
          );

          const verifyData =
            await verifyResponse.json();

          if (!verifyResponse.ok) {
            throw new Error(
              verifyData.message ||
                "Payment verification failed."
            );
          }

          setMessage(
            "Donation successful. Your payment has been verified."
          );

          setForm({
            fullName: "",
            email: "",
            mobile: "",
            address: "",
            pan: "",
          });
        } catch (error) {
          setMessage(
            error.message ||
              "Payment completed but verification failed. Please contact support."
          );
        } finally {
          setLoading(false);
        }
      },

      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
    };

    const razorpay =
      new window.Razorpay(options);

   razorpay.on(
  "payment.failed",
  async function (response) {
    try {
      await fetch(
        "/api/donation/failed",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            razorpay_order_id:
              order.id,

            razorpay_payment_id:
              response?.error?.metadata
                ?.payment_id || "",

            error:
              response?.error || {},
          }),
        }
      );
    } catch (error) {
      console.error(
        "Failed to record donation failure:",
        error
      );
    }

    setMessage(
      response?.error?.description ||
        "Payment failed. Please try again."
    );

    setLoading(false);
  }
);

    razorpay.open();
  }

  return (
    <section
      id="donate-form"
      className={styles.section}
    >
      <div className={styles.container}>
        <div className={styles.intro}>
          <span>MAKE A CONTRIBUTION</span>

          <h2>
            Support the
            <strong> AILP Movement</strong>
          </h2>

          <p>
            Choose an amount and provide your details
            to continue with a secure online contribution.
          </p>

          <div className={styles.security}>
            <ShieldCheck size={20} />

            <div>
              <strong>Secure & Protected</strong>

              <span>
                Your payment is processed through
                Razorpay's secure checkout.
              </span>
            </div>
          </div>
        </div>

        <div className={styles.formCard}>
          <form onSubmit={handleSubmit}>
            <div className={styles.amountSection}>
              <label>
                Select Contribution Amount
              </label>

              <div className={styles.amountGrid}>
                {amounts.map((value) => (
                  <button
                    key={value}
                    type="button"
                    className={
                      !customAmount &&
                      amount === value
                        ? styles.selectedAmount
                        : ""
                    }
                    onClick={() =>
                      selectAmount(value)
                    }
                  >
                    ₹{value.toLocaleString("en-IN")}
                  </button>
                ))}
              </div>

              <div className={styles.customAmount}>
                <IndianRupee size={18} />

                <input
                  type="number"
                  min="1"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={
                    handleCustomAmount
                  }
                />
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.fields}>
              <div className={styles.field}>
                <label htmlFor="fullName">
                  Full Name *
                </label>

                <div className={styles.input}>
                  <User size={18} />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={form.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="email">
                  Email Address *
                </label>

                <div className={styles.input}>
                  <Mail size={18} />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="mobile">
                  Mobile Number *
                </label>

                <div className={styles.input}>
                  <Phone size={18} />

                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={form.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="address">
                  Address
                </label>

                <div className={styles.input}>
                  <MapPin size={18} />

                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="City, State"
                    value={form.address}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="pan">
                  PAN
                </label>

                <div className={styles.input}>
                  <CreditCard size={18} />

                  <input
                    id="pan"
                    name="pan"
                    type="text"
                    placeholder="PAN (if applicable)"
                    value={form.pan}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {message && (
              <div className={styles.message}>
                {message}
              </div>
            )}

            <button
              type="submit"
              className={styles.submit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoaderCircle
                    size={20}
                    className={styles.spinner}
                  />

                  Processing...
                </>
              ) : (
                <>
                  <HeartIcon />

                  Donate ₹
                  {Number(
                    customAmount || amount
                  ).toLocaleString("en-IN")}
                </>
              )}
            </button>

            <p className={styles.note}>
              By continuing, you confirm that the
              information provided is accurate and that
              your contribution complies with applicable
              laws and eligibility requirements.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function HeartIcon() {
  return (
    <span className={styles.heart}>
      ♥
    </span>
  );
}