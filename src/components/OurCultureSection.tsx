"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// --- Configuration des Animations ---
const gridContainerVariants: Variants = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
};

// --- Données sur la Culture ---
const cultureData = [
  {
    title: "Mariage",
    description:
      "Découvrez les valeurs coutumières du mariage au sein de notre communauté.",
    link: "/pages/articles/mariage",
  },
  {
    title: "Éducation (Initiation)",
    description:
      "Plongez au cœur de l'initiation, le *lutende*, un pilier de notre transmission.",
    link: "/pages/articles/education",
  },
  {
    title: "Spiritualité",
    description:
      "Chaque peuple possède sa propre spiritualité, découvrez celle de nos ancêtres.",
    link: "/pages/articles/spiritualite",
  },
  {
    title: "Histoire",
    description:
      "D'où viennent nos ancêtres ? Qui étaient-ils ? Explorez nos origines.",
    link: "/pages/articles/histoire",
  },
  {
    title: "Nos territoires",
    description:
      "Découvrez le pays du Mulega, les territoires où notre culture s'est ancrée.",
    link: "/pages/articles/territoire",
  },
  {
    title: "Notabilité chez les Balega",
    description:
      "Apprenez qui sont ceux qui portent les blasons de notre communauté.",
    link: "/pages/articles/notabilite",
  },
];

export default function OurCultureSection() {
  return (
    <section id="cards" className="py-20 sm:py-28 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-foreground tracking-tight">
              Notre Culture
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
          <p className="mt-8 text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Nous avons également pour mission d&apos;éduquer les jeunes sur les
            valeurs culturelles de notre communauté.
          </p>
        </motion.div>

        {/* Grille des Cartes Culture */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridContainerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cultureData.map(({ title, description, link }, index) => (
            <Link href={link} key={index} className="group block">
              <motion.div
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 h-full relative overflow-hidden
                           transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
                variants={cardVariants}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                viewport={{ once: true, amount: 0.3 }} // Ajout du viewport pour un déclenchement précis
              >
                <span
                  className="absolute top-8 right-8 text-6xl font-bold text-gray-200 dark:text-gray-700 z-0
                                 transition-colors duration-300 group-hover:text-primary/50"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-primary dark:text-primary-foreground mb-4">
                    {title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {description}
                  </p>
                  <div
                    className="flex items-center text-primary dark:text-accent font-semibold
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <span>En savoir plus</span>
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
