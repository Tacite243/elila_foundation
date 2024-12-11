'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import '@/app/globals.css';

const Loader = () => {
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        if (pathname === '/admin') {
            // Si la route est /admin, activez le loader
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 500); // Temps du loader
            return () => clearTimeout(timer);
        } else if (loading) {
            // Si l'application est actualisée (state initial "true")
            const timer = setTimeout(() => setLoading(false), 500);
            return () => clearTimeout(timer);
        }
    }, [pathname]);

    return loading ? <div id="preloader"></div> : null; // Affiche le loader uniquement si "loading" est vrai
};

export default Loader;