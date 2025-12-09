import ArticleForm from "../ArticleForm";
import prisma from "@/lib/prisma";


// Cette page est un Server Component, elle pré-charge les catégories
export default async function CreateArticlePage() {
    const categories = await prisma.category.findMany({
        orderBy: {
            name: 'asc'
        }
    })
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Créer un nouvel article</h1>
            {/* On passe les catégories au formulaire client */}
            <ArticleForm categories={categories} />
        </div>
    );
}