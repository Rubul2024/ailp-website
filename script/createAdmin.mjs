/* ==========================================================
   AILP ADMIN ACCOUNT SETUP
   Create / Update Admin Account
========================================================== */

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import Admin from "../models/Admin.js";

/* ==========================================================
   CONNECT TO MONGODB
========================================================== */

async function connectDatabase() {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    throw new Error(
      "MONGODB_URI is missing from .env.local"
    );
  }

  await mongoose.connect(mongoUri);

  console.log("");
  console.log("==========================================");
  console.log("✓ MONGODB CONNECTED");
  console.log("==========================================");

  console.log(
    `Database: ${mongoose.connection.name}`
  );

  console.log(
    `Host: ${mongoose.connection.host}`
  );

  console.log("==========================================");
  console.log("");
}

/* ==========================================================
   CREATE / UPDATE ADMIN
========================================================== */

async function createAdmin() {
  try {
    await connectDatabase();

    /* ======================================================
       ADMIN CREDENTIALS
    ====================================================== */

    const adminName = "AILP Administrator";

    const adminEmail =
      "allindialabourpartyailp@gmail.com";

    const adminPassword =
      "PartY#2026&K@M";

    const adminMobile = "";

    /* ======================================================
       VALIDATION
    ====================================================== */

    if (
      !adminName ||
      !adminEmail ||
      !adminPassword
    ) {
      throw new Error(
        "Admin name, email and password are required."
      );
    }

    if (adminPassword.length < 8) {
      throw new Error(
        "Admin password must contain at least 8 characters."
      );
    }

    const normalizedEmail =
      adminEmail.trim().toLowerCase();

    /* ======================================================
       CHECK EXISTING ADMIN
    ====================================================== */

    const existingAdmin = await Admin.findOne({
      email: normalizedEmail,
    }).select("+password");

    /* ======================================================
       HASH PASSWORD
    ====================================================== */

    const hashedPassword =
      await bcrypt.hash(adminPassword, 12);

    /* ======================================================
       UPDATE EXISTING ADMIN
    ====================================================== */

    if (existingAdmin) {
      existingAdmin.name =
        adminName.trim();

      existingAdmin.email =
        normalizedEmail;

      existingAdmin.password =
        hashedPassword;

      existingAdmin.mobile =
        adminMobile.trim();

      existingAdmin.role =
        "super-admin";

      existingAdmin.isActive =
        true;

      await existingAdmin.save();

      console.log("");
      console.log("==========================================");
      console.log("✓ EXISTING ADMIN UPDATED");
      console.log("==========================================");
      console.log(`Name:  ${existingAdmin.name}`);
      console.log(`Email: ${existingAdmin.email}`);
      console.log(`Role:  ${existingAdmin.role}`);
      console.log("Password: Updated successfully");
      console.log("==========================================");
      console.log("");

    } else {
      /* ====================================================
         CREATE NEW ADMIN
      ==================================================== */

      const admin =
        await Admin.create({
          name: adminName.trim(),

          email: normalizedEmail,

          password: hashedPassword,

          mobile: adminMobile.trim(),

          role: "super-admin",

          isActive: true,

          lastLogin: null,

          loginCount: 0,
        });

      console.log("");
      console.log("==========================================");
      console.log("✓ NEW ADMIN CREATED");
      console.log("==========================================");
      console.log(`Name:  ${admin.name}`);
      console.log(`Email: ${admin.email}`);
      console.log(`Role:  ${admin.role}`);
      console.log("Password: Created successfully");
      console.log("==========================================");
      console.log("");
    }

    /* ======================================================
       VERIFY ADMIN IN SAME DATABASE
    ====================================================== */

    const verifyAdmin =
      await Admin.findOne({
        email: normalizedEmail,
      }).select("+password");

    console.log("==========================================");
    console.log("DATABASE VERIFICATION");
    console.log("==========================================");

    if (!verifyAdmin) {
      throw new Error(
        "Admin was not found after create/update."
      );
    }

    console.log("✓ Admin exists in database.");
    console.log(
      `✓ Name: ${verifyAdmin.name}`
    );
    console.log(
      `✓ Email: ${verifyAdmin.email}`
    );
    console.log(
      `✓ Role: ${verifyAdmin.role}`
    );
    console.log(
      `✓ Active: ${verifyAdmin.isActive}`
    );

    /* ======================================================
       VERIFY PASSWORD HASH
    ====================================================== */

    const passwordMatches =
      await bcrypt.compare(
        adminPassword,
        verifyAdmin.password
      );

    console.log(
      `✓ Password hash valid: ${passwordMatches}`
    );

    console.log(
      `✓ Database: ${mongoose.connection.name}`
    );

    console.log(
      `✓ Host: ${mongoose.connection.host}`
    );

    console.log("==========================================");
    console.log("");
  } catch (error) {
    console.error("");
    console.error("==========================================");
    console.error("✗ ADMIN SETUP FAILED");
    console.error("==========================================");
    console.error(error.message);
    console.error("==========================================");
    console.error("");
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    console.log("MongoDB connection closed.");
  }
}

/* ==========================================================
   RUN
========================================================== */

createAdmin();