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
  // {
  //   src: "/images/PXL_20230422_105903915.MP.jpg",
  //   alt: "Projet de la fondation en cours",
  // },
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
      {/* SECTION 2: Voile noir pour la lisibilité */}
      <div className="absolute inset-0 z-[-1] bg-black/40" />{" "}
      {/* J'ai légèrement augmenté l'opacité pour un meilleur contraste */}
      {/* 
        SECTION 3: Contenu central avec les couleurs de la marque
      */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={textContainerVariants}
          initial="initial"
          animate="animate"
          className="flex flex-col items-center"
        >
          <motion.h1
            variants={fadeInUp}
            // Utilise la couleur --primary-foreground (le blanc cassé du logo)
            className="text-4xl sm:text-6xl lg:text-8xl font-bold text-primary-foreground leading-tight"
          >
            Elila Foundation
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            // Le même blanc cassé, mais avec une légère transparence pour hiérarchiser l'information
            className="mt-6 max-w-3xl text-lg md:text-xl text-primary-foreground/90"
          >
            Une plateforme dédiée à la rencontre des LEGAS du pays et de la diaspora
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-12">
            {/* <Link href="/identification"> */}
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              // Le bouton utilise la couleur --accent (gris argenté) et le texte --accent-foreground (noir)
              className="px-8 py-3 rounded-full font-semibold text-base transition-all duration-300
                           bg-accent text-accent-foreground shadow-lg hover:shadow-xl"
            >
              Identifiez-vous ici
            </motion.button>
            {/* </Link> */}
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
