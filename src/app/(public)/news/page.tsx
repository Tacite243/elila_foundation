import prisma from "@/lib/prisma";
import NewsPageClient from "@/components/NewsPageClient";

export const revalidate = 300; 

export default async function NewsPage() {
  // Récupération instantanée côté serveur
  const articles = await prisma.article.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
    include: {
      category: { select: { name: true } },
      author: { select: { name: true } }
    }
  });

  const serializedArticles = articles.map(article => ({
    ...article,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
  }));

  return <NewsPageClient initialArticles={serializedArticles} />;
}