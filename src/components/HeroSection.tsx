"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import IdentificationModal from "./IdentificationModal";

// --- Configuration du Carrousel ---
const carouselImages = [
  {
    src: "/images/PXL_20230520_141431103.jpg",
    alt: "Paysage de collines verdoyantes",
  },
  {
    src: "/images/PXL_20230521_151119849.MP.jpg",
    alt: "Membres de la communauté souriants",
  },
  {
    src: "/images/PXL_20230520_141431103.jpg",
    alt: "Paysage de collines verdoyantes",
  },
];

// --- Définitions des Animations ---
const textContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
};

export default function HeroSection() {
  const [imageIndex, setImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* SECTION 1: Carrousel d'images */}
      <AnimatePresence>
        <motion.div
          key={imageIndex}
          className="absolute inset-0 z-[-2]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        >
          <Image
            src={carouselImages[imageIndex].src}
            alt={carouselImages[imageIndex].alt}
            fill
            priority={imageIndex === 0}
            quality={90}
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* SECTION 2: Voile noir pour la lisibilité (légèrement augmenté à 50% pour un contraste idéal) */}
      <div className="absolute inset-0 z-[-1] bg-black/50" />

      {/* SECTION 3: Contenu central */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={textContainerVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          {/* Titre : Utilise le blanc ivoire de la charte de manière fixe */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-6xl lg:text-8xl font-bold text-[#FAF9F6] leading-tight drop-shadow-md"
          >
            Elila Foundation
          </motion.h1>

          {/* Sous-titre : Blanc ivoire avec 85% d'opacité pour hiérarchiser l'information visuelle */}
          <motion.p
            variants={fadeInUp}
            className="mt-6 max-w-3xl text-lg md:text-xl text-[#FAF9F6]/85 font-medium drop-shadow-sm"
          >
            Une plateforme dédiée à la rencontre des Legas du pays et de la diaspora
          </motion.p>

          {/* Bouton d'action principal (CTA) */}
          <motion.div variants={fadeInUp} className="mt-12">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              // bg-[#C5A265] = Or/Champagne de la marque
              // text-[#1E2749] = Bleu Marine profond du logo
              // Ajout d'une ombre dorée subtile au survol (hover)
              className="px-8 py-4 rounded-full font-bold text-base transition-all duration-300
                         bg-[#C5A265] text-[#1E2749] shadow-lg hover:shadow-[0_0_20px_rgba(197,162,101,0.5)]"
            >
              Identifiez-vous ici
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <IdentificationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}