/* ==========================================================
   AILP Official Membership ID Card PDF Generator
========================================================== */
import PDFDocument from "pdfkit";

export default async function generateMembershipCard({
  memberId,
  fullName,
  fatherName,
  gender,
  dateOfBirth,
  mobile,
  email,
  address,
  villageCity,
  district,
  state,
  pincode,
  photo,
  qrCode,
}) {
  return new Promise((resolve, reject) => {
    try {
      // Standard CR80 / ID Card proportions in points (approx 3.37 inch x 2.125 inch scaled up)
      const doc = new PDFDocument({
        size: [340, 215],
        margins: { top: 10, bottom: 10, left: 10, right: 10 },
      });

      const buffers = [];
      doc.on("data", (chunk) => buffers.push(chunk));
      doc.on("end", () => resolve(Buffer.concat(buffers)));

      // Outer Card Background & Border
      doc.rect(0, 0, 340, 215).fill("#FFFFFF");
      doc.lineWidth(1.5).strokeColor("#cbd5e1").rect(5, 5, 330, 205).stroke();

      // Tricolor Stripe on the Left (Saffron, White, Green theme accents)
      doc.rect(5, 5, 12, 205).fill("#ff9933"); // Saffron accent
      doc.rect(17, 5, 8, 205).fill("#ffffff");  // White divider
      doc.rect(25, 5, 12, 205).fill("#138808"); // Green accent

      // Header Title
      doc.fillColor("#b91c1c").font("Helvetica-Bold").fontSize(13)
         .text("ALL INDIA LABOUR PARTY", 45, 12, { align: "center", width: 280 });

      doc.fillColor("#334155").font("Helvetica").fontSize(7)
         .text("Regd. No.: 56/1/19/2018-18/PPS-I", 45, 27, { align: "center", width: 280 });
      doc.text("C Office-Manas Road, Barpeta, Assam", 45, 36, { align: "center", width: 280 });

      // Identity Card Badge Banner
      doc.rect(80, 48, 180, 16).fill("#0f172a");
      doc.fillColor("#ffffff").font("Helvetica-Bold").fontSize(9)
         .text("IDENTITY CARD", 80, 52, { align: "center", width: 180 });

      // Member Photo Box Placeholder / Image
      doc.rect(45, 72, 70, 85).lineWidth(1).strokeColor("#94a3b8").stroke();
      doc.fillColor("#f1f5f9").rect(46, 73, 68, 83).fill();
      doc.fillColor("#64748b").font("Helvetica").fontSize(8)
         .text("PHOTO", 45, 110, { align: "center", width: 70 });

      // Member Details Fields
      const startX = 125;
      let startY = 75;
      const lineHeight = 13;

      const details = [
        { label: "MEMBER ID", value: memberId || "PENDING" },
        { label: "NAME", value: fullName?.toUpperCase() || "—" },
        { label: "FATHER'S NAME", value: fatherName?.toUpperCase() || "—" },
        { label: "DOB", value: dateOfBirth ? new Date(dateOfBirth).toLocaleDateString("en-IN") : "—" },
        { label: "GENDER", value: gender?.toUpperCase() || "—" },
        { label: "MOBILE", value: mobile || "—" },
        { label: "DISTRICT", value: `${district || "—"}, ${state || "Assam"}` },
      ];

      details.forEach((item) => {
        doc.fillColor("#475569").font("Helvetica-Bold").fontSize(7.5).text(item.label, startX, startY);
        doc.fillColor("#0f172a").font("Helvetica").fontSize(8).text(`: ${item.value}`, startX + 65, startY);
        startY += lineHeight;
      });

      // Footer Signatures / General Secretary text
      doc.fillColor("#0f172a").font("Helvetica-Bold").fontSize(7)
         .text("A. GENERAL SECRETARY", 45, 185, { align: "left", width: 140 });

      doc.fillColor("#64748b").font("Helvetica").fontSize(6)
         .text("Authorized Signature", 45, 195, { align: "left", width: 140 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}