import prisma from "@/lib/prisma";
import ProjectCard from "./ProjectCard";



export default async function ProjectsList() {
    // Simuler une latence pour bien voir le skeleton en développement
    await new Promise(resolve => setTimeout(resolve, 1500));

    const projects = await prisma.project.findMany({
        where: {
            status: { notIn: ['CANCELLED'] } // On n'affiche pas les projets annulés
        },
        orderBy: { createdAt: 'desc' },
        include: {
            images: {
                take: 1, // On ne récupère que la première image pour la carte, c'est plus optimisé
            },
        },
    });

    if (projects.length === 0) {
        return <div className="text-center text-gray-500">Aucun projet à afficher pour le moment.</div>;
    }

    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}