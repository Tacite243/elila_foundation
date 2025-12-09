'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { createImpactStat, updateImpactStat, ImpactStat } from '@/redux/slices/impactStatsSlice';

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

export default function ImpactStatForm({ isEditing = false, initialData }: ImpactStatFormProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: isEditing && initialData ? {
            number: initialData.number,
            label: initialData.label,
            icon: initialData.icon,
            order: initialData.order
        } : { order: 0 }
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            if (isEditing && initialData) {
                await dispatch(updateImpactStat({ id: initialData.id, ...data })).unwrap();
            } else {
                await dispatch(createImpactStat(data)).unwrap();
            }
            router.push('/admin/impact');
        } catch (error) {
            console.error("Échec de la soumission du formulaire :", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div>
                <label htmlFor="number" className="block text-sm font-medium text-gray-700">Chiffre</label>
                <input
                    type="text"
                    id="number"
                    {...register('number', { required: 'Le chiffre est requis' })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.number && <p className="text-red-500 text-xs mt-1">{errors.number.message}</p>}
            </div>

            <div>
                <label htmlFor="label" className="block text-sm font-medium text-gray-700">Label</label>
                <input
                    type="text"
                    id="label"
                    {...register('label', { required: 'Le label est requis' })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.label && <p className="text-red-500 text-xs mt-1">{errors.label.message}</p>}
            </div>

            <div>
                <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icône</label>
                <select
                    id="icon"
                    {...register('icon', { required: 'Une icône est requise' })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="">Sélectionnez une icône</option>
                    <option value="Users">Users (Utilisateurs)</option>
                    <option value="MapPin">MapPin (Localisation)</option>
                    <option value="Camera">Camera</option>
                </select>
                {errors.icon && <p className="text-red-500 text-xs mt-1">{errors.icon.message}</p>}
            </div>

            <div>
                <label htmlFor="order" className="block text-sm font-medium text-gray-700">Ordre d&apos;affichage</label>
                <input
                    type="number"
                    id="order"
                    {...register('order', { valueAsNumber: true })}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div className="flex justify-end">
                <button type="button" onClick={() => router.back()} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md mr-3">Annuler</button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                    {isEditing ? 'Mettre à jour' : 'Créer'}
                </button>
            </div>
        </form>
    );
}