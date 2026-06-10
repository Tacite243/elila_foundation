import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import ArticleDetailClient from "@/components/ArticleDetailClient";

// Régénère la page en arrière-plan toutes les 5 minutes maximum (ISR)
export const revalidate = 300;

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ArticleDetailPage({ params }: Props) {
  // Next.js 15 requiert d'attendre (await) la résolution des paramètres
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Récupération directe depuis la base de données sur le serveur (très rapide)
  const article = await prisma.article.findFirst({
    where: { slug, published: true },
    include: {
      category: { select: { name: true } },
      author: { select: { name: true } }
    }
  });

  if (!article) {
    notFound(); // Renvoie automatiquement vers votre page 404 Next.js
  }

  // Sérialisation des dates pour le passage du Serveur au Client
  const serializedArticle = {
    ...article,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  };

  return <ArticleDetailClient article={serializedArticle} />;
}