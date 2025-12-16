"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEvents, deleteEvent } from "@/redux/slices/eventsSlice";
import EventForm from "@/components/EventForm";
import {
    Trash2,
    Calendar,
    MapPin,
    RefreshCw,
    Clock,
    Megaphone
} from "lucide-react";

export default function EventsAdminPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: events, status, error } = useSelector((state: RootState) => state.events);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEvents());
        }
    }, [status, dispatch]);

    const handleDelete = (id: string) => {
        if (confirm("Voulez-vous vraiment supprimer cet événement ? Cette action est irréversible.")) {
            dispatch(deleteEvent(id));
        }
    }

    // Fonction utilitaire pour le badge de type
    const getTypeStyle = (type: string) => {
        const styles: { [key: string]: string } = {
            CONFERENCE: "bg-blue-100 text-blue-700 border-blue-200",
            WORKSHOP: "bg-purple-100 text-purple-700 border-purple-200",
            SOCIAL_ACTION: "bg-green-100 text-green-700 border-green-200",
            NETWORKING: "bg-orange-100 text-orange-700 border-orange-200",
            WEBINAR: "bg-indigo-100 text-indigo-700 border-indigo-200",
        };
        return styles[type] || "bg-gray-100 text-gray-700 border-gray-200";
    };

    // Fonction pour formater la date en bloc
    const getDateComponents = (dateString?: string | Date | null) => {
        if (!dateString) return { day: "--", month: "---" };
        const date = new Date(dateString);
        return {
            day: date.getDate(),
            month: date.toLocaleDateString('fr-FR', { month: 'short' }).toUpperCase(),
            time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
        };
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
            <div className="max-w-7xl mx-auto">

                {/* EN-TÊTE */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                            <Calendar className="text-blue-600" size={32} />
                            Gestion des Événements
                        </h1>
                        <p className="text-slate-500 mt-1">Planifiez et gérez l'agenda de la fondation.</p>
                    </div>
                    <button
                        onClick={() => dispatch(fetchEvents())}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm text-sm font-medium"
                    >
                        <RefreshCw size={16} className={status === 'loading' ? 'animate-spin' : ''} />
                        Actualiser
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* COLONNE GAUCHE : LISTE (8 cols) */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                                    <Megaphone className="text-blue-600" size={18} />
                                    Événements à venir <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold">{events.length}</span>
                                </h2>
                            </div>

                            <div className="divide-y divide-slate-100">
                                {status === 'loading' && events.length === 0 && (
                                    <div className="p-8 text-center text-slate-400 animate-pulse">Chargement de l'agenda...</div>
                                )}

                                {error && (
                                    <div className="p-6 text-red-500 bg-red-50 text-center text-sm">{typeof error === 'string' ? error : "Une erreur est survenue"}</div>
                                )}

                                {events.length === 0 && status !== 'loading' && !error && (
                                    <div className="p-12 text-center text-slate-500">
                                        <Calendar className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                        <p>Aucun événement planifié.</p>
                                    </div>
                                )}

                                <AnimatePresence>
                                    {events.map(event => {
                                        const dateInfo = getDateComponents(event.date);
                                        return (
                                            <motion.div
                                                key={event.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, height: 0, padding: 0 }}
                                                className="p-5 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center gap-5 group"
                                            >
                                                {/* Date Block */}
                                                <div className="flex-shrink-0 w-16 h-16 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-center">
                                                    <span className="text-xl font-bold text-slate-800 leading-none">{dateInfo.day}</span>
                                                    <span className="text-xs font-bold text-slate-500 uppercase mt-1">{dateInfo.month}</span>
                                                </div>

                                                {/* Info Block */}
                                                <div className="flex-grow min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-bold text-slate-900 text-lg truncate">{event.title}</h3>
                                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${getTypeStyle(event.type)}`}>
                                                            {event.type}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                                        <div className="flex items-center gap-1.5">
                                                            <MapPin size={14} className="text-slate-400" />
                                                            {event.location}
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={14} className="text-slate-400" />
                                                            {dateInfo.time !== "Invalid Date" ? dateInfo.time : "--:--"}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action */}
                                                <button
                                                    onClick={() => handleDelete(event.id)}
                                                    className="flex-shrink-0 p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                                    title="Supprimer l'événement"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </motion.div>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE : FORMULAIRE (4 cols) - STICKY */}
                    <div className="lg:col-span-4 lg:sticky lg:top-6">
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h2 className="text-base font-bold text-slate-900">Planifier</h2>
                                    <p className="text-xs text-slate-500">Ajouter un nouvel événement</p>
                                </div>
                            </div>

                            {/* Le formulaire est intégré ici */}
                            <EventForm />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}