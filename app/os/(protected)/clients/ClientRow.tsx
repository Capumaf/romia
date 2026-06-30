"use client";

import { useState } from "react";

type Props = {
  client: {
    id: string;
    name: string;
    company: string | null;
    email: string | null;
    phone: string | null;
    country: string | null;
    status: string;
    implementations: { id: string }[];
  };
  updateClient: (formData: FormData) => Promise<void>;
  deleteClient: (formData: FormData) => Promise<void>;
};

export default function ClientRow({ client, updateClient, deleteClient }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <tr className="border-t" style={{ borderColor: "var(--pink-line)" }}>
        <td colSpan={7} className="px-4 py-3">
          <form
            action={async (formData) => {
              await updateClient(formData);
              setEditing(false);
            }}
            className="grid grid-cols-6 items-center gap-2"
          >
            <input type="hidden" name="id" value={client.id} />

            <input
              name="name"
              defaultValue={client.name}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="company"
              defaultValue={client.company ?? ""}
              placeholder="Empresa"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="email"
              defaultValue={client.email ?? ""}
              placeholder="Email"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="phone"
              defaultValue={client.phone ?? ""}
              placeholder="Teléfono"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="country"
              defaultValue={client.country ?? ""}
              placeholder="País"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <select
              name="status"
              defaultValue={client.status}
              className="rounded-full border bg-transparent px-2 py-1 text-xs"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="active" style={{ color: "black" }}>active</option>
              <option value="paused" style={{ color: "black" }}>paused</option>
              <option value="churned" style={{ color: "black" }}>churned</option>
            </select>

            <div className="col-span-6 flex gap-2">
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
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t" style={{ borderColor: "var(--pink-line)", color: "white" }}>
      <td className="px-4 py-3">{client.name}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{client.company || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{client.email || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{client.country || "—"}</td>
      <td className="px-4 py-3">
        <span
          className="rounded-full px-2 py-1 text-xs"
          style={{
            background: client.status === "active" ? "var(--pink-soft)" : "transparent",
            color: client.status === "active" ? "var(--pink)" : "var(--ink-mute)",
            border: "1px solid var(--pink-line)",
          }}
        >
          {client.status}
        </span>
      </td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{client.implementations.length}</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="text-xs" style={{ color: "var(--ink-mute)" }}>
            Editar
          </button>
          <form action={deleteClient}>
            <input type="hidden" name="id" value={client.id} />
            <button type="submit" className="text-xs" style={{ color: "var(--pink)" }}>
              Eliminar
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}