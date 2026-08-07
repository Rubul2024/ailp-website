"use client";

import {

  CheckCircle2,

  AlertTriangle,

} from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function FormMessages({

  success,

  error,

}) {

  return (

    <>

      {

        success && (

          <div className={styles.successMessage}>

            <CheckCircle2

              size={22}

            />

            <div>

              <strong>

                Success

              </strong>

              <p>

                {success}

              </p>

            </div>

          </div>

        )

      }

      {

        error && (

          <div className={styles.errorMessage}>

            <AlertTriangle

              size={22}

            />

            <div>

              <strong>

                Error

              </strong>

              <p>

                {error}

              </p>

            </div>

          </div>

        )

      }

    </>

  );

}