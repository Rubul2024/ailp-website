/* ==========================================================
   Public Citizen Contact Form Submission API
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Contact from "@/models/Contact";

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const { name, email, mobile, subject, message } = data;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile ? mobile.trim() : "",
      subject: subject.trim(),
      message: message.trim(),
      isRead: false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Thank you! Your message has been submitted successfully.",
        contactId: newContact._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Public Contact POST Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}