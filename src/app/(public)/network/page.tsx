'use client'

import DynamicNetworkForm from '@/components/DynamicNetworkForm';
import { Users, Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';



const benefits = [
    {
        icon: Users,
        // title: "Communauté Engagée",
        description: "Développer vos compétences personnelles et professionnelles à travers des formations, ateliers et coaching"
    },
    {
        icon: Star,
        // title: "Opportunités Uniques",
        description: "Participer à des projets concrets qui répondent aux besoins de votre communauté."
    },
    {
        icon: Quote,
        // title: "Mentorat de Qualité",
        description: "Contribuer à l’autonomisation, à l’éducation et à la durabilité environnementale sur votre territoire et à l’échelle du continent."
    },
    // {
    //     icon: Users,
    //     // title: "Communauté Engagée",
    //     description: "Rejoindre une communauté solidaire et innovante d’agents de changement engagés pour un Africa digne, prospère et uni."
    // },
];
const testimonials = [
    {
        name: "Marie Uwimana",
        university: "Université de Goma",
        year: "2024",
        quote: "elila foundation m'a permis de développer mes compétences de leadership et de contribuer concrètement au développement de ma communauté.",
        // image: "https://images.pexels.com/photos/17314968/pexels-photo-17314968.jpeg"
    },
    {
        name: "Jean-Baptiste Mukendi",
        university: "ISTM Goma",
        year: "2023",
        quote: "Grâce au réseau, j'ai pu mener des projets d'impact social et rencontrer des jeunes partageant la même vision du développement durable.",
        // image: "https://images.unsplash.com/photo-1645263012668-a6617115f9b9"
    },
    {
        name: "Grace Nyota",
        university: "UOB Bukavu",
        year: "2024",
        quote: "L'expérience avec elila foundation a transformé ma vision du leadership étudiant et de l'engagement communautaire.",
        // image: "https://images.pexels.com/photos/17314968/pexels-photo-17314968.jpeg"
    }
];

export default function NetworkPage() {
    return (
        <main className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="py-24 bg-gradient-to-br from-green-50 to-blue-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -60 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                                Rejoignez Notre{" "}
                                <span className="bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
                                    Réseau
                                </span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed mb-8">
                                Devenez ACTEUR du développement communautaire et culturel, et AGENT du changement dans votre région. Notre réseau vous offre les outils et l&apos;accompagnement nécessaires pour créer un impact positif et durable.
                            </p>
                            <div className="flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center space-x-2">
                                    <Users size={18} />
                                    <span>200+ jeunes</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Star size={18} />
                                    <span>5 Universités</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative">
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96">
                                <Image
                                    src="/images/7.jpeg"
                                    alt="Student network working together"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    priority // L'image est en haut de page
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
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
                            Pourquoi Nous Rejoindre ?
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Rejoindre WeLead Africa, c’est faire partie d’un réseau dynamique qui valorise le potentiel des jeunes africains. Vous aurez l’opportunité de :
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -10, scale: 1.02 }}
                                    className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <IconComponent className="text-white" size={28} />
                                    </div>
                                    {/* <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3> */}
                                    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
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
                            Témoignages d&apos;jeunes
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Découvrez l&apos;expérience de nos membres et leur parcours dans le réseau
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                            >
                                <div className="flex items-center mb-6">
                                    {/* <Image
                                        // src={testimonial.image}
                                        // alt={testimonial.name}
                                        fill
                                        className="w-12 h-12 rounded-full object-cover mr-4"
                                    /> */}
                                    <div>
                                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                                        <p className="text-sm text-gray-600">{testimonial.university} • {testimonial.year}</p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-700 leading-relaxed italic">
                                    &quot;{testimonial.quote}&quot;
                                </blockquote>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Registration Form Section */}
            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                            Inscription au Réseau
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Remplissez ce formulaire pour rejoindre notre communauté d&apos;jeunes engagés
                        </p>
                    </motion.div>
                    <DynamicNetworkForm />
                </div>
            </section>
        </main>
    );
}