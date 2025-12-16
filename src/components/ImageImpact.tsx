'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Users, LucideProps, HelpCircle } from 'lucide-react';
import {
    // useAppDispatch, 
    useAppSelector
} from '@/redux/hooks';
// import { fetchImpactStats } from '@/redux/slices/impactStatsSlice';
import { RootState } from '@/redux/store';

const iconComponents: { [key: string]: React.FC<LucideProps> } = {
    Users: Users,
    MapPin: MapPin,
    Camera: Camera,
};

export default function ImageImpactPage() {
    // const dispatch = useAppDispatch();
    const { stats, status } = useAppSelector((state: RootState) => state.impactStats);

    // useEffect(() => {
    //     if (status === 'idle') {
    //         dispatch(fetchImpactStats());
    //     }
    // }, [status, dispatch]);

    if (status === 'loading' || status === 'idle') {
        return <section className="py-20 sm:py-24 bg-gray-50 text-center">Chargement de l&apos;impact...</section>;
    }

    // Ne rien afficher si le chargement a réussi mais qu'il n'y a pas de stats
    if (status === 'succeeded' && stats.length === 0) {
        return null;
    }

    return (
        <section className="py-20 sm:py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:padding-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                        Notre Impact en Chiffres
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Quelques données qui illustrent notre engagement et notre impact dans la communauté.
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                    {stats.map((stat) => {
                        const IconComponent = iconComponents[stat.icon] || HelpCircle;
                        return (
                            <motion.div
                                key={stat.id}
                                className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm w-full max-w-xs"
                            >
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-5">
                                    <IconComponent className="text-blue-600" size={32} />
                                </div>
                                <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                                <p className="text-base text-gray-500">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}