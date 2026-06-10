'use client';

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

// --- Données de la Section ---
const ctaData = {
  title: 'Croyez en nous',
  description: 'Croyez-vous en nous et en notre potentiel ? Soutenez notre fondation en faisant un don simplement.',
  buttonText: 'Faire un don',
  buttonLink: '#contact',
  backgroundImage: '/images/PXL_20230520_141431103.jpg',
};

// --- Animations ---
const containerVariants: Variants = {
  whileInView: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUp: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
};

export default function DonationSection() {
  return (
    <section
      style={{ backgroundImage: `url(${ctaData.backgroundImage})` }}
      id="call-to-action"
      className="relative py-28 sm:py-36 bg-cover bg-center bg-no-repeat bg-fixed"
    >
      {/* Voile aux couleurs de la marque (Bleu Marine primaire) pour la cohérence visuelle */}
      <div className="absolute inset-0 bg-primary/75 dark:bg-primary/85" />

      {/* Contenu positionné par-dessus le fond */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center"
        >
          {/* Titre : Utilise de façon fixe le blanc ivoire de la marque pour un contraste maximal */}
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="text-4xl md:text-5xl font-bold text-[#FAF9F6] leading-tight drop-shadow-md"
          >
            {ctaData.title}
          </motion.h2>

          {/* Description : Blanc ivoire adouci */}
          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="mt-4 max-w-2xl text-lg text-[#FAF9F6]/85 font-medium drop-shadow-sm"
          >
            {ctaData.description}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="mt-10"
          >
            <Link href={ctaData.buttonLink}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                // Bouton contour (hollow) Or/Champagne qui se remplit au survol avec le Bleu Marine en couleur de texte
                className="px-8 py-3 rounded-full font-bold text-base transition-all duration-300
                           border-2 border-[#C5A265] text-[#C5A265] 
                           hover:bg-[#C5A265] hover:text-[#1E2749] hover:shadow-[0_0_20px_rgba(197,162,101,0.4)] shadow-lg"
              >
                {ctaData.buttonText}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}