"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { createJobOffer, resetJobOfferMutation } from '@/redux/slices/jobOffersSlice';
import type { JobOfferFormData } from '@/redux/slices/jobOffersSlice';
import { JobType, WorkArrangement, ExperienceLevel } from '@prisma/client';
import { X, PlusCircle, Trash2 } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface JobOfferFormModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Composant interne pour gérer les listes de textes (responsabilités, qualifications)
const DynamicListInput = ({
    label,
    items,
    setItems,
    placeholder
}: {
    label: string;
    items: string[];
    setItems: (items: string[]) => void;
    placeholder: string;
}) => {
    const handleItemChange = (index: number, value: string) => {
        const newItems = [...items];
        newItems[index] = value;
        setItems(newItems);
    };

    const addItem = () => setItems([...items, '']);
    const removeItem = (index: number) => {
        if (items.length > 1) {
            setItems(items.filter((_, i) => i !== index));
        }
    };

    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="text"
                            placeholder={`${placeholder} #${index + 1}`}
                            value={item}
                            onChange={(e) => handleItemChange(index, e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm"
                        />
                        <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-700 p-1" disabled={items.length <= 1}>
                            <Trash2 size={18} />
                        </button>
                    </div>
                ))}
            </div>
            <button type="button" onClick={addItem} className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center">
                <PlusCircle size={16} className="mr-1" /> Ajouter
            </button>
        </div>
    );
};

export default function JobOfferFormModal({ isOpen, onClose }: JobOfferFormModalProps) {
    // États pour chaque champ du formulaire
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [location, setLocation] = useState('');
    const [employmentType, setEmploymentType] = useState<JobType>(JobType.FULL_TIME);
    const [workArrangement, setWorkArrangement] = useState<WorkArrangement>(WorkArrangement.ON_SITE);
    const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(ExperienceLevel.JUNIOR);
    const [description, setDescription] = useState('');
    const [responsibilities, setResponsibilities] = useState<string[]>(['']);
    const [qualifications, setQualifications] = useState<string[]>(['']);
    const [salary, setSalary] = useState('');
    const [howToApply, setHowToApply] = useState('');
    const [closingDate, setClosingDate] = useState('');
    const [isPublished, setIsPublished] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const { mutationStatus, mutationError } = useSelector((state: RootState) => state.jobOffers);

    // Slugification automatique
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
        setSlug(slugify(newTitle));
    };

    // Logique de réinitialisation et de fermeture du modal
    useEffect(() => {
        if (mutationStatus === 'succeeded') {
            dispatch(resetJobOfferMutation());
            onClose();
        }
    }, [mutationStatus, dispatch, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData: JobOfferFormData = {
            title, slug, location, employmentType, workArrangement, experienceLevel, description,
            responsibilities: responsibilities.filter(r => r.trim() !== ''),
            qualifications: qualifications.filter(q => q.trim() !== ''),
            salary: salary || undefined,
            howToApply,
            closingDate: closingDate || null,
            isPublished,
        };

        dispatch(createJobOffer(formData));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Nouvelle Offre d&apos;Emploi</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Ligne 1: Titre et Slug */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre du poste</label>
                            <input type="text" id="title" value={title} onChange={handleTitleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug (auto-généré)</label>
                            <input type="text" id="slug" value={slug} onChange={e => setSlug(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50" required />
                        </div>
                    </div>

                    {/* Ligne 2: Caractéristiques principales */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Lieu</label>
                            <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">Type de contrat</label>
                            <select id="employmentType" value={employmentType} onChange={e => setEmploymentType(e.target.value as JobType)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                {Object.values(JobType).map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="workArrangement" className="block text-sm font-medium text-gray-700">Mode de travail</label>
                            <select id="workArrangement" value={workArrangement} onChange={e => setWorkArrangement(e.target.value as WorkArrangement)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                {Object.values(WorkArrangement).map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="experienceLevel" className="block text-sm font-medium text-gray-700">Niveau d&apos;expérience</label>
                            <select id="experienceLevel" value={experienceLevel} onChange={e => setExperienceLevel(e.target.value as ExperienceLevel)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                {Object.values(ExperienceLevel).map(v => <option key={v} value={v}>{v}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description du poste</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={5} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required />
                    </div>

                    {/* Listes dynamiques */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <DynamicListInput label="Responsabilités" items={responsibilities} setItems={setResponsibilities} placeholder="Responsabilité" />
                        <DynamicListInput label="Qualifications" items={qualifications} setItems={setQualifications} placeholder="Qualification" />
                    </div>

                    {/* Ligne 4: Informations de candidature */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salaire (optionnel)</label>
                            <input type="text" id="salary" value={salary} onChange={e => setSalary(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" placeholder="Ex: Compétitif, 30-40k €/an" />
                        </div>
                        <div>
                            <label htmlFor="closingDate" className="block text-sm font-medium text-gray-700">Date de clôture (optionnel)</label>
                            <input type="date" id="closingDate" value={closingDate} onChange={e => setClosingDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="howToApply" className="block text-sm font-medium text-gray-700">Comment postuler</label>
                        <textarea id="howToApply" value={howToApply} onChange={e => setHowToApply(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required placeholder="Ex: Envoyez votre CV et lettre de motivation à contact@welead.org" />
                    </div>

                    {/* Publication */}
                    <div className="flex items-start">
                        <div className="flex h-5 items-center">
                            <input id="isPublished" name="isPublished" type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="isPublished" className="font-medium text-gray-700">Publier l&apos;offre</label>
                            <p className="text-gray-500">Si cette case est cochée, l&apos;offre sera visible sur le site public.</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">Annuler</button>
                        <button type="submit" disabled={mutationStatus === 'loading'} className="bg-green-600 text-white px-4 py-2 rounded-md disabled:bg-gray-400">
                            {mutationStatus === 'loading' ? 'Enregistrement...' : 'Créer l\'Offre'}
                        </button>
                    </div>
                    {mutationStatus === 'failed' && <p className="text-red-500 text-sm mt-2 text-right">{mutationError}</p>}
                </form>
            </div>
        </div>
    );
}