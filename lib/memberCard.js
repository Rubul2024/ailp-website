/* ==========================================================
   Member ID Card — server helpers
   Shared by the profile and generate-card APIs.
========================================================== */

import React from "react";
import { renderToBuffer } from "@react-pdf/renderer";

import MembershipCardPDF from "@/pdf/MembershipCardPDF";
import generateMembershipId from "@/utils/generateMembershipId";
import generateQRCode from "@/utils/generateQRCode";
import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";
import uploadPdfToCloudinary from "@/utils/uploadPdfToCloudinary";

/**
 * Make sure the member has a membership ID and a verification QR code.
 * Mutates `member`; caller saves.
 */
export async function ensureMembershipIdentity(member) {
  if (!member.membershipId) {
    member.membershipId = await generateMembershipId();
    member.joinDate = member.joinDate || new Date();
  }

  if (!member.qrCode) {
    const qr = await generateQRCode(member.membershipId);
    if (!qr?.success) throw new Error("Could not create the verification QR code.");

    const uploaded = await uploadImageToCloudinary(qr.qrCode, "ailp/qrcodes", member.membershipId);
    if (!uploaded?.url) throw new Error("Could not save the verification QR code.");

    member.qrCode = uploaded.url;
  }
}

/**
 * Render the card PDF from the member's current data and store it
 * (used by the admin panel's "view card" link). Mutates `member`.
 */
export async function renderAndStoreCardPdf(member) {
  const plain = typeof member.toObject === "function" ? member.toObject() : member;
  const pdfBuffer = await renderToBuffer(React.createElement(MembershipCardPDF, { member: plain }));
  const pdfUrl = await uploadPdfToCloudinary(pdfBuffer, member.membershipId);
  if (!pdfUrl) throw new Error("Could not store the ID card PDF.");

  member.cardUrl = pdfUrl;
}

/* Fields whose change means the stored card PDF is out of date. */
export const CARD_PRINTED_FIELDS = [
  "fullName",
  "mobile",
  "gender",
  "dateOfBirth",
  "bloodGroup",
  "state",
  "district",
  "assembly",
  "photo",
];
