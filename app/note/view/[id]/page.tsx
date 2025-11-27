import { prisma } from "@/libs/prisma";
import Link from "next/link";

// 1. Interfaz para Next.js 15
interface Props {
    params: Promise<{ id: string }>;
}

// 2. Carga de datos (Server Side)
async function loadNote(id: string) {
    // Convertimos ID a número y validamos
    const noteId = Number(id);
    if (isNaN(noteId)) return null;

    const note = await prisma.note.findUnique({
        where: { id: noteId },
    });
    return note;
}

export default async function ViewNotePage({ params }: Props) {
    const { id } = await params;
    const note = await loadNote(id);

    if (!note) {
        return <div style={{ padding: '2rem', color: 'white' }}>Nota no encontrada</div>;
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            padding: '2rem',
            backgroundColor: '#1a1a1a'
        }}>
            <div style={{
                backgroundColor: 'white',
                padding: '3rem',
                borderRadius: '12px',
                width: '100%',
                maxWidth: '800px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                position: 'relative'
            }}>

                {/* Botón "Atrás" */}
                <Link href="/" style={{
                    display: 'inline-block',
                    marginBottom: '1rem',
                    color: '#666',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '0.9rem'
                }}>
                    ← Volver a la lista
                </Link>

                <h1 style={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    color: '#111',
                    lineHeight: '1.2',
                    wordWrap: 'break-word'
                }}>
                    {note.title}
                </h1>

                <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '1.5rem 0' }} />

                <p style={{
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                    color: '#333',
                    whiteSpace: 'pre-wrap',
                    wordWrap: 'break-word'
                }}>
                    {note.content}
                </p>

                {/* Botón para Editar esta nota específica */}
                <div style={{ marginTop: '3rem' }}>
                    <Link href={`/note/${note.id}`} style={{
                        padding: '10px 20px',
                        backgroundColor: '#f3f4f6',
                        color: '#333',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: '600',
                        border: '1px solid #ddd'
                    }}>
                        ✏️ Editar esta nota
                    </Link>
                </div>

            </div>
        </div>
    );
}
