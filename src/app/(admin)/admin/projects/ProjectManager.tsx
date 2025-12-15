"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createProject,
  updateProject,
  resetMutationStatus,
  ProjectWithImages,
} from "@/redux/slices/projectsSlice";
import { X, Upload, Save, Plus, Trash2 } from "lucide-react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectStatus } from "@prisma/client";

// --- CORRECTION ICI : Mise à jour de l'interface des props ---
interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectToEdit?: ProjectWithImages | null; // Ajout de la prop manquante (optionnelle)
}

export default function ProjectFormModal({
  isOpen,
  onClose,
  projectToEdit,
}: ProjectFormModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { mutationStatus } = useSelector((state: RootState) => state.projects);

  // Initialisation du state
  const initialFormState = {
    title: "",
    slug: "",
    description: "",
    status: "PLANNED",
    startDate: "",
    endDate: "",
    images: [] as string[], // On stockera les URLs des images
  };

  const [formData, setFormData] = useState(initialFormState);
  const [isSlugEdited, setIsSlugEdited] = useState(false);

  // Effet pour pré-remplir le formulaire en cas d'édition
  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title,
        slug: projectToEdit.slug,
        description: projectToEdit.description,
        status: projectToEdit.status,
        // On formate les dates pour les inputs type="date" (YYYY-MM-DD)
        startDate: projectToEdit.startDate
          ? new Date(projectToEdit.startDate).toISOString().split("T")[0]
          : "",
        endDate: projectToEdit.endDate
          ? new Date(projectToEdit.endDate).toISOString().split("T")[0]
          : "",
        images: projectToEdit.images.map((img) => img.url),
      });
      setIsSlugEdited(true);
    } else {
      setFormData(initialFormState);
      setIsSlugEdited(false);
    }
  }, [projectToEdit, isOpen]); // Se déclenche à l'ouverture ou changement de projet

  // Fermeture automatique après succès
  useEffect(() => {
    if (mutationStatus === "succeeded") {
      onClose();
      dispatch(resetMutationStatus());
    }
  }, [mutationStatus, onClose, dispatch]);

  const slugify = (text: string) =>
    text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "title" && !isSlugEdited) {
      setFormData((prev) => ({ ...prev, slug: slugify(value) }));
    }
    if (name === "slug") setIsSlugEdited(true);
  };

  const handleImageUpload = (result: CloudinaryUploadWidgetResults) => {
    if (
      result.event === "success" &&
      result.info &&
      typeof result.info !== "string"
    ) {
      const url = result.info.secure_url;
      setFormData((prev) => ({ ...prev, images: [...prev.images, url] }));
    }
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // On prépare les données en s'assurant que le status est valide
    // et que les dates sont au bon format (ISO string ou null)
    const projectData = {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      // Cast explicite pour rassurer TypeScript que c'est bien un statut valide
      status: formData.status as ProjectStatus,
      startDate: formData.startDate
        ? new Date(formData.startDate).toISOString()
        : null,
      endDate: formData.endDate
        ? new Date(formData.endDate).toISOString()
        : null,
      images: formData.images.map((url) => ({ url, altText: formData.title })), // On structure les images comme attendu
    };

    if (projectToEdit) {
      dispatch(updateProject({ id: projectToEdit.id, data: projectData }));
    } else {
      dispatch(createProject(projectData));
    }
  };

  // Gestion de l'affichage conditionnel
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h2 className="text-xl font-bold text-slate-800">
                {projectToEdit ? "Modifier le projet" : "Nouveau projet"}
              </h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Formulaire Scrollable */}
            <div className="p-6 overflow-y-auto">
              <form
                id="project-form"
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Titre du projet
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      value={formData.title}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Ex: Construction école..."
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      required
                      value={formData.slug}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 bg-slate-50 text-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all font-mono text-sm"
                    />
                  </div>

                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Description
                    </label>
                    <textarea
                      name="description"
                      required
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                      placeholder="Détails du projet..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Date de début
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Date de fin (optionnel)
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                      Statut
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    >
                      <option value="PLANNED">Planifié</option>
                      <option value="IN_PROGRESS">En cours</option>
                      <option value="COMPLETED">Terminé</option>
                      <option value="ON_HOLD">En pause</option>
                      <option value="CANCELLED">Annulé</option>
                    </select>
                  </div>
                </div>

                {/* Gestion des Images */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Galerie Photos
                  </label>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                    {formData.images.map((img, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group border border-slate-200"
                      >
                        <Image
                          src={img}
                          alt="Aperçu"
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="p-1.5 bg-white text-red-600 rounded-full hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Bouton d'upload */}
                    <CldUploadWidget
                      uploadPreset="welead_articles_preset" // Remplacez par votre preset si différent
                      onSuccess={handleImageUpload}
                      options={{ maxFiles: 5, resourceType: "image" }}
                    >
                      {({ open }) => (
                        <button
                          type="button"
                          onClick={() => open()}
                          className="aspect-square rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
                        >
                          <Upload size={24} />
                          <span className="text-xs mt-1">Ajouter</span>
                        </button>
                      )}
                    </CldUploadWidget>
                  </div>
                </div>
              </form>
            </div>

            {/* Footer avec Boutons */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                form="project-form" // Relie ce bouton au formulaire
                disabled={mutationStatus === "loading"}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition-all disabled:opacity-70"
              >
                {mutationStatus === "loading" ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {projectToEdit ? "Mettre à jour" : "Créer le projet"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
