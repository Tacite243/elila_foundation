'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import {
    Activity, Database, FileText, Briefcase, Calendar,
    Users, ArrowRight, Clock,
    ExternalLink, PieChart, Zap
} from 'lucide-react';

// --- TYPES ---
type DashboardViewProps = {
    data: {
        counts: {
            articles: number;
            projects: number;
            events: number;
            users: number;
            impact: number;
        };
        recentArticles: { id: string; title: string; createdAt: Date; published: boolean }[];
        identifications: {
            total: number;
            distribution: { name: string; count: number; percentage: number }[];
        };
        dbStatus: { isOnline: boolean; latency: number; };
    };
};

// --- ANIMATIONS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function AdminDashboardView({ data }: DashboardViewProps) {
    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-8 lg:p-12 text-slate-800">
            <motion.div
                className="max-w-7xl mx-auto space-y-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* 1. EN-TÊTE SIMPLIFIÉ */}
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-slate-200 pb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Vue d&apos;ensemble</h1>
                        <p className="text-slate-500 mt-1">Bienvenue sur votre tableau de bord administrateur.</p>
                    </div>

                    {/* Indicateur BDD Compact */}
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${data.dbStatus.isOnline ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        <div className={`w-2 h-2 rounded-full ${data.dbStatus.isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        {data.dbStatus.isOnline ? `Système opérationnel (${data.dbStatus.latency}ms)` : 'Système hors ligne'}
                    </div>
                </motion.div>

                {/* 2. STATISTIQUES CLÉS (Ligne du haut) */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard title="Articles" count={data.counts.articles} icon={FileText} color="blue" href="/admin/articles" />
                    <StatCard title="Projets" count={data.counts.projects} icon={Briefcase} color="indigo" href="/admin/projects" />
                    <StatCard title="Événements" count={data.counts.events} icon={Calendar} color="purple" href="/admin/events" />
                    {/* isExternal indique ici qu'on ne navigue pas, c'est juste de l'affichage */}
                    <StatCard title="Membres Identifiés" count={data.identifications.total} icon={Users} color="teal" href="#" isExternal />
                </motion.div>

                {/* 3. SECTION CENTRALE (Répartition & Actions) */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* GAUCHE (2/3) : Analyse Territoriale */}
                    <motion.div variants={itemVariants} className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                            <h2 className="font-bold text-slate-800 flex items-center gap-2">
                                <PieChart size={18} className="text-teal-600" /> Répartition Territoriale
                            </h2>
                            <a href={`https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}`} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-blue-600 hover:underline flex items-center gap-1">
                                Ouvrir Google Sheets <ExternalLink size={10} />
                            </a>
                        </div>
                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                            {data.identifications.distribution.length === 0 ? (
                                <div className="col-span-2 text-center py-8 text-slate-400 text-sm">Données indisponibles.</div>
                            ) : (
                                data.identifications.distribution.slice(0, 6).map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="font-medium text-slate-700 capitalize">{item.name.toLowerCase()}</span>
                                            <span className="text-slate-500 font-mono text-xs">{item.count}</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.percentage}%` }}
                                                transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                                                className={`h-2 rounded-full ${index === 0 ? 'bg-teal-500' : 'bg-slate-400'}`}
                                            />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>

                    {/* DROITE (1/3) : Actions Rapides & Admin */}
                    <motion.div variants={itemVariants} className="space-y-6">
                        {/* Actions Rapides */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <Zap size={18} className="text-amber-500 fill-amber-500" /> Actions Rapides
                            </h2>
                            <div className="space-y-3">
                                <QuickActionButton href="/admin/articles/create" label="Nouvel Article" icon={FileText} color="blue" />
                                <QuickActionButton href="/admin/projects" label="Nouveau Projet" icon={Briefcase} color="indigo" />
                                <QuickActionButton href="/admin/events" label="Planifier Événement" icon={Calendar} color="purple" />
                            </div>
                        </div>

                        {/* Info Admin */}
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-slate-700 p-6 text-white">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Database size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase">Base de données</p>
                                    <p className="font-mono text-sm">PostgreSQL (Neon)</p>
                                </div>
                            </div>
                            <div className="h-px bg-white/10 my-4" />
                            <div className="flex justify-between items-center text-xs text-slate-400">
                                <span>Environnement</span>
                                <span className="px-2 py-0.5 bg-white/10 rounded border border-white/10 text-white font-mono">{process.env.NODE_ENV}</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* 4. SECTION ACTIVITÉ (Bas de page) */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <h2 className="font-bold text-slate-800 flex items-center gap-2">
                            <Activity size={18} className="text-blue-600" /> Dernières Publications
                        </h2>
                        <Link href="/admin/articles" className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors px-3 py-1 rounded-full hover:bg-blue-50">
                            Gérer tout
                        </Link>
                    </div>
                    <div className="divide-y divide-slate-50">
                        {data.recentArticles.length === 0 ? (
                            <div className="p-12 text-center text-slate-400 flex flex-col items-center">
                                <FileText size={32} className="mb-2 opacity-20" />
                                <p>Aucun article publié récemment.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1">
                                {data.recentArticles.map((article) => (
                                    <div key={article.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                                        <div className="flex gap-4 items-center min-w-0">
                                            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                                                ART
                                            </div>
                                            <div className="min-w-0">
                                                <p className="font-medium text-slate-800 group-hover:text-blue-700 transition-colors truncate">{article.title}</p>
                                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-0.5">
                                                    <span className="flex items-center gap-1"><Clock size={10} /> {new Date(article.createdAt).toLocaleDateString('fr-FR')}</span>
                                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                                    <span className={article.published ? "text-green-600 font-medium" : "text-amber-600 font-medium"}>
                                                        {article.published ? "Publié" : "Brouillon"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link href={`/admin/articles/edit/${article.id}`} className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                            <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

            </motion.div>
        </div>
    );
}

// --- SOUS-COMPOSANTS ---

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatCard({ title, count, icon: Icon, color, href, isExternal }: any) {
    const colorStyles = {
        blue: { bg: "bg-blue-50", text: "text-blue-600", border: "group-hover:border-blue-300" },
        indigo: { bg: "bg-indigo-50", text: "text-indigo-600", border: "group-hover:border-indigo-300" },
        purple: { bg: "bg-purple-50", text: "text-purple-600", border: "group-hover:border-purple-300" },
        orange: { bg: "bg-orange-50", text: "text-orange-600", border: "group-hover:border-orange-300" },
        teal: { bg: "bg-teal-50", text: "text-teal-600", border: "group-hover:border-teal-300" },
    }[color as string] || { bg: "bg-slate-50", text: "text-slate-600", border: "" };

    // --- CORRECTION ICI : Contenu de la carte extrait pour éviter la duplication ---
    const CardContent = (
        <motion.div
            whileHover={{ y: -4 }}
            className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 h-full relative overflow-hidden ${colorStyles.border}`}
        >
            <div className="flex justify-between items-start mb-3 relative z-10">
                <div>
                    <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">{title}</p>
                    <h3 className="text-3xl font-black text-slate-800">{count}</h3>
                </div>
                <div className={`p-2.5 rounded-xl ${colorStyles.bg} ${colorStyles.text}`}>
                    <Icon size={22} />
                </div>
            </div>
            {isExternal ? (
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-2">
                    Données Google Forms <ExternalLink size={10} />
                </div>
            ) : (
                <div className="text-xs text-slate-400 flex items-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    Gérer <ArrowRight size={10} />
                </div>
            )}

            <div className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-[0.04] ${colorStyles.bg.replace('bg-', 'bg-current text-')}`} />
        </motion.div>
    );

    // --- CORRECTION ICI : Condition pour Link ou Div ---
    if (isExternal) {
        return <div className="block h-full cursor-default">{CardContent}</div>;
    }

    return (
        <Link href={href} className="block group h-full">
            {CardContent}
        </Link>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function QuickActionButton({ href, label, icon: Icon, color }: any) {
    const colorStyles = {
        blue: "text-blue-600 group-hover:bg-blue-600",
        indigo: "text-indigo-600 group-hover:bg-indigo-600",
        purple: "text-purple-600 group-hover:bg-purple-600",
        emerald: "text-emerald-600 group-hover:bg-emerald-600",
    }[color as string];

    return (
        <Link
            href={href}
            className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-sm bg-white transition-all duration-200 group"
        >
            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900 pl-1">{label}</span>
            <div className={`p-1.5 rounded-lg bg-slate-50 transition-all duration-200 ${colorStyles} group-hover:text-white`}>
                <Icon size={16} />
            </div>
        </Link>
    );
}