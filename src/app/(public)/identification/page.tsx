"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function IdentificationPage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <section className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center relative">
      {/* Bouton Retour (Flottant en haut à gauche) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="absolute top-6 left-6 z-10"
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-primary dark:text-primary-foreground hover:text-accent transition-colors font-medium bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow-md"
        >
          <ArrowLeft size={20} />
          <span>Retour à l&apos;accueil</span>
        </Link>
      </motion.div>

      {/* Conteneur Principal */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 relative"
      >
        {/* En-tête de la carte */}
        <div className="bg-primary p-8 text-center">
          <h1 className="text-3xl font-bold text-primary-foreground">
            Identification
          </h1>
          <p className="mt-2 text-primary-foreground/80 max-w-xl mx-auto">
            Veuillez remplir ce formulaire pour rejoindre notre réseau. Vos
            informations nous permettent de mieux structurer nos actions.
          </p>
        </div>

        {/* Zone du Formulaire */}
        <div className="relative w-full h-[800px] bg-gray-100">
          {/* Indicateur de chargement */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-white z-10">
              <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
              <p className="text-gray-500 font-medium">
                Chargement du formulaire...
              </p>
            </div>
          )}

          {/* Google Form Iframe */}
          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSd3E9XXy09W9QppBahqDGzreVPqVG29_oW7rlec7oBiJQL6kw/viewform?embedded=true"
            className="w-full h-full border-none"
            title="Formulaire d'identification Elila Foundation"
            onLoad={() => setIsLoading(false)}
          >
            Chargement…
          </iframe>
        </div>
      </motion.div>

      {/* Footer discret */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center"
      >
        © {new Date().getFullYear()} Elila Foundation. Données sécurisées via
        Google Forms.
      </motion.p>
    </section>
  );
}
