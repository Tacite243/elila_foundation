import ArticleManager from "./ArticleManager";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { PlusCircle } from "lucide-react";


// La page qui liste tous les articles
export default async function ArticlesPage() {
    // 1. On charge les données brutes de la base de données.
    // Les champs de date sont des objets Date.
    const articlesFromDb = await prisma.article.findMany({
        include: {
            category: true,
            author: { select: { name: true, id: true } },
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    // 2. ✅ ON SÉRIALISE LES DONNÉES MANUELLEMENT
    // On transforme les objets Date en chaînes de caractères ISO.
    const serializableArticles = articlesFromDb.map(article => ({
        ...article,
        createdAt: article.createdAt.toISOString(),
        updatedAt: article.updatedAt.toISOString(),
    }));

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Gestion des Articles</h1>
                <Link
                    href="/admin/articles/create"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                    <PlusCircle size={20} className="mr-2" />
                    Créer un article
                </Link>
            </div>
            {/* 3. On passe les données correctement typées au composant client. */}
            <ArticleManager initialArticles={serializableArticles} />
        </div>
    );
}