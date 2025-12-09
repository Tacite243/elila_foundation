"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchEvents, deleteEvent } from "@/redux/slices/eventsSlice";
import EventForm from "@/components/EventForm";
import { Trash2 } from "lucide-react";

export default function EventsAdminPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { items: events, status } = useSelector((state: RootState) => state.events);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchEvents());
        }
    }, [status, dispatch]);

    const handleDelete = (id: string) => {
        if (confirm("Voulez-vous vraiment supprimer cet événement ?")) {
            dispatch(deleteEvent(id));
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestion des Événements</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Liste des Événements</h2>
                    <div className="bg-white p-4 rounded-lg shadow space-y-3">
                        {status === 'loading' && <p>Chargement...</p>}
                        {events.map(event => (
                            <div key={event.id} className="flex justify-between items-center p-2 border-b">
                                <div>
                                    <p className="font-bold">{event.title} <span className="font-normal text-sm text-gray-500">- {event.type}</span></p>
                                    <p className="text-sm text-gray-600">
                                        {/* --- CORRECTION ICI --- */}
                                        {/* On vérifie si event.date existe avant de le formater */}
                                        {event.date
                                            ? new Date(event.date).toLocaleString('fr-FR')
                                            : 'Date non définie'
                                        }
                                        {' - '}
                                        {event.location}
                                    </p>
                                </div>
                                <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-700">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <EventForm />
                </div>
            </div>
        </div>
    );
}