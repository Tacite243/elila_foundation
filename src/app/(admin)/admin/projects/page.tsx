import React, { Suspense } from "react";
import ProjectsList from "./ProjectsList";
import ProjectsTableSkeleton from "./ProjectsTableSkeleton";
import { Briefcase } from "lucide-react";

export default function AdminProjectsPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* EN-TÊTE DE PAGE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Briefcase className="text-blue-600" size={32} />
            Gestion des Projets
          </h1>
          <p className="text-slate-500 mt-1">
            Suivez l'avancement et gérez les initiatives de la fondation.
          </p>
        </div>

        {/* CONTENU AVEC SUSPENSE */}
        <Suspense fallback={<ProjectsTableSkeleton />}>
          <ProjectsList />
        </Suspense>
      </div>
    </div>
  );
}
