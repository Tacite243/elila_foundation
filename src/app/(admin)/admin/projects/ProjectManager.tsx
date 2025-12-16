"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setProjects, deleteProject, ProjectWithImages } from "@/redux/slices/projectsSlice";
import {
  Edit,
  Trash2,
  Plus,
  Calendar,
  Image as ImageIcon
} from "lucide-react";
import ProjectFormModal from "@/components/ProjectFormModal";
import Image from "next/image";

// --- C'EST ICI QUE VOUS AVEZ L'ERREUR DANS VOTRE CODE ACTUEL ---
// Vous utilisiez l'interface de la modale au lieu de celle-ci :
interface ProjectManagerProps {
  initialProjects: any[];
}

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectWithImages | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const { items: projects } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    dispatch(setProjects(initialProjects));
  }, [dispatch, initialProjects]);

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ? Cette action est irréversible.")) {
      dispatch(deleteProject(id));
    }
  };

  const handleEdit = (project: ProjectWithImages) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED': return <span className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium border border-green-200">Terminé</span>;
      case 'IN_PROGRESS': return <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium border border-blue-200">En cours</span>;
      case 'PLANNED': return <span className="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-xs font-medium border border-slate-200">Planifié</span>;
      case 'ON_HOLD': return <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-medium border border-amber-200">En pause</span>;
      default: return <span className="px-2.5 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs">Autre</span>;
    }
  };

  return (
    <>
      {/* Barre d'outils */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
        >
          <Plus size={20} />
          Nouveau Projet
        </button>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-24">Image</th>
                <th className="px-6 py-4">Détails</th>
                <th className="px-6 py-4">Période</th>
                <th className="px-6 py-4 text-center">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    Aucun projet trouvé.
                  </td>
                </tr>
              ) : (
                projects.map((project) => (
                  <tr key={project.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="w-14 h-14 relative rounded-lg overflow-hidden bg-slate-100 border border-slate-200">
                        {project.images && project.images.length > 0 ? (
                          <Image src={project.images[0].url} alt="Projet" fill className="object-cover" />
                        ) : (
                          <div className="flex items-center justify-center h-full text-slate-300"><ImageIcon size={24} /></div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <div className="font-bold text-slate-900 text-base mb-1 truncate">{project.title}</div>
                      <div className="text-slate-500 text-xs line-clamp-2">{project.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5 text-xs text-slate-600">
                        {project.startDate && <span>Début: {new Date(project.startDate).toLocaleDateString()}</span>}
                        {project.endDate && <span>Fin: {new Date(project.endDate).toLocaleDateString()}</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">{getStatusBadge(project.status)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleEdit(project)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(project.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de Formulaire */}
      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectToEdit={editingProject}
      />
    </>
  );
}