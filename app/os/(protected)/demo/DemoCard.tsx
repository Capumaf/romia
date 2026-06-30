"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  demo: {
    id: string;
    title: string;
    description: string | null;
    industry: string | null;
    status: string;
    fileUrl: string;
    client: { name: string } | null;
  };
  updateDemo: (formData: FormData) => Promise<void>;
  deleteDemo: (formData: FormData) => Promise<void>;
};

export default function DemoCard({ demo, updateDemo, deleteDemo }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div
        className="rounded-2xl border p-6"
        style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
      >
        <form
          action={async (formData) => {
            await updateDemo(formData);
            setEditing(false);
          }}
          className="flex flex-col gap-2"
        >
          <input type="hidden" name="id" value={demo.id} />
          <input
            name="title"
            defaultValue={demo.title}
            className="rounded-lg border bg-transparent px-2 py-1 text-sm"
            style={{ borderColor: "var(--pink-line)", color: "white" }}
          />
          <input
            name="fileUrl"
            defaultValue={demo.fileUrl}
            className="rounded-lg border bg-transparent px-2 py-1 text-sm"
            style={{ borderColor: "var(--pink-line)", color: "white" }}
          />
          <input
            name="industry"
            defaultValue={demo.industry ?? ""}
            placeholder="Industria"
            className="rounded-lg border bg-transparent px-2 py-1 text-sm"
            style={{ borderColor: "var(--pink-line)", color: "white" }}
          />
          <textarea
            name="description"
            defaultValue={demo.description ?? ""}
            placeholder="Descripción"
            rows={2}
            className="rounded-lg border bg-transparent px-2 py-1 text-sm"
            style={{ borderColor: "var(--pink-line)", color: "white" }}
          />
          <select
            name="status"
            defaultValue={demo.status}
            className="rounded-lg border bg-transparent px-2 py-1 text-sm"
            style={{ borderColor: "var(--pink-line)", color: "white" }}
          >
            <option value="active" style={{ color: "black" }}>Activo</option>
            <option value="draft" style={{ color: "black" }}>Borrador</option>
          </select>
          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-lg px-3 py-1 text-xs font-medium"
              style={{ background: "var(--pink)", color: "black" }}
            >
              Guardar
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-lg px-3 py-1 text-xs"
              style={{ color: "var(--ink-mute)" }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border p-6"
      style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--pink)" }}>
        {demo.industry || "—"}
      </p>
      <h2 className="mt-2 text-lg font-semibold">{demo.title}</h2>
      {demo.client && (
        <p className="text-xs" style={{ color: "var(--ink-mute)" }}>{demo.client.name}</p>
      )}
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-dim)" }}>
        {demo.description || "—"}
      </p>

      <div className="mt-6 flex items-center justify-between">
        <span
          className="rounded-full px-3 py-1 text-xs"
          style={{
            background: demo.status === "active" ? "rgba(52,211,153,.12)" : "rgba(251,113,133,.12)",
            color: demo.status === "active" ? "var(--green)" : "var(--red)",
          }}
        >
          {demo.status === "active" ? "Activo" : "Borrador"}
        </span>

        <div className="flex items-center gap-3">
          <button onClick={() => setEditing(true)} className="text-xs" style={{ color: "var(--ink-mute)" }}>
            Editar
          </button>
          <form action={deleteDemo}>
            <input type="hidden" name="id" value={demo.id} />
            <button type="submit" className="text-xs" style={{ color: "var(--pink)" }}>
              Eliminar
            </button>
          </form>
          {demo.status === "active" && (
            <Link href={demo.fileUrl.startsWith("/") ? demo.fileUrl : `/${demo.fileUrl}`} target="_blank" className="text-xs font-medium" style={{ color: "var(--pink)" }}>
              Abrir →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}