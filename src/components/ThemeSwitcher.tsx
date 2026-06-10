"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";

interface ThemeSwitcherProps {
  isOpaque: boolean;
}

export function ThemeSwitcher({ isOpaque }: ThemeSwitcherProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Évite l'erreur d'hydratation
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const inactiveColorClass = isOpaque
    ? "text-primary-foreground/70 hover:text-primary-foreground"
    : "text-gray-200 hover:text-white";

  return (
    <div className="flex items-center space-x-1">
      <button onClick={() => setTheme("light")} className={`p-2 rounded-full transition-colors ${theme === "light" ? "bg-accent text-accent-foreground" : inactiveColorClass}`}>
        <Sun size={18} />
      </button>
      <button onClick={() => setTheme("dark")} className={`p-2 rounded-full transition-colors ${theme === "dark" ? "bg-accent text-accent-foreground" : inactiveColorClass}`}>
        <Moon size={18} />
      </button>
      <button onClick={() => setTheme("system")} className={`p-2 rounded-full transition-colors ${theme === "system" ? "bg-accent/50 text-accent-foreground" : inactiveColorClass}`}>
        <Laptop size={18} />
      </button>
    </div>
  );
}