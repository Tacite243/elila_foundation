"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, deleteUser } from "@/redux/slices/usersSlice";
import UserForm from "@/components/UserForm";
import { Trash2, ShieldCheck } from "lucide-react";

export default function UsersAdminPage() {
    const dispatch = useDispatch<AppDispatch>();
    const { data: session } = useSession(); // Pour savoir qui est l'utilisateur courant
    const { items: users, status, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDelete = (id: string) => {
        if (confirm("Voulez-vous vraiment supprimer cet utilisateur ? Cette action est irréversible.")) {
            dispatch(deleteUser(id));
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestion des Utilisateurs</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold mb-2">Administrateurs Actuels</h2>
                    <div className="bg-white p-4 rounded-lg shadow space-y-3">
                        {status === 'loading' && <p>Chargement...</p>}
                        {error && 'message' in error && (<p className="text-red-500">{error.message}</p>)}
                        {users.map(user => (
                            <div key={user.id} className="flex justify-between items-center p-2 border-b">
                                <div>
                                    <p className="font-bold flex items-center">
                                        {user.name}
                                        {user.id === session?.user.id && <ShieldCheck size={16} className="ml-2 text-green-600" />}
                                    </p>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                </div>
                                {/* On ne peut pas supprimer son propre compte */}
                                {user.id !== session?.user.id && (
                                    <button onClick={() => handleDelete(user.id)} className="text-red-500 hover:text-red-700">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <UserForm />
                </div>
            </div>
        </div>
    );
}