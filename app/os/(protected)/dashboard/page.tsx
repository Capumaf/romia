import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function DashboardPage() {
  const [clients, implementations, flows, agents, costs, pricings] = await Promise.all([
    prisma.client.findMany(),
    prisma.implementation.findMany(),
    prisma.flow.findMany(),
    prisma.agent.findMany(),
    prisma.cost.findMany(),
    prisma.pricing.findMany({ where: { status: "active" } }),
  ]);

  const activeClients = clients.filter((c) => c.status === "active").length;
  const liveImplementations = implementations.filter((i) => i.status === "live").length;
  const activeFlows = flows.filter((f) => f.status === "active").length;
  const errorFlows = flows.filter((f) => f.status === "error").length;
  const activeAgents = agents.filter((a) => a.status === "active").length;

  const totalCosts = costs
    .filter((c) => c.currency === "USD")
    .reduce((sum, c) => sum + Number(c.amount), 0);

  const totalMRR = pricings.reduce((sum, p) => sum + Number(p.monthlyFee ?? 0), 0);
  const margin = totalMRR - totalCosts;

  const recentCosts = costs
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5);

  const cards = [
    { label: "Clientes activos", value: activeClients, total: clients.length, href: "/os/clients" },
    { label: "Implementaciones live", value: liveImplementations, total: implementations.length, href: "/os/implementations" },
    { label: "Flows activos", value: activeFlows, total: flows.length, href: "/os/flows", alert: errorFlows > 0 ? `${errorFlows} con error` : null },
    { label: "Agentes activos", value: activeAgents, total: agents.length, href: "/os/agents" },
  ];

  return (
    <div className="p-8">
      <h1
        className="text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        ROMIA OS — Dashboard
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        Vista general del negocio.
      </p>

      {/* Métricas financieras */}
      <div className="mb-6 grid grid-cols-3 gap-4">
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
        >
          <p className="text-sm" style={{ color: "var(--ink-mute)" }}>MRR (planes activos)</p>
          <p className="text-2xl" style={{ color: "var(--pink)" }}>${totalMRR.toFixed(2)}</p>
        </div>
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
        >
          <p className="text-sm" style={{ color: "var(--ink-mute)" }}>Costos totales</p>
          <p className="text-2xl text-white">${totalCosts.toFixed(2)}</p>
        </div>
        <div
          className="rounded-xl border p-4"
          style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
        >
          <p className="text-sm" style={{ color: "var(--ink-mute)" }}>Margen</p>
          <p className="text-2xl" style={{ color: margin >= 0 ? "var(--pink)" : "#ff4d4d" }}>
            ${margin.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Métricas operativas */}
      <div className="mb-8 grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-xl border p-4 transition-colors hover:border-[var(--pink)]"
            style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
          >
            <p className="text-sm" style={{ color: "var(--ink-mute)" }}>{card.label}</p>
            <p className="text-2xl text-white">
              {card.value} <span style={{ color: "var(--ink-mute)" }} className="text-base">/ {card.total}</span>
            </p>
            {card.alert && (
              <p className="text-xs" style={{ color: "#ff4d4d" }}>{card.alert}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Costos recientes */}
      <h2 className="mb-3 text-sm font-medium" style={{ color: "var(--ink-mute)" }}>
        Costos recientes
      </h2>
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", color: "var(--ink-mute)" }}>
              <th className="px-4 py-3 text-left font-medium">Categoría</th>
              <th className="px-4 py-3 text-left font-medium">Descripción</th>
              <th className="px-4 py-3 text-left font-medium">Monto</th>
            </tr>
          </thead>
          <tbody>
            {recentCosts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center" style={{ color: "var(--ink-mute)" }}>
                  Aún no hay costos registrados.
                </td>
              </tr>
            ) : (
              recentCosts.map((cost) => (
                <tr key={cost.id} className="border-t" style={{ borderColor: "var(--pink-line)", color: "white" }}>
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
                  <td className="px-4 py-3">${Number(cost.amount).toFixed(2)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}