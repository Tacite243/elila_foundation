"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
    setArticles,
    deleteArticle,
    ArticleWithRelations,
} from "@/redux/slices/articlesSlice";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

interface ArticleManagerProps {
    initialArticles: ArticleWithRelations[];
}

export default function ArticleManager({ initialArticles }: ArticleManagerProps) {
    const dispatch = useDispatch<AppDispatch>();

    const { items: articles, status, mutationStatus } = useSelector(
        (state: RootState) => state.articles
    );

    useEffect(() => {
        dispatch(setArticles(initialArticles));
    }, [dispatch, initialArticles]);

    const handleDelete = (id: string) => {
        if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
            dispatch(deleteArticle(id));
        }
    };

    if (status === "loading") return <p>Chargement des articles...</p>;

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <table className="w-full text-sm text-left border border-gray-200">
                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                    <tr>
                        <th className="p-2">Titre</th>
                        <th className="p-2">Slug</th>
                        <th className="p-2">Catégorie</th>
                        <th className="p-2">Auteur</th>
                        <th className="p-2">Publié</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map((article) => (
                        <tr key={article.id} className="border-b hover:bg-gray-50">
                            <td className="p-2">{article.title}</td>
                            <td className="p-2 text-gray-500">{article.slug}</td>
                            <td className="p-2">{article.category?.name || "—"}</td>
                            <td className="p-2">{article.author?.name || "—"}</td>
                            <td className="p-2">
                                {article.published ? (
                                    <span className="text-green-600 font-semibold">Oui</span>
                                ) : (
                                    <span className="text-red-500 font-semibold">Non</span>
                                )}
                            </td>
                            <td className="p-2 flex items-center space-x-2">
                                <Link
                                    href={`/admin/articles/edit/${article.id}`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    <Edit size={18} />
                                </Link>
                                <button
                                    onClick={() => handleDelete(article.id)}
                                    className="text-red-600 hover:text-red-800 disabled:text-gray-400"
                                    disabled={mutationStatus === "loading"}
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
