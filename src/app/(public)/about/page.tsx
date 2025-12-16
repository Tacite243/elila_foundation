'use client';

import React from "react";
import { motion } from "framer-motion";
import { Target, Heart, Globe, Users, Award, Calendar, Phone, Mail } from "lucide-react";
import Image from "next/image";

// ÉTAPE 3: Définir des interfaces pour nos données avec TypeScript
interface Value {
    icon: React.ElementType;
    title: string;
    description: string;
}

interface TeamMember {
    name: string;
    role: string;
    image: string;
    phone?: string;
    email?: string;
}


export default function AboutPage() {
    // const fadeInUp = {
    //     initial: { opacity: 0, y: 60 },
    //     animate: { opacity: 1, y: 0 },
    //     transition: { duration: 0.6 }
    // };

    const values: Value[] = [
        {
            icon: Target,
            title: "Autonomisation",
            description: "Encourager les jeunes à prendre en main leur développement personnel et professionnel."
        },
        {
            icon: Heart,
            title: "Fraternité",
            description: "Promouvoir l’unité, la solidarité et la collaboration entre les jeunes et les communautés."
        },
        {
            icon: Globe,
            title: "Respect (et Dignité)",
            description: " Former des jeunes conscients de l’impact de leurs actions et qui agissent avec intégrité et dignité."
        },
        {
            icon: Users,
            title: "Innovation",
            description: "Stimuler la créativité et la pensée originale pour résoudre les défis du continent."
        },
        {
            icon: Target,
            title: "Culture",
            description: "Valoriser l’identité, le patrimoine et les traditions africaines."
        },
        {
            icon: Heart,
            title: "Ambition",
            description: "Inspirer les jeunes à viser l’excellence et à contribuer activement à la prospérité de l’Afrique."
        },
    ];

    const teamMembers: TeamMember[] = [
        {
            name: "Jomo KINYATA",
            role: "Président du C.A",
            // description: "Visionnaire du développement communautaire des jeunes africains",
            image: "/images/jomo.jpeg",
            email: "j.kinyata@example.com",
            phone: "+243 123 456 789"
        },
        {
            name: "MWENDELWA David Alse",
            role: "Responsable TIC & Coordination des projets",
            // description: "Expert en numérique & organisation des programmes",
            image: "/images/alse.png",
            email: "da.mwendelwa@example.com",
            phone: "+243 123 456 789"
        },
        {
            name: "Attie-Write MUZALIWA",
            role: "Coordonatrice",
            // description: "Juriste et chargée de la coordination des activités",
            image: "/images/attie.png",
            email: "aw.muzaliwa@example.com",
            phone: "+243 123 456 789"
        },
        {
            name: "Josias MAHAMBA",
            role: "Responsable RH & Logistique",
            // description: "Expert en numérique & organisation des programmes",
            image: "/images/josias.jpeg",
            email: "j.mahamba@example.com",
        },
        {
            name: "Robin MALEKE",
            role: "Graphiste Designer ",
            // description: "Juriste et chargée de la coordination des activités",
            image: "/images/robin.png",
            email: "r.maleke@example.com",
            phone: "+243 123 456 789"
        },
        {
            name: "Tacite WAKILONGO",
            role: "Développeur",
            // description: "Visionnaire du développement communautaire des jeunes africains",
            image: "/images/tacite.jpg",
            email: "t.wakilongo@example.com",
        }
    ];

    return (
        <main className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="py-24 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                                À Propos de{" "}
                                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                                    Nous
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                elila foundation est une organisation à but non lucratif fondée en 2023 à Goma,
                                Nord-Kivu, dédiée à habiliter les jeunes de la région des Grands Lacs.
                            </p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center space-x-2">
                                    <Calendar size={18} />
                                    <span>Fondée en 2023</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Globe size={18} />
                                    <span>Goma, RDC; Bujumbura, Burundi</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
                                <Image
                                    src="/images/4.jpeg"
                                    alt="Illustration"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                                <Target className="text-white" size={28} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Mission</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                WeLead Africa prépare la jeunesse africaine pour qu’elle transforme son potentiel en impact durable, devenant agents de changement et acteurs de développement au service de leurs communautés et du continent.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6">
                                <Heart className="text-white" size={28} />
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Notre Vision</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Une Afrique digne et prospère, où chaque jeune, sans distinction, contribue activement à bâtir un monde vivable et florissant pour tous.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Nos Valeurs
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Les principes qui guident notre action pour un développement durable et inclusif
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {values.map((value, index) => {
                            // On extrait la première lettre du titre, ex: "A" de "A – Autonomisation"
                            const initialLetter = value.title.charAt(0);

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10 }}
                                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center flex flex-col"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 flex-shrink-0">
                                        {/* On remplace l'icône par la lettre, avec un style adapté */}
                                        <span className="text-white text-3xl font-bold">{initialLetter}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                                    <p className="text-gray-600 leading-relaxed flex-grow">{value.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Notre Équipe
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Nous transformons le potentiel en impact Durable
                        </p>
                    </motion.div>

                    {/* --- GRILLE RESPONSIVE OPTIMISÉE --- */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                // La carte est un conteneur flex vertical
                                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 flex flex-col items-center"
                            >
                                {/* Image bien centrée et cadrée */}
                                <div className="relative w-32 h-32 mb-6 flex-shrink-0">
                                    <Image
                                        src={member.image}
                                        alt={`Photo de ${member.name}`}
                                        fill
                                        sizes="128px"
                                        className="rounded-full object-cover shadow-lg border-4 border-white"
                                    />
                                </div>

                                {/* Nom et Rôle */}
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                                <p className="text-green-600 font-semibold mb-6">{member.role}</p>

                                {/* Conteneur pour les coordonnées qui prendra l'espace restant */}
                                <div className="mt-auto w-full pt-6 border-t border-gray-200 space-y-3">
                                    {/* Affiche l'email seulement s'il existe */}
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} className="flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                                            <Mail size={16} />
                                            <span>{member.email}</span>
                                        </a>
                                    )}

                                    {/* Affiche le téléphone seulement s'il existe */}
                                    {member.phone && (
                                        <a href={`tel:${member.phone}`} className="flex items-center justify-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                                            <Phone size={16} />
                                            <span>{member.phone}</span>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* History Section */}
            <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-sm">
                            <Award className="text-white" size={36} />
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                            Notre Histoire
                        </h2>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Fondée en 2023 dans la province du Nord-Kivu en RDC par deux jeunes anciens
                            étudiants, Jomo Kinyata et Hatuwa Muzaliwa, WeLead Africa est née de leur
                            expérience personnelle face aux défis quotidiens rencontrés par la jeunesse
                            africaine. Initialement lancé sous la forme du programme We Lead to Develop,
                            l’initiative a rapidement évolué. Après une analyse approfondie des besoins des
                            jeunes africains, la structure a été rebaptisée WeLead Africa, afin de mieux
                            refléter sa mission d’autonomisation et de développement des jeunes à l’échelle
                            du continent.
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}