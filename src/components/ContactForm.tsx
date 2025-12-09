'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export default function ContactForm() {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Formulaire de contact soumis:", formData);
        alert("Merci pour votre message ! Nous vous répondrons bientôt.");
    };

    return (
        <motion.form
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2"><User className="inline mr-2" size={18} />Nom Complet</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Votre nom" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2"><Mail className="inline mr-2" size={18} />Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="votre.email@example.com" required />
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2"><MessageSquare className="inline mr-2" size={18} />Sujet</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Sujet de votre message" required />
            </div>
            <div className="mb-8">
                <label className="block text-gray-700 font-semibold mb-2"><MessageSquare className="inline mr-2" size={18} />Message</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500" placeholder="Écrivez votre message ici..." required></textarea>
            </div>
            <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl">
                <Send size={20} />
                <span>Envoyer le Message</span>
            </motion.button>
        </motion.form>
    );
}