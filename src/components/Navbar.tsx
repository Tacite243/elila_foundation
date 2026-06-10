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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // La logique est simplifiée : le header est opaque s'il est "scrollé" OU si on n'est pas sur la page d'accueil.
  const isOpaque = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { path: "/", anchor: "#hero", label: "Accueil", icon: Home },
    { path: "/", anchor: "#about", label: "À Propos", icon: Info },
    { path: "/", anchor: "#call-to-action", label: "Soutenir", icon: Heart },
    { path: "/", anchor: "#programmes", label: "Programmes", icon: ClipboardList },
    { path: "/", anchor: "#cards", label: "Culture", icon: Palette },
    { path: "/", anchor: "#team", label: "Team", icon: Users },
    { path: "/", anchor: "#contact", label: "Contact", icon: Mail },
  ];

  const getHref = (item: NavItem) => {
    return isHome ? (item.anchor || item.path) : (item.anchor ? `${item.path}${item.anchor}` : item.path);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      // Le fond est maintenant dynamique et utilise les variables de thème
      className={`fixed w-full z-50 transition-all duration-300 ${isOpaque
          ? "bg-background/80 dark:bg-background/90 backdrop-blur-lg shadow-md border-b border-slate-200/80 dark:border-slate-800/80"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 lg:h-24">

          <motion.div whileHover={{ scale: 1.02 }} className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 sm:gap-4">
              <div className="relative h-12 w-12 sm:h-14 sm:w-14">
                <Image src="/ELILA FOUNDATION BLUE.png" alt="Logo" fill className="object-contain" priority />
              </div>

              <div className="flex flex-col justify-center">
                <h1
                  // La couleur du texte change en fonction du thème (foreground) ou reste blanche sur fond transparent
                  className={`font-bold leading-none tracking-tight transition-colors text-lg sm:text-xl ${isOpaque ? "text-foreground" : "text-white"
                    }`}
                >
                  Elila Foundation
                </h1>
                <p
                  className={`text-xs font-medium mt-1 transition-colors ${isOpaque ? "text-slate-500" : "text-slate-200"
                    }`}
                >
                  RDC – Goma
                </p>
              </div>
            </Link>
          </motion.div>

          {/* NAVIGATION DESKTOP (SIMPLIFIÉE) */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const href = getHref(item);
              // Simplification de la logique 'isActive' (un jour)
              const isActive = false;

              return (
                <Link key={item.label} href={href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    // Les styles actifs utilisent la couleur primaire de votre marque !
                    // Les styles inactifs sont dynamiques (light/dark)
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                        ? "bg-primary text-primary-foreground shadow-lg" // Votre couleur de marque
                        : isOpaque
                          ? "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                          : "text-white hover:bg-white/10"
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

          {/* BURGER BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg focus:outline-none ${isOpaque ? "text-foreground" : "text-white"
              }`}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </motion.button>
        </div>
      </div>

      {/* MOBILE MENU (MAINTENANT COMPATIBLE DARK MODE) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            // Le menu mobile utilise maintenant `bg-background`
            className="lg:hidden bg-background/95 dark:bg-background/98 backdrop-blur-lg border-t border-slate-200/50 dark:border-slate-800/50 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
              {navItems.map((item) => {
                const href = getHref(item);
                const Icon = item.icon;
                const isActive = false;

                return (
                  <Link key={item.label} href={href}>
                    <motion.div
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsOpen(false)}
                      // Les couleurs sont maintenant gérées par le thème
                      className={`flex items-center space-x-4 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive
                          ? "bg-primary/10 text-primary font-bold" // Version subtile de votre marque pour le mobile
                          : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                        }`}
                    >
                      {Icon && <Icon size={20} />}
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              <div className="pt-6 mt-4 border-t border-slate-200 dark:border-slate-800 flex justify-center">
                <ThemeSwitcher isOpaque={true} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}