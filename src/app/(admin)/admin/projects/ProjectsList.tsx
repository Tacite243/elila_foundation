import prisma from "@/lib/prisma";
import ProjectManager from "./ProjectManager";



// Ce composant est async, il peut donc "await" des données
export default async function ProjectsList() {
    // Le fetch se fait ici. `await` va déclencher le Suspense
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        include: { images: true },
    });

    // Une fois les données chargées, on les passe au composant client
    return <ProjectManager initialProjects={projects} />;
}