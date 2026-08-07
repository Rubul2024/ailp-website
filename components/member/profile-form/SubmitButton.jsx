"use client";

import { Loader2, Save } from "lucide-react";

import styles from "../ProfileForm.module.css";

export default function SubmitButton({

  loading,

}) {

  return (

    <div className={styles.submitWrapper}>

      <button

        type="submit"

        className={styles.submitButton}

        disabled={loading}

      >

        {

          loading

          ?

          <>

            <Loader2

              size={20}

              className={styles.spin}

            />

            Saving Profile...

          </>

          :

          <>

            <Save size={20} />

            Save Membership Profile

          </>

        }

      </button>

    </div>

  );

}