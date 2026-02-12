"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Eye, Goal } from "lucide-react";

const cardVariants: Variants = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
};

export default function VisionMission() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-foreground tracking-tight">
              Notre Vision & Mission
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
            Découvrez les aspirations et les engagements qui guident chacune de
            nos actions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Carte Vision */}
          <motion.div
            className="flex flex-col"
            variants={cardVariants}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.7, ease: "easeInOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full
                          transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="ml-5 text-2xl font-bold text-primary dark:text-primary-foreground">
                  Notre Vision
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Elila Foundation aspire à devenir une force motrice pour
                l&apos;émergence et l&apos;influence de la communauté, promouvant l&apos;unité,
                le développement et l&apos;excellence dans tous les domaines.
              </p>
            </div>
          </motion.div>

          {/* Carte Mission */}
          <motion.div
            className="flex flex-col"
            variants={cardVariants}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.7, ease: "easeInOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 h-full
                          transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="flex items-center mb-6">
                <div className="bg-accent text-accent-foreground rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                  <Goal className="h-8 w-8" />
                </div>
                <h3 className="ml-5 text-2xl font-bold text-gray-800 dark:text-primary-foreground">
                  Notre Mission
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Nous visons à être une référence pour la diaspora et les locaux,
                en favorisant un développement durable et équitable au sein de
                notre espace communautaire.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
