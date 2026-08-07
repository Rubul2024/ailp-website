/* ==========================================================
   Membership Card PDF
   All India Labour Party
========================================================== */

import React from "react";

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

/* ==========================================================
   Styles
========================================================== */

const styles = StyleSheet.create({

  page: {

    backgroundColor: "#f3f4f6",

    padding: 30,

    justifyContent: "center",

    alignItems: "center",

  },

  card: {

    width: 520,

    minHeight: 300,

    borderRadius: 16,

    backgroundColor: "#2563eb",

    color: "#ffffff",

    padding: 20,

    border: "2 solid #1d4ed8",

  },

  header: {

    flexDirection: "row",

    alignItems: "center",

    marginBottom: 20,

    borderBottom: "1 solid rgba(255,255,255,.3)",

    paddingBottom: 12,

  },

  logo: {

    width: 50,

    height: 50,

    marginRight: 15,

  },

  title: {

    fontSize: 18,

    fontWeight: "bold",

  },

  subtitle: {

    fontSize: 10,

    marginTop: 3,

  },

  body: {

    flexDirection: "row",

    justifyContent: "space-between",

    marginTop: 15,

  },

  left: {

    width: 140,

    alignItems: "center",

  },

  photo: {

    width: 110,

    height: 135,

    borderRadius: 8,

    border: "2 solid white",

  },

  status: {

    marginTop: 12,

    backgroundColor: "#16a34a",

    paddingVertical: 6,

    paddingHorizontal: 12,

    borderRadius: 20,

    fontSize: 10,

    fontWeight: "bold",

  },

  right: {

    flex: 1,

    marginLeft: 25,

  },

  label: {

    fontSize: 10,

    color: "#dbeafe",

    marginTop: 10,

  },

  value: {

    fontSize: 14,

    fontWeight: "bold",

    marginTop: 2,

  },

  footer: {

    marginTop: 25,

    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    borderTop: "1 solid rgba(255,255,255,.3)",

    paddingTop: 15,

  },

  qr: {

    width: 80,

    height: 80,

    backgroundColor: "#ffffff",

    padding: 4,

  },

  footerText: {

    width: 360,

    fontSize: 10,

    lineHeight: 1.5,

  },

});

/* ==========================================================
   PDF Component
========================================================== */

export default function MembershipCardPDF({

  member,

}) {

  return (

    <Document>

      <Page

        size="A4"

        style={styles.page}

      >

        <View style={styles.card}>

          {/* ======================================
              Header
          ====================================== */}

          <View style={styles.header}>

            <Image

              src="/logo.png"

              style={styles.logo}

            />

            <View>

              <Text style={styles.title}>

                ALL INDIA LABOUR PARTY

              </Text>

              <Text style={styles.subtitle}>

                Official Digital Membership Card

              </Text>

            </View>

          </View>

          {/* ======================================
              Body
          ====================================== */}

          <View style={styles.body}>

            {/* Left */}

            <View style={styles.left}>

              <Image

                src={
                  member?.photo ||

                  "/images/avatar.png"
                }

                style={styles.photo}

              />

              <Text style={styles.status}>

                {

                  member?.membershipStatus ||

                  "REGISTERED"

                }

              </Text>

            </View>

            {/* Right */}

            <View style={styles.right}>

              <Text style={styles.label}>

                MEMBER NAME

              </Text>

              <Text style={styles.value}>

                {member?.fullName}

              </Text>

              <Text style={styles.label}>

                MEMBERSHIP ID

              </Text>

              <Text style={styles.value}>

                {

                  member?.membershipId ||

                  "Pending"

                }

              </Text>

              <Text style={styles.label}>

                DISTRICT

              </Text>

              <Text style={styles.value}>

                {

                  member?.district ||

                  "-"

                }

              </Text>

              <Text style={styles.label}>

                STATE

              </Text>

              <Text style={styles.value}>

                {

                  member?.state ||

                  "-"

                }

              </Text>

              <Text style={styles.label}>

                JOIN DATE

              </Text>

              <Text style={styles.value}>

                {

                  member?.joinDate

                  ? new Date(

                      member.joinDate

                    ).toLocaleDateString(

                      "en-IN"

                    )

                  : "Pending"

                }

              </Text>

            </View>

          </View>

          {/* ======================================
              Footer
          ====================================== */}

          <View style={styles.footer}>

            <Image

              src={
                member?.qrCode ||

                "/images/qr-placeholder.png"

              }

              style={styles.qr}

            />

            <Text style={styles.footerText}>

              This Digital Membership Card

              is the official identity of

              the member of the

              All India Labour Party.

            </Text>

          </View>

        </View>

      </Page>

    </Document>

  );

}