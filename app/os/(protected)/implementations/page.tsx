import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import ImplementationRow from "./ImplementationRow";

async function createImplementation(formData: FormData) {
  "use server";

  const clientId = formData.get("clientId") as string;
  const name = formData.get("name") as string;
  const projectType = formData.get("projectType") as string;
  const currentPhase = formData.get("currentPhase") as string;
  const budget = formData.get("budget") as string;
  const whatsappNumber = formData.get("whatsappNumber") as string;
  const crm = formData.get("crm") as string;

  if (!clientId || !name) return;

  await prisma.implementation.create({
    data: {
      clientId,
      name,
      projectType: projectType || null,
      currentPhase: currentPhase || null,
      budget: budget ? Number(budget) : null,
      whatsappNumber: whatsappNumber || null,
      crm: crm || null,
    },
  });

  revalidatePath("/implementations");
}

async function updateImplementation(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const projectType = formData.get("projectType") as string;
  const currentPhase = formData.get("currentPhase") as string;
  const budget = formData.get("budget") as string;
  const whatsappNumber = formData.get("whatsappNumber") as string;
  const crm = formData.get("crm") as string;
  const status = formData.get("status") as string;

  if (!id || !name) return;

  await prisma.implementation.update({
    where: { id },
    data: {
      name,
      projectType: projectType || null,
      currentPhase: currentPhase || null,
      budget: budget ? Number(budget) : null,
      whatsappNumber: whatsappNumber || null,
      crm: crm || null,
      status,
    },
  });

  revalidatePath("/implementations");
}

async function deleteImplementation(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.implementation.delete({ where: { id } });

  revalidatePath("/implementations");
}

export default async function ImplementationsPage() {
  const [implementations, clients] = await Promise.all([
    prisma.implementation.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true, flows: true, agents: true },
    }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="p-8">
      <h1
        className="text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        ROMIA OS — Implementations
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        {implementations.length} implementación{implementations.length !== 1 ? "es" : ""} registrada{implementations.length !== 1 ? "s" : ""}.
      </p>

      {/* Form crear implementación */}
      <form
        action={createImplementation}
        className="mb-8 grid grid-cols-3 gap-3 rounded-xl border p-4"
        style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
      >
        <select
          name="clientId"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        >
          <option value="" style={{ color: "black" }}>
            Selecciona cliente *
          </option>
          {clients.map((c) => (
            <option key={c.id} value={c.id} style={{ color: "black" }}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          name="name"
          placeholder="Nombre del proyecto *"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="projectType"
          placeholder="Tipo (ej. Inmobiliario)"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="currentPhase"
          placeholder="Fase actual"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="budget"
          placeholder="Presupuesto"
          type="number"
          step="0.01"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="whatsappNumber"
          placeholder="Número WhatsApp"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="crm"
          placeholder="CRM (ej. Evolta)"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <button
          type="submit"
          className="col-span-3 rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: "var(--pink)", color: "black" }}
        >
          + Agregar implementación
        </button>
      </form>

      {/* Tabla de implementaciones */}
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", color: "var(--ink-mute)" }}>
              <th className="px-4 py-3 text-left font-medium">Proyecto</th>
              <th className="px-4 py-3 text-left font-medium">Cliente</th>
              <th className="px-4 py-3 text-left font-medium">Tipo</th>
              <th className="px-4 py-3 text-left font-medium">Fase</th>
              <th className="px-4 py-3 text-left font-medium">Presupuesto</th>
              <th className="px-4 py-3 text-left font-medium">WhatsApp</th>
              <th className="px-4 py-3 text-left font-medium">CRM</th>
              <th className="px-4 py-3 text-left font-medium">Flows / Agents</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {implementations.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-6 text-center" style={{ color: "var(--ink-mute)" }}>
                  Aún no hay implementaciones registradas.
                </td>
              </tr>
            ) : (
              implementations.map((impl) => (
                <ImplementationRow
                  key={impl.id}
                  impl={impl}
                  updateImplementation={updateImplementation}
                  deleteImplementation={deleteImplementation}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}