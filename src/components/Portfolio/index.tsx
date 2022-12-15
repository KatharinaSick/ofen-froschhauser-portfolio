import React, {useEffect, useState} from 'react';
import styles from './index.module.css';
import Picture from "../Picture";

interface Image {
    filename: string
}

const Portfolio = () => {
    const [images, setImages] = useState<Image[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsLoading(true)
        setError(null)
        fetch('/ofen-froschhauser-portfolio/images/index.json')
            .then(r => {
                r.json()
                    .then(i => {
                        setIsLoading(false)
                        setImages(i)
                    })
                    .catch(reason => {
                        setIsLoading(false)
                        setError(reason)
                    })
            })
            .catch(reason => {
                setIsLoading(false)
                setError(reason)
            })
    }, []);

    return (
        <div>
            {isLoading &&
                <div className={styles.Center}>
                    <div className={styles.Loader}>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            }
            {error &&
                <div className={styles.Center}>Bilder konnten nicht geladen werden:<br/>{error}</div>
            }
            {!error &&
                <div className={styles.Container}>
                    {images.map(image => <Picture key={image.filename} filename={image.filename}/>)}
                </div>
            }
        </div>

    );
}

export default Portfolio;
