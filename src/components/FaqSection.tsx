"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";

// --- Données de la FAQ ---
const faqItems = [
  {
    question: "Qu’est-ce que la Elila Foundation ?",
    answer:
      "La Elila Foundation est une organisation dédiée au développement socioéconomique, culturel, et politique de l’espace Lega, couvrant les territoires de Mwenga, Shabunda, Pangi et Walikale, ainsi que la diaspora Lega à travers le monde.",
  },
  {
    question: "Quelle est la mission de la Fondation ?",
    answer:
      "La mission de la Elila Foundation est de promouvoir l’émergence du peuple Lega en valorisant ses richesses culturelles, en stimulant le développement économique, et en renforçant son rôle dans les débats scientifiques, sociaux et politiques.",
  },
  {
    question: "Quels sont les objectifs principaux de la Fondation ?",
    answer:
      "Protéger et promouvoir la culture Lega, mobiliser les ressources pour des projets de développement, encourager la participation de la diaspora, et défendre les intérêts de l’espace Lega.",
  },
  {
    question:
      "Quelles sont les richesses des territoires de Mwenga, Shabunda, Pangi et Walikale ?",
    answer:
      "Les richesses incluent la culture (Bwami, traditions), les ressources naturelles (or, coltan), un potentiel touristique immense et des opportunités économiques dans l'agriculture et les énergies durables.",
  },
  {
    question: "Quels sont les secteurs porteurs pour les investissements ?",
    answer:
      "Les secteurs clés incluent l’agriculture, les énergies renouvelables, les infrastructures, le tourisme, et la transformation des produits locaux.",
  },
  {
    question: "Comment la diaspora Lega peut-elle contribuer ?",
    answer:
      "En investissant dans des projets structurants, en partageant des compétences et des innovations, et en soutenant les initiatives politiques et économiques locales.",
  },
  {
    question: "Comment contacter la Elila Foundation ?",
    answer:
      "Vous pouvez nous contacter via Email à contact@elilafoundation.org ou par téléphone au +243 990 868 155.",
  },
];

// --- Sous-composant pour un élément de l'accordéon ---
// C'est une bonne pratique pour garder le code principal propre
const AccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof faqItems)[0];
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={onToggle}
        className="flex justify-between items-center w-full py-5 text-left"
      >
        <span className="text-lg font-semibold text-primary dark:text-primary-foreground">
          {item.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-6 w-6 text-primary dark:text-accent" />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Composant Principal de la FAQ ---
export default function FaqSection() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0); // Ouvre la première question par défaut
  const [showMore, setShowMore] = useState(false);

  const displayedFaqs = showMore ? faqItems : faqItems.slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Colonne de Gauche : Titre */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary dark:text-primary-foreground leading-tight">
              <span className="text-red-500">Questions</span> Fréquemment Posées
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              Cette FAQ reflète notre vision et nos actions pour contribuer à un
              avenir prospère et durable pour l’espace Lega.
            </p>
          </motion.div>

          {/* Colonne de Droite : Accordéon */}
          <div className="lg:col-span-2">
            {displayedFaqs.map((item, index) => (
              <AccordionItem
                key={index}
                item={item}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowMore(!showMore)}
                className="font-semibold text-primary dark:text-accent hover:underline"
              >
                {showMore ? "Voir moins..." : "Voir plus..."}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
