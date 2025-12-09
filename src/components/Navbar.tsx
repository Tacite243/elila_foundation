"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  Info,
  Heart,
  ClipboardList,
  Palette,
  Users,
  Mail,
} from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";

interface NavItem {
  path: string;
  label: string;
  icon: React.ElementType | null;
  anchor?: string;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isOpaque = scrolled || !isHome;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { path: "/", anchor: "#hero", label: "Accueil", icon: Home },
    { path: "/", anchor: "#about", label: "À Propos", icon: Info },
    { path: "/", anchor: "#call-to-action", label: "Nous soutenir", icon: Heart },
    { path: "/", anchor: "#programmes", label: "Programmes", icon: ClipboardList },
    { path: "/", anchor: "#cards", label: "Culture", icon: Palette },
    { path: "/", anchor: "#team", label: "Team", icon: Users },
    { path: "/", anchor: "#contact", label: "Contact", icon: Mail },
  ];

  const getHref = (item: NavItem) => {
    if (pathname === "/") return item.anchor || item.path;
    return item.anchor ? `${item.path}${item.anchor}` : item.path;
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isOpaque
          ? "bg-white/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* LOGO */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/ELILA FOUNDATION WHITE.png"
                alt="Logo"
                width={60}
                height={60}
                className="h-12 w-auto object-contain"
                priority
              />

              <div className="hidden sm:block">
                <h1
                  className={`font-bold text-lg ${
                    isOpaque ? "text-gray-900" : "text-white"
                  }`}
                >
                  Elila Foundation
                </h1>
                <p
                  className={`text-xs ${
                    isOpaque ? "text-gray-600" : "text-gray-200"
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
              const isActive =
                pathname === item.path && (!item.anchor || pathname === href);

              return (
                <Link key={item.label} href={href}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-green-500 text-white shadow-lg"
                        : isOpaque
                        ? "text-gray-700 hover:bg-gray-100"
                        : "text-white hover:bg-white/10"
                    }`}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              );
            })}

            {/* THEME SWITCHER */}
            <div className="ml-4">
              <ThemeSwitcher isOpaque={isOpaque} />
            </div>
          </div>

          {/* BURGER BUTTON */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg ${
              isOpaque ? "text-gray-700" : "text-white"
            }`}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
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
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200/20"
          >
            <div className="px-4 py-4 space-y-2 max-h-[70vh] overflow-y-auto">
              {navItems.map((item) => {
                const href = getHref(item);
                const Icon = item.icon;
                const isActive =
                  pathname === item.path && (!item.anchor || pathname === href);

                return (
                  <Link key={item.label} href={href}>
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {Icon && <Icon size={18} />}
                      <span>{item.label}</span>
                    </motion.div>
                  </Link>
                );
              })}

              <div className="pt-6 flex justify-center">
                <ThemeSwitcher isOpaque />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Header;
