'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchImpactStats, deleteImpactStat } from '@/redux/slices/impactStatsSlice';
import { RootState } from '@/redux/store';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import ImpactStatsTableSkeleton from '@/components/ImpactStatsTableSkeleton';

export default function ImpactStatsPage() {
    const dispatch = useAppDispatch();
    const { stats, status } = useAppSelector((state: RootState) => state.impactStats);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchImpactStats());
        }
    }, [status, dispatch]);

    const handleDelete = (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette statistique ?")) {
            dispatch(deleteImpactStat(id));
        }
    };

    if (status === 'loading' || status === 'idle') {
        return <ImpactStatsTableSkeleton />;
    }

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestion de l&apos;Impact</h1>
                <Link
                    href="/admin/impact/new"
                    className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                    <PlusCircle className="mr-2" size={20} />
                    Ajouter une Statistique
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icône</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chiffre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {stats.map((stat) => (
                            <tr key={stat.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{stat.icon}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{stat.number}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{stat.label}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Link href={`/admin/impact/edit/${stat.id}`} className="text-indigo-600 hover:text-indigo-900 mr-4">
                                        <Edit size={18} />
                                    </Link>
                                    <button onClick={() => handleDelete(stat.id)} className="text-red-600 hover:text-red-900">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {stats.length === 0 && status === 'succeeded' && (
                <p className="text-center text-gray-500 mt-8">Aucune statistique d&apos;impact trouvée. Commencez par en ajouter une !</p>
            )}
        </div>
    );
}