"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Users } from "lucide-react";

interface IdentificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function IdentificationModal({
  isOpen,
  onClose,
}: IdentificationModalProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Cette fonction simule la fin de l'action (puisqu'on ne peut pas détecter le submit Google Form)
  const handleFinish = () => {
    onClose();
    // Vous pourriez ajouter ici un "Toast" ou une notification de succès
    alert("Merci pour votre identification !");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. LE BACKDROP (Fond sombre bloquant) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={onClose} // Ferme si on clique en dehors
          >
            {/* 2. LE CONTENU DE LA MODALE */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white dark:bg-gray-900 w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col relative overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Empêche la fermeture si on clique DANS la modale
            >
              {/* Header de la modale */}
              <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-primary text-primary-foreground">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Espace d&apos;Identification
                </h3>
                <button
                  onClick={onClose}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Corps de la modale */}
              <div className="flex-grow relative bg-gray-100 dark:bg-gray-800">
                {/* --- ANIMATION DE CHARGEMENT "ESPRIT LEGA" --- */}
                {isLoading && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-primary text-primary-foreground">
                    {/* Cercles concentriques animés représentant l'unité/Bwami */}
                    <div className="relative flex items-center justify-center mb-8">
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="absolute w-32 h-32 border-4 border-accent rounded-full"
                      />
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 0.2, 0.8],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        }}
                        className="absolute w-24 h-24 border-4 border-white rounded-full"
                      />
                      {/* Icône centrale ou Logo */}
                      <div className="z-10 bg-white p-4 rounded-full shadow-lg">
                        <img
                          src="/icon.png"
                          alt="Logo"
                          className="h-12 w-12 object-contain"
                        />
                      </div>
                    </div>

                    <motion.p
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-lg font-medium tracking-wide"
                    >
                      Connexion à la communauté...
                    </motion.p>
                  </div>
                )}

                {/* Le Formulaire Google */}
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSd3E9XXy09W9QppBahqDGzreVPqVG29_oW7rlec7oBiJQL6kw/viewform?embedded=true"
                  className="w-full h-full border-none"
                  title="Formulaire d'identification"
                  onLoad={() => setIsLoading(false)}
                />
              </div>

              {/* Footer de la modale (Actions) */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                >
                  Annuler
                </button>

                <button
                  onClick={handleFinish}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full font-medium shadow-md transition-all hover:scale-105"
                >
                  <Check size={18} />
                  J&apos;ai envoyé le formulaire
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
