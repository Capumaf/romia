import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AgentsPage() {
  const implementations = await prisma.implementation.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: true, agents: true },
  });

  return (
    <div className="p-8">
      <h1
        className="text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        ROMIA OS — Agents
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        Selecciona un proyecto para ver y gestionar sus agentes.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {implementations.length === 0 ? (
          <p style={{ color: "var(--ink-mute)" }}>No hay implementaciones creadas todavía.</p>
        ) : (
          implementations.map((impl) => {
            const totalCost = impl.agents.reduce((sum, a) => sum + Number(a.totalCost ?? 0), 0);
            return (
              <Link
                key={impl.id}
                href={`/os/agents/${impl.id}`}
                className="rounded-xl border p-4 transition-colors hover:border-[var(--pink)]"
                style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
              >
                <p className="text-sm" style={{ color: "var(--ink-mute)" }}>{impl.client.name}</p>
                <p className="text-lg font-medium text-white">{impl.name}</p>
                <p className="mt-2 text-xl" style={{ color: "var(--pink)" }}>
                  {impl.agents.length} agent{impl.agents.length !== 1 ? "s" : ""}
                </p>
                <p className="text-xs" style={{ color: "var(--ink-mute)" }}>
                  Costo acumulado: ${totalCost.toFixed(2)}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}