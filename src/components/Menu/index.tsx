import React from 'react';
import styles from './index.module.css';
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div className={styles.Container}>
            <Link to={"/about"} className={styles.MenuItem}>Über Mich</Link>

            <Link to={"/"} className={styles.LogoContainer}>
                <span className={styles.LogoText}>Ofen</span>
                <div className={styles.LogoDivider}/>
                <span className={styles.LogoText}> Froschhauser</span>
            </Link>

            <Link to={"/contact"} className={styles.MenuItem}>Kontakt</Link>

        </div>
    );
}

export default Menu;
