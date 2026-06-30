"use client";

import { useState } from "react";

type Props = {
  pricing: {
    id: string;
    tier: string;
    monthlyFee: any;
    setupFee: any;
    includedFlows: number | null;
    includedAgents: number | null;
    status: string;
  };
  clientId: string;
  updatePricing: (formData: FormData) => Promise<void>;
  deletePricing: (formData: FormData) => Promise<void>;
};

const tiers = ["STARTER", "GROWTH", "ENTERPRISE", "CUSTOM"];

export default function PricingRow({ pricing, clientId, updatePricing, deletePricing }: Props) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <tr className="border-t" style={{ borderColor: "var(--pink-line)" }}>
        <td colSpan={6} className="px-4 py-3">
          <form
            action={async (formData) => {
              await updatePricing(formData);
              setEditing(false);
            }}
            className="grid grid-cols-7 items-center gap-2"
          >
            <input type="hidden" name="id" value={pricing.id} />
            <input type="hidden" name="clientId" value={clientId} />

            <select
              name="tier"
              defaultValue={pricing.tier}
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              {tiers.map((t) => (
                <option key={t} value={t} style={{ color: "black" }}>{t}</option>
              ))}
            </select>

            <input
              name="monthlyFee"
              type="number"
              step="0.01"
              defaultValue={pricing.monthlyFee ? pricing.monthlyFee.toString() : ""}
              placeholder="Fee mensual"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <input
              name="setupFee"
              type="number"
              step="0.01"
              defaultValue={pricing.setupFee ? pricing.setupFee.toString() : ""}
              placeholder="Setup"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <input
              name="includedFlows"
              type="number"
              defaultValue={pricing.includedFlows ?? ""}
              placeholder="Flows"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <input
              name="includedAgents"
              type="number"
              defaultValue={pricing.includedAgents ?? ""}
              placeholder="Agents"
              className="rounded-lg border bg-transparent px-2 py-1 text-sm"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            />

            <select
              name="status"
              defaultValue={pricing.status}
              className="rounded-full border bg-transparent px-2 py-1 text-xs"
              style={{ borderColor: "var(--pink-line)", color: "white" }}
            >
              <option value="active" style={{ color: "black" }}>active</option>
              <option value="expired" style={{ color: "black" }}>expired</option>
              <option value="negotiating" style={{ color: "black" }}>negotiating</option>
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
      <td className="px-4 py-3">
        <span
          className="rounded-full px-2 py-1 text-xs"
          style={{ background: "var(--pink-soft)", color: "var(--pink)" }}
        >
          {pricing.tier}
        </span>
      </td>
      <td className="px-4 py-3">
        {pricing.monthlyFee ? `$${Number(pricing.monthlyFee).toFixed(2)}` : "—"}
      </td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>
        {pricing.setupFee ? `$${Number(pricing.setupFee).toFixed(2)}` : "—"}
      </td>
      <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>
        {pricing.includedFlows ?? "—"} flows / {pricing.includedAgents ?? "—"} agents
      </td>
      <td className="px-4 py-3">
        <span
          className="rounded-full px-2 py-1 text-xs"
          style={{
            background: pricing.status === "active" ? "var(--pink-soft)" : "transparent",
            color: pricing.status === "active" ? "var(--pink)" : "var(--ink-mute)",
            border: "1px solid var(--pink-line)",
          }}
        >
          {pricing.status}
        </span>
      </td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button onClick={() => setEditing(true)} className="text-xs" style={{ color: "var(--ink-mute)" }}>
            Editar
          </button>
          <form action={deletePricing}>
            <input type="hidden" name="id" value={pricing.id} />
            <input type="hidden" name="clientId" value={clientId} />
            <button type="submit" className="text-xs" style={{ color: "var(--pink)" }}>
              Eliminar
            </button>
          </form>
        </div>
      </td>
    </tr>
  );
}