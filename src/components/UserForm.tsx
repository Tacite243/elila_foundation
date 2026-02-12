"use client";

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { createUser } from '@/redux/slices/usersSlice';


// Définissons un type pour nos erreurs de formulaire
type FormError = {
    message?: string;
    errors?: {
        fieldErrors?: {
            name?: string[];
            email?: string[];
            password?: string[];
        }
    }
} | null;

const UserForm = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState<FormError>(null);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);
        setSuccessMessage('');

        const resultAction = await dispatch(createUser({ name, email, password }));
        if (createUser.fulfilled.match(resultAction)) {
            setSuccessMessage(`Utilisateur ${resultAction.payload.name} créé avec succès !`);
            setName(''); setEmail(''); setPassword('');
        } else if (createUser.rejected.match(resultAction)) {
            setFormError(resultAction.payload as FormError);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 bg-gray-50 rounded-lg shadow-inner space-y-4">
            <h3 className="text-lg font-semibold">Ajouter un administrateur</h3>
            {successMessage && <p className="p-2 bg-green-100 text-green-800 rounded">{successMessage}</p>}

            <input type="text" placeholder="Nom complet" value={name} onChange={e => setName(e.target.value)} className="w-full p-2 border rounded" required />
            {formError?.errors?.fieldErrors?.name && <p className="text-red-500 text-sm">{formError.errors.fieldErrors.name[0]}</p>}

            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
            {formError?.errors?.fieldErrors?.email && <p className="text-red-500 text-sm">{formError.errors.fieldErrors.email[0]}</p>}
            {formError?.message && <p className="text-red-500 text-sm">{formError.message}</p>}

            <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
            {formError?.errors?.fieldErrors?.password && <p className="text-red-500 text-sm">{formError.errors.fieldErrors.password[0]}</p>}

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Créer</button>
        </form>
    );
};

export default UserForm;