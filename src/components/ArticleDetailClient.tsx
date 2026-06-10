"use client";

import React, { useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, User, Quote, Bookmark } from "lucide-react";
import type { PublicArticle } from "@/redux/slices/articlesSlice";



interface ArticleDetailClientProps {
  article: PublicArticle;
}

const calculateReadingTime = (text: string) => {
  if (!text) return "1 min";
  const wordsPerMinute = 200;
  const words = text.replace(/<[^>]*>?/gm, "").split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
};

export default function ArticleDetailClient({ article }: ArticleDetailClientProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const formattedDate = useMemo(() => {
    if (!article.createdAt) return "";
    return new Date(article.createdAt).toLocaleDateString("fr-FR", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [article.createdAt]);

  const readingTime = useMemo(() => {
    if (article.readTime) {
      return article.readTime.includes("min") ? article.readTime : `${article.readTime} min`;
    }
    return calculateReadingTime((article.content || "") + (article.excerpt || ""));
  }, [article]);

  return (
    <article className="min-h-screen bg-background font-sans selection:bg-secondary/30 transition-colors duration-300">
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-secondary origin-left z-100" style={{ scaleX }} />

      <div className="relative h-[85vh] w-full overflow-hidden flex items-end pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src={article.image || "/images/placeholder.jpg"}
            alt={article.title}
            fill
            sizes="100vw"
            priority
            className="object-cover brightness-[0.45]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-black/40" />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-sm font-medium text-gray-300">
              <Link href="/news" className="hover:text-white transition-colors flex items-center gap-1 font-semibold">
                <ArrowLeft size={16} /> Retour
              </Link>
              <span className="w-1 h-1 bg-gray-500 rounded-full" />
              <span className="text-secondary uppercase tracking-wider font-bold">
                {article.category?.name || "Culture"}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-6 pt-4 border-t border-white/10 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white border border-white/20">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-white text-sm font-bold">{article.author?.name || "Fondation Elila"}</p>
                  <p className="text-gray-300 text-xs">Rédacteur</p>
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="text-gray-200 text-sm flex gap-6 font-semibold">
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-secondary" /> {formattedDate}
                </span>
                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-secondary" /> {readingTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 -mt-20 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
        <div className="lg:col-span-8">
          <div className="bg-card rounded-3xl shadow-xl p-8 md:p-12 lg:p-16 border border-border">
            <p className="text-xl md:text-2xl text-foreground/80 font-serif leading-relaxed mb-10 first-letter:text-5xl first-letter:font-bold first-letter:text-primary dark:first-letter:text-secondary first-letter:mr-3 first-letter:float-left">
              {article.excerpt}
            </p>

            <div
              className="
                prose prose-lg md:prose-xl dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-primary dark:prose-headings:text-secondary prose-headings:tracking-tight
                prose-p:text-foreground/80 prose-p:leading-8
                prose-blockquote:border-l-4 prose-blockquote:border-secondary prose-blockquote:bg-foreground/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:font-serif prose-blockquote:not-italic
                prose-strong:text-primary dark:prose-strong:text-secondary
                prose-a:text-secondary hover:prose-a:text-primary transition-colors
                prose-img:rounded-2xl prose-img:shadow-lg
              "
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap gap-2">
                {["Culture", "Lega", "Tradition"].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-background border border-border text-foreground/75 text-sm font-semibold hover:bg-primary/10 dark:hover:bg-secondary/10 hover:text-primary dark:hover:text-secondary transition-colors cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="p-3 rounded-full bg-background border border-border text-foreground/80 hover:bg-foreground/5 transition-all">
                  <Bookmark size={20} />
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-[#FAF9F6] dark:bg-secondary dark:text-[#1E2749] hover:scale-105 transition-all duration-300 font-bold shadow-lg shadow-primary/20">
                  <Share2 size={18} /> Partager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8 lg:pt-12">
          <div className="bg-card rounded-2xl p-6 shadow-lg border border-border sticky top-32">
            <h3 className="text-lg font-bold text-foreground mb-4">À propos de l&apos;auteur</h3>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-background border border-border shrink-0 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-foreground/40">
                  <User size={32} />
                </div>
              </div>
              <div>
                <h4 className="font-bold text-primary dark:text-secondary text-lg leading-tight">
                  {article.author?.name || "Fondation Elila"}
                </h4>
                <p className="text-sm text-foreground/50 mt-1">Expert en culture Lega</p>
              </div>
            </div>
            <p className="text-foreground/70 text-sm leading-relaxed mb-4">
              Passionné par l&apos;histoire et les traditions, le rédacteur partage ici des recherches approfondies.
            </p>
            <button className="w-full py-2.5 rounded-xl border border-border text-foreground/80 font-bold hover:bg-foreground/5 transition-colors text-sm">
              Voir le profil
            </button>
          </div>

          <div className="bg-linear-to-br from-primary to-[#0B0E17] dark:from-[#131826] dark:to-[#0B0E17] rounded-2xl p-6 shadow-lg text-[#FAF9F6] border border-border/10">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">À lire aussi</h3>
            <ul className="space-y-4 font-medium">
              <li className="group cursor-pointer">
                <span className="text-xs text-secondary font-bold uppercase tracking-wider">Spiritualité</span>
                <h4 className="group-hover:text-secondary transition-colors mt-1">Le rôle du Kindi dans la société moderne</h4>
              </li>
              <li className="border-t border-white/10 my-2"></li>
              <li className="group cursor-pointer">
                <span className="text-xs text-secondary font-bold uppercase tracking-wider">Histoire</span>
                <h4 className="group-hover:text-secondary transition-colors mt-1">Les origines migratoires du peuple Lega</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </article>
  );
}