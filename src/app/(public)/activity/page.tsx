"use client"

import { Calendar, MapPin, Award, LucideProps } from 'lucide-react';
import Image from 'next/image';
import { AnimatedBlock } from '@/components/AnimatedBlockPrograms';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchPublicPrograms } from '@/redux/slices/programsSlice';
import { fetchPublicEvents } from '@/redux/slices/eventsSlice';
import { RootState } from '@/redux/store';


// Mappage des noms d'icônes
const iconComponents: { [key: string]: React.FC<LucideProps> } = {
    Award: Award,
    Calendar: Calendar,
    MapPin: MapPin,
    // LucideProps: LucideProps,
};

export default function ActivityPage() {
    const dispatch = useAppDispatch();
    const { publicItems: programs, publicStatus: programsStatus } = useAppSelector((state: RootState) => state.programs);
    const { publicItems: upcomingEvents, publicStatus: eventsStatus } = useAppSelector((state: RootState) => state.events);

    useEffect(() => {
        if (programsStatus === 'idle') dispatch(fetchPublicPrograms());
        if (eventsStatus === 'idle') dispatch(fetchPublicEvents());
    }, [programsStatus, eventsStatus, dispatch]);

    return (
        <main className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="py-24 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <AnimatedBlock>
                        <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                            Nos{" "}
                            <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                                Activités
                            </span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                            elila foundation déploie une variété d’activités pour accompagner, former et mobiliser la jeunesse africaine, en présentiel comme en ligne. Ces initiatives incluent : conférences, séminaires, ateliers, webinaires, hackathons, sessions de coaching, formations et débats.
                        </p>
                    </AnimatedBlock>
                </div>
            </section>

            {/* Programs Grid */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Gérer l'état de chargement des programmes */}
                        {programsStatus === 'loading' && <p>Chargement des programmes...</p>}
                        {programs.map((program, index) => {
                            const IconComponent = iconComponents[program.icon] || Award;
                            return (
                                <AnimatedBlock
                                    key={index}
                                    delay={index * 0.1}
                                    whileHover={{ y: -10 }}
                                    className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
                                >
                                    <div className="relative h-48">
                                        <Image src={program.image} alt={program.title} fill style={{ objectFit: 'cover' }} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                        <div className={`absolute top-4 left-4 w-12 h-12 bg-gradient-to-r ${program.color} rounded-xl flex items-center justify-center`}>
                                            <IconComponent className="text-white" size={24} />
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
                                        <p className="text-gray-600 mb-6 leading-relaxed">{program.description}</p>
                                        <div className="space-y-3">
                                            {program.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center space-x-3">
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${program.color}`}></div>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                        <button className={`mt-6 px-6 py-3 bg-gradient-to-r ${program.color} text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                                            En Savoir Plus
                                        </button>
                                    </div>
                                </AnimatedBlock>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedBlock className="text-center mb-16">
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Événements à Venir</h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Rejoignez-nous pour nos prochains événements...</p>
                    </AnimatedBlock>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {upcomingEvents.map((event, index) => (
                            <AnimatedBlock
                                key={index}
                                delay={index * 0.1}
                                whileHover={{ y: -5, scale: 1.02 }}
                                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">{event.type}</span>
                                    <Calendar className="text-gray-400" size={20} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                                <div className="space-y-2 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2"><Calendar size={16} />
                                        <span>
                                            {event.date
                                                ? new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
                                                : 'Date à confirmer'}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2"><MapPin size={16} /><span>{event.location}</span></div>
                                </div>
                                <button className="mt-4 w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                                    S&apos;inscrire
                                </button>
                            </AnimatedBlock>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <AnimatedBlock>
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                            <Award className="text-white" size={36} />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">Prêt à Rejoindre Nos Programmes ?</h2>
                        <p className="text-xl text-white/90 mb-8 leading-relaxed">Développez vos compétences de leadership...</p>
                        <a
                            href="https://wa.me/VOTRE_NUMERO_ICI"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl inline-block text-center"
                        >
                            Rejoindre Maintenant
                        </a>
                    </AnimatedBlock>
                </div>
            </section>
        </main>
    );
}