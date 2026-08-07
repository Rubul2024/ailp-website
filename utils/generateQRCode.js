/* ==========================================================
   Generate QR Code
   All India Labour Party
========================================================== */

import QRCode from "qrcode";

/* ==========================================================
   Generate QR Code
========================================================== */

export default async function generateQRCode(
  membershipId
) {
  try {
    /* ==========================================
       Validation
    ========================================== */

    if (!membershipId) {
      throw new Error(
        "Membership ID is required."
      );
    }

    /* ==========================================
       Verification URL
    ========================================== */

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const verificationUrl = `${appUrl}/verify/${membershipId}`;

    /* ==========================================
       Generate QR Code
    ========================================== */

    const qrCode = await QRCode.toDataURL(
      verificationUrl,
      {
        errorCorrectionLevel: "H",

        type: "image/png",

        margin: 2,

        width: 400,

        color: {
          dark: "#0F172A",
          light: "#FFFFFF",
        },
      }
    );

    /* ==========================================
       Success
    ========================================== */

    return {
      success: true,

      verificationUrl,

      qrCode,
    };
  } catch (error) {
    console.error(
      "QR Code Generation Error:",
      error
    );

    return {
      success: false,

      message:
        "Unable to generate QR Code.",
    };
  }
}