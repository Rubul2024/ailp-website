/* ==========================================================
   Admin Donation Settings API
========================================================== */
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import verifyAdmin from "@/lib/verifyAdmin";
import DonationSetting from "@/models/DonationSetting";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";

export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();
    const donation = await DonationSetting.findOne().lean();

    return NextResponse.json({
      success: true,
      donation: donation || null,
    });
  } catch (error) {
    console.error("Donation GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.success) {
      return NextResponse.json({ success: false, message: auth.message }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const {
      bankName,
      accountHolder,
      accountNumber,
      ifscCode,
      branch,
      upiId,
      qrCode,
      donationMessage,
      donationEnabled,
    } = body;

    if (!bankName || !accountHolder || !accountNumber) {
      return NextResponse.json(
        { success: false, message: "Please fill all required bank details." },
        { status: 400 }
      );
    }

    // 1. Process QR code URL extraction
    let finalQrCode = "";
    if (qrCode) {
      if (typeof qrCode === "string" && qrCode.startsWith("data:image")) {
        try {
          if (typeof uploadImageToCloudinary === "function") {
            const uploadRes = await uploadImageToCloudinary(
              qrCode,
              "ailp/donations",
              `donation_qr_${Date.now()}`
            );

            if (typeof uploadRes === "string") {
              finalQrCode = uploadRes;
            } else if (uploadRes && typeof uploadRes === "object") {
              finalQrCode = uploadRes.secure_url || uploadRes.url || "";
            }
          }
        } catch (uploadError) {
          console.warn("Cloudinary upload failed, using raw data URL:", uploadError.message);
          finalQrCode = qrCode; // fallback to base64 if Cloudinary fails
        }
      } else if (typeof qrCode === "object" && qrCode !== null) {
        finalQrCode = qrCode.secure_url || qrCode.url || "";
      } else {
        finalQrCode = String(qrCode);
      }
    }

    // 2. Save directly using findOneAndUpdate to prevent schema hooks conflicts
    const updated = await DonationSetting.findOneAndUpdate(
      {},
      {
        $set: {
          bankName: bankName.trim(),
          accountHolder: accountHolder.trim(),
          accountNumber: accountNumber.trim(),
          ifscCode: ifscCode ? ifscCode.trim() : "",
          branch: branch ? branch.trim() : "",
          upiId: upiId ? upiId.trim() : "",
          qrCode: finalQrCode,
          donationMessage: donationMessage ? donationMessage.trim() : "",
          donationEnabled: Boolean(donationEnabled),
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Bank details and QR Code saved successfully!",
      donation: updated,
    });
  } catch (error) {
    console.error("Donation PUT Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update donation settings." },
      { status: 500 }
    );
  }
}