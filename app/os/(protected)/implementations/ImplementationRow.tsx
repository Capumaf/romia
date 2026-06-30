"use client";

import { useState } from "react";

type Props = {
  impl: {
    id: string;
    name: string;
    projectType: string | null;
    currentPhase: string | null;
    budget: any;
    whatsappNumber: string | null;
    crm: string | null;
    status: string;
    client: { name: string };
    flows: any[];
    agents: any[];
  };
  updateImplementation: (formData: FormData) => Promise<void>;
  deleteImplementation: (formData: FormData) => Promise<void>;
};

export default function ImplementationRow({
  impl,
  updateImplementation,
  deleteImplementation,
}: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <tr className="border-t" style={{ borderColor: "var(--pink-line)" }}>
        <td colSpan={10} className="px-4 py-3">
          <form
            action={async (formData) => {
              await updateImplementation(formData);
              setEditing(false);
            }}
            className="grid grid-cols-8 items-center gap-2"
          >
            <input type="hidden" name="id" value={impl.id} />
            <input
              name="name"
              defaultValue={impl.name}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="projectType"
              defaultValue={impl.projectType ?? ""}
              placeholder="Tipo"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="currentPhase"
              defaultValue={impl.currentPhase ?? ""}
              placeholder="Fase"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="budget"
              type="number"
              step="0.01"
              defaultValue={impl.budget ? impl.budget.toString() : ""}
              placeholder="Presupuesto"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="whatsappNumber"
              defaultValue={impl.whatsappNumber ?? ""}
              placeholder="WhatsApp"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <input
              name="crm"
              defaultValue={impl.crm ?? ""}
              placeholder="CRM"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
            <select
              name="status"
              defaultValue={impl.status}
              className="rounded-full border bg-transparent px-2 py-1 text-xs"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="setup">setup</option>
              <option value="live">live</option>
              <option value="paused">paused</option>
              <option value="completed">completed</option>
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
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t" style={{ borderColor: "var(--pink-line)", color: "white" }}>
      <td className="px-4 py-3">{impl.name}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{impl.client.name}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{impl.projectType || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{impl.currentPhase || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>
        {impl.budget ? `$${impl.budget.toString()}` : "—"}
      </td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{impl.whatsappNumber || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{impl.crm || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>
        {impl.flows.length} / {impl.agents.length}
      </td>
      <td className="px-4 py-3">
        <span
          className="rounded-full px-2 py-1 text-xs"
          style={{
            background: impl.status === "live" ? "var(--pink-soft)" : "transparent",
            color: impl.status === "live" ? "var(--pink)" : "var(--ink-mute)",
            border: "1px solid var(--pink-line)",
          }}
        >
          {impl.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="text-xs"
            style={{ color: "var(--ink-mute)" }}
          >
            Editar
          </button>
          <form action={deleteImplementation}>
            <input type="hidden" name="id" value={impl.id} />
            <button type="submit" className="text-xs" style={{ color: "var(--pink)" }}>
              Eliminar
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}