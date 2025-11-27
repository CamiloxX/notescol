import { NotesForm } from "@/components/NotesForm";
import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";

// 1. Definimos la interfaz correcta para Next.js 
interface Props {
    params: Promise<{ id: string }>;
}

// 2. Función para cargar nota con manejo de errores
async function loadNote(id: string) {
    // Validamos que el ID sea un número válido antes de llamar a Prisma
    const noteId = Number(id);

    if (isNaN(noteId)) {
        return null;
    }

    const note = await prisma.note.findUnique({
        where: {
            id: noteId,
        },
    });

    return note;
}

export default async function EditPage({ params }: Props) {
    // 3. Esperamos a que params se resuelva (Clave del error)
    const resolvedParams = await params;
    const id = resolvedParams.id;

    // 4. Ahora sí cargamos la nota con el ID ya extraído
    const note = await loadNote(id);

    // 5. Si no existe, redirigimos o mostramos error
    if (!note) {
        return (
            <div style={{ color: 'red', textAlign: 'center', marginTop: '50px' }}>
                <h1>Error: Nota no encontrada</h1>
                <p>La nota con ID {id} no existe o fue eliminada.</p>
                <a href="/" style={{ color: 'blue', textDecoration: 'underline' }}>Volver al inicio</a>
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '2rem'
        }}>
            <div style={{ width: '100%', maxWidth: '550px' }}>
                <NotesForm note={note} />
            </div>
        </div>
    );
}
