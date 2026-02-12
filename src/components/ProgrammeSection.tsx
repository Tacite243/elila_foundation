"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Palette,
  FlaskConical,
  Briefcase,
  HeartHandshake,
  Lightbulb,
  type LucideProps,
} from "lucide-react";

// --- Configuration des Animations ---
// Variante pour le conteneur de la grille, pour décaler l'animation des enfants
const gridContainerVariants: Variants = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Variante pour chaque carte individuelle
const cardVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
};

// --- Données des Programmes ---
// J'ai mis à jour les icônes et simplifié la structure
const programData = [
  {
    Icon: Palette,
    title: "Activités culturelles",
    description:
      "Mise en avant des talents de notre jeunesse à travers diverses initiatives culturelles.",
  },
  {
    Icon: FlaskConical,
    title: "Activités scientifiques",
    description:
      "Faciliter l'accès de nos jeunes à l'excellence scientifique de notre communauté et d'ailleurs.",
  },
  {
    Icon: Briefcase,
    title: "Partage d'opportunités",
    description:
      "Structure de facilitation pour l'accès aux opportunités économiques, professionnelles et politiques.",
  },
  {
    Icon: HeartHandshake,
    title: "Le social",
    description:
      "Soutien et assistance aux membres de la communauté se trouvant en situation de détresse.",
  },
  {
    Icon: Lightbulb,
    title: "Partage d'expériences",
    description:
      "Promotion du partage de connaissances et d'expériences à travers nos différents programmes.",
  },
];

export default function ProgrammeSection() {
  return (
    <section id="programmes" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section (cohérent avec les autres sections) */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-foreground tracking-tight">
              Nos Programmes
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
            Elila Foundation est une structure dynamique avec une large gamme de
            programmes mis à la portée de la communauté.
          </p>
        </motion.div>

        {/* Grille des Programmes */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={gridContainerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.2 }}
        >
          {programData.map(({ Icon, title, description }, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg
                         transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
              variants={cardVariants}
            >
              <div className="mb-6">
                <div className="bg-primary text-primary-foreground h-16 w-16 rounded-xl flex items-center justify-center">
                  <Icon className="h-8 w-8" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-primary-foreground mb-3">
                {title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
