// Cambia la contraseña de un usuario de ROMIA OS.
// Uso: node scripts/reset-os-password.mjs
// La contraseña se escribe oculta y no se guarda en ningún archivo.
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import prismaPkg from "@prisma/client";
import { emitKeypressEvents } from "node:readline";
import { createInterface } from "node:readline/promises";

dotenv.config({ path: ".env.local", quiet: true });
dotenv.config({ path: ".env", quiet: true });

const MIN_LENGTH = 12;
const MAX_BYTES = 72; // límite de bcrypt

async function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  try {
    return (await rl.question(question)).trim();
  } finally {
    rl.close();
  }
}

function askHidden(question) {
  return new Promise((resolve, reject) => {
    const { stdin, stdout } = process;
    let value = "";

    const finish = (action) => {
      stdin.off("keypress", onKey);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write("\n");
      action();
    };

    const onKey = (char, key) => {
      if (key?.ctrl && key.name === "c") {
        finish(() => reject(new Error("Cancelado.")));
      } else if (key?.name === "return" || key?.name === "enter") {
        finish(() => resolve(value));
      } else if (key?.name === "backspace") {
        if (value) stdout.write("\b \b");
        value = [...value].slice(0, -1).join("");
      } else if (char && !key?.ctrl && !key?.meta && char >= " ") {
        value += char;
        stdout.write("*");
      }
    };

    stdout.write(question);
    emitKeypressEvents(stdin);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("keypress", onKey);
  });
}

function checkPassword(password) {
  if (password.length < MIN_LENGTH) {
    throw new Error(`Debe tener al menos ${MIN_LENGTH} caracteres. No se cambió nada.`);
  }
  if (Buffer.byteLength(password, "utf8") > MAX_BYTES) {
    throw new Error(`Es demasiado larga (máximo ${MAX_BYTES} bytes). No se cambió nada.`);
  }
}

async function savePassword(prisma, user, password) {
  await prisma.user.update({
    where: { id: user.id },
    data: { password: await bcrypt.hash(password, 10) },
  });
  console.log(`Listo: se cambió la contraseña de ${user.email}.`);
}

// Modo ventana: recibe {"email","password"} por stdin.
async function mainFromStdin(prisma) {
  let input = "";
  process.stdin.setEncoding("utf8");
  for await (const chunk of process.stdin) input += chunk;

  const { email, password } = JSON.parse(input.replace(/^\uFEFF/, ""));
  checkPassword(password);

  const user = await prisma.user.findUnique({ where: { email }, select: { id: true, email: true } });
  if (!user) throw new Error("No existe esa cuenta. No se cambió nada.");

  await savePassword(prisma, user, password);
}

async function main(prisma) {
  const users = await prisma.user.findMany({
    select: { id: true, email: true, name: true },
    orderBy: { email: "asc" },
  });
  if (users.length === 0) throw new Error("No hay usuarios en esta base.");

  console.log("\nUsuarios:");
  users.forEach((u, i) => console.log(`  ${i + 1}. ${u.name ?? "-"} (${u.email})`));

  const choice = Number(await ask("\nEscribe 1 o 2 y Enter: "));
  const user = Number.isInteger(choice) ? users[choice - 1] : undefined;
  if (!user) throw new Error("Número no válido. No se cambió nada.");

  const password = await askHidden(`Contraseña nueva (mínimo ${MIN_LENGTH}, verás *): `);
  checkPassword(password);
  if ((await askHidden("Repítela: ")) !== password) {
    throw new Error("No coinciden. No se cambió nada.");
  }

  const ok = await ask(`¿Cambiar la contraseña de ${user.email}? Escribe SI: `);
  if (ok.toUpperCase() !== "SI") throw new Error("Cancelado. No se cambió nada.");

  await savePassword(prisma, user, password);
}

async function run() {
  const fromStdin = process.argv.includes("--stdin");
  if (!fromStdin && !process.stdin.isTTY) throw new Error("Ejecútalo en una terminal interactiva.");
  if (!process.env.DATABASE_URL) throw new Error("Falta DATABASE_URL en .env.");

  console.log(`Base de datos: ${new URL(process.env.DATABASE_URL).hostname}`);

  const prisma = new prismaPkg.PrismaClient();
  try {
    await (fromStdin ? mainFromStdin(prisma) : main(prisma));
  } finally {
    await prisma.$disconnect();
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
