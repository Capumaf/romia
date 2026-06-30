import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function FlowsPage() {
  const implementations = await prisma.implementation.findMany({
    orderBy: { createdAt: "desc" },
    include: { client: true, flows: true },
  });

  return (
    <div className="p-8">
      <h1
        className="text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        ROMIA OS — Flows
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        Selecciona un proyecto para ver y gestionar sus flows.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {implementations.length === 0 ? (
          <p style={{ color: "var(--ink-mute)" }}>No hay implementaciones creadas todavía.</p>
        ) : (
          implementations.map((impl) => {
            const activeFlows = impl.flows.filter((f) => f.status === "active").length;
            const errorFlows = impl.flows.filter((f) => f.status === "error").length;
            return (
              <Link
                key={impl.id}
                href={`/os/flows/${impl.id}`}
                className="rounded-xl border p-4 transition-colors hover:border-[var(--pink)]"
                style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
              >
                <p className="text-sm" style={{ color: "var(--ink-mute)" }}>{impl.client.name}</p>
                <p className="text-lg font-medium text-white">{impl.name}</p>
                <p className="mt-2 text-xl" style={{ color: "var(--pink)" }}>
                  {impl.flows.length} flow{impl.flows.length !== 1 ? "s" : ""}
                </p>
                <p className="text-xs" style={{ color: "var(--ink-mute)" }}>
                  {activeFlows} activo{activeFlows !== 1 ? "s" : ""}
                  {errorFlows > 0 ? ` · ${errorFlows} con error` : ""}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}