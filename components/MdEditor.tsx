"use client";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// Importamos el editor 
const MDEditor = dynamic(
    () => import("@uiw/react-md-editor"),
    { ssr: false }
);

interface Props {
    value: string;
    onChange: (val: string) => void;
}

export default function MdEditor({ value, onChange }: Props) {
    return (
        <div data-color-mode="light">
            <MDEditor
                value={value}
                onChange={(val) => onChange(val || "")}
                height={400}
                style={{ borderRadius: '8px', overflow: 'hidden' }}
            />
        </div>
    );
}
