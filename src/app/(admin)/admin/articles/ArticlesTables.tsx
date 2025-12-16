"use client";

import { Article, Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";

// On définit un type plus précis pour les articles avec leurs relations
type ArticleWithRelations = Article & {
  category: Category;
  author: {
    id: string;
    name: string | null;
  };
};

interface ArticlesTableProps {
  articles: ArticleWithRelations[];
}

export default function ArticlesTable({ articles }: ArticlesTableProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      router.refresh(); // Rafraîchit la page pour mettre à jour la liste
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Titre</th>
            <th className="text-left p-2">Auteur</th>
            <th className="text-left p-2">Catégorie</th>
            <th className="text-left p-2">Statut</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} className="border-b hover:bg-gray-50">
              <td className="p-2">{article.title}</td>
              <td className="p-2">{article.author.name}</td>
              <td className="p-2">{article.category.name}</td>
              <td className="p-2">{article.published ? 'Publié' : 'Brouillon'}</td>
              <td className="p-2 flex items-center space-x-2">
                <Link href={`/admin/articles/edit/${article.id}`} className="text-blue-600 hover:text-blue-800">
                  <Edit size={18} />
                </Link>
                <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-800">
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