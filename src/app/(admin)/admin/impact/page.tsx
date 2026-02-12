"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchImpactStats, deleteImpactStat } from '@/redux/slices/impactStatsSlice';
import { RootState } from '@/redux/store';
import { Plus, Edit, Trash2, TrendingUp, RefreshCw, Users, MapPin, Camera, Star, Heart, Globe } from 'lucide-react';

// Mapping pour afficher l'icône dynamique
const iconMap: { [key: string]: React.ElementType } = {
    Users, MapPin, Camera, Star, Heart, Globe
};

export default function ImpactStatsPage() {
    const dispatch = useAppDispatch();
    const { stats, status, error } = useAppSelector((state: RootState) => state.impactStats);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchImpactStats());
    }, [status, dispatch]);

    const handleDelete = (id: string) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette statistique ?")) {
            dispatch(deleteImpactStat(id));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* EN-TÊTE */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <TrendingUp className="text-blue-600" size={32} />
                            Impact & Chiffres
                        </h1>
                        <p className="text-slate-500 mt-1">Gérez les indicateurs clés de performance de la fondation.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={() => dispatch(fetchImpactStats())}
                            className="p-2.5 bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
                            title="Actualiser"
                        >
                            <RefreshCw size={20} className={status === 'loading' ? 'animate-spin' : ''} />
                        </button>
                        <Link
                            href="/admin/impact/new"
                            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                        >
                            <Plus size={20} />
                            Ajouter une Statistique
                        </Link>
                    </div>
                </div>

                {/* TABLEAU */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4 w-20 text-center">Icône</th>
                                    <th className="px-6 py-4">Chiffre Clé</th>
                                    <th className="px-6 py-4">Libellé</th>
                                    <th className="px-6 py-4 text-center">Ordre</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {status === 'loading' && stats.length === 0 && (
                                    <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-400 animate-pulse">Chargement des données...</td></tr>
                                )}
                                {stats.length === 0 && status !== 'loading' && (
                                    <tr><td colSpan={5} className="px-6 py-12 text-center text-slate-500">Aucune statistique enregistrée.</td></tr>
                                )}
                                {stats.map((stat) => {
                                    const IconComponent = iconMap[stat.icon] || TrendingUp;
                                    return (
                                        <tr key={stat.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-6 py-4 text-center">
                                                <div className="w-10 h-10 mx-auto bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                                                    <IconComponent size={20} />
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-slate-900 text-lg">
                                                {stat.number}
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 font-medium">
                                                {stat.label}
                                            </td>
                                            <td className="px-6 py-4 text-center text-slate-400 font-mono">
                                                {stat.order}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        href={`/admin/impact/edit/${stat.id}`}
                                                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(stat.id)}
                                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}