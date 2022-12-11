import React from 'react';
import styles from './index.module.css';

const NotFound = () => {
    return (
        <div className={styles.Container}>
            <h1>Seite nicht gefunden</h1>

            <p>
                Diese Seite konnte nicht gefunden werden. Lassen Sie sich doch <a href={"/"}>hier</a> von meiner Arbeit
                inspirieren.
            </p>

            <a className={styles.Button} href={"/"}>Zur Startseite</a>

        </div>
    )
}

export default NotFound;
