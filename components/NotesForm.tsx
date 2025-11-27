"use client";
import styles from "./NotesForm.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import MdEditor from "@/components/MdEditor";

export function NotesForm({ note }: { note?: any }) {
    const router = useRouter();

    // Estados
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    // Rellena el formulario si llega una nota para editar
    useEffect(() => {
        if (note) {
            setTitle(note.title);
            setContent(note.content);
        }
    }, [note]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validación: revisa que no estén vacíos 
        if (!title.trim() || !content.trim()) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
            return;
        }

        // LÓGICA DE GUARDADO
        if (note) {
            //  MODO EDICIÓN (PUT)
            const res = await fetch(`/api/notes/${note.id}`, {
                method: 'PUT',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setShowSuccess(true);
                router.refresh();
                // Volver al inicio tras editar
                router.push("/");
            }

        } else {
            // MODO CREACIÓN (POST)
            const res = await fetch('/api/notes', {
                method: 'POST',
                body: JSON.stringify({ title, content }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (res.ok) {
                setShowSuccess(true);
                setTitle("");
                setContent(""); // Limpia el editor
                router.refresh();
                setTimeout(() => setShowSuccess(false), 3000);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className={styles.formContainer}>

                <div className={styles.macHeader}>
                    <div className={`${styles.dot} ${styles.red}`}></div>
                    <div className={`${styles.dot} ${styles.yellow}`}></div>
                    <div className={`${styles.dot} ${styles.green}`}></div>
                </div>

                <h2 className={styles.title}>
                    {note ? "Editar Nota" : "NOTESCOL - NUEVA NOTA"}
                </h2>

                <div className={styles.inputGroup}>
                    <label htmlFor="title" className={styles.label}>Título</label>
                    <input
                        type="text"
                        id="title"
                        placeholder="Ej: Idea millonaria..."
                        className={styles.input}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* MdEditor en vez de textarea */}
                <div className={styles.inputGroup} style={{ marginBottom: '1.5rem' }}>
                    <label className={styles.label} style={{ marginBottom: '0.5rem', display: 'block' }}>
                        Contenido (Markdown)
                    </label>

                    {/* El editor recibe 'value' y 'onChange' igual que un input */}
                    <MdEditor
                        value={content}
                        onChange={setContent}
                    />
                </div>

                <button type="submit" className={styles.button}>
                    {note ? "Actualizar Nota" : "Guardar Nota"}
                </button>
            </div>

            {/* --- POP-UP DE ÉXITO --- */}
            {showSuccess && (
                <div className={styles.toast}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4ade80', marginRight: '8px' }}>
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>{note ? "Nota actualizada con éxito" : "Nota agregada con éxito"}</span>
                </div>
            )}

            {/* --- POP-UP DE ERROR --- */}
            {showError && (
                <div className={styles.toast} style={{ borderLeft: '4px solid #ff5f57' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#ff5f57', marginRight: '8px' }}>
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                    </svg>
                    <span>Completa todos los campos</span>
                </div>
            )}
        </form>
    );
}
