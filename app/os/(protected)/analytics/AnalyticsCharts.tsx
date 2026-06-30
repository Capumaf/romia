"use client";

import { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type Cost = {
  id: string;
  category: string;
  amount: number;
  currency: string;
  createdAt: string;
  clientName: string;
  implementationName: string;
};

type Implementation = {
  id: string;
  name: string;
  clientName: string;
};

type ClientMargin = {
  id: string;
  name: string;
  mrr: number;
  costs: number;
  margin: number;
};

type Props = {
  costs: Cost[];
  implementations: Implementation[];
  clientMargins: ClientMargin[];
};

const PERIODS = [
  { key: "daily", label: "Diario", days: 1 },
  { key: "biweekly", label: "Quincenal", days: 15 },
  { key: "monthly", label: "Mensual", days: 30 },
  { key: "quarterly", label: "Trimestral", days: 90 },
  { key: "semester", label: "Semestral", days: 180 },
  { key: "annual", label: "Anual", days: 365 },
] as const;

const COLORS = ["#ff3d8a", "#7c3aed", "#06b6d4", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

export default function AnalyticsCharts({ costs, implementations, clientMargins }: Props) {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]["key"]>("monthly");

  const filteredCosts = useMemo(() => {
    const days = PERIODS.find((p) => p.key === period)?.days ?? 30;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return costs.filter((c) => new Date(c.createdAt) >= cutoff);
  }, [costs, period]);

  // Costos por categoría
  const byCategory = useMemo(() => {
    const map = new Map<string, number>();
    filteredCosts.forEach((c) => {
      map.set(c.category, (map.get(c.category) ?? 0) + c.amount);
    });
    return Array.from(map.entries()).map(([name, value]) => ({ name, value }));
  }, [filteredCosts]);

  // Costos por proyecto/implementación
  const byImplementation = useMemo(() => {
    const map = new Map<string, number>();
    filteredCosts.forEach((c) => {
      map.set(c.implementationName, (map.get(c.implementationName) ?? 0) + c.amount);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [filteredCosts]);

  const totalPeriod = filteredCosts.reduce((sum, c) => sum + c.amount, 0);
  const totalMRR = clientMargins.reduce((sum, c) => sum + c.mrr, 0);
  const totalMargin = clientMargins.reduce((sum, c) => sum + c.margin, 0);

  return (
    <div>
      {/* Selector de periodo */}
      <div className="mb-6 flex gap-2">
        {PERIODS.map((p) => (
          <button
            key={p.key}
            onClick={() => setPeriod(p.key)}
            className="rounded-full border px-3 py-1 text-xs transition-colors"
            style={{
              borderColor: "var(--pink-line)",
              background: period === p.key ? "var(--pink-soft)" : "transparent",
              color: period === p.key ? "var(--pink)" : "var(--ink-mute)",
            }}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Resumen */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <p className="text-sm" style={{ color: "var(--ink-mute)" }}>Costos del periodo</p>
          <p className="text-2xl text-white">${totalPeriod.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <p className="text-sm" style={{ color: "var(--ink-mute)" }}>MRR total</p>
          <p className="text-2xl" style={{ color: "var(--pink)" }}>${totalMRR.toFixed(2)}</p>
        </div>
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <p className="text-sm" style={{ color: "var(--ink-mute)" }}>Margen total</p>
          <p className="text-2xl" style={{ color: totalMargin >= 0 ? "var(--pink)" : "#ff4d4d" }}>
            ${totalMargin.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Costos por categoría */}
      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <h3 className="mb-3 text-sm font-medium" style={{ color: "var(--ink-mute)" }}>
            Costos por categoría
          </h3>
          {byCategory.length === 0 ? (
            <p style={{ color: "var(--ink-mute)" }} className="py-8 text-center text-sm">Sin datos en este periodo</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {byCategory.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Costos por proyecto */}
        <div className="rounded-xl border p-4" style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}>
          <h3 className="mb-3 text-sm font-medium" style={{ color: "var(--ink-mute)" }}>
            Costos por proyecto
          </h3>
          {byImplementation.length === 0 ? (
            <p style={{ color: "var(--ink-mute)" }} className="py-8 text-center text-sm">Sin datos en este periodo</p>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={byImplementation}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--pink-line)" />
                <XAxis dataKey="name" stroke="var(--ink-mute)" fontSize={11} />
                <YAxis stroke="var(--ink-mute)" fontSize={11} />
                <Tooltip />
                <Bar dataKey="value" fill="#ff3d8a" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Margen por cliente */}
      <h3 className="mb-3 text-sm font-medium" style={{ color: "var(--ink-mute)" }}>
        Margen por cliente
      </h3>
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", color: "var(--ink-mute)" }}>
              <th className="px-4 py-3 text-left font-medium">Cliente</th>
              <th className="px-4 py-3 text-left font-medium">MRR</th>
              <th className="px-4 py-3 text-left font-medium">Costos totales</th>
              <th className="px-4 py-3 text-left font-medium">Margen</th>
            </tr>
          </thead>
          <tbody>
            {clientMargins.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-6 text-center" style={{ color: "var(--ink-mute)" }}>
                  Sin clientes registrados.
                </td>
              </tr>
            ) : (
              clientMargins.map((c) => (
                <tr key={c.id} className="border-t" style={{ borderColor: "var(--pink-line)", color: "white" }}>
                  <td className="px-4 py-3">{c.name}</td>
                  <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>${c.mrr.toFixed(2)}</td>
                  <td className="px-4 py-3" style={{ color: "var(--ink-mute)" }}>${c.costs.toFixed(2)}</td>
                  <td className="px-4 py-3" style={{ color: c.margin >= 0 ? "var(--pink)" : "#ff4d4d" }}>
                    ${c.margin.toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}