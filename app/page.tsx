import { NotesForm } from "@/components/NotesForm";
import { NoteCard } from "@/components/NoteCard";

// Función para cargar las notas desde el servidor
async function loadNotes() {
  const response = await fetch("http://localhost:3000/api/notes", { cache: 'no-store' });
  const notes = await response.json();
  return notes;
}

async function HomePage() {
  const notes = await loadNotes();

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* Sección del Formulario */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        marginBottom: '3rem'
      }}>
        <NotesForm />
      </div>

      {/* Sección de la Lista de Notas (Grid) */}
      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>

        {/* Mapeamos las notas y usamos el componente cliente NoteCard */}
        {notes.map((note: any) => (
          <NoteCard key={note.id} note={note} />
        ))}

      </div>
    </div>
  );
}

export default HomePage;
