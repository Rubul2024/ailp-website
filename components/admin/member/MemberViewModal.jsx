"use client";

import styles from "./MemberViewModal.module.css";

export default function MemberViewModal({

    member,

    onClose,

}){

    if(!member) return null;

    return(

        <div className={styles.overlay}>

            <div className={styles.modal}>

                <div className={styles.header}>

                    <h2>

                        Member Details

                    </h2>

                    <button

                        className={styles.close}

                        onClick={onClose}

                    >

                        ×

                    </button>

                </div>

                <div className={styles.body}>

                    <div className={styles.avatar}>

                        {member.fullName?.charAt(0)}

                    </div>

                    <div className={styles.grid}>

                        <div className={styles.item}>

                            <span className={styles.label}>

                                Full Name

                            </span>

                            <span className={styles.value}>

                                {member.fullName}

                            </span>

                        </div>

                        <div className={styles.item}>

                            <span className={styles.label}>

                                Email

                            </span>

                            <span className={styles.value}>

                                {member.email}

                            </span>

                        </div>

                        <div className={styles.item}>

                            <span className={styles.label}>

                                Membership ID

                            </span>

                            <span className={styles.value}>

                                {member.membershipId}

                            </span>

                        </div>

                        <div className={styles.item}>

                            <span className={styles.label}>

                                Mobile

                            </span>

                            <span className={styles.value}>

                                {member.mobile || "N/A"}

                            </span>

                        </div>

                    </div>

                </div>

                <div className={styles.footer}>

                    <button

                        className={styles.button}

                        onClick={onClose}

                    >

                        Close

                    </button>

                </div>

            </div>

        </div>

    );

}