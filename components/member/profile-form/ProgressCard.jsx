"use client";

import styles from "../ProfileForm.module.css";

export default function ProgressCard({

  formData,

}) {

  const fields = [

    formData.fullName,

    formData.email,

    formData.mobile,

    formData.fatherName,

    formData.motherName,

    formData.gender,

    formData.dateOfBirth,

    formData.occupation,

    formData.education,

    formData.bloodGroup,

    formData.country,

    formData.state,

    formData.district,

    formData.assembly,

    formData.block,

    formData.village,

    formData.city,

    formData.pincode,

    formData.address,

    formData.emergencyName,

    formData.relationship,

    formData.emergencyMobile,

  ];

  const completed = fields.filter(

    (field) =>

      field !== "" &&

      field !== null &&

      field !== undefined

  ).length;

  const total = fields.length;

  const percentage = Math.round(

    (completed / total) * 100

  );

  return (

    <div className={styles.progressCard}>

      <div className={styles.progressTop}>

        <div>

          <h2>

            Complete Your Membership Profile

          </h2>

          <p>

            Complete your profile to generate

            your official Membership Card.

          </p>

        </div>

        <div className={styles.progressPercent}>

          {percentage}%

        </div>

      </div>

      <div className={styles.progressBar}>

        <div

          className={styles.progress}

          style={{

            width: `${percentage}%`,

          }}

        />

      </div>

      <div className={styles.progressInfo}>

        <span>

          Completed :

          <strong>

            {" "}

            {completed}

          </strong>

        </span>

        <span>

          Remaining :

          <strong>

            {" "}

            {total - completed}

          </strong>

        </span>

      </div>

    </div>

  );

}