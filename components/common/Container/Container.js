/*
=========================================================
Container Component

Purpose:
Keeps every page aligned consistently.

Instead of writing:

<div className="container">

we write

<Container>

=========================================================
*/

import styles from "./Container.module.css";

export default function Container({

    children

}){

    return(

        <div className={styles.container}>

            {children}

        </div>

    );

}