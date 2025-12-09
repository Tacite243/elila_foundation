import React, { Suspense } from 'react';
import ProjectsList from "./ProjectsList";
import ProjectsTableSkeleton from './ProjectsTableSkeleton';



export default function AdminProjectsPage() {
    return (
        <div>
            {/* Le titre et le bouton sont maintenant dans le ProjectManager */}
            <Suspense fallback={<ProjectsTableSkeleton />}>
                <ProjectsList />
            </Suspense>
        </div>
    );
}