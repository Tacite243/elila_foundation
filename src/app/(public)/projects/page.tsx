import { Suspense } from 'react';
import ProjectsList from '@/components/ProjectsList';
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton';

// Le squelette de la grille pour le fallback
function ProjectsGridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <ProjectCardSkeleton key={i} />
            ))}
        </div>
    );
}

export default function ProjectsPage() {
    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0 text-center lg:text-left">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Nos Projets</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        elila foundation déploie une variété de programmes et d’activités pour accompagner, former et mobiliser la jeunesse africaine, en présentiel comme en ligne. Ces initiatives incluent : conférences, séminaires, ateliers, webinaires, hackathons, sessions de coaching, formations et débats.
                    </p>
                </div>

                {/* C'est ici que la magie opère */}
                <div className="mt-16">
                    <Suspense fallback={<ProjectsGridSkeleton />}>
                        <ProjectsList />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}