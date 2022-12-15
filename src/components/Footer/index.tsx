import React from 'react';
import styles from './index.module.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className={styles.Container}>
            <small>
                <Link to={"/contact"} className={styles.MenuItem}>Impressum</Link>
            </small>
        </div>
    );
}

export default Footer;
