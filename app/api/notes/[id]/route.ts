import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

interface Params {
    params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
    try {
        // 1. Esperamos a que params se resuelva (OBLIGATORIO en Next.js 15)
        const { id } = await params;

        // 2. Se usa 'id' (convirtiéndolo a número)
        const note = await prisma.note.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!note) {
            return NextResponse.json({ message: "Nota no encontrada" }, { status: 404 });
        }

        return NextResponse.json(note);
    } catch (error) {
        return NextResponse.json({ message: "Error al obtener nota", error: String(error) }, { status: 500 });
    }
}



export async function DELETE(request: Request, { params }: Params) {
    try {
        const { id } = await params;

        const deletedNote = await prisma.note.delete({
            where: {
                id: Number(id),
            },
        });

        return NextResponse.json(deletedNote);
    } catch (error) {
        return NextResponse.json({ message: "Error al eliminar nota" }, { status: 500 });
    }
}

export async function PUT(request: Request, { params }: Params) {
    try {
        const { id } = await params; // <--- Y aquí también
        const { title, content } = await request.json();

        const updatedNote = await prisma.note.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                content,
            },
        });

        return NextResponse.json(updatedNote);
    } catch (error) {
        return NextResponse.json({ message: "Error al actualizar nota" }, { status: 500 });
    }
}