'use client'
import React from "react";
import { motion } from "framer-motion";
import { Users, Target, BookOpen, Heart } from "lucide-react";

// Interface pour les features
interface Feature {
    icon: React.ElementType;
    title: string;
    description: string;
    color: string;
}

export default function FeaturesSection() {
    // const fadeInUp = {
    //     initial: { opacity: 0, y: 60 },
    //     animate: { opacity: 1, y: 0 },
    //     transition: { duration: 0.6 }
    // };

    // const staggerContainer = {
    //     animate: {
    //         transition: {
    //             staggerChildren: 0.1
    //         }
    //     }
    // };

    const features: Feature[] = [
        {
            icon: Users,
            title: "Réseau d'jeunes",
            description: "Créer un réseau d'jeunes acteurs du développement communautaire",
            color: "from-blue-500 to-cyan-500"
        },
        {
            icon: Target,
            title: "Objectifs de Développement",
            description: "Contribuer activement aux ODD face aux problèmes communautaires",
            color: "from-green-500 to-emerald-500"
        },
        {
            icon: BookOpen,
            title: "Leadership Étudiant",
            description: "Habiliter les jeunes par le leadership et la formation",
            color: "from-purple-500 to-indigo-500"
        },
        {
            icon: Heart,
            title: "Impact Communautaire",
            description: "Agents du changement pour le développement durable",
            color: "from-pink-500 to-rose-500"
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                        Notre Impact en Chiffres
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Depuis 2023, nous créons un réseau d&apos;jeunes engagés pour le développement durable
                    </p>
                </motion.div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                                    <IconComponent className="text-white" size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}