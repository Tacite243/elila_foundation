"use client";

import { useDispatch, useSelector } from "react-redux";
import { setTheme, selectCurrentTheme } from "@/redux/slices/themeSlice"; // Ajustez le chemin
import { Sun, Moon, Laptop } from "lucide-react";

// On ajoute une interface pour les props
interface ThemeSwitcherProps {
  isOpaque: boolean;
}

export function ThemeSwitcher({ isOpaque }: ThemeSwitcherProps) {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectCurrentTheme);

  // Couleurs de base pour les icônes inactives, en fonction de l'opacité du header
  const inactiveColorClass = isOpaque
    ? "text-primary-foreground/70 hover:text-primary-foreground"
    : "text-gray-200 hover:text-white";

  return (
    <div className="flex items-center space-x-1">
      <button
        onClick={() => dispatch(setTheme("light"))}
        className={`p-2 rounded-full transition-colors ${
          currentTheme === "light"
            ? "bg-accent text-accent-foreground"
            : inactiveColorClass
        }`}
        aria-label="Thème clair"
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => dispatch(setTheme("dark"))}
        className={`p-2 rounded-full transition-colors ${
          currentTheme === "dark"
            ? "bg-accent text-accent-foreground"
            : inactiveColorClass
        }`}
        aria-label="Thème sombre"
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => dispatch(setTheme("system"))}
        className={`p-2 rounded-full transition-colors ${
          currentTheme === "system"
            ? "bg-accent/50 text-accent-foreground"
            : inactiveColorClass
        }`}
        aria-label="Thème du système"
      >
        <Laptop size={18} />
      </button>
    </div>
  );
}
