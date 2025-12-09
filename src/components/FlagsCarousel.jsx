'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const eastAfricaFlags = [
    { name: 'RD Congo', flagUrl: '/images/congo.png' },
    { name: 'Kenya', flagUrl: '/images/kenya.png' },
    { name: 'Tanzania', flagUrl: '/images/tanzanie.png' },
    { name: 'Uganda', flagUrl: '/images/uganda.png' },
    { name: 'Rwanda', flagUrl: '/images/rwanda.png' },
    { name: 'Burundi', flagUrl: '/images/burundi.png' },
    { name: 'South Sudan', flagUrl: '/images/sudsoudan.png' },
];

export default function FlagsCarousel() {
    const duplicatedFlags = [...eastAfricaFlags, ...eastAfricaFlags];

    return (
        <div className="w-full max-w-2xl mx-auto overflow-hidden pointer-events-none">
            <motion.div
                className="flex"
                animate={{
                    x: ['0%', '-100%'],
                    transition: {
                        ease: 'linear',
                        duration: 35,
                        repeat: Infinity,
                    }
                }}
            >
                {duplicatedFlags.map((flag, index) => (
                    <div key={index} className="flex-shrink-0 mx-2 sm:mx-4 flex items-center">
                        <Image
                            src={flag.flagUrl}
                            alt={`Drapeau de ${flag.name}`}
                            width={64} // Définit le RATIO de base pour l'optimisation
                            height={48}
                            className="
                                // --- TAILLE RESPONSIVE ---
                                w-12 h-9             // Taille par défaut (mobile) : 48px x 36px
                                sm:w-16 sm:h-12      // Taille pour écrans 'sm' et plus : 64px x 48px

                                // --- STYLE UNIFORME (inchangé) ---
                                object-cover         
                                rounded-md           
                                border               
                                border-white/20
                                shadow-lg            
                            "
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}