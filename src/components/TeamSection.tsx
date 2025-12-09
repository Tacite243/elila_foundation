"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Linkedin, Twitter } from "lucide-react";

// --- Configuration des Animations ---
const gridContainerVariants: Variants = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
};

// --- Données de l'Équipe ---
const teamMembers = [
  {
    name: "Lucien Azmayawa",
    position: "Chargé du Développement, Mwenga",
    description:
      "Entrepreneur et coach expérimenté, spécialiste en développement commercial et leadership.",
    image: "/images/team/Lucien.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/...",
      twitter: "https://twitter.com/...",
    },
  },
  {
    name: "Trésor ILUNGA",
    position: "Président Jeunesse, Goma",
    description:
      "Chef de travaux et chercheur en économie, passionné par le développement communautaire.",
    image: "/images/team/tresor.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/...",
    },
  },
  {
    name: "TOMBO GARY Amani",
    position: "Chargé de la Culture et du Social",
    description:
      "PDG d'Appui Print Service et fervent promoteur de la culture Lega.",
    image: "/images/team/gary.jpg",
    socials: {
      twitter: "https://twitter.com/...",
    },
  },
  {
    name: "Tombo USHINDI",
    position: "Chargé de Communication",
    description:
      "Professionnel de l'humanitaire avec un Master en communication stratégique.",
    image: "/images/team/ushindi.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/...",
      twitter: "https://twitter.com/...",
    },
  },
];

const memberCardClasses = `
  bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 text-center 
  flex flex-col items-center
  transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
`;

export default function TeamSection() {
  return (
    <section id="team" className="py-20 sm:py-28 bg-white dark:bg-gray-900">
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
              Notre Équipe
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
            Une équipe forte et passionnée derrière cette grande structure.
          </p>
        </motion.div>

        {/* Grille des Membres de l'Équipe */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={gridContainerVariants}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className={memberCardClasses} // On utilise la constante ici
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <div className="relative h-32 w-32 mb-6">
                <Image
                  src={member.image}
                  alt={`Portrait de ${member.name}`}
                  fill
                  className="rounded-full object-cover ring-4 ring-white dark:ring-gray-700"
                  sizes="128px"
                />
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-primary-foreground">
                {member.name}
              </h3>
              <p className="text-primary/70 dark:text-accent font-medium mt-1 mb-4">
                {member.position}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm flex-grow">
                {member.description}
              </p>
              <div className="mt-6 flex space-x-4">
                {member.socials.linkedin && (
                  <Link
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="h-6 w-6 text-gray-400 hover:text-primary transition-colors" />
                  </Link>
                )}
                {member.socials.twitter && (
                  <Link
                    href={member.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="h-6 w-6 text-gray-400 hover:text-primary transition-colors" />
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
