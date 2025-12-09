"use client";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setProjects, ProjectWithImages } from "@/redux/slices/projectsSlice";
import {
    // Edit,
    // Trash2,
    PlusCircle
} from "lucide-react";
import ProjectFormModal from "@/components/ProjectFormModal";



interface ProjectManagerProps {
    initialProjects: ProjectWithImages[];
}

export default function ProjectManager({ initialProjects }: ProjectManagerProps) {
    // Gérer l'état d'ouverture du modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    // const { items: projects, mutationStatus } = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        dispatch(setProjects(initialProjects));
    }, [dispatch, initialProjects]);

    // const handleDelete = (id: string) => {
    //     if (confirm("Êtes-vous sûr de vouloir supprimer ce projet ?")) {
    //         dispatch(deleteProject(id));
    //     }
    // };

    return (
        <>
            {/* Le bouton pour ouvrir le modal est maintenant ici */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Gérer les Projets</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-green-600 text-white flex items-center px-4 py-2 rounded-md hover:bg-green-700"
                >
                    <PlusCircle className="mr-2" />
                    Nouveau Projet
                </button>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
                {/* Le tableau reste identique */}
                <table className="w-full">
                    {/* ... */}
                </table>
            </div>

            {/* On rend le modal et on lui passe les props pour le contrôler */}
            <ProjectFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}