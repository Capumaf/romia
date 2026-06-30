"use client";

import { useState } from "react";

type Props = {
  agent: {
    id: string;
    name: string;
    role: string | null;
    model: string | null;
    systemPrompt: string | null;
    temperature: any;
    maxTokens: number | null;
    status: string;
    description: string | null;
    totalTokensIn: number;
    totalTokensOut: number;
    totalRequests: number;
    totalCost: any;
  };
  implementationId: string;
  updateAgent: (formData: FormData) => Promise<void>;
  deleteAgent: (formData: FormData) => Promise<void>;
};

export default function AgentRow({ agent, implementationId, updateAgent, deleteAgent }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <tr className="border-t" style={{ borderColor: "var(--pink-line)" }}>
        <td colSpan={8} className="px-4 py-3">
          <form
            action={async (formData) => {
              await updateAgent(formData);
              setEditing(false);
            }}
            className="grid grid-cols-4 items-center gap-2"
          >
            <input type="hidden" name="id" value={agent.id} />
            <input type="hidden" name="implementationId" value={implementationId} />

            <input
              name="name"
              defaultValue={agent.name}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <select
              name="role"
              defaultValue={agent.role ?? ""}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="" style={{ color: "black" }}>Rol</option>
              <option value="Qualifier" style={{ color: "black" }}>Qualifier</option>
              <option value="Closer" style={{ color: "black" }}>Closer</option>
              <option value="Support" style={{ color: "black" }}>Support</option>
            </select>

            <select
              name="model"
              defaultValue={agent.model ?? ""}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="" style={{ color: "black" }}>Modelo</option>
              <option value="gpt-4o-mini" style={{ color: "black" }}>gpt-4o-mini</option>
              <option value="gpt-4o" style={{ color: "black" }}>gpt-4o</option>
              <option value="claude-sonnet-4-6" style={{ color: "black" }}>claude-sonnet-4-6</option>
              <option value="claude-haiku-4-5" style={{ color: "black" }}>claude-haiku-4-5</option>
            </select>

            <input
              name="temperature"
              type="number"
              step="0.01"
              min="0"
              max="1"
              defaultValue={agent.temperature ? agent.temperature.toString() : ""}
              placeholder="Temp"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <input
              name="maxTokens"
              type="number"
              defaultValue={agent.maxTokens ?? ""}
              placeholder="Max tokens"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <select
              name="status"
              defaultValue={agent.status}
              className="rounded-full border bg-transparent px-2 py-1 text-xs"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="active" style={{ color: "black" }}>active</option>
              <option value="paused" style={{ color: "black" }}>paused</option>
              <option value="testing" style={{ color: "black" }}>testing</option>
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

            <textarea
              name="systemPrompt"
              defaultValue={agent.systemPrompt ?? ""}
              placeholder="System prompt"
              rows={3}
              className="col-span-4 rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <input
              name="description"
              defaultValue={agent.description ?? ""}
              placeholder="Descripción"
              className="col-span-4 rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />
          </form>
        </td>
      </tr>
    );
  }

  return (
    <tr className="border-t" style={{ borderColor: "var(--pink-line)", color: "white" }}>
      <td className="px-4 py-3">{agent.name}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{agent.role || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>{agent.model || "—"}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>
        {agent.temperature ? Number(agent.temperature).toFixed(2) : "—"}
      </td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>
        {agent.totalRequests} req
      </td>
      <td className="px-4 py-3">${Number(agent.totalCost ?? 0).toFixed(4)}</td>
      <td className="px-4 py-3">
        <span
          className="rounded-full px-2 py-1 text-xs"
          style={{
            background: agent.status === "active" ? "var(--pink-soft)" : "transparent",
            color: agent.status === "active" ? "var(--pink)" : "var(--ink-mute)",
            border: "1px solid var(--pink-line)",
          }}
        >
          {agent.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="text-xs" style={{ color: "var(--ink-mute)" }}>
            Editar
          </button>
          <form action={deleteAgent}>
            <input type="hidden" name="id" value={agent.id} />
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