import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import PricingRow from "./PricingRow";

async function createPricing(formData: FormData) {
  "use server";

  const clientId = formData.get("clientId") as string;
  const tier = formData.get("tier") as string;
  const monthlyFee = formData.get("monthlyFee") as string;
  const setupFee = formData.get("setupFee") as string;
  const includedFlows = formData.get("includedFlows") as string;
  const includedAgents = formData.get("includedAgents") as string;
  const overageRate = formData.get("overageRate") as string;
  const contractStart = formData.get("contractStart") as string;
  const contractEnd = formData.get("contractEnd") as string;
  const notes = formData.get("notes") as string;

  if (!clientId || !tier) return;

  await prisma.pricing.create({
    data: {
      clientId,
      tier: tier as any,
      monthlyFee: monthlyFee ? Number(monthlyFee) : null,
      setupFee: setupFee ? Number(setupFee) : null,
      includedFlows: includedFlows ? Number(includedFlows) : null,
      includedAgents: includedAgents ? Number(includedAgents) : null,
      overageRate: overageRate ? Number(overageRate) : null,
      contractStart: contractStart ? new Date(contractStart) : null,
      contractEnd: contractEnd ? new Date(contractEnd) : null,
      notes: notes || null,
    },
  });

  revalidatePath(`/os/pricing/${clientId}`);
}

async function updatePricing(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const clientId = formData.get("clientId") as string;
  const tier = formData.get("tier") as string;
  const monthlyFee = formData.get("monthlyFee") as string;
  const setupFee = formData.get("setupFee") as string;
  const includedFlows = formData.get("includedFlows") as string;
  const includedAgents = formData.get("includedAgents") as string;
  const overageRate = formData.get("overageRate") as string;
  const status = formData.get("status") as string;
  const notes = formData.get("notes") as string;

  if (!id || !tier) return;

  await prisma.pricing.update({
    where: { id },
    data: {
      tier: tier as any,
      monthlyFee: monthlyFee ? Number(monthlyFee) : null,
      setupFee: setupFee ? Number(setupFee) : null,
      includedFlows: includedFlows ? Number(includedFlows) : null,
      includedAgents: includedAgents ? Number(includedAgents) : null,
      overageRate: overageRate ? Number(overageRate) : null,
      status,
      notes: notes || null,
    },
  });

  revalidatePath(`/os/pricing/${clientId}`);
}

async function deletePricing(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const clientId = formData.get("clientId") as string;
  if (!id) return;

  await prisma.pricing.delete({ where: { id } });

  revalidatePath(`/os/pricing/${clientId}`);
}

export default async function PricingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const client = await prisma.client.findUnique({
    where: { id },
    include: { pricings: { orderBy: { createdAt: "desc" } } },
  });

  if (!client) {
    return (
      <div className="p-8">
        <p style={{ color: "var(--pink)" }}>Cliente no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/os/pricing" className="text-sm" style={{ color: "var(--ink-mute)" }}>
        ← Volver a clientes
      </Link>

      <h1
        className="mt-2 text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        {client.name}
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        {client.pricings.length} plan{client.pricings.length !== 1 ? "es" : ""} registrado{client.pricings.length !== 1 ? "s" : ""}
      </p>

      {/* Form crear plan */}
      <form
        action={createPricing}
        className="mb-8 grid grid-cols-4 gap-3 rounded-xl border p-4"
        style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
      >
        <input type="hidden" name="clientId" value={client.id} />

        <select
          name="tier"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        >
          <option value="" style={{ color: "black" }}>Tier *</option>
          <option value="STARTER" style={{ color: "black" }}>Starter</option>
          <option value="GROWTH" style={{ color: "black" }}>Growth</option>
          <option value="ENTERPRISE" style={{ color: "black" }}>Enterprise</option>
          <option value="CUSTOM" style={{ color: "black" }}>Custom</option>
        </select>

        <input
          name="monthlyFee"
          type="number"
          step="0.01"
          placeholder="Fee mensual"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="setupFee"
          type="number"
          step="0.01"
          placeholder="Fee de setup"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="overageRate"
          type="number"
          step="0.0001"
          placeholder="Tarifa por exceso"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="includedFlows"
          type="number"
          placeholder="Flows incluidos"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="includedAgents"
          type="number"
          placeholder="Agents incluidos"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="contractStart"
          type="date"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="contractEnd"
          type="date"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="notes"
          placeholder="Notas"
          className="col-span-4 rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <button
          type="submit"
          className="col-span-4 rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: "var(--pink)", color: "black" }}
        >
          + Agregar plan
        </button>
      </form>

      {/* Tabla de planes */}
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", color: "var(--ink-mute)" }}>
              <th className="px-4 py-3 text-left font-medium">Tier</th>
              <th className="px-4 py-3 text-left font-medium">Fee mensual</th>
              <th className="px-4 py-3 text-left font-medium">Setup</th>
              <th className="px-4 py-3 text-left font-medium">Incluye</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {client.pricings.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center" style={{ color: "var(--ink-mute)" }}>
                  Aún no hay planes registrados para este cliente.
                </td>
              </tr>
            ) : (
              client.pricings.map((pricing) => (
                <PricingRow
                  key={pricing.id}
                  pricing={pricing}
                  clientId={client.id}
                  updatePricing={updatePricing}
                  deletePricing={deletePricing}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}