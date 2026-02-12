import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';



// On utilise 'any' pour la prop 'params' et on désactive la règle ESLint pour cette ligne
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function generateMetadata({ params }: any): Promise<Metadata> {
    const slug = params.slug;

    const project = await prisma.project.findUnique({
        where: { slug },
        select: { title: true, description: true }
    });

    if (!project) {
        return { title: 'Projet non trouvé' };
    }

    return {
        title: `${project.title} | We Lead to Africa`,
        description: project.description.substring(0, 160),
    };
}

// On fait de même pour le composant de la page
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function ProjectDetailsPage({ params }: any) {
    const { slug } = params;

    const project = await prisma.project.findUnique({
        where: { slug },
        include: { images: true },
    });

    if (!project) {
        notFound();
    }

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-16 sm:py-24">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-base font-semibold text-green-600 uppercase tracking-wide">{project.status}</p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">{project.title}</h1>
                        <p className="mt-6 text-xl text-gray-600">
                            Commencé le {new Date(project.startDate || project.createdAt).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                        {project.images.map(image => (
                            <div key={image.id} className="relative aspect-square">
                                <Image
                                    src={image.url}
                                    alt={image.altText || project.title}
                                    fill
                                    className="rounded-lg shadow-lg object-cover"
                                    sizes="(max-width: 640px) 100vw, 50vw"
                                />
                            </div>
                        ))}
                    </div>
                    <div className="prose lg:prose-xl max-w-none">
                        <p>{project.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}