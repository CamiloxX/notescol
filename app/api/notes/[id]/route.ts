import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({ message: "Obteniendo la nota" });
}

export function DELETE() {
    return NextResponse.json({ message: "Eliminando la nota" });
}

export function PUT() {
    return NextResponse.json({ message: "Actualizando la nota" });
}