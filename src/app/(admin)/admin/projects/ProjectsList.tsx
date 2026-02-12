import prisma from "@/lib/prisma";
import ProjectManager from "./ProjectManager";
import { AlertTriangle, RefreshCcw } from "lucide-react";


export default async function ProjectsList() {
  try {
    // 1. TENTATIVE DE RÉCUPÉRATION DES DONNÉES
    const projectsFromDb = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { images: true },
    });

    // 2. SÉRIALISATION (Si la connexion réussit)
    const serializedProjects = projectsFromDb.map((project) => ({
      ...project,
      startDate: project.startDate ? project.startDate.toISOString() : null,
      endDate: project.endDate ? project.endDate.toISOString() : null,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      images: project.images,
    }));

    // 3. SUCCÈS : On affiche le Manager
    return <ProjectManager initialProjects={serializedProjects} />;

  } catch (error) {
    // 4. ÉCHEC : On capture l'erreur pour ne pas faire planter la page
    console.error("Erreur critique BDD (Projets):", error);

    return (
      <div className="bg-white rounded-xl shadow-sm border border-red-100 p-8 flex flex-col items-center justify-center text-center h-96">
        <div className="bg-red-50 p-4 rounded-full mb-4">
          <AlertTriangle className="h-10 w-10 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">
          Connexion impossible
        </h3>
        <p className="text-slate-500 max-w-md mb-6">
          Le serveur ne parvient pas à joindre la base de données. Si vous utilisez Neon (version gratuite), elle est peut-être en train de redémarrer.
        </p>
        <div className="p-4 bg-slate-50 rounded-lg text-xs font-mono text-slate-600 border border-slate-200 max-w-full overflow-auto">
          {(error as Error).message || "Erreur inconnue"}
        </div>
      </div>
    );
  }
}