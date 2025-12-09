"use client"

import { motion } from "framer-motion";
import Link from "next/link";


export default function CtaSection() {
    return (
        <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                        Prêt à Devenir Acteur du Changement ?
                    </h2>
                    <p className="text-xl text-white/90 mb-8 leading-relaxed">
                        Rejoignez notre réseau d&apos;jeunes engagés et contribuez au développement durable
                        à Goma et dans la région des Grands Lacs
                    </p>
                    <Link href="/programs"> {/* ce lien doit pointer vers le plan stratégique */}
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
                        >
                            Découvrir Nos Programmes
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}