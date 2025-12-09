"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { createProject, resetProjectMutation } from '@/redux/slices/projectsSlice';
import type { ProjectFormData } from '@/redux/slices/projectsSlice';
import { ProjectStatus } from '@prisma/client';
import { X, PlusCircle, Trash2 } from 'lucide-react';
import { slugify } from '@/lib/utils';



interface ProjectFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Une fonction utilitaire pour formater les dates pour les inputs de type 'datetime-local'
// const toInputDateTimeFormat = (date: Date | null | undefined): string => {
//     if (!date) return '';
//     const d = new Date(date);
//     d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); // Ajuster au fuseau horaire local
//     return d.toISOString().slice(0, 16);
// };

export default function ProjectFormModal({ isOpen, onClose }: ProjectFormModalProps) {
    // --- 1. Créer des états pour tous les champs du formulaire ---
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.PLANNED);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [images, setImages] = useState<{ url: string; altText?: string }[]>([{ url: '', altText: '' }]);

    // --- 2. Gérer la mise à jour du titre et du slug ---
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(slugify(newTitle)); // Met à jour le slug automatiquement
    };

    const dispatch = useDispatch<AppDispatch>();
    const { mutationStatus, mutationError } = useSelector((state: RootState) => state.projects);

    // --- 2. Fonction pour réinitialiser tous les champs ---
    const resetForm = () => {
        setTitle('');
        setSlug('');
        setDescription('');
        setStatus(ProjectStatus.PLANNED);
        setStartDate('');
        setEndDate('');
        setImages([{ url: '', altText: '' }]);
    };

    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen]);

    useEffect(() => {
        if (mutationStatus === 'succeeded') {
            dispatch(resetProjectMutation());
            onClose(); // Ferme le modal après succès
        }
    }, [mutationStatus, dispatch, onClose]);

    // --- 3. Fonctions pour gérer le tableau d'images ---
    const handleImageChange = (index: number, field: 'url' | 'altText', value: string) => {
        const newImages = [...images];
        newImages[index][field] = value;
        setImages(newImages);
    };

    const addImageField = () => {
        setImages([...images, { url: '', altText: '' }]);
    };

    const removeImageField = (index: number) => {
        if (images.length > 1) { // Toujours garder au moins un champ
            setImages(images.filter((_, i) => i !== index));
        }
    };

    // --- 4. Mettre à jour la soumission du formulaire ---
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const projectData: ProjectFormData = {
            title,
            slug,
            description,
            status,
            startDate: startDate || null,
            endDate: endDate || null,
            // Filtrer les images vides avant de soumettre
            images: images.filter(img => img.url.trim() !== ''),
        };

        dispatch(createProject(projectData));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Nouveau Projet</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                        <X size={24} />
                    </button>
                </div>

                {/* --- 5. Le formulaire complet --- */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Titre et Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
                            <input type="text" id="title" value={title} onChange={handleTitleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug (auto-généré)</label>
                            {/* L'utilisateur peut toujours modifier le slug manuellement si besoin */}
                            <input type="text" id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50" required />
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>

                    {/* Statut et Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Statut</label>
                            <select id="status" value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                {Object.values(ProjectStatus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date de début</label>
                            <input type="datetime-local" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date de fin</label>
                            <input type="datetime-local" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                    </div>

                    {/* Gestionnaire d'images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Images du projet</label>
                        <div className="space-y-3">
                            {images.map((image, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <input type="text" placeholder="URL de l'image" value={image.url} onChange={(e) => handleImageChange(index, 'url', e.target.value)} className="block w-1/2 rounded-md border-gray-300 shadow-sm" />
                                    <input type="text" placeholder="Texte alternatif" value={image.altText} onChange={(e) => handleImageChange(index, 'altText', e.target.value)} className="block w-1/2 rounded-md border-gray-300 shadow-sm" />
                                    <button type="button" onClick={() => removeImageField(index)} className="text-red-500 hover:text-red-700 p-1" disabled={images.length <= 1}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addImageField} className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                            <PlusCircle size={16} className="mr-1" /> Ajouter une image
                        </button>
                    </div>

                    {/* Boutons de soumission */}
                    <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                            Annuler
                        </button>
                        <button type="submit" disabled={mutationStatus === 'loading'} className="bg-green-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400">
                            {mutationStatus === 'loading' ? 'Création...' : 'Créer le Projet'}
                        </button>
                    </div>
                    {mutationStatus === 'failed' && <p className="text-red-500 text-sm mt-2 text-right">{mutationError}</p>}
                </form>
            </div>
        </div>
    );
}