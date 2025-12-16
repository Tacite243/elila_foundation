'use client';

import React from "react";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
// Le composant Image de Next.js n'est pas idéal pour l'effet bg-fixed, nous utilisons donc un style en ligne.

// --- Données de la Section ---
const ctaData = {
  title: 'Croyez en nous',
  description: 'Croyez-vous en nous et en notre potentiel ? Soutenez notre fondation en faisant un don simplement.',
  buttonText: 'Faire un don',
  buttonLink: '#contact',
  backgroundImage: '/images/PXL_20230520_141431103.jpg', // Assurez-vous que le chemin est correct dans /public
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
    // LA CORRECTION PRINCIPALE EST ICI :
    // On applique l'image en tant que background CSS directement sur la section
    // et on utilise les classes Tailwind pour l'effet de parallaxe.
    <section
      style={{ backgroundImage: `url(${ctaData.backgroundImage})` }}
      id="call-to-action"
      className="relative py-28 sm:py-36 bg-cover bg-center bg-no-repeat bg-fixed"
    >
      {/* Le voile de couleur est maintenant un simple div qui couvre la section */}
      <div className="absolute inset-0 bg-primary/70 dark:bg-primary/80" />

      {/* Le contenu reste le même, mais il est maintenant positionné par-dessus le fond */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center"
        >
          <motion.h2
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="text-4xl md:text-5xl font-bold text-primary-foreground leading-tight"
          >
            {ctaData.title}
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="mt-4 max-w-2xl text-lg text-primary-foreground/90"
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
                className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300
                           border-2 border-accent text-accent 
                           hover:bg-accent hover:text-accent-foreground shadow-lg"
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