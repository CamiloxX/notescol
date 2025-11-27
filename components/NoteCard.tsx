"use client";
import { useRouter } from "next/navigation";

export function NoteCard({ note }: { note: any }) {
    const router = useRouter();

    // Función para navegar a "Ver Nota"
    const handleViewNote = () => {
        router.push(`/note/view/${note.id}`);
    };

    async function handleDelete(e: React.MouseEvent) {
        e.stopPropagation();
        if (confirm("¿Estás seguro de querer eliminar esta nota?")) {
            const res = await fetch(`/api/notes/${note.id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                router.refresh();
            }
        }
    }

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        router.push(`/note/${note.id}`);
    };

    return (
        // Contenedor de la tarjeta
        <div
            onClick={handleViewNote}
            style={{
                backgroundColor: '#ffffff',
                color: '#333333',
                padding: '1.5rem',
                borderRadius: '16px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                border: '1px solid #eaeaea',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                height: '200px',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
            // Contenedor de la tarjeta
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: '0.5rem' }}>
                <h3 style={{
                    marginTop: 0,
                    marginBottom: 0,
                    marginLeft: 0,
                    marginRight: '10px',

                    fontWeight: "bold",
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '70%'
                }}>
                    {note.title}
                </h3>


                <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button onClick={handleEdit} style={{ background: "none", border: "none", cursor: "pointer", fontSize: '1.2rem' }} title="Editar">
                        ✏️
                    </button>
                    <button onClick={handleDelete} style={{ background: "none", border: "none", cursor: "pointer", fontSize: '1.2rem' }} title="Eliminar">
                        🗑️
                    </button>
                </div>
            </div>

            <p style={{
                margin: 0,
                color: '#666',
                flex: 1,

                display: '-webkit-box',
                WebkitLineClamp: 4,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                wordBreak: 'break-word'
            }}>
                {note.content}
            </p>


            <span style={{ fontSize: '0.8rem', color: '#999', marginTop: 'auto', paddingTop: '10px' }}>
                Leer nota completa...
            </span>
        </div>
    );
}
