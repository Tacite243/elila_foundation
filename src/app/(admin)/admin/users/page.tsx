"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, deleteUser } from "@/redux/slices/usersSlice";
import UserForm from "@/components/UserForm";
import {
  Trash2,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  Mail,
  User,
} from "lucide-react";

export default function UsersAdminPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const {
    items: users,
    status,
    error,
  } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
  }, [dispatch, status]);

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr ?")) dispatch(deleteUser(id));
  };

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Gestion des Accès
            </h1>
            <p className="text-slate-500 mt-1">
              Gérez les administrateurs de la plateforme.
            </p>
          </div>
          <button
            onClick={() => dispatch(fetchUsers())}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm text-sm font-medium"
          >
            <RefreshCw
              size={16}
              className={status === "loading" ? "animate-spin" : ""}
            />
            Actualiser
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LISTE UTILISATEURS (Gauche) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <h2 className="font-semibold text-slate-800 flex items-center gap-2">
                  <ShieldCheck className="text-blue-600" size={18} />
                  Liste des Administrateurs{" "}
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                    {users.length}
                  </span>
                </h2>
              </div>

              <div className="divide-y divide-slate-100">
                {error && (
                  <div className="p-4 text-red-500 bg-red-50 m-4 rounded">
                    Erreur:{" "}
                    {typeof error === "string"
                      ? error
                      : "message" in error
                      ? error.message
                      : JSON.stringify(error)}
                  </div>
                )}

                <AnimatePresence>
                  {users.map((user) => (
                    <motion.div
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm
                          ${
                            user.id === session?.user.id
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {getInitials(user.name)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-slate-900">
                              {user.name}
                            </p>
                            {user.id === session?.user.id && (
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide bg-blue-100 text-blue-700 border border-blue-200">
                                Vous
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                            <Mail size={12} /> {user.email}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                          Admin
                        </span>
                        {user.id !== session?.user.id && (
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-slate-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-md transition-all opacity-0 group-hover:opacity-100"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* FORMULAIRE (Droite - Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <UserPlus size={20} />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Ajouter un membre
                  </h2>
                  <p className="text-xs text-slate-500">
                    Créer un nouvel accès admin
                  </p>
                </div>
              </div>

              {/* Le composant UserForm doit avoir des inputs avec des bordures visibles */}
              <div className="user-form-wrapper">
                <UserForm />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 
         Ceci force le style des inputs du UserForm s'ils ne sont pas stylisés 
         Ajoutez ceci si vous ne voulez pas modifier le fichier UserForm.tsx directement
      */}
      <style jsx global>{`
        .user-form-wrapper input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #cbd5e1; /* Gris plus foncé pour la bordure */
          border-radius: 0.5rem;
          background-color: #f8fafc;
          color: #0f172a;
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s;
        }
        .user-form-wrapper input:focus {
          border-color: #2563eb; /* Bleu au focus */
          background-color: #fff;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .user-form-wrapper button[type="submit"] {
          width: 100%;
          background-color: #2563eb;
          color: white;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-weight: 600;
          font-size: 0.875rem;
        }
        .user-form-wrapper button[type="submit"]:hover {
          background-color: #1d4ed8;
        }
      `}</style>
    </div>
  );
}
