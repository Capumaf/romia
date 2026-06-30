import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import AgentRow from "./AgentRow";

async function createAgent(formData: FormData) {
  "use server";

  const implementationId = formData.get("implementationId") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const model = formData.get("model") as string;
  const systemPrompt = formData.get("systemPrompt") as string;
  const temperature = formData.get("temperature") as string;
  const maxTokens = formData.get("maxTokens") as string;
  const description = formData.get("description") as string;

  if (!implementationId || !name) return;

  await prisma.agent.create({
    data: {
      implementationId,
      name,
      role: role || null,
      model: model || null,
      systemPrompt: systemPrompt || null,
      temperature: temperature ? Number(temperature) : null,
      maxTokens: maxTokens ? Number(maxTokens) : null,
      description: description || null,
    },
  });

  revalidatePath(`/os/agents/${implementationId}`);
}

async function updateAgent(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const implementationId = formData.get("implementationId") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;
  const model = formData.get("model") as string;
  const systemPrompt = formData.get("systemPrompt") as string;
  const temperature = formData.get("temperature") as string;
  const maxTokens = formData.get("maxTokens") as string;
  const status = formData.get("status") as string;
  const description = formData.get("description") as string;

  if (!id || !name) return;

  await prisma.agent.update({
    where: { id },
    data: {
      name,
      role: role || null,
      model: model || null,
      systemPrompt: systemPrompt || null,
      temperature: temperature ? Number(temperature) : null,
      maxTokens: maxTokens ? Number(maxTokens) : null,
      status,
      description: description || null,
    },
  });

  revalidatePath(`/os/agents/${implementationId}`);
}

async function deleteAgent(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const implementationId = formData.get("implementationId") as string;
  if (!id) return;

  await prisma.agent.delete({ where: { id } });

  revalidatePath(`/os/agents/${implementationId}`);
}

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const implementation = await prisma.implementation.findUnique({
    where: { id },
    include: { client: true, agents: { orderBy: { createdAt: "desc" } } },
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
      <Link href="/os/agents" className="text-sm" style={{ color: "var(--ink-mute)" }}>
        ← Volver a proyectos
      </Link>

      <h1
        className="mt-2 text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        {implementation.name}
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        {implementation.client.name} · {implementation.agents.length} agent{implementation.agents.length !== 1 ? "s" : ""}
      </p>

      {/* Form crear agent */}
      <form
        action={createAgent}
        className="mb-8 grid grid-cols-3 gap-3 rounded-xl border p-4"
        style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
      >
        <input type="hidden" name="implementationId" value={implementation.id} />

        <input
          name="name"
          placeholder="Nombre del agente *"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <select
          name="role"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        >
          <option value="" style={{ color: "black" }}>Rol</option>
          <option value="Qualifier" style={{ color: "black" }}>Qualifier</option>
          <option value="Closer" style={{ color: "black" }}>Closer</option>
          <option value="Support" style={{ color: "black" }}>Support</option>
        </select>

        <select
          name="model"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        >
          <option value="" style={{ color: "black" }}>Modelo</option>
          <option value="gpt-4o-mini" style={{ color: "black" }}>gpt-4o-mini</option>
          <option value="gpt-4o" style={{ color: "black" }}>gpt-4o</option>
          <option value="claude-sonnet-4-6" style={{ color: "black" }}>claude-sonnet-4-6</option>
          <option value="claude-haiku-4-5" style={{ color: "black" }}>claude-haiku-4-5</option>
        </select>

        <input
          name="temperature"
          type="number"
          step="0.01"
          min="0"
          max="1"
          placeholder="Temperature (0-1)"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="maxTokens"
          type="number"
          placeholder="Max tokens"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <input
          name="description"
          placeholder="Descripción"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <textarea
          name="systemPrompt"
          placeholder="System prompt"
          rows={3}
          className="col-span-3 rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />

        <button
          type="submit"
          className="col-span-3 rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: "var(--pink)", color: "black" }}
        >
          + Agregar agente
        </button>
      </form>

      {/* Tabla de agentes */}
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", color: "var(--ink-mute)" }}>
              <th className="px-4 py-3 text-left font-medium">Nombre</th>
              <th className="px-4 py-3 text-left font-medium">Rol</th>
              <th className="px-4 py-3 text-left font-medium">Modelo</th>
              <th className="px-4 py-3 text-left font-medium">Temp</th>
              <th className="px-4 py-3 text-left font-medium">Uso</th>
              <th className="px-4 py-3 text-left font-medium">Costo</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {implementation.agents.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-6 text-center" style={{ color: "var(--ink-mute)" }}>
                  Aún no hay agentes registrados para este proyecto.
                </td>
              </tr>
            ) : (
              implementation.agents.map((agent) => (
                <AgentRow
                  key={agent.id}
                  agent={agent}
                  implementationId={implementation.id}
                  updateAgent={updateAgent}
                  deleteAgent={deleteAgent}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}