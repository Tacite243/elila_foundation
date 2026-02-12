import React from 'react';
import { PlusCircle } from 'lucide-react';

// Un sous-composant pour une ligne de tableau skeleton
const SkeletonRow = () => (
    <tr>
        <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-20"></div>
        </td>
        <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-16"></div>
        </td>
        <td className="px-6 py-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </td>
        <td className="px-6 py-4 text-right">
            <div className="flex justify-end items-center gap-4">
                <div className="h-5 w-5 bg-gray-200 rounded-md"></div>
                <div className="h-5 w-5 bg-gray-200 rounded-md"></div>
            </div>
        </td>
    </tr>
);

export default function ImpactStatsTableSkeleton() {
    return (
        <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
            {/* Skeleton du Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="h-8 w-1/3 bg-gray-200 rounded-md"></div>
                <div className="flex items-center bg-gray-200 text-transparent px-4 py-2 rounded-md">
                    <PlusCircle className="mr-2 text-gray-300" size={20} />
                    Ajouter une Statistique
                </div>
            </div>

            {/* Skeleton du Tableau */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* L'en-tête du tableau est statique, ce qui est une bonne pratique UX */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icône</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chiffre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* Boucle pour créer plusieurs lignes de skeleton */}
                        {[...Array(4)].map((_, index) => (
                            <SkeletonRow key={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}