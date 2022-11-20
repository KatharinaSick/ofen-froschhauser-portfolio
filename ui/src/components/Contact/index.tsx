import React from 'react';
import styles from './index.module.css';

const Contact = () => {
    return (
        <div className={styles.Container}>
            <h1>Kontaktieren Sie mich</h1>

            <p>Ich freue mich über ein persönliches Beratungsgespräch, um mit meinem Wissen und meiner Praxiserfahrung
                den passenden Ofen nach Ihren Vorstellungen für Sie zu planen.</p>

            <div className={styles.ContactContainer}>
                <div className={styles.ContactItem}>
                    <h2>E-Mail</h2>
                    <span className={styles.Contact}>ofen@froschhauser.net</span>
                </div>
                <div className={styles.ContactItem}>
                    <h2>Telefon</h2>
                    <span className={styles.Contact}>+43 (0) 664 92 68 326</span>
                </div>
            </div>

            <h1>Impressum</h1>
            <h2>Für den Inhalt verantwortlich</h2>
            Richard Froschhauser<br/>Ofen Froschhauser<br/>Holzmannsdorf 13a<br/>A-8323 St. Marein bei Graz<br/>

            <ul>
                <li><strong>Telefon:</strong> +43 (0) 664 92 68 326</li>
                <li><strong>E-Mail:</strong> ofen@froschhauser.net</li>
            </ul>

            <h2>Disclaimer</h2>
            Die auf dieser Webseite veröffentlichten Inhalte und Werke unterliegen dem Urheberrecht. Jede
            Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des
            Urheberrechts bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen Urhebers bzw. Autors. Unsere
            Webseite enthält Verknüpfungen zu Webseiten Dritter. Da wir auf deren Inhalte keinen Einfluss haben, kann
            für die fremden Inhalte keine Gewähr übernommen werden. Für die Inhalte und Richtigkeit der Informationen
            ist stets der jeweilige Informationsanbieter der verlinkten Webseite verantwortlich.
        </div>
    )
}

export default Contact;
