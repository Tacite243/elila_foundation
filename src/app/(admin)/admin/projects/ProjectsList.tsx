import prisma from "@/lib/prisma";
import ProjectManager from "./ProjectManager";

// Ce composant est un Server Component (async).
// Il ne prend PAS de props comme isOpen ou onClose.
export default async function ProjectsList() {
  // 1. Récupération des données depuis la BDD
  const projectsFromDb = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
    include: { images: true },
  });

  // 2. Sérialisation des dates (Date -> String) pour passer du Serveur au Client
  const serializedProjects = projectsFromDb.map((project) => ({
    ...project,
    startDate: project.startDate ? project.startDate.toISOString() : null,
    endDate: project.endDate ? project.endDate.toISOString() : null,
    createdAt: project.createdAt.toISOString(),
    updatedAt: project.updatedAt.toISOString(),
    images: project.images,
  }));

  // 3. On passe les données au ProjectManager (Client Component)
  return <ProjectManager initialProjects={serializedProjects} />;
}