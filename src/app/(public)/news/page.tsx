"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
} from "lucide-react";

// --- 1. VOS DONNÉES ---
const rawData = {
  articles: {
    education: {
      title: "L’Initiation (Lutende) chez le Peuple Lega",
      underTitle: "Un Rite de Passage Sacré",
      description:
        "Le Lutende n’est pas simplement un événement, mais un processus sacré et éducatif. Il symbolise l’intégration de l’individu dans la société adulte, avec ses droits et ses devoirs. Ce rite vise à former des citoyens respectueux des traditions.",
      content: { section: "...", section1: "..." },
      imgSource: "/images/initiation.jpeg",
    },
    spiritualite: {
      title: "La Spiritualité chez le Peuple Lega",
      underTitle: "Les Racines du Sacré",
      description:
        "Découvrez la spiritualité ancestrale des Léga, où la nature et le divin se rencontrent. Une exploration des croyances qui fondent notre identité et notre rapport au monde.",
      content: { section: "...", section1: "..." },
      imgSource: "/images/cta-bg.jpg",
    },
    mariage: {
      title: "Le Mariage Coutumier",
      underTitle: "Alliance et Tradition",
      description:
        "Le mariage chez les Lega dépasse l'union de deux êtres : c'est l'alliance de deux familles et la pérennisation des valeurs claniques à travers des rituels précis.",
      content: {},
      imgSource: "/images/nuptiae.jpg",
    },
    art: {
      title: "L'Art et les Masques Lega",
      underTitle: "Expression Culturelle",
      description:
        "Les masques Lega ne sont pas de simples objets décoratifs. Ils sont les vecteurs d'enseignements philosophiques et moraux transmis au sein du Bwami.",
      content: {},
      imgSource:
        "/images/primary_Android_media_com.whatsapp.w4b_WhatsApp Business_Media_.Statuses_e181cde98a0c418b8a665f79293db56e.jpg",
    },
    territoire: {
      title: "Nos Terres Ancestrales",
      underTitle: "Géographie et Histoire",
      description:
        "Voyage au cœur de Mwenga, Shabunda et Pangi. Comprendre le lien viscéral qui unit le peuple Lega à ses forêts et ses montagnes.",
      content: {},
      imgSource: "/images/nature.jpg",
    },
  },
};

// --- 2. TRANSFORMATION DES DONNÉES ---

// Fonction pour grouper les articles par grandes catégories pour le filtre
const getCategory = (key: string) => {
  switch (key) {
    case "education":
    case "spiritualite":
      return "Culture";
    case "mariage":
      return "Société";
    case "art":
      return "Art";
    case "territoire":
      return "Histoire";
    default:
      return "Divers";
  }
};

const articlesList = Object.entries(rawData.articles).map(
  ([key, value], index) => {
    // Simulation de dates décroissantes pour le tri
    const fakeDate = new Date();
    fakeDate.setDate(fakeDate.getDate() - index * 5);

    return {
      id: key,
      slug: key,
      title: value.title,
      category: getCategory(key), // Catégorie générique (Culture, Art...)
      subtitle: value.underTitle, // Sous-titre spécifique
      excerpt: value.description,
      image: value.imgSource,
      date: fakeDate.toISOString().split("T")[0],
    };
  }
);

const ITEMS_PER_PAGE = 6;

// --- 3. COMPOSANT PAGE ---
export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    "Tous",
    ...Array.from(new Set(articlesList.map((a) => a.category))),
  ];

  const filteredArticles = useMemo(() => {
    let result = [...articlesList];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (article) =>
          article.title.toLowerCase().includes(lowerTerm) ||
          article.excerpt.toLowerCase().includes(lowerTerm)
      );
    }

    if (selectedCategory !== "Tous") {
      result = result.filter(
        (article) => article.category === selectedCategory
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [searchTerm, selectedCategory, sortOrder]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* EN-TÊTE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-primary-foreground tracking-tight">
              Actualités & Ressources
            </h1>
            <motion.div
              className="absolute -bottom-3 left-0 h-1.5 w-full origin-left"
              style={{
                background:
                  "linear-gradient(to right, #007BFF 40%, #FFC107 40%, #FFC107 70%, #DC3545 70%)",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            />
          </div>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Restez informé des dernières actions de la Fondation Elila,
            découvrez nos articles culturels et suivez nos projets sur le
            terrain.
          </p>
        </motion.div>

        {/* BARRE D'OUTILS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-12 border border-gray-100 dark:border-gray-700 sticky top-24 z-30"
        >
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            {/* Recherche */}
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Catégories (Scrollbar cachée) */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tri */}
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-sm text-gray-500 dark:text-gray-400 hidden sm:inline">
                Trier :
              </span>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:border-primary hover:text-primary transition-all"
              >
                <ArrowUpDown size={16} />
                <span className="text-sm font-medium">
                  {sortOrder === "desc" ? "Récent" : "Ancien"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* GRILLE D'ARTICLES */}
        {currentArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {currentArticles.map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 h-full"
                >
                  <Link
                    href={`/news/${article.slug}`}
                    className="relative h-56 w-full overflow-hidden block"
                  >
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm">
                      <Tag size={12} />
                      <span className="truncate max-w-[150px]">
                        {article.category}
                      </span>
                    </div>
                  </Link>

                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-accent" />
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Affichage du sous-titre */}
                    <p className="text-sm text-primary font-medium mb-2">
                      {article.subtitle}
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 flex-grow">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center text-primary font-semibold text-sm hover:text-accent transition-colors mt-auto"
                    >
                      Lire l&apos;article
                      <ChevronRight
                        size={16}
                        className="ml-1 transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl"
          >
            <Filter className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Aucun résultat
            </h3>
            <p className="text-gray-500 mt-2">
              Aucun article ne correspond à vos critères.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Tous");
              }}
              className="mt-6 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Réinitialiser
            </button>
          </motion.div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-medium transition-all ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-md scale-110"
                        : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-full border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
