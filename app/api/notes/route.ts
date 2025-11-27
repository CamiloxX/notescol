import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {

    // Se valida en caso de error
    try {
        const notes = await prisma.note.findMany();
        return NextResponse.json(notes);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Error fetching notes" }, { status: 500 })
    }
}

export async function POST(request: Request) {
    try {

        const { title, content } = await request.json()
        const NewNote = await prisma.note.create({
            data: {
                title,
                content
            }
        })

        return NextResponse.json(NewNote)
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 })
        }
        return NextResponse.json({ error: "Error creating note" }, { status: 500 })
    }

}