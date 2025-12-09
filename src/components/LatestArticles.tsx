"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Tag, BookOpen, Calendar } from "lucide-react";

// Imports Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

// Styles Swiper
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// --- VOS DONNÉES ---
const rawData = {
  articles: {
    education: {
      title: "L’Initiation (Lutende) chez le Peuple Lega",
      underTitle: "Un Rite de Passage Sacré",
      description:
        "Le Lutende n’est pas simplement un événement, mais un processus sacré et éducatif. Il symbolise l’intégration de l’individu dans la société adulte, avec ses droits et ses devoirs. Ce rite vise à former des citoyens respectueux des traditions.",
      content: {
        section: "Les Étapes du Lutende...",
        section1: "La Cérémonie...",
      },
      imgSource: "/images/initiation.jpeg",
    },
    spiritualite: {
      title: "La Spiritualité chez le Peuple Lega",
      underTitle: "Les Racines du Sacré",
      description:
        "Découvrez la spiritualité ancestrale des Léga, où la nature et le divin se rencontrent. Une exploration des croyances qui fondent notre identité et notre rapport au monde.",
      content: {
        section: "Introduction à la spiritualité...",
        section1: "Les pratiques rituelles...",
      },
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

// Fonction utilitaire pour la catégorie (Pour cohérence)
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

// --- Transformation des données ---
const articlesList = Object.entries(rawData.articles).map(
  ([key, value], index) => {
    const fakeDate = new Date();
    fakeDate.setDate(fakeDate.getDate() - index * 7);
    const formattedDate = fakeDate.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    return {
      id: key,
      slug: key,
      title: value.title,
      category: getCategory(key), // Utilisation de la catégorie générique
      excerpt: value.description,
      image: value.imgSource,
      date: formattedDate,
    };
  }
);

export default function LatestArticles() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900 overflow-hidden">
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
              <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-foreground tracking-tight">
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
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-xl">
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
              className="group flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors"
            >
              Voir la bibliothèque
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>

        {/* --- LE CARROUSEL SWIPER --- */}
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
            loop={true}
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
            {articlesList.map((article) => (
              <SwiperSlide key={article.id} className="h-full py-4">
                <article className="group flex flex-col h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700">
                  {/* Image */}
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

                  {/* Contenu */}
                  <div className="flex flex-col flex-grow p-6">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <BookOpen size={14} className="mr-2 text-accent" />
                      <span className="uppercase text-xs tracking-wider font-semibold text-accent">
                        Article
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/news/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 flex-grow">
                      {article.excerpt}
                    </p>

                    <Link
                      href={`/news/${article.slug}`}
                      className="inline-flex items-center text-primary font-semibold text-sm hover:text-accent transition-colors mt-auto"
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

        {/* Bouton Mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link href="/news">
            <button className="px-8 py-3 rounded-full border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
              Voir la bibliothèque
            </button>
          </Link>
        </div>
      </div>

      {/* Styles globaux pour la pagination */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background-color: var(--accent);
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background-color: var(--primary);
          opacity: 1;
          width: 20px;
          border-radius: 5px;
          transition: width 0.3s;
        }
      `}</style>
    </section>
  );
}
