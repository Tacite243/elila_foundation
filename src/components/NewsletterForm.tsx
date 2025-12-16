'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Subscribing email: ${email}`);
    // Logique pour soumettre l'email à votre service
    alert('Merci pour votre abonnement !');
    setEmail('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
    >
      <input
        type="email"
        placeholder="Votre adresse email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1 px-4 py-3 rounded-lg focus:ring-2 focus:ring-white focus:outline-none text-gray-900"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
      >
        S&apos;abonner
      </motion.button>
    </form>
  );
}