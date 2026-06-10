"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, Info, Heart, ClipboardList, Palette, Users, Mail } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType | null;
  anchor?: string;
}

// Configuration des liens de navigation (déclarée à l'extérieur pour optimiser les performances)
const navItems: NavItem[] = [
  { path: "/", anchor: "#hero", label: "Accueil", icon: Home },
  { path: "/", anchor: "#about", label: "À Propos", icon: Info },
  { path: "/", anchor: "#call-to-action", label: "Soutenir", icon: Heart },
  { path: "/", anchor: "#programmes", label: "Programmes", icon: ClipboardList },
  { path: "/", anchor: "#cards", label: "Culture", icon: Palette },
  { path: "/", anchor: "#team", label: "Team", icon: Users },
  { path: "/", anchor: "#contact", label: "Contact", icon: Mail },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const isHome = pathname === "/";

  const isOpaque = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Détection automatique de la section visible à l'écran (Scroll Spy)
  useEffect(() => {
    const handleHashChange = () => {
      setActiveHash(window.location.hash || "#hero");
    };
    
    const handleSectionDetection = () => {
      if (!isHome) return;
      const sections = navItems
        .map(item => item.anchor ? document.querySelector(item.anchor) : null)
        .filter((el): el is HTMLElement => el !== null);
      
      const scrollPosition = window.scrollY + 160; // Offset pour une détection fluide
      
      for (const section of sections) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveHash(`#${section.id}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleSectionDetection);
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Détection initiale au chargement
    
    return () => {
      window.removeEventListener("scroll", handleSectionDetection);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isHome]);

  const getHref = (item: NavItem) => {
    return isHome ? (item.anchor || item.path) : (item.anchor ? `${item.path}${item.anchor}` : item.path);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Remplacement des classes pour utiliser les variables de fond et de bordure de votre charte
      className={`fixed w-full z-50 transition-all duration-300 ${
        isOpaque
          ? "bg-background/85 backdrop-blur-lg shadow-sm border-b border-border/80"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">

          {/* SECTION LOGO & TITRE */}
          <motion.div whileHover={{ scale: 1.01 }} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                <Image src="/ELILA FOUNDATION BLUE.png" alt="Logo" fill className="object-contain" priority />
              </div>

              <div className="flex flex-col justify-center">
                <h1
                  // Utilise le Bleu Marine de votre logo en mode clair quand on scrolle, et le blanc ivoire en mode sombre/transparent
                  className={`font-bold leading-none tracking-tight transition-colors text-lg sm:text-xl ${
                    isOpaque ? "text-primary dark:text-foreground" : "text-white"
                  }`}
                >
                  Elila Foundation
                </h1>
                <p
                  className={`text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1 transition-colors ${
                    isOpaque ? "text-foreground/50" : "text-white/70"
                  }`}
                >
                  RDC – Goma
                </p>
              </div>
            </Link>
          </motion.div>

          {/* NAVIGATION DESKTOP */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const href = getHref(item);
              const isActive = isHome && activeHash === item.anchor;

              return (
                <Link key={item.label} href={href}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    // Refonte visuelle complète de l'onglet actif et de l'effet de survol (hover)
                    className={`px-4 py-2 rounded-full text-xs xl:text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? isOpaque
                          ? "bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary font-bold"
                          : "bg-white/15 text-white font-bold"
                        : isOpaque
                          ? "text-foreground/75 hover:text-primary dark:hover:text-secondary hover:bg-foreground/5"
                          : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}
            <div className="ml-4">
              <ThemeSwitcher isOpaque={isOpaque} />
            </div>
          </div>

          {/* BURGER BUTTON (MOBILE) */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg focus:outline-none transition-colors ${
              isOpaque ? "text-foreground hover:bg-foreground/5" : "text-white hover:bg-white/10"
            }`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-lg border-t border-border/50 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => {
                const href = getHref(item);
                const Icon = item.icon;
                const isActive = isHome && activeHash === item.anchor;

                return (
                  <Link key={item.label} href={href}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                      // Cohérence des couleurs actives/inactives adaptées à l'écran mobile
                      className={`flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 ${
                        isActive
                          ? "bg-primary/10 text-primary dark:bg-secondary/10 dark:text-secondary font-bold"
                          : "text-foreground/80 hover:bg-foreground/5"
                      }`}
                    >
                      {Icon && <Icon size={20} />}
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              <div className="pt-6 mt-4 border-t border-border/50 flex justify-center">
                <ThemeSwitcher isOpaque={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}