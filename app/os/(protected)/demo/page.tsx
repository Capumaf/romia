import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import DemoCard from "./DemoCard";

async function createDemo(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const industry = formData.get("industry") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const clientId = formData.get("clientId") as string;

  if (!title || !fileUrl) return;

  await prisma.demo.create({
    data: {
      title,
      description: description || null,
      industry: industry || null,
      fileUrl,
      clientId: clientId || null,
    },
  });

  revalidatePath("/os/demo");
}

async function updateDemo(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const industry = formData.get("industry") as string;
  const fileUrl = formData.get("fileUrl") as string;
  const status = formData.get("status") as string;

  if (!id || !title || !fileUrl) return;

  await prisma.demo.update({
    where: { id },
    data: {
      title,
      description: description || null,
      industry: industry || null,
      fileUrl,
      status,
    },
  });

  revalidatePath("/os/demo");
}

async function deleteDemo(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.demo.delete({ where: { id } });

  revalidatePath("/os/demo");
}

export default async function DemoPage() {
  const [demos, clients] = await Promise.all([
    prisma.demo.findMany({ orderBy: { createdAt: "desc" }, include: { client: true } }),
    prisma.client.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <div className="mb-8">
        <p className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: "var(--pink)" }}>
          Demo Studio
        </p>
        <h1 className="mt-2 text-2xl font-bold" style={{ fontFamily: "var(--font-orbitron)" }}>
          Demos
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--ink-mute)" }}>
          Demos de conversación ROMIA listos para presentar.
        </p>
      </div>

      {/* Form crear demo */}
      <form
        action={createDemo}
        className="mb-8 grid grid-cols-2 gap-3 rounded-2xl border p-4"
        style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
      >
        <input
          name="title"
          placeholder="Título *"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="fileUrl"
          placeholder="Ruta archivo (ej. /demos/galeon.html) *"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="industry"
          placeholder="Industria"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <select
          name="clientId"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        >
          <option value="" style={{ color: "black" }}>Cliente (opcional)</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id} style={{ color: "black" }}>{c.name}</option>
          ))}
        </select>
        <input
          name="description"
          placeholder="Descripción"
          className="col-span-2 rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <button
          type="submit"
          className="col-span-2 rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: "var(--pink)", color: "black" }}
        >
          + Agregar demo
        </button>
      </form>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {demos.length === 0 ? (
          <p style={{ color: "var(--ink-mute)" }}>Aún no hay demos registrados.</p>
        ) : (
          demos.map((demo) => (
            <DemoCard
              key={demo.id}
              demo={demo}
              updateDemo={updateDemo}
              deleteDemo={deleteDemo}
            />
          ))
        )}
      </div>
    </div>
  );
}