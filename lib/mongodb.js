/* ==========================================================
   MongoDB Connection
   Production Ready
========================================================== */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define MONGODB_URI in your .env.local file."
  );
}

/*
|--------------------------------------------------------------------------
| Global Cache
|--------------------------------------------------------------------------
| Prevents creating multiple MongoDB connections during development
| (Next.js Hot Reload) and works correctly on Vercel.
|--------------------------------------------------------------------------
*/

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

/*
|--------------------------------------------------------------------------
| Connect Database
|--------------------------------------------------------------------------
*/

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: "ailp",
    });
  }

  try {
    cached.conn = await cached.promise;

    console.log("✅ MongoDB Connected");

    return cached.conn;
  } catch (error) {
    cached.promise = null;

    console.error("❌ MongoDB Connection Error");

    throw error;
  }
}

export default connectDB;