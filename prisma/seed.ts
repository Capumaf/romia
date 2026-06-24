import { config } from "dotenv";
config({ path: ".env" });

import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";


const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("romia2026", 10);

  const user = await prisma.user.upsert({
    where: { email: "cesar@romia.io" },
    update: {},
    create: {
      email: "cesar@romia.io",
      password,
      name: "Cesar",
      role: "admin",
    },
  });

  console.log("✓ Usuario creado:", user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());