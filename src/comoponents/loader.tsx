'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import '@/app/globals.css';

const Loader = () => {
    const [loading, setLoading] = useState(true); // Par défaut, le loader est actif
    const pathname = usePathname(); // Récupère le chemin actuel

    useEffect(() => {
        setLoading(true); // Active le loader pendant le changement de route

        const timer = setTimeout(() => {
            setLoading(false); // Désactive le loader après un délai
        }, 1000);

        return () => clearTimeout(timer); // Nettoie le timer
    }, [pathname]); // Exécuté à chaque changement de route

    return loading ? <div id="preloader"></div> : null; // Affiche le loader uniquement si "loading" est vrai
};

export default Loader;
