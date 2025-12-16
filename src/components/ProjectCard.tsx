import Link from 'next/link';
import Image from 'next/image';
import type { ProjectWithImages } from '@/redux/slices/projectsSlice'; // On réutilise ce type !

interface ProjectCardProps {
    project: ProjectWithImages;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    // On prend la première image comme image de couverture pour la carte
    const coverImage = project.images[0]?.url || 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

    return (
        <Link href={`/projects/${project.slug}`} className="group block">
            <div className="overflow-hidden rounded-lg bg-gray-100 shadow-md transition-shadow duration-300 group-hover:shadow-xl">
                <div className="relative w-full aspect-w-16 aspect-h-9">
                    <Image
                        src={coverImage}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-6">
                    <p className="text-sm font-semibold text-green-600">
                        {new Date(project.startDate || project.createdAt).getFullYear()} • {project.status}
                    </p>
                    <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors duration-300">
                        {project.title}
                    </h3>
                    <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                        {project.description}
                    </p>
                </div>
            </div>
        </Link>
    );
}