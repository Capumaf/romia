import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Falta la variable de entorno ${name}`);
  return value;
}

async function main() {
  const password = await bcrypt.hash(requireEnv("SEED_CESAR_PASSWORD"), 10);
  const passwordAntonella = await bcrypt.hash(requireEnv("SEED_ANTONELLA_PASSWORD"), 10);

  const cesar = await prisma.user.upsert({
    where: { email: "cesar@romia.io" },
    update: {},
    create: {
      email: "cesar@romia.io",
      password,
      name: "Cesar",
      role: "admin",
    },
  });

  const antonella = await prisma.user.upsert({
    where: { email: "antonella@romia.io" },
    update: {},
    create: {
      email: "antonella@romia.io",
      password: passwordAntonella,
      name: "Antonella",
      role: "admin",
    },
  });

  console.log("✓ Usuarios creados:", cesar.email, antonella.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());