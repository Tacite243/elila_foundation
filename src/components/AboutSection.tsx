"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
};

const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
};

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-foreground tracking-tight">
              À propos de nous
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
          <p className="mt-8 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Elila Foundation en quelques mots
          </p>
        </motion.div>

        {/* Grille de contenu */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <motion.div
            className="lg:col-span-3"
            variants={slideInFromLeft}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.8, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <h3 className="text-3xl font-bold text-primary dark:text-primary-foreground mb-4">
              Bâtir un avenir durable, ensemble.
            </h3>
            <p className="italic text-gray-500 dark:text-gray-400 mb-6">
              Rejoignez-nous dans notre engagement à transformer positivement
              l&apos;espace Lega et à bâtir un avenir meilleur pour les générations à
              venir.
            </p>
            <div className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              <p>
                Elila Foundation est une organisation dédiée au développement
                intégral de l&apos;espace Lega. Notre mission est d&apos;améliorer
                durablement la qualité de vie au cœur des communautés locales.
              </p>
              <p>
                À travers des programmes ciblés sur l&apos;éducation, la santé et
                l&apos;économie locale, nous œuvrons pour autonomiser les habitants
                et renforcer la gouvernance participative. En collaboration avec
                nos partenaires, nous bâtissons un avenir prospère et inclusif.
              </p>
            </div>
          </motion.div>

          {/* Colonne de l'Image */}
          <motion.div
            className="lg:col-span-2"
            variants={slideInFromRight}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl bg-primary">
              <Image
                src="/images/PXL_20230521_151119849.MP.jpg"
                alt="L'équipe et la communauté de la Elila Foundation"
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
