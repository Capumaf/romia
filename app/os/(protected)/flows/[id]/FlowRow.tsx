"use client";

import { useState } from "react";

type Props = {
  flow: {
    id: string;
    name: string;
    type: string | null;
    trigger: string | null;
    n8nWorkflowId: string | null;
    status: string;
    description: string | null;
    errorCount: number;
  };
  implementationId: string;
  updateFlow: (formData: FormData) => Promise<void>;
  deleteFlow: (formData: FormData) => Promise<void>;
};

export default function FlowRow({ flow, implementationId, updateFlow, deleteFlow }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <tr className="border-t" style={{ borderColor: "var(--pink-line)" }}>
        <td colSpan={6} className="px-4 py-3">
          <form
            action={async (formData) => {
              await updateFlow(formData);
              setEditing(false);
            }}
            className="grid grid-cols-6 items-center gap-2"
          >
            <input type="hidden" name="id" value={flow.id} />
            <input type="hidden" name="implementationId" value={implementationId} />

            <input
              name="name"
              defaultValue={flow.name}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <select
              name="type"
              defaultValue={flow.type ?? ""}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="" style={{ color: "black" }}>Tipo</option>
              <option value="intake" style={{ color: "black" }}>Intake</option>
              <option value="follow-up" style={{ color: "black" }}>Follow-up</option>
              <option value="qualification" style={{ color: "black" }}>Qualification</option>
              <option value="handoff" style={{ color: "black" }}>Handoff</option>
            </select>

            <input
              name="trigger"
              defaultValue={flow.trigger ?? ""}
              placeholder="Trigger"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <input
              name="n8nWorkflowId"
              defaultValue={flow.n8nWorkflowId ?? ""}
              placeholder="n8n ID"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <select
              name="status"
              defaultValue={flow.status}
              className="rounded-full border bg-transparent px-2 py-1 text-xs"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="active" style={{ color: "black" }}>active</option>
              <option value="paused" style={{ color: "black" }}>paused</option>
              <option value="draft" style={{ color: "black" }}>draft</option>
              <option value="error" style={{ color: "black" }}>error</option>
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

            <input
              name="description"
              defaultValue={flow.description ?? ""}
              placeholder="Descripción"
              className="col-span-6 rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t" style={{ borderColor: "var(--pink-line)", color: "white" }}>
      <td className="px-4 py-3">{flow.name}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{flow.type || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{flow.trigger || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{flow.n8nWorkflowId || "—"}</td>
      <td className="px-4 py-3">
        <span
          className="rounded-full px-2 py-1 text-xs"
          style={{
            background: flow.status === "active" ? "var(--pink-soft)" : "transparent",
            color: flow.status === "active" ? "var(--pink)" : flow.status === "error" ? "#ff4d4d" : "var(--ink-mute)",
            border: "1px solid var(--pink-line)",
          }}
        >
          {flow.status}{flow.errorCount > 0 ? ` (${flow.errorCount})` : ""}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="text-xs" style={{ color: "var(--ink-mute)" }}>
            Editar
          </button>
          <form action={deleteFlow}>
            <input type="hidden" name="id" value={flow.id} />
            <input type="hidden" name="implementationId" value={implementationId} />
            <button type="submit" className="text-xs" style={{ color: "var(--pink)" }}>
              Eliminar
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}