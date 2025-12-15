import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // ... le reste de votre fonction main
  console.log("Début du seeding...");

  // --- VARIABLES À CONFIGURER ---
  const adminEmail = "admin@gmail.org";
  const adminPassword = "SuperSecretPassword123";
  // ------------------------------

  const hashedPassword = await hash(adminPassword, 12);

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin User",
      password: hashedPassword,
    },
  });

  console.log(`Utilisateur administrateur créé/confirmé : ${adminUser.email}`);

  const categoriesToCreate = [
    "Conférences",
    "Formations",
    "Actions Sociales",
    "Événements",
    "Programmes",
    "Impact",
    "Partenariats",
    "Témoignages",
  ];

  for (const catName of categoriesToCreate) {
    await prisma.category.upsert({
      where: { name: catName },
      update: {},
      create: { name: catName },
    });
    console.log(`Catégorie "${catName}" créée/confirmée.`);
  }

  console.log("Seeding terminé avec succès.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect().finally(() => process.exit(1));
  });
