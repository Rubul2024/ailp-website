/* ==========================================================
   Generate Membership Card PDF
========================================================== */

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import fetch from "node-fetch";

export default async function generateMembershipCard(member) {

  const pdf = await PDFDocument.create();

  const page = pdf.addPage([500, 300]);

  const font = await pdf.embedFont(StandardFonts.HelveticaBold);

  page.drawText("ALL INDIA LABOUR PARTY", {
    x: 130,
    y: 270,
    size: 18,
    font,
    color: rgb(0,0.4,0.8),
  });

  page.drawText(`Name : ${member.fullName}`, {
    x:150,
    y:220,
    size:12
  });

  page.drawText(`Member ID : ${member.memberId}`, {
    x:150,
    y:200,
    size:12
  });

  page.drawText(`Mobile : ${member.mobile}`, {
    x:150,
    y:180,
    size:12
  });

  page.drawText(`District : ${member.district}`, {
    x:150,
    y:160,
    size:12
  });

  page.drawText(`State : ${member.state}`, {
    x:150,
    y:140,
    size:12
  });

  const pdfBytes = await pdf.save();

return Buffer.from(pdfBytes);
}