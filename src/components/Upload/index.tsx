import React, {ChangeEvent, useState} from 'react';
import styles from './index.module.css';
import axios from "axios";

const Upload = () => {
    const [chosenFiles, setChosenFiles] = useState<FileList | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [token, setToken] = useState<string | null>(null)

    const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
        setChosenFiles(e.target.files)
    }

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setToken(e.target.value)
    }

    const uploadPictures = () => {
        if (chosenFiles === null || chosenFiles.length === 0) {
            setError("No files selected")
            return;
        }

        const formData = new FormData();
        for (let key in chosenFiles) {
            formData.append("images", chosenFiles[key]);
        }
        setLoading(true)
        setError(null)
        setSuccess(false)
        axios.post(
            'https://server-mccioquvva-ey.a.run.app/upload',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Ofen-Access-Token': token
                },
            }
        )
            .then(r => {
                setLoading(false)
                setSuccess(true)
                setChosenFiles(null)
            })
            .catch(e => {
                setLoading(false)
                if (e) {
                    setError(`${e.response.status}: ${e.response.data}`)
                } else {
                    setError('Unbekannter Fehler')
                }
            })
    }

    return (
        <div className={styles.Container}>
            <h1>Bilder hochladen</h1>

            <p>Lade hier deine Bilder hoch</p>

            <div className={styles.UploadContainer}>
                <input className={styles.FileUpload}
                       id='fileUpload'
                       type='file' multiple
                       accept='image/*'
                       onChange={handleFileEvent}
                />

                <label htmlFor='fileUpload' className={styles.Button}>
                    1. Bilder auswählen
                </label>

                {(chosenFiles === null || chosenFiles.length === 0) && <h2>Keine Bilder ausgewählt</h2>}
                {(chosenFiles !== null && chosenFiles.length > 0) &&
                    <div className={styles.UploadContainer}>
                        <h2>{chosenFiles.length} Bilder ausgewählt</h2>
                        <input className={styles.Input} type="password" placeholder="2. Passwort"
                               onChange={handleInput}/>
                        <span className={styles.Button} onClick={uploadPictures}>3. Bilder hochladen</span>
                    </div>
                }
                {loading && <h2>Laden...</h2>}
                {success && <h2>Bilder hochgeladen</h2>}
                {error && (<>
                    <h2>Ein Fehler ist aufgetreten</h2>
                    <span>{error}</span>
                </>)}
            </div>
        </div>
    )
}

export default Upload;
