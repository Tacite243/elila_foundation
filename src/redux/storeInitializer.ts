'use client';

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { fetchImpactStats } from '@/redux/slices/impactStatsSlice';
// Importez ici toutes les autres actions de fetch que vous voulez lancer au démarrage
// import { fetchPublicArticles } from '@/redux/slices/articlesSlice';
// import { fetchPartners } from '@/redux/slices/partnersSlice';

export default function StoreInitializer() {
    const dispatch = useAppDispatch();
    const initialized = useRef(false);

    // useEffect est parfait pour les actions à exécuter une seule fois côté client
    useEffect(() => {
        // Le `useRef` garantit que ce bloc ne s'exécute qu'une seule fois,
        // même avec le double rendu du Strict Mode en développement.
        if (!initialized.current) {
            // Dispatcher toutes les actions de chargement initial ici.
            // Elles seront lancées en parallèle.
            dispatch(fetchImpactStats());
            // dispatch(fetchPublicArticles());
            // dispatch(fetchPartners());

            initialized.current = true;
        }
    }, [dispatch]); // L'array de dépendances est correct

    return null; // Ce composant n'a pas de rendu visuel
}