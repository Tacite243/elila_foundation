"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag, BookOpen } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

// Imports Redux (liaison avec votre store et votre slice)
import { AppDispatch, RootState } from "@/redux/store";
import { fetchPublicArticles } from "@/redux/slices/articlesSlice";

// Imports Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Styles Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function LatestArticles() {
  const dispatch = useDispatch<AppDispatch>();
  
  // 1. Récupération des articles réels et de l'état de chargement depuis Redux
  const { publicItems: articles, publicStatus } = useSelector(
    (state: RootState) => state.articles
  );

  // 2. Déclenchement de la requête API au montage du composant
  useEffect(() => {
    if (publicStatus === "idle") {
      dispatch(fetchPublicArticles());
    }
  }, [dispatch, publicStatus]);

  // Fonction utilitaire pour formater la date renvoyée par la base de données
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return "";
    }
  };

  // 3. Écran de chargement par SQUELETTE (Skeleton)
  if (publicStatus === "loading") {
    return (
      <section className="py-20 sm:py-28 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* En-tête de section factice */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 animate-pulse">
            <div className="space-y-4 w-full max-w-xl">
              <div className="h-10 bg-foreground/10 rounded-lg w-1/2"></div>
              <div className="h-5 bg-foreground/10 rounded-lg w-3/4"></div>
            </div>
            <div className="hidden md:block h-6 bg-foreground/10 rounded-full w-36"></div>
          </div>

          {/* Grille de cartes squelettes réactives (1 sur mobile, 2 sur tablette, 3 sur desktop) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm animate-pulse"
              >
                {/* Emplacement de l'image */}
                <div className="h-56 bg-foreground/10 w-full relative">
                  {/* Badge de catégorie factice */}
                  <div className="absolute top-4 left-4 h-6 bg-foreground/20 rounded-full w-20"></div>
                </div>

                {/* Emplacement du texte */}
                <div className="flex flex-col flex-grow p-6 space-y-4">
                  {/* Date et Icone */}
                  <div className="h-4 bg-foreground/10 rounded-md w-1/3"></div>
                  
                  {/* Titre (sur deux lignes) */}
                  <div className="space-y-2">
                    <div className="h-5 bg-foreground/15 rounded-md w-11/12"></div>
                    <div className="h-5 bg-foreground/15 rounded-md w-2/3"></div>
                  </div>

                  {/* Extrait (sur trois lignes) */}
                  <div className="space-y-2 pt-2">
                    <div className="h-3 bg-foreground/10 rounded-md w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded-md w-full"></div>
                    <div className="h-3 bg-foreground/10 rounded-md w-4/5"></div>
                  </div>

                  {/* Lien de pied de page */}
                  <div className="pt-4 mt-auto">
                    <div className="h-4 bg-foreground/20 rounded-md w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // 4. Écran si la base de données est vide
  if (publicStatus === "succeeded" && articles.length === 0) {
    return (
      <section className="py-20 sm:py-28 bg-background transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center min-h-[250px] flex items-center justify-center">
          <p className="text-foreground/60 font-medium">Aucun article publié pour le moment.</p>
        </div>
      </section>
    );
  }

  return (
    // Utilisation des variables de fond (bg-background) de votre nouvelle charte graphique
    <section className="py-20 sm:py-28 bg-background transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <div className="inline-block relative">
              {/* Couleur adaptée (Bleu marine en clair / Doré en sombre) */}
              <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-secondary tracking-tight">
                Nos Articles Récents
              </h2>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 w-full origin-left"
                style={{
                  background:
                    "linear-gradient(to right, #007BFF 40%, #FFC107 40%, #FFC107 70%, #DC3545 70%)",
                }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
                viewport={{ once: true }}
              />
            </div>
            <p className="mt-6 text-lg text-foreground/70 max-w-xl font-medium">
              Explorez la richesse de la culture Lega à travers nos écrits, nos
              recherches et nos histoires.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <Link
              href="/news"
              className="group flex items-center gap-2 text-primary dark:text-secondary font-bold transition-colors"
            >
              Voir la bibliothèque
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* --- CARROUSEL DYNAMIQUE SWIPER --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            // Sécurité : n'active le loop infini que s'il y a assez d'articles pour remplir l'écran
            loop={articles.length >= 3} 
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="pb-16 px-2"
          >
            {articles.map((article) => (
              <SwiperSlide key={article.id} className="h-full py-4">
                {/* Cartes aux couleurs bg-card et border-border de votre charte */}
                <article className="group flex flex-col h-full bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-border">
                  
                  {/* Image de l'article avec repli (fallback) si l'image est manquante */}
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

                  {/* Contenu textuel */}
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center text-sm text-[#C5A265] mb-3 font-semibold">
                      <BookOpen size={14} className="mr-2" />
                      <span className="uppercase text-xs tracking-wider">
                        Article • {formatDate(article.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary dark:group-hover:text-secondary transition-colors">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-foreground/70 text-sm line-clamp-3 mb-6 flex-grow">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center text-primary dark:text-secondary font-bold text-sm transition-colors mt-auto"
                    >
                      Lire la suite
                      <ArrowRight
                        size={16}
                        className="ml-1 transition-transform group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Bouton pour appareils mobiles */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/news">
            <button className="px-8 py-3 rounded-full border-2 border-primary text-primary dark:border-secondary dark:text-secondary font-bold hover:bg-primary dark:hover:bg-secondary dark:hover:text-[#1E2749] hover:text-white transition-all duration-300">
              Voir la bibliothèque
            </button>
          </Link>
        </div>
      </div>

      {/* Raccordement de la pagination Swiper à votre couleur Or/Champagne */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: var(--accent);
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: var(--secondary);
          opacity: 1;
          width: 20px;
          border-radius: 5px;
          transition: width 0.3s;
        }
      `}</style>
    </section>
  );
}