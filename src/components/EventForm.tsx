"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { createEvent } from '@/redux/slices/eventsSlice';
import { EventType } from '@prisma/client';


const EventForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState<EventType>(EventType.CONFERENCE);
    const [date, setDate] = useState(''); // Le type="datetime-local" gère le format

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 1. La date n'est plus requise dans la validation du formulaire
        if (!title || !location || !type) return;

        // 2. On crée la valeur à envoyer : un objet Date si une date est fournie, sinon null.
        // L'opérateur ternaire est parfait pour ça.
        const dateToSend = date ? new Date(date) : null;

        dispatch(createEvent({
            title,
            location,
            type,
            date: dateToSend // On passe soit un objet Date, soit null
        }));

        // Vider les champs
        setTitle('');
        setLocation('');
        setType(EventType.CONFERENCE);
        setDate('');
    };


    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg shadow-inner space-y-4">
            <h3 className="text-lg font-semibold">Ajouter un événement</h3>
            <input type="text" placeholder="Titre" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded" required />
            <input type="text" placeholder="Lieu" value={location} onChange={e => setLocation(e.target.value)} className="w-full p-2 border rounded" required />
            <select
                value={type}
                onChange={e => setType(e.target.value as EventType)}
                className='w-full p-2 border rounded'
                required
            >
                {Object.values(EventType).map(EventType => (
                    <option key={EventType} value={EventType}>
                        {EventType}
                    </option>
                ))}
            </select>
            <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border rounded" required />
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Créer</button>
        </form>
    );
};

export default EventForm;