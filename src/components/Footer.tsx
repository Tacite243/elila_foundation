'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Clock, Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
// import LoginPopup from './LoginPopup'; // Assurez-vous que ce composant existe

// --- Données du Footer ---
const footerSections = [
  {
    Icon: MapPin,
    title: 'Adresse',
    lines: ['Goma', 'Rue Mutinga-Afia bora,', "en face de l'hôpital la famille"],
  },
  {
    Icon: Phone,
    title: 'Contact',
    lines: ['Téléphone: +243 990 868 155', 'Email: contact@elilafoundation.org'],
  },
  {
    Icon: Clock,
    title: 'Heures de services',
    lines: ['Lundi - Samedi : 08h00 - 17h00', 'Dimanche : Fermé'],
  },
];

const socialLinks = [
  { Icon: Twitter, href: '#', name: 'Twitter' },
  { Icon: Facebook, href: '#', name: 'Facebook' },
  { Icon: Instagram, href: '#', name: 'Instagram' },
  { Icon: Linkedin, href: '#', name: 'Linkedin' },
];

export default function Footer() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Grille principale d'informations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">
          {footerSections.map((section, index) => (
            <div key={index}>
              <div className="flex items-center mb-4">
                <section.Icon className="h-6 w-6 mr-3 text-accent" />
                <h4 className="text-xl font-bold">{section.title}</h4>
              </div>
              <div className="space-y-1 text-primary-foreground/80">
                {section.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Section Réseaux Sociaux */}
          <div>
            <div className="flex items-center mb-4">
              <h4 className="text-xl font-bold">Nos réseaux sociaux</h4>
            </div>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <Link key={index} href={social.href} target="_blank" rel="noopener noreferrer"
                      className="h-10 w-10 bg-primary-foreground/10 rounded-full flex items-center justify-center
                                 text-primary-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors duration-300">
                  <span className="sr-only">{social.name}</span>
                  <social.Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-primary-foreground/20 pt-8 text-center text-primary-foreground/70">
          <p>
            © Copyright {new Date().getFullYear()} <button onClick={() => setShowLogin(true)} className="font-semibold text-primary-foreground hover:text-accent transition-colors p-0 bg-transparent border-none cursor-pointer">Elila Foundation</button>. Tous droits réservés.
          </p>
          {/* {showLogin && <LoginPopup onClose={() => setShowLogin(false)} />} */}
          <p className="text-sm mt-2">
            Designed by Professor
          </p>
        </div>
      </div>
    </footer>
  );
}