"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";

import { AppDispatch } from "@/redux/store";
import { resetAuthState } from "@/redux/slices/authSlice";
import LoginModal from "./LoginModal";

// --- DONNÉES DU FOOTER ---
const quickLinks = [
  { name: "Accueil", path: "/" },
  { name: "À Propos", path: "/#about" },
  { name: "Programmes", path: "/#services" },
  { name: "Culture", path: "/#cards" },
  { name: "Contact", path: "/#contact" },
];

const contactInfo = [
  { icon: MapPin, text: "Goma, Rue Mutinga-Afia bora" },
  { icon: Phone, text: "+243 990 868 155", href: "tel:+243990868155" },
  {
    icon: Mail,
    text: "contact@elilafoundation.org",
    href: "mailto:contact@elilafoundation.org",
  },
  { icon: Clock, text: "Lun-Sam: 08h - 17h" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
  { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-sky-500" },
  { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
  { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function Footer() {
  const [isLoginOpen, setLoginOpen] = useState(false);
  const { status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenLogin = () => {
    if (status !== "authenticated") {
      dispatch(resetAuthState());
      setLoginOpen(true);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <footer className="bg-primary text-primary-foreground pt-16 pb-8 relative overflow-hidden">
        {/* Élément décoratif d'arrière-plan */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 text-center lg:text-left">

            {/* 1. Marque & Description */}
            <motion.div
              {...fadeInUp}
              className="lg:col-span-1 flex flex-col items-center lg:items-start"
            >
              <Link href="/" className="flex flex-col lg:flex-row items-center gap-4 mb-6 group">
                <div className="relative w-16 h-16 bg-white/10 rounded-full flex items-center justify-center p-2">
                  <Image
                    src="/ELILA FOUNDATION WHITE.png"
                    alt="Elila Foundation Logo"
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-center lg:items-start">
                  <h3 className="text-2xl font-bold leading-none tracking-tight">
                    Elila Foundation
                  </h3>
                  <span className="text-sm text-primary-foreground/70 font-medium mt-1">
                    Goma, RDC
                  </span>
                </div>
              </Link>

              <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6 max-w-sm mx-auto lg:mx-0">
                Espace où les legs de la diaspora et du pays se rencontrent pour
                habiliter la jeunesse de la région des Grands Lacs.
              </p>

              <div className="flex justify-center lg:justify-start space-x-3">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110 ${social.color}`}
                    title={social.name}
                  >
                    <social.icon size={18} />
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* 2. Liens Rapides */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 flex flex-col items-center lg:items-start"
            >
              <h4 className="text-lg font-bold mb-6 text-accent relative inline-block">
                Navigation
                {/* Petit soulignement décoratif centré sur mobile */}
                <span className="block h-1 w-10 bg-accent/30 rounded mt-1 mx-auto lg:mx-0"></span>
              </h4>
              <ul className="space-y-3 w-full max-w-xs">
                {quickLinks.map((link, index) => (
                  <li key={index} className="flex justify-center lg:justify-start">
                    <Link
                      href={link.path}
                      className="text-primary-foreground/70 hover:text-accent hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group w-full justify-center lg:justify-start"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 3. Contact */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 flex flex-col items-center lg:items-start"
            >
              <h4 className="text-lg font-bold mb-6 text-accent relative inline-block">
                Contactez-nous
                <span className="block h-1 w-10 bg-accent/30 rounded mt-1 mx-auto lg:mx-0"></span>
              </h4>
              <div className="grid sm:grid-cols-2 gap-6 w-full max-w-2xl">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                      <info.icon size={20} />
                    </div>
                    <div className="text-center sm:text-left">
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-primary-foreground/90 hover:text-white transition-colors block font-medium"
                        >
                          {info.text}
                        </a>
                      ) : (
                        <span className="text-primary-foreground/90 block font-medium">
                          {info.text}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-primary-foreground/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60 text-center md:text-left pb-20 md:pb-0">
            <p className="flex flex-col sm:flex-row items-center gap-1">
              <span>© {new Date().getFullYear()} Elila Foundation.</span>
              <button
                onClick={handleOpenLogin}
                className="hover:text-accent cursor-pointer focus:outline-none transition-colors"
              >
                Tous droits réservés.
              </button>
            </p>

            <div className="flex items-center gap-4">
              <span>Designed by Professor</span>
              {status === "authenticated" && (
                <button
                  onClick={handleLogout}
                  className="text-red-400 hover:text-red-300 font-medium transition-colors border border-red-400/30 px-3 py-1 rounded-full text-xs"
                >
                  Déconnexion
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Appel du composant Modal séparé */}
      <AnimatePresence>
        {isLoginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
      </AnimatePresence>
    </>
  );
}