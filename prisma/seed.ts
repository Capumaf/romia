import "dotenv/config";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("romia2026", 10);
  const passwordAntonella = await bcrypt.hash("romia2026.", 10);

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