'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Les textes pour le carrousel ---
const carouselTexts = [
    "Préparer la jeunesse africaine pour qu’elle transforme son potentiel en impact durable, devenant agents de changement et acteurs de développement.",
    "Bâtir une communauté de jeunes leaders équipés des compétences du 21e siècle, prêts à innover et à résoudre les défis de leurs communautés.",
    "Inspirer une génération à travers le mentorat, la formation pratique et des projets concrets pour un avenir prospère et autonome sur le continent."
];

export default function TextCarousel() {
    const [index, setIndex] = useState(0);

    // Effet pour changer de texte toutes les 10 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % carouselTexts.length);
        }, 10000); // 10000 ms = 10 secondes

        // Nettoyer l'intervalle quand le composant est démonté
        return () => clearInterval(interval);
    }, []);

    return (
        // Conteneur avec une hauteur minimale pour éviter les sauts de page (layout shift)
        <div className="relative min-h-[160px] sm:min-h-[120px] w-full max-w-3xl mx-auto flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.p
                    // La clé est cruciale pour que AnimatePresence détecte le changement
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    // Les classes de style sont reprises de votre <p> original
                    className="text-lg sm:text-xl text-gray-200 leading-relaxed"
                >
                    {carouselTexts[index]}
                </motion.p>
            </AnimatePresence>
        </div>
    );
}