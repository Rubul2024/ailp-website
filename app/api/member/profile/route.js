/* ==========================================================
   AILP Member Profile API
   All India Labour Party
   Production Ready
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";

import Member from "@/models/Member";

import verifyMember from "@/utils/verifyMember";

import generateMembershipId from "@/utils/generateMembershipId";

import uploadImageToCloudinary from "@/utils/uploadImageToCloudinary";

import generateQRCode from "@/utils/generateQRCode";

import generateMembershipCard from "@/utils/generateMembershipCard";

import uploadPdfToCloudinary from "@/utils/uploadPdfToCloudinary";

/* ==========================================================
   GET PROFILE
========================================================== */

export async function GET(request) {

  try {

    await connectDB();

    /* ======================================================
       Verify Member
    ====================================================== */

    const auth =
      verifyMember(request);

    if (!auth.success) {

      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        {
          status: 401,
        }
      );

    }

    /* ======================================================
       Find Member
    ====================================================== */

    const member =
      await Member.findById(
        auth.memberId
      ).select("-password");

    if (!member) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Member not found.",
        },
        {
          status: 404,
        }
      );

    }

    /* ======================================================
       Success
    ====================================================== */

    return NextResponse.json(
      {
        success: true,
        member,
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "GET Profile Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }

}

/* ==========================================================
   POST / UPDATE PROFILE
========================================================== */

export async function POST(request) {

  try {

    await connectDB();

    /* ======================================================
       Verify Logged-in Member
    ====================================================== */

    const auth =
      verifyMember(request);

    if (!auth.success) {

      return NextResponse.json(
        {
          success: false,
          message: auth.message,
        },
        {
          status: 401,
        }
      );

    }

    /* ======================================================
       Read Multipart FormData
    ====================================================== */

    const formData =
      await request.formData();

    /* ======================================================
       Find Member
    ====================================================== */

    const member =
      await Member.findById(
        auth.memberId
      );

    if (!member) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Member not found.",
        },
        {
          status: 404,
        }
      );

    }

    /* ======================================================
       Helper: Get String Value
    ====================================================== */

    const getValue = (name) => {

      const value =
        formData.get(name);

      if (
        value === null ||
        value === undefined
      ) {

        return undefined;

      }

      return String(value).trim();

    };

    /* ======================================================
       Basic / Personal Information
    ====================================================== */

    const fullName =
      getValue("fullName");

    const mobile =
      getValue("mobile");

    const fatherName =
      getValue("fatherName");

    const motherName =
      getValue("motherName");

    const gender =
      getValue("gender");

    const dateOfBirth =
      getValue("dateOfBirth");

    /* ======================================================
       Professional
    ====================================================== */

    const occupation =
      getValue("occupation");

    const education =
      getValue("education");

    const bloodGroup =
      getValue("bloodGroup");

    /* ======================================================
       Address
    ====================================================== */

    const country =
      getValue("country");

    const state =
      getValue("state");

    const district =
      getValue("district");

    const assembly =
      getValue("assembly");

    const block =
      getValue("block");

    const village =
      getValue("village");

    const city =
      getValue("city");

    const pincode =
      getValue("pincode");

    const address =
      getValue("address");

    /* ======================================================
       Emergency
    ====================================================== */

    const emergencyName =
      getValue("emergencyName");

    const emergencyMobile =
      getValue("emergencyMobile");

    const relationship =
      getValue("relationship");

    /* ======================================================
       Required Validation
    ====================================================== */

    if (!fullName) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Full name is required.",
        },
        {
          status: 400,
        }
      );

    }

    if (!mobile) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Mobile number is required.",
        },
        {
          status: 400,
        }
      );

    }

    /* ======================================================
       Update Member Information
    ====================================================== */

    member.fullName =
      fullName;

    member.mobile =
      mobile;

    member.fatherName =
      fatherName || "";

    member.motherName =
      motherName || "";

    member.gender =
      gender || "";

    member.dateOfBirth =
      dateOfBirth || "";

    /* Professional */

    member.occupation =
      occupation || "";

    member.education =
      education || "";

    member.bloodGroup =
      bloodGroup || "";

    /* Address */

    member.country =
      country || "India";

    member.state =
      state || "";

    member.district =
      district || "";

    member.assembly =
      assembly || "";

    member.block =
      block || "";

    member.village =
      village || "";

    member.city =
      city || "";

    member.pincode =
      pincode || "";

    member.address =
      address || "";

    /* Emergency */

    member.emergencyName =
      emergencyName || "";

    member.emergencyMobile =
      emergencyMobile || "";

    member.relationship =
      relationship || "";

    /* ======================================================
   Photo Upload
====================================================== */

const photo =
  formData.get("photo");

if (
  photo &&
  typeof photo === "object" &&
  photo.size > 0
) {

  /* ====================================================
     Validate File Type
  ==================================================== */

  if (
    !photo.type ||
    !photo.type.startsWith("image/")
  ) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Profile photo must be an image.",
      },
      {
        status: 400,
      }
    );

  }

  /* ====================================================
     Maximum 2 MB
  ==================================================== */

  if (
    photo.size >
    2 * 1024 * 1024
  ) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Profile photo must be less than 2 MB.",
      },
      {
        status: 400,
      }
    );

  }

  /* ====================================================
     Convert File to Buffer
  ==================================================== */

  const photoBuffer =
    Buffer.from(
      await photo.arrayBuffer()
    );

  /* ====================================================
     Upload to Cloudinary
  ==================================================== */

  const uploadedPhoto =
    await uploadImageToCloudinary(
      photoBuffer,
      "ailp/members/photos",
      member.membershipId ||
        member._id.toString()
    );

  /* ====================================================
     Validate Upload Result
  ==================================================== */

  if (
    !uploadedPhoto
  ) {

    throw new Error(
      "Profile photo upload failed."
    );

  }

  /* ====================================================
     IMPORTANT

     Your Member schema expects
     photo as an Object.

     Therefore DO NOT use:

     member.photo = uploadedPhoto.url;

     Store the complete Cloudinary
     upload object.
  ==================================================== */

  member.photo =
    uploadedPhoto;

}

    /* ======================================================
   Signature Upload
====================================================== */

const signature =
  formData.get("signature");

if (
  signature &&
  typeof signature === "object" &&
  signature.size > 0
) {

  /* ====================================================
     Validate File Type
  ==================================================== */

  if (
    !signature.type ||
    !signature.type.startsWith("image/")
  ) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Signature must be an image.",
      },
      {
        status: 400,
      }
    );

  }

  /* ====================================================
     Maximum 2 MB
  ==================================================== */

  if (
    signature.size >
    2 * 1024 * 1024
  ) {

    return NextResponse.json(
      {
        success: false,
        message:
          "Signature must be less than 2 MB.",
      },
      {
        status: 400,
      }
    );

  }

  /* ====================================================
     Convert File to Buffer
  ==================================================== */

  const signatureBuffer =
    Buffer.from(
      await signature.arrayBuffer()
    );

  /* ====================================================
     Upload to Cloudinary
  ==================================================== */

  const uploadedSignature =
    await uploadImageToCloudinary(
      signatureBuffer,
      "ailp/members/signatures",
      `${
        member.membershipId ||
        member._id
      }_signature`
    );

  /* ====================================================
     Validate Upload
  ==================================================== */

  if (
    !uploadedSignature
  ) {

    throw new Error(
      "Signature upload failed."
    );

  }

  /* ====================================================
     IMPORTANT

     Member schema expects signature
     as an Object.
  ==================================================== */

  member.signature =
    uploadedSignature;

}

    /* ======================================================
       Generate Membership ID
    ====================================================== */

    let membershipCreated = false;

    if (!member.membershipId) {

      member.membershipId =
        await generateMembershipId();

      membershipCreated = true;

      member.membershipStatus =
        "PROFILE_COMPLETED";

      member.profileCompleted =
        true;

      member.joinDate =
        new Date();

    }

    /* ======================================================
       Generate QR Code
    ====================================================== */

    if (
      !member.qrCode &&
      member.membershipId
    ) {

      const qrResult =
        await generateQRCode(
          member.membershipId
        );

      if (
        !qrResult ||
        !qrResult.success
      ) {

        throw new Error(
          "QR Code Generation Failed."
        );

      }

      const uploadedQr =
        await uploadImageToCloudinary(
          qrResult.qrCode,
          "ailp/qrcodes",
          member.membershipId
        );

      if (
        !uploadedQr ||
        !uploadedQr.url
      ) {

        throw new Error(
          "QR Code Upload Failed."
        );

      }

      member.qrCode =
        uploadedQr.url;

    }

    /* ======================================================
       Generate Membership Card
    ====================================================== */

    if (
      !member.cardUrl &&
      member.membershipId
    ) {

      const pdfBuffer =
        await generateMembershipCard({

          memberId:
            member.membershipId,

          fullName:
            member.fullName,

          mobile:
            member.mobile,

          district:
            member.district,

          state:
            member.state,

        });

      if (!pdfBuffer) {

        throw new Error(
          "Membership Card Generation Failed."
        );

      }

      const pdfUrl =
        await uploadPdfToCloudinary(
          pdfBuffer,
          member.membershipId
        );

      if (!pdfUrl) {

        throw new Error(
          "Membership Card Upload Failed."
        );

      }

      member.cardUrl =
        pdfUrl;

      member.cardGenerated =
        true;

      member.cardGeneratedAt =
        new Date();

      member.membershipStatus =
        "CARD_GENERATED";

    }

    /* ======================================================
       Save Member
    ====================================================== */

    await member.save();

    /* ======================================================
       Response
    ====================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          membershipCreated
            ? "Membership profile completed successfully."
            : "Profile updated successfully.",

        membershipId:
          member.membershipId,

        member: {
          id: member._id,
          fullName:
            member.fullName,
          email:
            member.email,
          mobile:
            member.mobile,
          membershipId:
            member.membershipId,
          photo:
            member.photo || "",
          signature:
            member.signature || "",
          qrCode:
            member.qrCode || "",
          cardUrl:
            member.cardUrl || "",
        },
      },
      {
        status: 200,
      }
    );

  } catch (error) {

    console.error(
      "POST Profile Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error.message ||
          "Internal Server Error",
      },
      {
        status: 500,
      }
    );

  }

}