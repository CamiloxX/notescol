import { NotesForm } from "@/components/NotesForm";

async function loadNotes() {
  const response = await fetch("http://localhost:3000/api/notes", { cache: 'no-store' });
  const notes = await response.json();
  return notes;
}

async function HomePage() {
  const notes = await loadNotes();

  return (

    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


      <div style={{
        width: '100%',
        maxWidth: '400px',
        marginBottom: '3rem'
      }}>
        <NotesForm />
      </div>

      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>

        {notes.map((note: any) => (
          <div key={note.id} style={{
            backgroundColor: '#ffffff',
            color: '#333333',
            padding: '1.5rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #eaeaea',
            transition: 'transform 0.2s'
          }}>

            {/* Título de la nota */}
            <h3 style={{
              marginTop: 0,
              marginBottom: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              color: '#000'
            }}>
              {note.title}
            </h3>

            {/* Contenido de la nota */}
            <p style={{
              margin: 0,
              fontSize: '0.95rem',
              lineHeight: '1.5',
              color: '#555'
            }}>
              {note.content}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}

export default HomePage;
