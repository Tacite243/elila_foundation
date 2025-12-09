'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// --- Données des partenaires ---

const partnersData = [
    { name: "Gesi", logoUrl: "/images/gesi.png" },
    { name: "Ikiota", logoUrl: "/images/kiotta.png" },
    { name: "peae", logoUrl: "/images/pea.png" },
    { name: "ulpgl", logoUrl: "/images/ulpgl.png" },
    { name: "c'est_aussi_l'afrique", logoUrl: "/images/c'estaussil'afrique.png" },
];


export default function PartnersCarousel() {
    // On duplique la liste pour créer l'effet de boucle infinie fluide
    const duplicatedPartners = [...partnersData, ...partnersData];

    return (
        <section className="py-20 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Titre */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Ils nous font confiance
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Nous sommes fiers de collaborer avec des organisations leaders qui partagent notre vision.
                    </p>
                </motion.div>

                {/* --- Le Carrousel --- */}
                {/* 'mask-image' est une astuce CSS pour créer le fondu sans divs supplémentaires */}
                <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
                    <motion.div
                        className="flex"
                        animate={{
                            x: ['0%', '-100%'],
                            transition: {
                                ease: 'linear',
                                // MODIFICATION : Vitesse légèrement ajustée pour un meilleur rendu
                                duration: 20,
                                repeat: Infinity,
                            }
                        }}
                    >
                        {duplicatedPartners.map((partner, index) => (
                            // MODIFICATION : Le conteneur de chaque logo est plus large et l'espacement est plus grand
                            <div key={index} className="flex-shrink-0 flex items-center justify-center px-8 sm:px-12 w-[200px]">
                                <Image
                                    src={partner.logoUrl}
                                    alt={`Logo de ${partner.name}`}
                                    // Astuce : Utilisez width et height pour définir le RATIO, pas la taille finale.
                                    // Ici, un ratio de 2:1 (ex: 200x100) est plus représentatif pour un logo.
                                    width={200}
                                    height={100}
                                    // Vos classes Tailwind contrôlent la taille d'affichage finale.
                                    className="h-12 sm:h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}