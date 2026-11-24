"use server";

import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const MIN_LENGTH = 12;
const MAX_BYTES = 72; // límite de bcrypt

export type ChangePasswordState = { ok: boolean; message: string };

export async function changePassword(
  _prev: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    return { ok: false, message: "Tu sesión terminó. Vuelve a entrar." };
  }

  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (next.length < MIN_LENGTH) {
    return { ok: false, message: `La clave nueva debe tener ${MIN_LENGTH} caracteres o más.` };
  }
  if (Buffer.byteLength(next, "utf8") > MAX_BYTES) {
    return { ok: false, message: "La clave nueva es demasiado larga." };
  }
  if (next !== confirm) {
    return { ok: false, message: "Las dos claves nuevas no son iguales." };
  }
  if (next === current) {
    return { ok: false, message: "La clave nueva debe ser distinta de la actual." };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  if (!user || !(await bcrypt.compare(current, user.password))) {
    return { ok: false, message: "La clave actual no es correcta." };
  }

  await prisma.user.update({
    where: { id: userId },
    data: { password: await bcrypt.hash(next, 10) },
  });

  return { ok: true, message: "Listo: tu clave se cambió." };
}
