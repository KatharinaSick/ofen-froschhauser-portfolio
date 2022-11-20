import React, {ChangeEvent, useState} from 'react';
import styles from './index.module.css';

const Upload = () => {
    const [chosenFiles, setChosenFiles] = useState<File[]>([])

    const handleUploadFiles = (files: File[]) => {
        const uploaded = [...chosenFiles];
        let limitExceeded = false;
        files.some((file: File) => {
            if (uploaded.findIndex((f: File) => f.name === file.name) === -1) {
                uploaded.push(file);
            }
        })
        if (!limitExceeded) {
            setChosenFiles(uploaded)
        }
    }

    const handleFileEvent = (e: ChangeEvent<HTMLInputElement>) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
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

                <h2>Ausgewählte Bilder</h2>

                {chosenFiles.length == 0 && <p>Keine Bilder ausgewählt</p>}
                <div>
                    {chosenFiles.map(file => (
                        <div key={file.name}>
                            {file.name}
                        </div>
                    ))}
                </div>

                {chosenFiles.length > 0 && <span className={styles.Button}>2. Bilder hochladen</span>}
            </div>
        </div>
    )
}

export default Upload;
