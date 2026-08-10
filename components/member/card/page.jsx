"use client";

/* ==========================================================
   AILP Membership Card Page
   All India Labour Party

   Production Ready

   Print:
   - ONLY Membership Card
   - Exact CR80 ID Card Size
   - 85.60mm × 53.98mm
   - One page only

   Download:
   - Real PDF
   - Exact ID Card dimensions

   Share:
   - Native Web Share API
========================================================== */

import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  Download,
  Printer,
  Share2,
} from "lucide-react";

import Sidebar from "@/components/member/Sidebar";
import Header from "@/components/member/Header";
import MembershipCard from "@/components/member/MembershipCard";

import styles from "./CardPage.module.css";


/* ==========================================================
   STANDARD ID CARD SIZE

   CR80 Standard:

   Width  = 85.60mm
   Height = 53.98mm
========================================================== */

const CARD_WIDTH_MM = 85.6;
const CARD_HEIGHT_MM = 53.98;


/* ==========================================================
   COMPONENT
========================================================== */

export default function MemberCardPage() {

  const router = useRouter();


  /* ==========================================================
     GET ACTUAL MEMBERSHIP CARD
  ========================================================== */

  function getMembershipCard() {

    const container =
      document.getElementById(
        "membership-card-print"
      );


    if (!container) {

      throw new Error(
        "Membership card container was not found."
      );

    }


    /*
      MembershipCard contains:

      wrapper
        ├── actions
        └── card

      We intentionally search for the second/visual
      card instead of printing the entire page.
    */

    const elements =
      container.querySelectorAll(
        "div"
      );


    /*
      Find the element containing the card header.

      MembershipCard's actual card contains
      "ALL INDIA LABOUR PARTY".
    */

    for (
      const element of elements
    ) {

      if (
        element.textContent?.includes(
          "ALL INDIA LABOUR PARTY"
        )
      ) {

        /*
          Make sure this is not the outer wrapper.
        */

        const hasCardContent =
          element.querySelector(
            "img"
          );

        if (hasCardContent) {

          return element;

        }

      }

    }


    /*
      Fallback:
      use the last major div.
    */

    const fallback =
      container.lastElementChild;


    if (!fallback) {

      throw new Error(
        "Membership card could not be located."
      );

    }


    return fallback;

  }


  /* ==========================================================
     WAIT FOR IMAGES

     This is extremely important for:

     - Member photo
     - AILP logo
     - QR code
     - President signature
  ========================================================== */

  async function waitForImages(
    element
  ) {

    const images =
      Array.from(
        element.querySelectorAll(
          "img"
        )
      );


    if (!images.length) {
      return;
    }


    await Promise.all(

      images.map(
        (image) =>
          new Promise(
            (resolve) => {

              if (
                image.complete
              ) {

                resolve();

                return;

              }


              image.addEventListener(
                "load",
                resolve,
                {
                  once: true,
                }
              );


              image.addEventListener(
                "error",
                resolve,
                {
                  once: true,
                }
              );

            }
          )
      )

    );

  }


  /* ==========================================================
     CAPTURE MEMBERSHIP CARD

     Converts ONLY the ID card to a high-resolution image.

     This is the key to solving the print problem.
  ========================================================== */

  async function captureMembershipCard() {

    const html2canvas =
      (
        await import(
          "html2canvas"
        )
      ).default;


    const card =
      getMembershipCard();


    /* --------------------------------------------------------
       Wait for QR / photo / signature / logo
    -------------------------------------------------------- */

    await waitForImages(
      card
    );


    /* --------------------------------------------------------
       Give browser a moment to finish rendering
    -------------------------------------------------------- */

    await new Promise(
      (resolve) =>
        setTimeout(
          resolve,
          300
        )
    );


    /* --------------------------------------------------------
       Capture ONLY the card

       Scale 4 gives good print quality.
    -------------------------------------------------------- */

    const canvas =
      await html2canvas(
        card,
        {

          scale: 4,

          useCORS: true,

          allowTaint: false,

          backgroundColor:
            "#ffffff",

          logging: false,

          imageTimeout:
            20000,

          scrollX: 0,

          scrollY: 0,

          width:
            card.scrollWidth,

          height:
            card.scrollHeight,

        }
      );


    return canvas.toDataURL(
      "image/png",
      1.0
    );

  }


  /* ==========================================================
     PRINT

     IMPORTANT:

     We DO NOT call:

       window.print()

     on the dashboard.

     Instead:

       Card DOM
          ↓
       Canvas
          ↓
       PNG
          ↓
       New print window
          ↓
       ONLY PNG
          ↓
       85.6 × 53.98mm
          ↓
       One page
  ========================================================== */

  async function handlePrint() {

    /*
      Open the window immediately.

      This prevents popup blockers because the operation
      begins directly from the button click.
    */

    const printWindow =
      window.open(
        "",
        "_blank",
        "width=900,height=700"
      );


    if (!printWindow) {

      alert(
        "Please allow pop-ups in your browser to print the membership card."
      );

      return;

    }


    /* --------------------------------------------------------
       Show loading message
    -------------------------------------------------------- */

    printWindow.document.open();

    printWindow.document.write(`
      <!DOCTYPE html>

      <html>

        <head>

          <title>
            AILP Membership Card
          </title>

        </head>

        <body
          style="
            margin:0;
            padding:0;
            background:#ffffff;
            display:flex;
            align-items:flex-start;
            justify-content:flex-start;
          "
        >

          <p
            style="
              font-family:Arial,sans-serif;
              font-size:14px;
              padding:20px;
            "
          >
            Preparing Membership Card...
          </p>

        </body>

      </html>
    `);

    printWindow.document.close();


    try {

      /* ------------------------------------------------------
         Capture ONLY Membership Card
      ------------------------------------------------------ */

      const imageData =
        await captureMembershipCard();


      /* ------------------------------------------------------
         Build print document

         ONLY the image exists inside this document.
      ------------------------------------------------------ */

      printWindow.document.open();

      printWindow.document.write(`

        <!DOCTYPE html>

        <html>

          <head>

            <meta
              charset="UTF-8"
            />

            <title>
              AILP Membership Card
            </title>


            <style>

              /* ============================================
                 EXACT CR80 ID CARD PAGE
              ============================================ */

              @page {

                size:
                  ${CARD_WIDTH_MM}mm
                  ${CARD_HEIGHT_MM}mm;

                margin:0;

              }


              html,
              body {

                width:
                  ${CARD_WIDTH_MM}mm !important;

                height:
                  ${CARD_HEIGHT_MM}mm !important;

                margin:0 !important;

                padding:0 !important;

                overflow:hidden !important;

                background:#ffffff !important;

              }


              body {

                display:block !important;

              }


              /* ============================================
                 ONLY PRINTABLE IMAGE
              ============================================ */

              .membership-card-image {

                display:block !important;

                width:
                  ${CARD_WIDTH_MM}mm !important;

                height:
                  ${CARD_HEIGHT_MM}mm !important;

                max-width:
                  ${CARD_WIDTH_MM}mm !important;

                max-height:
                  ${CARD_HEIGHT_MM}mm !important;

                min-width:
                  ${CARD_WIDTH_MM}mm !important;

                min-height:
                  ${CARD_HEIGHT_MM}mm !important;

                margin:0 !important;

                padding:0 !important;

                border:0 !important;

                outline:0 !important;

                object-fit:fill !important;

              }


              /* ============================================
                 PRINT COLOR
              ============================================ */

              * {

                -webkit-print-color-adjust:
                  exact !important;

                print-color-adjust:
                  exact !important;

              }

            </style>

          </head>


          <body>

            <img
              class="membership-card-image"
              src="${imageData}"
              alt="AILP Membership Card"
            />

          </body>

        </html>

      `);

      printWindow.document.close();


      /* ------------------------------------------------------
         Wait for image to load
      ------------------------------------------------------ */

      const printImage =
        printWindow.document.querySelector(
          ".membership-card-image"
        );


      if (printImage) {

        await new Promise(
          (resolve) => {

            if (
              printImage.complete
            ) {

              resolve();

              return;

            }


            printImage.onload =
              resolve;

            printImage.onerror =
              resolve;

          }
        );

      }


      /* ------------------------------------------------------
         Give browser time to calculate exact page size
      ------------------------------------------------------ */

      setTimeout(
        () => {

          printWindow.focus();

          printWindow.print();

        },
        700
      );


    } catch (error) {

      console.error(
        "Membership Card Print Error:",
        error
      );


      printWindow.close();


      alert(
        "Unable to prepare the membership card for printing."
      );

    }

  }


  /* ==========================================================
     DOWNLOAD PDF

     ONLY the membership card becomes the PDF.

     No dashboard.
     No header.
     No sidebar.
  ========================================================== */

  async function handleDownloadPDF() {

    try {

      /* ------------------------------------------------------
         Capture card
      ------------------------------------------------------ */

      const imageData =
        await captureMembershipCard();


      /* ------------------------------------------------------
         Load jsPDF
      ------------------------------------------------------ */

      const {
        jsPDF,
      } =
        await import(
          "jspdf"
        );


      /* ------------------------------------------------------
         Create exact ID-card PDF
      ------------------------------------------------------ */

      const pdf =
        new jsPDF({

          orientation:
            "landscape",

          unit:
            "mm",

          format: [
            CARD_WIDTH_MM,
            CARD_HEIGHT_MM,
          ],

          compress:
            true,

        });


      /* ------------------------------------------------------
         Put image edge-to-edge
      ------------------------------------------------------ */

      pdf.addImage(

        imageData,

        "PNG",

        0,

        0,

        CARD_WIDTH_MM,

        CARD_HEIGHT_MM,

        undefined,

        "FAST"

      );


      /* ------------------------------------------------------
         Membership ID

         Try to locate ID.
      ------------------------------------------------------ */

      let membershipId =
        "AILP-Membership-Card";


      const card =
        getMembershipCard();


      const possibleHeadings =
        card.querySelectorAll(
          "h3, h4, p"
        );


      for (
        const element of possibleHeadings
      ) {

        const text =
          element.textContent?.trim();


        if (
          text &&
          /^AILP/i.test(text)
        ) {

          membershipId =
            text;

          break;

        }

      }


      /* ------------------------------------------------------
         Safe filename
      ------------------------------------------------------ */

      const safeFilename =
        membershipId
          .replace(
            /[^a-zA-Z0-9-_]/g,
            "-"
          )
          .replace(
            /-+/g,
            "-"
          );


      /* ------------------------------------------------------
         Download
      ------------------------------------------------------ */

      pdf.save(
        `${safeFilename}.pdf`
      );


    } catch (error) {

      console.error(
        "Membership Card PDF Error:",
        error
      );


      alert(
        "Unable to download the membership card PDF. Please try again."
      );

    }

  }


  /* ==========================================================
     SHARE
  ========================================================== */

  async function handleShare() {

    try {

      const shareData = {

        title:
          "AILP Digital Membership Card",

        text:
          "My official All India Labour Party Digital Membership Card.",

        url:
          window.location.href,

      };


      if (
        navigator.share &&
        typeof navigator.share ===
          "function"
      ) {

        await navigator.share(
          shareData
        );

        return;

      }


      await navigator.clipboard.writeText(
        window.location.href
      );


      alert(
        "Membership card link copied successfully."
      );


    } catch (error) {

      if (
        error?.name ===
        "AbortError"
      ) {

        return;

      }


      console.error(
        "Share Error:",
        error
      );

    }

  }


  /* ==========================================================
     RENDER
  ========================================================== */

  return (

    <div
      className={
        styles.container
      }
    >

      {/* ======================================================
          SIDEBAR
      ====================================================== */}

      <aside
        className={
          styles.sidebar
        }
      >

        <Sidebar />

      </aside>


      {/* ======================================================
          MAIN
      ====================================================== */}

      <main
        className={
          styles.main
        }
      >

        {/* ====================================================
            HEADER
        ==================================================== */}

        <Header />


        {/* ====================================================
            PAGE HEADER
        ==================================================== */}

        <div
          className={
            styles.pageHeader
          }
        >

          <div>

            <h1>
              Membership Card
            </h1>

            <p>
              View, print, download, or
              share your official AILP
              Membership Card.
            </p>

          </div>


          {/* ==================================================
              ACTION BUTTONS
          ================================================== */}

          <div
            className={
              styles.actions
            }
          >

            {/* Dashboard */}

            <button
              type="button"
              className={
                styles.secondaryButton
              }
              onClick={() =>
                router.push(
                  "/member/dashboard"
                )
              }
            >

              <ArrowLeft
                size={18}
              />

              <span>
                Dashboard
              </span>

            </button>


            {/* Print */}

            <button
              type="button"
              className={
                styles.secondaryButton
              }
              onClick={
                handlePrint
              }
            >

              <Printer
                size={18}
              />

              <span>
                Print
              </span>

            </button>


            {/* Download */}

            <button
              type="button"
              className={
                styles.primaryButton
              }
              onClick={
                handleDownloadPDF
              }
            >

              <Download
                size={18}
              />

              <span>
                Download PDF
              </span>

            </button>


            {/* Share */}

            <button
              type="button"
              className={
                styles.shareButton
              }
              onClick={
                handleShare
              }
            >

              <Share2
                size={18}
              />

              <span>
                Share
              </span>

            </button>

          </div>

        </div>


        {/* ====================================================
            MEMBERSHIP CARD

            ONLY this element is captured by:

            - Print
            - Download PDF
        ==================================================== */}

        <div
          id="membership-card-print"
          className={
            styles.printableCard
          }
        >

          <MembershipCard />

        </div>

      </main>

    </div>

  );

}