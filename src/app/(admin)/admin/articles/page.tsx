import ArticleManager from "./ArticleManager";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { Plus, FileText, AlertTriangle } from "lucide-react";
import { Article, Category, User } from "@prisma/client";

// La page qui liste tous les articles (Server Component)
interface SerializableArticle extends Omit<Article, "createdAt" | "updatedAt"> {
  category: Category;
  author: { name: string | null; id: string };
  createdAt: string;
  updatedAt: string;
}

export default async function ArticlesPage() {
  let serializableArticles: SerializableArticle[] = [];
  let error: string | null = null;
  let categories: Category[] = [];

  try {
    // 1. Tentative de chargement des données (Articles ET Catégories en parallèle pour la performance)
    const [articlesFromDb, categoriesFromDb] = await Promise.all([
      prisma.article.findMany({
        include: {
          category: true,
          author: { select: { name: true, id: true } },
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      prisma.category.findMany({ // NOUVEAU : Récupération des catégories
        orderBy: { name: "asc" }
      })
    ]);

    // 2. Sérialisation des données
    serializableArticles = articlesFromDb.map((article) => ({
      ...article,
      createdAt: article.createdAt.toISOString(),
      updatedAt: article.updatedAt.toISOString(),
    }));

    categories = categoriesFromDb; // NOUVEAU : Assignation des catégories

  } catch (e) {
    console.error("Erreur de connexion BDD:", e);
    // On capture l'erreur pour l'afficher proprement sans crasher la page
    error =
      "Impossible de se connecter à la base de données. Vérifiez votre connexion internet ou le statut du serveur.";
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 text-slate-800">
      <div className="max-w-7xl mx-auto">
        {/* EN-TÊTE */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
              <FileText className="text-blue-600" size={32} />
              Gestion des Articles
            </h1>
            <p className="text-slate-500 mt-1">
              Consultez, modifiez ou ajoutez des actualités pour le site.
            </p>
          </div>

          <Link
            href="/admin/articles/create"
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={20} />
            Créer un article
          </Link>
        </div>

        {/* CONTENU */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden min-h-[400px]">
          {error ? (
            // Affichage de l'erreur si la BDD est inaccessible
            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="text-red-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                Erreur de chargement
              </h3>
              <p className="text-slate-500 max-w-md">{error}</p>
            </div>
          ) : (
            // Affichage du gestionnaire d'articles si tout va bien
            <div className="p-6">
              {/* On passe les données au composant client */}
              <ArticleManager
                initialArticles={serializableArticles}
                categories={categories}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
