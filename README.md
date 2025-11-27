# 📝 NotesCol - Administrador de Notas FullStack

Una aplicación moderna para la gestión de notas desarrollada con **Next.js**, diseñada para crear, editar, visualizar y eliminar notas con soporte completo para texto (**Markdown**).

---

## 🚀 Características Principales

- **CRUD Completo:** Crear, Leer, Actualizar y Eliminar notas.
- **Editor Markdown** usando `@uiw/react-md-editor`.
- **Vista Previa:** Renderizado de Markdown a HTML
- **Interfaz Moderna:** Diseño responsivo tipo Grid con tarjetas interactivas.
- **Arquitectura App Router:** Uso de *Server Components* 
- **Base de Datos:** **Prisma ORM**.

---

## 🛠️ Tecnologías Utilizadas

- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **ORM:** Prisma
- **Base de Datos:** SQLite (Entorno local)
- **Estilos:** CSS Modules y CSS en línea
- **Markdown:** `@uiw/react-md-editor` & `next/dynamic`



## 📂 Estructura del Proyecto

Breve descripción de los archivos clave implementados:

- `src/app/page.tsx`: Página principal (Home) que lista todas las notas (Server Component).
- `src/app/note/[id]/page.tsx`: Página para **Editar** notas existente.
- `src/app/note/view/[id]/page.tsx`: Página para **Visualizar** el contenido completo de la nota.
- `src/components/NotesForm.tsx`: Formulario inteligente que maneja tanto la creación (POST) como la edición (PUT).
- `src/components/MdEditor.tsx`: Componente del editor Markdown con carga dinámica (`ssr: false`) para compatibilidad con Next.js.
- `src/app/api/notes`: Endpoints del Backend (GET, POST, PUT, DELETE).

---



Desarrollado por **CAMILO ALEJANDRO BARRAGAN BELTRAN** 
