"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  User,
  Tag,
  Quote,
  Bookmark,
} from "lucide-react";

// --- TYPES & DONNÉES (Inchangés) ---
interface ArticleData {
  title: string;
  underTitle: string;
  category: string;
  date: string;
  author: string;
  description: string;
  content: string;
  imgSource: string;
}

interface RawData {
  articles: {
    [key: string]: ArticleData;
  };
}

const rawData: RawData = {
  articles: {
    education: {
      title: "L’Initiation (Lutende) chez le Peuple Lega",
      underTitle: "Un Rite de Passage Sacré",
      category: "Culture",
      date: "2023-10-15",
      author: "Prof. Masudi",
      description:
        "Le Lutende n’est pas simplement un événement, mais un processus sacré et éducatif. Il symbolise l’intégration de l’individu dans la société adulte.",
      content: `
        <p>Le Lutende n’est pas simplement un événement, mais un processus sacré et éducatif. Il symbolise l’intégration de l’individu dans la société adulte, avec ses droits et ses devoirs. Ce rite vise à former des citoyens respectueux des traditions, prêts à assumer leur rôle au sein de la communauté.</p>
        <h3>Les Étapes du Lutende</h3>
        <p>L'initiation se déroule en plusieurs phases distinctes, chacune marquant une étape dans l'évolution spirituelle et sociale de l'initié. Tout commence par la séparation, où les jeunes sont retirés de leur famille pour vivre en isolement dans la forêt sacrée.</p>
        <blockquote>Le savoir ne se donne pas, il se conquiert à travers l'épreuve et le silence de la forêt.</blockquote>
        <p>Ensuite vient la phase liminaire, une période d'enseignement intensif. Les anciens transmettent les proverbes, les lois du Bwami et les techniques de survie. C'est une école de la vie où la discipline et le respect sont les maîtres mots.</p>
        <h3>La Cérémonie de Retour</h3>
        <p>Le retour au village est marqué par de grandes festivités. Les initiés, désormais considérés comme des hommes à part entière, sont accueillis par des danses et des chants.</p>
      `,
      imgSource: "/images/initiation.jpeg",
    },
    // ... autres articles (gardez vos données ici)
    spiritualite: {
      title: "La Spiritualité chez le Peuple Lega",
      underTitle: "Les Racines du Sacré",
      category: "Culture",
      date: "2023-09-20",
      author: "Mme. Kabungulu",
      description: "Découvrez la spiritualité ancestrale des Léga...",
      content: `
          <p>La spiritualité Lega est profondément ancrée dans la nature. Pour le peuple Lega, le divin n'est pas distant ; il réside dans les montagnes, les rivières et les forêts de Mwenga et Shabunda.</p>
          <h3>Le Culte des Ancêtres</h3>
          <p>Au cœur de cette spiritualité se trouve le lien avec les ancêtres. Ils ne sont pas morts, mais passés dans l'invisible. Ils veillent sur la communauté, bénissent les récoltes et protègent la famille.</p>
        `,
      imgSource: "/images/cta-bg.jpg",
    },
  },
};

const calculateReadingTime = (text: string) => {
  if (!text) return "1 min";
  const wordsPerMinute = 200;
  const words = text.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
};

export default function ArticleDetail() {
  const params = useParams();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const article = useMemo(() => {
    if (!slug) return null;
    return rawData.articles[slug] || null;
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <h1 className="text-4xl font-bold text-primary dark:text-white mb-4">
          Article non trouvé
        </h1>
        <Link href="/news" className="text-accent hover:underline">
          Retour aux actualités
        </Link>
      </div>
    );
  }

  const readingTime = calculateReadingTime(
    (article.content || "") + (article.description || "")
  );

  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-950 font-sans selection:bg-accent/30">
      {/* 1. BARRE DE PROGRESSION (Plus discrète et collée au header) */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent origin-left z-[100]"
        style={{ scaleX }}
      />

      {/* 2. HEADER DE L'ARTICLE (Parallaxe & Moderne) */}
      <div className="relative h-[85vh] w-full overflow-hidden flex items-end pb-20">
        {/* Image de fond avec effet parallaxe simulé */}
        <div className="absolute inset-0 z-0">
          <Image
            src={article.imgSource}
            alt={article.title}
            fill
            priority
            className="object-cover brightness-50"
          />
          {/* Dégradé subtil en bas pour la lisibilité */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/30" />
        </div>

        {/* Contenu du Header */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            {/* Fil d'ariane & Badge */}
            <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
              <Link
                href="/news"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <ArrowLeft size={16} /> Retour
              </Link>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span className="text-accent uppercase tracking-wider">
                {article.category}
              </span>
            </div>

            {/* Titre Impactant */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            {/* Sous-titre */}
            <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl">
              {article.underTitle}
            </p>

            {/* Métadonnées Auteur & Temps */}
            <div className="flex items-center gap-6 pt-4 border-t border-white/10 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {article.author}
                  </p>
                  <p className="text-gray-400 text-xs">Auteur</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-gray-300 text-sm flex gap-6">
                <span className="flex items-center gap-2">
                  <Calendar size={16} />{" "}
                  {new Date(article.date).toLocaleDateString("fr-FR", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} /> {readingTime}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. CONTENU PRINCIPAL */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 -mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Colonne de Gauche : Contenu (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="lg:col-span-8"
        >
          <div className="bg-white dark:bg-gray-900 rounded-t-3xl lg:rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 border border-gray-100 dark:border-gray-800">
            {/* Introduction mise en avant */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-serif leading-relaxed mb-10 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
              {article.description}
            </p>

            {/* Contenu HTML stylisé */}
            <div
              className="
                        prose prose-lg md:prose-xl dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:text-primary dark:prose-headings:text-white prose-headings:tracking-tight
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-8
                        prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-serif prose-blockquote:not-italic
                        prose-strong:text-primary dark:prose-strong:text-accent
                        prose-a:text-accent hover:prose-a:text-primary transition-colors
                        prose-img:rounded-2xl prose-img:shadow-lg
                    "
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags & Partage */}
            <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap gap-2">
                {["Culture", "Lega", "Tradition"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white transition-all">
                  <Bookmark size={20} />
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-all font-medium shadow-lg shadow-primary/20">
                  <Share2 size={18} />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Colonne de Droite : Sidebar (4 cols) */}
        <div className="lg:col-span-4 space-y-8 lg:pt-12">
          {/* Widget Auteur */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 sticky top-32">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              À propos de l&apos;auteur
            </h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex-shrink-0 overflow-hidden">
                {/* Placeholder avatar */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <User size={32} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-primary dark:text-white text-lg">
                  {article.author}
                </h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Expert en culture Lega
                </p>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
              Passionné par l&apos;histoire et les traditions, l&apos;auteur
              partage ici ses recherches approfondies sur le patrimoine de la
              région des Grands Lacs.
            </p>
            <button className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm">
              Voir son profil
            </button>
          </div>

          {/* Widget Articles Similaires (Simulation) */}
          <div className="bg-gradient-to-br from-primary to-blue-900 rounded-2xl p-6 shadow-lg text-white">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Quote size={18} className="text-accent" />À lire aussi
            </h3>
            <ul className="space-y-4">
              <li className="group cursor-pointer">
                <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                  Spiritualité
                </span>
                <h4 className="font-medium group-hover:text-accent transition-colors mt-1">
                  Le rôle du Kindi dans la société moderne
                </h4>
              </li>
              <li className="border-t border-white/10 my-2"></li>
              <li className="group cursor-pointer">
                <span className="text-xs text-accent font-semibold uppercase tracking-wider">
                  Histoire
                </span>
                <h4 className="font-medium group-hover:text-accent transition-colors mt-1">
                  Les origines migratoires du peuple Lega
                </h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}
