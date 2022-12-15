import React from 'react';
import styles from './index.module.css';
import {Link} from "react-router-dom";
import Logo from './logo.png'

const Menu = () => {
    return (
        <div className={styles.Container}>
            <Link to={"/about"} className={styles.MenuItem}>Über Mich</Link>

            <Link to={"/"} className={styles.LogoContainer}>
                <img src={Logo} width={200}/>
            </Link>

            <Link to={"/contact"} className={styles.MenuItem}>Kontakt</Link>

        </div>
    );
}

export default Menu;
