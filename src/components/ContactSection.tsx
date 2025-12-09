"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

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

    // TODO: Remplacer par votre logique d'envoi d'API
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulation d'un appel réseau
      setStatus({
        loading: false,
        error: "",
        success: "Votre message a été envoyé avec succès !",
      });
      setFormData({ name: "", email: "", message: "" }); // Vider le formulaire
    } catch (error) {
      setStatus({
        loading: false,
        error: "Une erreur est survenue. Veuillez réessayer.",
        success: "",
      });
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-800">
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
              <div key={index} className="flex items-start">
                <div className="flex-shrink-0 h-14 w-14 bg-primary text-primary-foreground rounded-xl flex items-center justify-center">
                  <item.Icon className="h-7 w-7" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-primary dark:text-primary-foreground">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {item.line1}
                  </p>
                  {item.line2 && (
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.line2}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Colonne du formulaire */}
          <motion.div
            className="lg:col-span-2 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg"
            variants={slideInFromRight}
            initial="initial"
            whileInView="whileInView"
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="sr-only">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre nom"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Votre adresse mail"
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Votre message"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:outline-none resize-none"
                ></textarea>
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  disabled={status.loading}
                  className="px-8 py-3 rounded-full font-semibold text-white bg-primary hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.loading ? "Envoi en cours..." : "Envoyer le Message"}
                </button>
              </div>
              <AnimatePresence>
                {status.success && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-green-600"
                  >
                    {status.success}
                  </motion.p>
                )}
                {status.error && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-red-600"
                  >
                    {status.error}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
