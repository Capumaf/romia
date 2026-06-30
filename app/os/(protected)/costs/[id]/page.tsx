import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import CostRow from "./CostRow";

async function createCost(formData: FormData) {
  "use server";

  const implementationId = formData.get("implementationId") as string;
  const clientId = formData.get("clientId") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const amount = formData.get("amount") as string;
  const billingPeriod = formData.get("billingPeriod") as string;
  const periodMonth = formData.get("periodMonth") as string;
  const periodYear = formData.get("periodYear") as string;

  if (!implementationId || !clientId || !category || !amount) return;

  await prisma.cost.create({
    data: {
      clientId,
      implementationId,
      category: category as any,
      description: description || null,
      amount: Number(amount),
      billingPeriod: billingPeriod || null,
      periodMonth: periodMonth ? Number(periodMonth) : null,
      periodYear: periodYear ? Number(periodYear) : null,
    },
  });

  revalidatePath(`/os/costs/${implementationId}`);
}

async function updateCost(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const implementationId = formData.get("implementationId") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const amount = formData.get("amount") as string;
  const billingPeriod = formData.get("billingPeriod") as string;
  const periodMonth = formData.get("periodMonth") as string;
  const periodYear = formData.get("periodYear") as string;

  if (!id || !category || !amount) return;

  await prisma.cost.update({
    where: { id },
    data: {
      category: category as any,
      description: description || null,
      amount: Number(amount),
      billingPeriod: billingPeriod || null,
      periodMonth: periodMonth ? Number(periodMonth) : null,
      periodYear: periodYear ? Number(periodYear) : null,
    },
  });

  revalidatePath(`/costs/${implementationId}`);
}

async function deleteCost(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const implementationId = formData.get("implementationId") as string;
  if (!id) return;

  await prisma.cost.delete({ where: { id } });

  revalidatePath(`/costs/${implementationId}`);
}

export default async function CostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const implementation = await prisma.implementation.findUnique({
    where: { id },
    include: { client: true, costs: { orderBy: { createdAt: "desc" } } },
  });

  if (!implementation) {
    return (
      <div className="p-8">
        <p style={{ color: "var(--pink)" }}>Proyecto no encontrado.</p>
      </div>
    );
  }

  const total = implementation.costs.reduce((sum, c) => sum + Number(c.amount), 0);

  return (
    <div className="p-8">
      <Link href="/os/costs" className="text-sm" style={{ color: "var(--ink-mute)" }}>
        ← Volver a proyectos
      </Link>

      <h1
        className="mt-2 text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        {implementation.name}
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        {implementation.client.name} · Total: ${total.toFixed(2)} USD · {implementation.costs.length} costo{implementation.costs.length !== 1 ? "s" : ""}
      </p>

      {/* Form crear costo */}
      <form
        action={createCost}
        className="mb-8 grid grid-cols-4 gap-3 rounded-xl border p-4"
        style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
      >
        <input type="hidden" name="implementationId" value={implementation.id} />
        <input type="hidden" name="clientId" value={implementation.clientId} />

        <select
          name="category"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        >
          <option value="" style={{ color: "black" }}>Categoría *</option>
          <option value="CLAUDE_API" style={{ color: "black" }}>Claude API</option>
          <option value="OPENAI_API" style={{ color: "black" }}>OpenAI API</option>
          <option value="N8N" style={{ color: "black" }}>n8n</option>
          <option value="WHATSAPP_API" style={{ color: "black" }}>WhatsApp API</option>
          <option value="HOSTING" style={{ color: "black" }}>Hosting</option>
          <option value="CRM" style={{ color: "black" }}>CRM</option>
          <option value="OTHER" style={{ color: "black" }}>Otro</option>
        </select>

        <input
          name="amount"
          type="number"
          step="0.01"
          placeholder="Monto *"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="description"
          placeholder="Descripción"
          className="col-span-2 rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <select
          name="billingPeriod"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
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
          placeholder="Mes (1-12)"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="periodYear"
          type="number"
          placeholder="Año"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <button
          type="submit"
          className="col-span-4 rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: "var(--pink)", color: "black" }}
        >
          + Agregar costo
        </button>
      </form>

      {/* Tabla de costos */}
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", color: "var(--ink-mute)" }}>
              <th className="px-4 py-3 text-left font-medium">Categoría</th>
              <th className="px-4 py-3 text-left font-medium">Descripción</th>
              <th className="px-4 py-3 text-left font-medium">Monto</th>
              <th className="px-4 py-3 text-left font-medium">Periodo</th>
              <th className="px-4 py-3 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {implementation.costs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center" style={{ color: "var(--ink-mute)" }}>
                  Aún no hay costos registrados para este proyecto.
                </td>
              </tr>
            ) : (
              implementation.costs.map((cost) => (
                <CostRow
                  key={cost.id}
                  cost={cost}
                  implementationId={implementation.id}
                  updateCost={updateCost}
                  deleteCost={deleteCost}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}