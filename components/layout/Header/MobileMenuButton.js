import styles from "./Header.module.css";

export default function MobileMenuButton({

onClick

}){

return(

<button

type="button"

className={styles.mobileButton}

onClick={onClick}

aria-label="Open navigation menu"

>

☰

</button>

);

}