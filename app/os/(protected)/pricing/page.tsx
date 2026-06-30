import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function PricingPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { pricings: true },
  });

  return (
    <div className="p-8">
      <h1
        className="text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        ROMIA OS — Pricing
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        Selecciona un cliente para ver y gestionar su pricing.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {clients.length === 0 ? (
          <p style={{ color: "var(--ink-mute)" }}>No hay clientes creados todavía.</p>
        ) : (
          clients.map((client) => {
            const active = client.pricings.find((p) => p.status === "active");
            return (
              <Link
                key={client.id}
                href={`/os/pricing/${client.id}`}
                className="rounded-xl border p-4 transition-colors hover:border-[var(--pink)]"
                style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
              >
                <p className="text-lg font-medium text-white">{client.name}</p>
                {active ? (
                  <>
                    <p className="mt-2 text-sm" style={{ color: "var(--pink)" }}>
                      {active.tier}
                    </p>
                    <p className="text-xl text-white">
                      ${active.monthlyFee ? Number(active.monthlyFee).toFixed(2) : "0.00"}/mes
                    </p>
                  </>
                ) : (
                  <p className="mt-2 text-sm" style={{ color: "var(--ink-mute)" }}>
                    Sin plan activo
                  </p>
                )}
                <p className="text-xs" style={{ color: "var(--ink-mute)" }}>
                  {client.pricings.length} plan{client.pricings.length !== 1 ? "es" : ""} registrado{client.pricings.length !== 1 ? "s" : ""}
                </p>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}