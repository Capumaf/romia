import { prisma } from "@/lib/prisma";
import AnalyticsCharts from "./AnalyticsCharts";

export default async function AnalyticsPage() {
  const [costs, implementations, clients, pricings] = await Promise.all([
    prisma.cost.findMany({
      include: { client: true, implementation: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.implementation.findMany({ include: { client: true } }),
    prisma.client.findMany(),
    prisma.pricing.findMany({ where: { status: "active" } }),
  ]);

  // Serializar Decimal a number para pasar a Client Component
  const serializedCosts = costs.map((c) => ({
    id: c.id,
    category: c.category,
    amount: Number(c.amount),
    currency: c.currency,
    createdAt: c.createdAt.toISOString(),
    clientName: c.client.name,
    implementationName: c.implementation?.name ?? "Sin proyecto",
  }));

  const serializedImplementations = implementations.map((i) => ({
    id: i.id,
    name: i.name,
    clientName: i.client.name,
  }));

  const serializedClients = clients.map((c) => {
    const pricing = pricings.find((p) => p.clientId === c.id);
    const clientCosts = costs
      .filter((cost) => cost.clientId === c.id)
      .reduce((sum, cost) => sum + Number(cost.amount), 0);
    return {
      id: c.id,
      name: c.name,
      mrr: pricing ? Number(pricing.monthlyFee ?? 0) : 0,
      costs: clientCosts,
      margin: (pricing ? Number(pricing.monthlyFee ?? 0) : 0) - clientCosts,
    };
  });

  return (
    <div className="p-8">
      <h1
        className="text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        ROMIA OS — Analytics
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        Análisis detallado de costos, proyectos y márgenes.
      </p>

      <AnalyticsCharts
        costs={serializedCosts}
        implementations={serializedImplementations}
        clientMargins={serializedClients}
      />
    </div>
  );
}