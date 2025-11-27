"use client";

import styles from "./NotesForm.module.css";

export function NotesForm() {
    return (
        <div className={styles.formContainer}>

            <div className={styles.macHeader}>
                <div className={`${styles.dot} ${styles.red}`}></div>
                <div className={`${styles.dot} ${styles.yellow}`}></div>
                <div className={`${styles.dot} ${styles.green}`}></div>
            </div>

            <h2 className={styles.title}>Nueva Nota</h2>
            <form>

                <div className={styles.inputGroup}>
                    <label htmlFor="title" className={styles.label}>Título</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Ej: Idea millonaria..."
                        className={styles.input}
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="content" className={styles.label}>Contenido</label>
                    <textarea
                        id="content"
                        placeholder="Escribe los detalles aquí..."
                        className={styles.textarea}
                    />
                </div>

                <button type="button" className={styles.button}>
                    Guardar Nota
                </button>

            </form>
        </div>
    );
}
