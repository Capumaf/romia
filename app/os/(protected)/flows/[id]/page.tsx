import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import FlowRow from "./FlowRow";

async function createFlow(formData: FormData) {
  "use server";

  const implementationId = formData.get("implementationId") as string;
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const trigger = formData.get("trigger") as string;
  const n8nWorkflowId = formData.get("n8nWorkflowId") as string;
  const description = formData.get("description") as string;

  if (!implementationId || !name) return;

  await prisma.flow.create({
    data: {
      implementationId,
      name,
      type: type || null,
      trigger: trigger || null,
      n8nWorkflowId: n8nWorkflowId || null,
      description: description || null,
    },
  });

  revalidatePath(`/os/flows/${implementationId}`);
}

async function updateFlow(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const implementationId = formData.get("implementationId") as string;
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const trigger = formData.get("trigger") as string;
  const n8nWorkflowId = formData.get("n8nWorkflowId") as string;
  const status = formData.get("status") as string;
  const description = formData.get("description") as string;

  if (!id || !name) return;

  await prisma.flow.update({
    where: { id },
    data: {
      name,
      type: type || null,
      trigger: trigger || null,
      n8nWorkflowId: n8nWorkflowId || null,
      status,
      description: description || null,
    },
  });

  revalidatePath(`/os/flows/${implementationId}`);
}

async function deleteFlow(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const implementationId = formData.get("implementationId") as string;
  if (!id) return;

  await prisma.flow.delete({ where: { id } });

  revalidatePath(`/os/flows/${implementationId}`);
}

export default async function FlowDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const implementation = await prisma.implementation.findUnique({
    where: { id },
    include: { client: true, flows: { orderBy: { createdAt: "desc" } } },
  });

  if (!implementation) {
    return (
      <div className="p-8">
        <p style={{ color: "var(--pink)" }}>Proyecto no encontrado.</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <Link href="/os/flows" className="text-sm" style={{ color: "var(--ink-mute)" }}>
        ← Volver a proyectos
      </Link>

      <h1
        className="mt-2 text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        {implementation.name}
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        {implementation.client.name} · {implementation.flows.length} flow{implementation.flows.length !== 1 ? "s" : ""}
      </p>

      {/* Form crear flow */}
      <form
        action={createFlow}
        className="mb-8 grid grid-cols-3 gap-3 rounded-xl border p-4"
        style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
      >
        <input type="hidden" name="implementationId" value={implementation.id} />

        <input
          name="name"
          placeholder="Nombre del flow *"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <select
          name="type"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        >
          <option value="" style={{ color: "black" }}>Tipo</option>
          <option value="intake" style={{ color: "black" }}>Intake</option>
          <option value="follow-up" style={{ color: "black" }}>Follow-up</option>
          <option value="qualification" style={{ color: "black" }}>Qualification</option>
          <option value="handoff" style={{ color: "black" }}>Handoff</option>
        </select>

        <input
          name="trigger"
          placeholder="Trigger (ej. WhatsApp message)"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="n8nWorkflowId"
          placeholder="n8n Workflow ID"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="description"
          placeholder="Descripción"
          className="col-span-2 rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <button
          type="submit"
          className="col-span-3 rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: "var(--pink)", color: "black" }}
        >
          + Agregar flow
        </button>
      </form>

      {/* Tabla de flows */}
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", color: "var(--ink-mute)" }}>
              <th className="px-4 py-3 text-left font-medium">Nombre</th>
              <th className="px-4 py-3 text-left font-medium">Tipo</th>
              <th className="px-4 py-3 text-left font-medium">Trigger</th>
              <th className="px-4 py-3 text-left font-medium">n8n ID</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {implementation.flows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center" style={{ color: "var(--ink-mute)" }}>
                  Aún no hay flows registrados para este proyecto.
                </td>
              </tr>
            ) : (
              implementation.flows.map((flow) => (
                <FlowRow
                  key={flow.id}
                  flow={flow}
                  implementationId={implementation.id}
                  updateFlow={updateFlow}
                  deleteFlow={deleteFlow}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}