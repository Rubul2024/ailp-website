/* ==========================================================
   Razorpay Configuration
   All India Labour Party
   Production Ready
========================================================== */

import Razorpay from "razorpay";

/* ==========================================================
   Environment Validation
========================================================== */

if (!process.env.RAZORPAY_KEY_ID) {
  console.warn(
    "RAZORPAY_KEY_ID is missing from environment variables."
  );
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  console.warn(
    "RAZORPAY_KEY_SECRET is missing from environment variables."
  );
}

/* ==========================================================
   Razorpay Instance
========================================================== */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export default razorpay;