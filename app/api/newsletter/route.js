/* ==========================================================
   Public Newsletter Subscription API
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

export async function POST(request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = await Newsletter.findOne({ email: cleanEmail });

    if (existing) {
      if (existing.status === "Unsubscribed") {
        existing.status = "Active";
        await existing.save();
        return NextResponse.json({
          success: true,
          message: "Welcome back! Your subscription has been reactivated.",
        });
      }
      return NextResponse.json(
        { success: false, message: "You are already subscribed to our newsletter." },
        { status: 409 }
      );
    }

    await Newsletter.create({
      email: cleanEmail,
      status: "Active",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for subscribing to AILP updates!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}