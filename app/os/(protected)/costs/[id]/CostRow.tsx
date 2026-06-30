"use client";

import { useState } from "react";

type Props = {
  cost: {
    id: string;
    category: string;
    description: string | null;
    amount: any;
    currency: string;
    billingPeriod: string | null;
    periodMonth: number | null;
    periodYear: number | null;
  };
  implementationId: string;
  updateCost: (formData: FormData) => Promise<void>;
  deleteCost: (formData: FormData) => Promise<void>;
};

const categories = ["CLAUDE_API", "OPENAI_API", "N8N", "WHATSAPP_API", "HOSTING", "CRM", "OTHER"];

export default function CostRow({ cost, implementationId, updateCost, deleteCost }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <tr className="border-t" style={{ borderColor: "var(--pink-line)" }}>
        <td colSpan={5} className="px-4 py-3">
          <form
            action={async (formData) => {
              await updateCost(formData);
              setEditing(false);
            }}
            className="grid grid-cols-6 items-center gap-2"
          >
            <input type="hidden" name="id" value={cost.id} />
            <input type="hidden" name="implementationId" value={implementationId} />

            <select
              name="category"
              defaultValue={cost.category}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              {categories.map((c) => (
                <option key={c} value={c} style={{ color: "black" }}>{c}</option>
              ))}
            </select>

            <input
              name="description"
              defaultValue={cost.description ?? ""}
              placeholder="Descripción"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <input
              name="amount"
              type="number"
              step="0.01"
              defaultValue={cost.amount.toString()}
              placeholder="Monto"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <select
              name="billingPeriod"
              defaultValue={cost.billingPeriod ?? "monthly"}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="monthly" style={{ color: "black" }}>Mensual</option>
              <option value="one-time" style={{ color: "black" }}>Único</option>
              <option value="usage-based" style={{ color: "black" }}>Por uso</option>
            </select>

            <input
              name="periodMonth"
              type="number"
              min="1"
              max="12"
              defaultValue={cost.periodMonth ?? ""}
              placeholder="Mes"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <input
              name="periodYear"
              type="number"
              defaultValue={cost.periodYear ?? ""}
              placeholder="Año"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

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
      <td className="px-4 py-3">
        <span
          className="rounded-full px-2 py-1 text-xs"
          style={{ background: "var(--pink-soft)", color: "var(--pink)" }}
        >
          {cost.category}
        </span>
      </td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>
        {cost.description || "—"}
      </td>
      <td className="px-4 py-3">${Number(cost.amount).toFixed(2)} {cost.currency}</td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>
        {cost.billingPeriod || "—"}
        {cost.periodMonth && cost.periodYear ? ` (${cost.periodMonth}/${cost.periodYear})` : ""}
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="text-xs" style={{ color: "var(--ink-mute)" }}>
            Editar
          </button>
          <form action={async (formData) => deleteCost(formData)}>
            <input type="hidden" name="id" value={cost.id} />
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