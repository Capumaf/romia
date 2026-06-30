import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import ClientRow from "./ClientRow";

async function createClient(formData: FormData) {
  "use server";

  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const country = formData.get("country") as string;

  if (!name) return;

  await prisma.client.create({
    data: {
      name,
      company: company || null,
      email: email || null,
      phone: phone || null,
      country: country || null,
    },
  });

  revalidatePath("/os/clients");
}

async function updateClient(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const country = formData.get("country") as string;
  const status = formData.get("status") as string;

  if (!id || !name) return;

  await prisma.client.update({
    where: { id },
    data: {
      name,
      company: company || null,
      email: email || null,
      phone: phone || null,
      country: country || null,
      status,
    },
  });

  revalidatePath("/os/clients");
}

async function deleteClient(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;
  if (!id) return;

  await prisma.client.delete({ where: { id } });

  revalidatePath("/os/clients");
}

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { implementations: true },
  });

  return (
    <div className="p-8">
      <h1
        className="text-2xl"
        style={{ fontFamily: "var(--font-orbitron)", color: "var(--pink)" }}
      >
        ROMIA OS — Clients
      </h1>
      <p style={{ color: "var(--ink-mute)" }} className="mb-6">
        {clients.length} cliente{clients.length !== 1 ? "s" : ""} registrado{clients.length !== 1 ? "s" : ""}.
      </p>

      {/* Form crear cliente */}
      <form
        action={createClient}
        className="mb-8 grid grid-cols-2 gap-3 rounded-xl border p-4"
        style={{ borderColor: "var(--pink-line)", background: "var(--bg-card)" }}
      >
        <input
          name="name"
          placeholder="Nombre *"
          required
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="company"
          placeholder="Empresa"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="phone"
          placeholder="Teléfono"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <input
          name="country"
          placeholder="País"
          className="rounded-lg border bg-transparent px-3 py-2 text-sm"
          style={{ borderColor: "var(--pink-line)", color: "white" }}
        />
        <button
          type="submit"
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{ background: "var(--pink)", color: "black" }}
        >
          + Agregar cliente
        </button>
      </form>

      {/* Lista de clientes */}
      <div className="overflow-hidden rounded-xl border" style={{ borderColor: "var(--pink-line)" }}>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ background: "var(--bg-card)", color: "var(--ink-mute)" }}>
              <th className="px-4 py-3 text-left font-medium">Nombre</th>
              <th className="px-4 py-3 text-left font-medium">Empresa</th>
              <th className="px-4 py-3 text-left font-medium">Email</th>
              <th className="px-4 py-3 text-left font-medium">País</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Implementaciones</th>
              <th className="px-4 py-3 text-left font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-6 text-center" style={{ color: "var(--ink-mute)" }}>
                  Aún no hay clientes registrados.
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <ClientRow
                  key={client.id}
                  client={client}
                  updateClient={updateClient}
                  deleteClient={deleteClient}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}