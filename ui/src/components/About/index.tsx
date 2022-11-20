import React from 'react';
import styles from './index.module.css';
import picture from './richard-froschhauser.jpg'

const About = () => {
    return (
        <div className={styles.Container}>
            <h1>Nur wer selbst brennt, kann Feuer in anderen entfachen</h1>

            <img className={styles.Picture} src={picture} alt="Richard Froschhauser"/>

            <p className={styles.TextStart}>
                Ein herzliches Hallo - ich freue mich sehr, dass Sie auf meiner Kontaktseite gelandet sind und
                möchte
                diese Gelegenheit nutzen um mich kurz vorzustellen. Mein Name ist Richard Froschhauser, ich bin
                leidenschaftlicher Ofensetzer und komme aus St. Marein bei Graz. Mein Motto lautet:
            </p>

            <blockquote>Arbeite wie für dich selbst und es wird ein perfektes Werk</blockquote>
            <p>
                Die Begeisterung für schöne Dinge, umweltfreundliches Heizen und die gesunde, wohltuende Wärme,
                welche
                ein Kachelofen abgibt, haben mich dazu bewogen den Beruf als Hafner zu erlernen. Mittlerweile bin
                ich
                seit 2006 in diesem Beruf tätig.
            </p>
            <p>
                Ich stehe Ihnen mit ausführlicher Beratung hinsichtlich baulicher Erfordernisse, technischer und
                gestalterischer Möglichkeiten zur Verfügung, und begleite Sie bei Ihrem Projekt von der Idee bis zur
                Fertigstellung. Sehr großen Wert lege ich darauf, dass jeder einzelne Schritt von der Planung bis
                zur
                Umsetzung in bestmöglicher Qualität und Sorgfalt durchgeführt wird.
            </p>
            <h2>Meine Leistungen</h2>
            <ul>
                <li>Kachelöfen/Speicheröfen</li>
                <li>Kombiöfen</li>
                <li>Kaminöfen</li>
                <li>Herde</li>
                <li>Ganzhausheizungen</li>
                <li>Dekorative Spachtelungen in Wohnraum und Badezimmer</li>
            </ul>
            <p>
                All diese Öfen können in ganz unterschiedlicher Optik gestaltet werden. Gefällt Ihnen ein Ofen in
                traditionellem „Gewand“, schlichter Eleganz oder doch lieber in moderner Betonoptik? Machen Sie
                sich <a
                href="/">hier</a> einen ersten Eindruck, welche Art von Ofen Ihnen zusagt.
            </p>
            <p>
                Ich freue mich über ein persönliches Beratungsgespräch, um mit meinem Wissen und meiner
                Praxiserfahrung
                den passenden Ofen nach Ihren Vorstellungen für Sie zu planen.
            </p>
            <p className={styles.Signature}>
                Ihr
                Richard Froschhauser

            </p>
        </div>
    )
}

export default About;
