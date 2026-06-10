"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  Calendar,
  Tag,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowUpDown,
  BookOpen,
} from "lucide-react";

// Imports Redux
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPublicArticles } from "@/redux/slices/articlesSlice";

const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
  const dispatch = useDispatch<AppDispatch>();

  // 1. Récupération des articles réels depuis votre Store Redux
  const { publicItems: articles, publicStatus } = useSelector(
    (state: RootState) => state.articles
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [currentPage, setCurrentPage] = useState(1);

  // 2. Récupération des données au chargement
  useEffect(() => {
    if (publicStatus === "idle") {
      dispatch(fetchPublicArticles());
    }
  }, [dispatch, publicStatus]);

  // Génération dynamique des filtres de catégories basés sur les données réelles
  const categories = useMemo(() => {
    const list = articles
      .map((a) => a.category?.name)
      .filter((name): name is string => !!name);
    return ["Tous", ...Array.from(new Set(list))];
  }, [articles]);

  // 3. Filtrage et Tri en mémoire (optimisé avec useMemo)
  const filteredArticles = useMemo(() => {
    let result = [...articles];

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
        (article) => article.category?.name === selectedCategory
      );
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [articles, searchTerm, selectedCategory, sortOrder]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const currentArticles = filteredArticles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, sortOrder]);

  return (
    <section className="min-h-screen bg-background transition-colors duration-300 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* EN-TÊTE DE LA PAGE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-secondary tracking-tight">
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
          <p className="mt-6 text-lg text-foreground/75 max-w-2xl mx-auto font-medium">
            Restez informé des dernières actions de la Fondation Elila,
            découvrez nos articles culturels et suivez nos projets sur le
            terrain.
          </p>
        </motion.div>

        {/* BARRE D'OUTILS (Recherche, Filtres et Tri) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl shadow-lg p-6 mb-12 border border-border sticky top-24 z-30"
        >
          <div className="flex flex-col lg:flex-row gap-6 justify-between items-center">
            {/* Zone de recherche */}
            <div className="relative w-full lg:w-1/3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/45 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-foreground/40 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
              />
            </div>

            {/* Catégories (barre de défilement horizontal propre) */}
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-primary text-[#FAF9F6] dark:bg-secondary dark:text-[#1E2749] shadow-md"
                      : "bg-background text-foreground/70 border border-border hover:bg-foreground/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tri par ordre chronologique */}
            <div className="flex items-center gap-2 min-w-max">
              <span className="text-sm text-foreground/60 hidden sm:inline font-medium">
                Trier par :
              </span>
              <button
                onClick={() =>
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                }
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground/80 hover:border-primary dark:hover:border-secondary transition-all font-semibold"
              >
                <ArrowUpDown size={16} />
                <span className="text-sm">
                  {sortOrder === "desc" ? "Récent" : "Ancien"}
                </span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- ÉTAT DE CHARGEMENT PAR SQUELETTE (Skeleton Loading) --- */}
        {publicStatus === "loading" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm animate-pulse"
              >
                <div className="h-56 bg-foreground/10 w-full relative">
                  <div className="absolute top-4 left-4 h-6 bg-foreground/20 rounded-full w-20"></div>
                </div>
                <div className="flex flex-col flex-grow p-6 space-y-4">
                  <div className="h-4 bg-foreground/10 rounded-md w-1/3"></div>
                  <div className="space-y-2">
                    <div className="h-5 bg-foreground/15 rounded-md w-11/12"></div>
                    <div className="h-5 bg-foreground/15 rounded-md w-2/3"></div>
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-foreground/10 rounded-md w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded-md w-4/5"></div>
                  </div>
                  <div className="pt-4 mt-auto">
                    <div className="h-4 bg-foreground/20 rounded-md w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : currentArticles.length > 0 ? (
          /* --- RENDU DE LA GRILLE D'ARTICLES RÉELS --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {currentArticles.map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border h-full"
                >
                  {/* Image & Badge de catégorie */}
                  <Link
                    href={`/news/${article.slug}`}
                    className="relative h-56 w-full overflow-hidden block"
                  >
                    <Image
                      src={article.image || "/images/placeholder.jpg"}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-primary/95 text-[#FAF9F6] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm shadow-sm">
                      <Tag size={12} />
                      <span className="truncate max-w-[150px]">
                        {article.category?.name || "Culture"}
                      </span>
                    </div>
                  </Link>

                  {/* Corps de l'article */}
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center text-sm text-[#C5A265] mb-3 font-semibold">
                      <Calendar size={14} className="mr-2" />
                      {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Affichage dynamique du temps de lecture de l'article */}
                    {article.readTime && (
                      <p className="text-xs text-primary dark:text-secondary font-bold uppercase tracking-wider mb-3">
                        {article.readTime} de lecture
                      </p>
                    )}

                    <p className="text-foreground/75 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center text-primary dark:text-secondary font-bold text-sm transition-colors mt-auto"
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
          /* --- RENDU SI AUCUN RÉSULTAT DE RECHERCHE --- */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-card rounded-3xl border border-border"
          >
            <Filter className="h-16 w-16 mx-auto text-foreground/20 mb-4" />
            <h3 className="text-xl font-bold text-foreground">
              Aucun résultat
            </h3>
            <p className="text-foreground/60 mt-2 font-medium">
              Aucun article ne correspond à vos critères de recherche.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("Tous");
              }}
              className="mt-6 px-6 py-2.5 bg-primary text-[#FAF9F6] dark:bg-secondary dark:text-[#1E2749] font-bold rounded-full hover:scale-105 transition-all duration-300"
            >
              Réinitialiser les filtres
            </button>
          </motion.div>
        )}

        {/* COMPOSANT DE PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full border border-border text-foreground/80 hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-full font-bold transition-all duration-200 ${
                      currentPage === page
                        ? "bg-primary text-[#FAF9F6] dark:bg-secondary dark:text-[#1E2749] shadow-md scale-110"
                        : "bg-card text-foreground/80 border border-border hover:bg-foreground/5"
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
              className="p-2 rounded-full border border-border text-foreground/80 hover:bg-foreground/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* Raccords CSS natifs pour masquer la scrollbar de Swiper ou de la liste horizontale */}
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