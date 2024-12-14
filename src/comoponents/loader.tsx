"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "@/app/globals.css";

const Loader = () => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // Gérer le cas spécifique pour la route "/admin"
        if (pathname === "/admin") {
            setLoading(true);
            timer = setTimeout(() => setLoading(false), 500); // Temps du loader pour /admin
        } else {
            // Cas général pour d'autres routes
            setLoading(true); // Réinitialise l'état au chargement d'une nouvelle route
            timer = setTimeout(() => setLoading(false), 500); // Temps du loader général
        }

        // Nettoyage du timer à chaque changement de route
        return () => clearTimeout(timer);
    }, [pathname]); // Pas besoin d'inclure `loading` ici

    return loading ? <div id="preloader"></div> : null; // Affiche le loader uniquement si "loading" est vrai
};

export default Loader;
