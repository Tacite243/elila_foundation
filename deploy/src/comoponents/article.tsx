"use client";

import { useEffect, useState } from "react";
import ArticleFormat from "./articleFormat";

// Définir le type de données pour un article
interface ArticleData {
  title: string;
  underTitle: string;
  description: string;
  content: { section: string; section1: string; };
  imgSource: string;
}

// Définir le type des données dans le fichier JSON
interface ArticlesResponse {
  articles: Record<string, ArticleData>;
}

export default function Article({ articleKey }: { articleKey: string }) {
  const [articleData, setArticleData] = useState<ArticleData | null>(null);

  useEffect(() => {
    const fetchArticleData = async () => {
      try {
        // Typage des données récupérées depuis le JSON
        const response = await fetch("/data.json");
        const data: ArticlesResponse = await response.json();

        // Vérification de l'existence de l'article correspondant
        if (data.articles && data.articles[articleKey]) {
          setArticleData(data.articles[articleKey]);
        } else {
          console.error("Article non trouvé pour la clé :", articleKey);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };
    fetchArticleData();
  }, [articleKey]);

  if (!articleData) return <div>Chargement...</div>;

  return (
    <ArticleFormat
      title={articleData.title}
      underTitle={articleData.underTitle}
      description={articleData.description}
      content={articleData.content}
      imgSource={articleData.imgSource}
    />
  );
}
