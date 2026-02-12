'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, User, MessageSquare, Send, Star } from 'lucide-react';

// Interface pour le state du formulaire
interface FormData {
    name: string;
    email: string;
    university: string;
    motivation: string;
}

export default function NetworkForm() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        university: '',
        motivation: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Ici, vous géreriez la soumission, par exemple avec une API route Next.js
        console.log("Formulaire soumis:", formData);
        alert('Merci pour votre candidature !');
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl border border-gray-100"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Champ Nom Complet */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <User className="inline mr-2" size={18} />
                        Nom Complet
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="Votre nom complet"
                        required
                    />
                </div>
                {/* Champ Email */}
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        <Mail className="inline mr-2" size={18} />
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        placeholder="votre.email@example.com"
                        required
                    />
                </div>
            </div>
            {/* ... autres champs ... */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                    <Star className="inline mr-2" size={18} />
                    Université / Institution
                </label>
                <input
                    type="text"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Nom de votre université"
                    required
                />
            </div>
            <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2">
                    <MessageSquare className="inline mr-2" size={18} />
                    Motivation
                </label>
                <textarea
                    name="motivation"
                    value={formData.motivation}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    placeholder="Pourquoi souhaitez-vous rejoindre notre réseau ?"
                    required
                ></textarea>
            </div>

            <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all duration-300"
            >
                <Send size={20} />
                <span>Envoyer ma Candidature</span>
            </motion.button>
        </motion.form>
    );
}