"use client";

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { createImpactStat, updateImpactStat, ImpactStat } from '@/redux/slices/impactStatsSlice';
import { Save, Users, MapPin, Camera, Star, Heart, Globe } from 'lucide-react';
import Link from 'next/link';

type FormValues = {
    number: string;
    label: string;
    icon: string;
    order: number;
};

interface ImpactStatFormProps {
    isEditing?: boolean;
    initialData?: ImpactStat;
}

// Liste des icônes disponibles
const availableIcons = [
    { name: "Users", icon: Users, label: "Utilisateurs" },
    { name: "MapPin", icon: MapPin, label: "Lieux" },
    { name: "Camera", icon: Camera, label: "Photos" },
    { name: "Star", icon: Star, label: "Étoile" },
    { name: "Heart", icon: Heart, label: "Cœur" },
    { name: "Globe", icon: Globe, label: "Monde" },
];

export default function ImpactStatForm({ isEditing = false, initialData }: ImpactStatFormProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<FormValues>({
        defaultValues: isEditing && initialData ? {
            number: initialData.number,
            label: initialData.label,
            icon: initialData.icon,
            order: initialData.order
        } : { order: 0, icon: "Users" }
    });

    const selectedIcon = watch('icon');

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (isEditing && initialData) {
                await dispatch(updateImpactStat({ id: initialData.id, ...data })).unwrap();
            } else {
                await dispatch(createImpactStat(data)).unwrap();
            }
            router.push('/admin/impact');
        } catch (error) {
            console.error("Échec :", error);
        }
    };

    // Classe CSS commune pour les inputs pour un design uniforme
    const inputClass = "w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 md:p-8 space-y-8">

                {/* Champs Principaux */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Chiffre Clé</label>
                        <input
                            type="text"
                            {...register('number', { required: 'Le chiffre est requis' })}
                            className={inputClass}
                            placeholder="Ex: 1500+"
                        />
                        {errors.number && <p className="text-red-500 text-xs mt-1.5">{errors.number.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Libellé</label>
                        <input
                            type="text"
                            {...register('label', { required: 'Le label est requis' })}
                            className={inputClass}
                            placeholder="Ex: Bénéficiaires"
                        />
                        {errors.label && <p className="text-red-500 text-xs mt-1.5">{errors.label.message}</p>}
                    </div>
                </div>

                {/* Sélecteur d'Icône Visuel */}
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Choisir une icône</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                        {availableIcons.map((item) => {
                            const isSelected = selectedIcon === item.name;
                            return (
                                <div
                                    key={item.name}
                                    onClick={() => setValue('icon', item.name)}
                                    className={`cursor-pointer rounded-xl border p-4 flex flex-col items-center justify-center gap-2 transition-all duration-200 ${isSelected
                                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-500/20"
                                            : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-500 hover:text-slate-700"
                                        }`}
                                >
                                    <item.icon size={24} />
                                    <span className="text-xs font-medium">{item.label}</span>
                                </div>
                            )
                        })}
                    </div>
                    {/* Input caché pour stocker la valeur pour react-hook-form */}
                    <input type="hidden" {...register('icon', { required: "Veuillez choisir une icône" })} />
                    {errors.icon && <p className="text-red-500 text-xs mt-1.5">{errors.icon.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Ordre d'affichage</label>
                    <input
                        type="number"
                        {...register('order', { valueAsNumber: true })}
                        className={`${inputClass} w-32`} // Plus petit pour l'ordre
                    />
                    <p className="text-xs text-slate-400 mt-1.5">Plus le chiffre est petit, plus il apparaît en premier.</p>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="bg-slate-50 px-6 md:px-8 py-4 border-t border-slate-200 flex justify-end gap-3">
                <Link href="/admin/impact" className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-200 rounded-lg transition-colors">
                    Annuler
                </Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={18} />}
                    {isEditing ? 'Mettre à jour' : 'Enregistrer'}
                </button>
            </div>
        </form>
    );
}