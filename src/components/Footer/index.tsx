import React from 'react';
import styles from './index.module.css';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className={styles.Container}>
            <small>
                <Link to={"/contact"} className={styles.MenuItem}>Impressum</Link>
            </small>
            <p>|</p>
            <small>
                <div>Icons made by <a href={"https://icons8.com/"} target="_blank">icons8</a></div>
            </small>
        </div>
    );
}

export default Footer;
