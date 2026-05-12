"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setArticles,
  deleteArticle,
  ArticleWithRelations,
} from "@/redux/slices/articlesSlice";
import Link from "next/link";
import { Edit, Trash2, Eye, CheckCircle, XCircle, X } from "lucide-react";
import ArticleForm from "./ArticleForm";
import { Category } from "@prisma/client";



interface ArticleManagerProps {
  initialArticles: ArticleWithRelations[];
  categories: Category[];
}

export default function ArticleManager({
  initialArticles,
  categories,
}: ArticleManagerProps) {
  const dispatch = useDispatch<AppDispatch>();
  const {
    items: articles,
    status,
    mutationStatus,
  } = useSelector((state: RootState) => state.articles);
  const [editingArticle, setEditingArticle] = useState<ArticleWithRelations | null>(null);

  useEffect(() => {
    dispatch(setArticles(initialArticles));
  }, [dispatch, initialArticles]);

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      dispatch(deleteArticle(id));
    }
  };

  if (status === "loading")
    return (
      <div className="p-8 text-center text-slate-500 animate-pulse">
        Chargement des articles...
      </div>
    );

  if (articles.length === 0)
    return (
      <div className="p-12 text-center text-slate-500 bg-slate-50 rounded-lg border border-slate-200">
        Aucun article trouvé. Commencez par en créer un !
      </div>
    );

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Titre</th>
                <th className="px-6 py-4">Catégorie</th>
                <th className="px-6 py-4">Auteur</th>
                <th className="px-6 py-4 text-center">Statut</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {articles.map((article) => (
                <tr
                  key={article.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div
                      className="font-medium text-slate-900 line-clamp-1"
                      title={article.title}
                    >
                      {article.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-1 font-mono">
                      {article.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {article.category?.name || "Non classé"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {article.author?.name || "Inconnu"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {article.published ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                        <CheckCircle size={12} /> Publié
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-100">
                        <XCircle size={12} /> Brouillon
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/news/${article.slug}`}
                        target="_blank"
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Voir"
                      >
                        <Eye size={18} />
                      </Link>
                      <button
                        onClick={() => setEditingArticle(article)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Modifier"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(article.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        disabled={mutationStatus === "loading"}
                        title="Supprimer"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* MODALE D'ÉDITION */}
      {editingArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl my-8 relative flex flex-col max-h-[90vh]">

            {/* Header de la modale */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10 rounded-t-2xl">
              <h2 className="text-xl font-bold text-slate-800">Modifier l&apos;article</h2>
              <button
                onClick={() => setEditingArticle(null)}
                className="p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Contenu de la modale (Le formulaire scroll à l'intérieur) */}
            <div className="overflow-y-auto p-2">
              <ArticleForm
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                initialData={editingArticle as any}
                categories={categories}
                onClose={() => setEditingArticle(null)} // On passe la fonction pour fermer
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
