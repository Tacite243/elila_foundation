"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MapPin, Phone, Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

// --- Données de Contact ---
const contactDetails = [
  {
    Icon: MapPin,
    title: "Adresse",
    line1: "Rue Mutinga-Afia bora,",
    line2: "en face de l'hôpital la famille",
  },
  {
    Icon: Phone,
    title: "Appellez-nous",
    line1: "+243 990 868 155",
  },
  {
    Icon: Mail,
    title: "Envoyez un mail",
    line1: "contact@elilafoundation.org",
  },
];

// --- Animations ---
const slideInFromLeft: Variants = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
};

const slideInFromRight: Variants = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({
    loading: false,
    error: "",
    success: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, error: "", success: "" });

    try {
      // Simulation d'envoi
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setStatus({
        loading: false,
        error: "",
        success: "Votre message a été envoyé avec succès !",
      });
      setFormData({ name: "", email: "", message: "" });

      // Reset du message de succès après 5 secondes
      setTimeout(() => setStatus(prev => ({ ...prev, success: '' })), 5000);

    } catch (error) {
      setStatus({
        loading: false,
        error: "Une erreur est survenue. Veuillez réessayer." + error,
        success: "",
      });
    }
  };

  return (
    // CORRECTION ICI : Ajout de 'overflow-hidden' pour empêcher le débordement horizontal sur mobile
    <section id="contact" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Titre de la section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block relative">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary dark:text-primary-foreground tracking-tight">
              Nous Contacter
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
            Laissez un message pour plus d&apos;informations ou pour nous signaler
            votre don.
          </p>
        </motion.div>

        {/* Grille principale */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Colonne d'info */}
          <motion.div
            className="lg:col-span-1 space-y-8"
            variants={slideInFromLeft}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {contactDetails.map((item, index) => (
              <div key={index} className="flex items-start group">
                <div className="flex-shrink-0 h-14 w-14 bg-primary text-primary-foreground rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300 shadow-md">
                  <item.Icon className="h-6 w-6" />
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
                    {item.line1}
                  </p>
                  {item.line2 && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.line2}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Colonne du formulaire */}
          <motion.div
            className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700"
            variants={slideInFromRight}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <label htmlFor="name" className="sr-only">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="relative">
                  <label htmlFor="email" className="sr-only">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre adresse mail"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    suppressHydrationWarning={true}
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Votre message..."
                  className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-all"
                ></textarea>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full font-bold text-white bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status.loading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer le Message"
                  )}
                </button>
              </div>

              <AnimatePresence mode="wait">
                {status.success && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 p-4 mt-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <p className="font-medium">{status.success}</p>
                  </motion.div>
                )}
                {status.error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-center gap-2 p-4 mt-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-xl"
                  >
                    <AlertCircle className="h-5 w-5" />
                    <p className="font-medium">{status.error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}