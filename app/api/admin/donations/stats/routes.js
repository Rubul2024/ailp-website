/* ==========================================================
   AILP ADMIN DONATION STATISTICS
========================================================== */

import { NextResponse } from "next/server";

import connectDB from "@/lib/mongodb";
import Donation from "@/models/Donation";

/* ==========================================================
   ADMIN AUTHENTICATION
========================================================== */

async function verifyAdmin(request) {
  /*
    Connect this to your existing admin authentication.
  */

  return true;
}

/* ==========================================================
   GET STATISTICS
========================================================== */

export async function GET(request) {
  try {
    /* ======================================================
       Admin Protection
    ====================================================== */

    const isAdmin = await verifyAdmin(request);

    if (!isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized access.",
        },
        {
          status: 401,
        }
      );
    }

    /* ======================================================
       Database
    ====================================================== */

    await connectDB();

    /* ======================================================
       Statistics
    ====================================================== */

    const statistics =
      await Donation.aggregate([
        {
          $facet: {
            total: [
              {
                $count: "count",
              },
            ],

            successful: [
              {
                $match: {
                  status: "CAPTURED",
                },
              },

              {
                $count: "count",
              },
            ],

            pending: [
              {
                $match: {
                  status: "PENDING",
                },
              },

              {
                $count: "count",
              },
            ],

            failed: [
              {
                $match: {
                  status: "FAILED",
                },
              },

              {
                $count: "count",
              },
            ],

            refunded: [
              {
                $match: {
                  status: "REFUNDED",
                },
              },

              {
                $count: "count",
              },
            ],

            totalAmount: [
              {
                $match: {
                  status: "CAPTURED",
                },
              },

              {
                $group: {
                  _id: null,

                  amount: {
                    $sum: "$amount",
                  },
                },
              },
            ],

            pendingAmount: [
              {
                $match: {
                  status: "PENDING",
                },
              },

              {
                $group: {
                  _id: null,

                  amount: {
                    $sum: "$amount",
                  },
                },
              },
            ],

            refundedAmount: [
              {
                $match: {
                  status: "REFUNDED",
                },
              },

              {
                $group: {
                  _id: null,

                  amount: {
                    $sum: "$amount",
                  },
                },
              },
            ],
          },
        },
      ]);

    const data =
      statistics[0] || {};

    /* ======================================================
       Response
    ====================================================== */

    return NextResponse.json({
      success: true,

      stats: {
        total:
          data.total?.[0]?.count || 0,

        successful:
          data.successful?.[0]?.count || 0,

        pending:
          data.pending?.[0]?.count || 0,

        failed:
          data.failed?.[0]?.count || 0,

        refunded:
          data.refunded?.[0]?.count || 0,

        totalAmount:
          data.totalAmount?.[0]?.amount || 0,

        pendingAmount:
          data.pendingAmount?.[0]?.amount || 0,

        refundedAmount:
          data.refundedAmount?.[0]?.amount || 0,
      },
    });
  } catch (error) {
    console.error(
      "ADMIN DONATION STATS ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to fetch donation statistics.",
      },
      {
        status: 500,
      }
    );
  }
}