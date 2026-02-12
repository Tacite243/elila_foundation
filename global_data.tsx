import type { ContactInfo, SocialLink, SupportOption } from '@/types';
import { Mail, Phone, MapPin, Clock, Heart, User, MessageSquare, ExternalLink } from "lucide-react";

export const contactInfo: ContactInfo[] = [
    { icon: MapPin, title: "Notre Adresse", details: ["Goma, RDC; Bujumbura, Burundi", "République Démocratique du Congo"], color: "from-blue-500 to-cyan-500" },
    { icon: Mail, title: "Email", details: ["info.welead.africa@gmail.com", "weleadtodevelop1@gmail.com"], color: "from-green-500 to-emerald-500" },
    { icon: Phone, title: "Téléphone", details: ["+243 972 834 702", "+257 65 036 970"], color: "from-purple-500 to-indigo-500" },
    { icon: Clock, title: "Horaires", details: ["Lun - Ven: 8h00 - 17h00", "Sam: 9h00 - 13h00"], color: "from-pink-500 to-rose-500" }
];

export const socialLinks: SocialLink[] = [
    { icon: ExternalLink, href: "#", label: "Facebook", color: "hover:text-blue-600" },
    { icon: ExternalLink, href: "#", label: "Twitter", color: "hover:text-sky-500" },
    { icon: ExternalLink, href: "#", label: "Instagram", color: "hover:text-pink-600" },
    { icon: ExternalLink, href: "#", label: "LinkedIn", color: "hover:text-blue-700" },
];

export const supportOptions: SupportOption[] = [
    { title: "Dons Financiers", description: "Soutenez nos programmes par des contributions financières", icon: Heart, color: "from-red-500 to-pink-500" },
    { title: "Bénévolat", description: "Rejoignez notre équipe de bénévoles pour nos événements", icon: User, color: "from-green-500 to-emerald-500" },
    { title: "Partenariats", description: "Créons ensemble des synergies pour plus d'impact", icon: MessageSquare, color: "from-blue-500 to-cyan-500" }
];

import type { MediaItem } from "@/types";

export const categories = ["Tous", "Conférences", "Formations", "Actions Sociales", "Événements"];

export const mediaItems: MediaItem[] = [
    {
        id: 1,
        type: "image",
        src: "https://images.pexels.com/photos/8349230/pexels-photo-8349230.jpeg",
        title: "Conférence Leadership Jeunes 2024",
        category: "Conférences",
        date: "Mars 2024",
        location: "Université de Goma",
        description: "Conférence sur le leadership étudiant et le développement durable"
    },
    {
        id: 2,
        type: "image",
        src: "https://images.unsplash.com/photo-1682617367233-a44415de6361",
        title: "Master Class Gestion de Projets",
        category: "Formations",
        date: "Avril 2024",
        location: "Centre Communautaire",
        description: "Formation intensive sur la gestion de projets communautaires"
    },
    {
        id: 3,
        type: "image",
        src: "https://images.unsplash.com/photo-1739506314315-c7aff0d98d55",
        title: "Action Humanitaire Communautaire",
        category: "Actions Sociales",
        date: "Mai 2024",
        location: "Goma, Quartier Lac Vert",
        description: "Action de sensibilisation et d'aide à la communauté locale"
    },
    {
        id: 4,
        type: "image",
        src: "https://images.pexels.com/photos/5257457/pexels-photo-5257457.jpeg",
        title: "Séminaire Développement Durable",
        category: "Formations",
        date: "Juin 2024",
        location: "ISTM Goma",
        description: "Séminaire sur les objectifs de développement durable"
    },
    {
        id: 5,
        type: "image",
        src: "https://images.unsplash.com/photo-1703763873673-736d41a821e2",
        title: "Rencontre Réseau jeunes",
        category: "Événements",
        date: "Juillet 2024",
        location: "Université de Goma",
        description: "Rencontre annuelle du réseau d'jeunes elila foundation"
    },
    {
        id: 6,
        type: "image",
        src: "https://images.pexels.com/photos/17314968/pexels-photo-17314968.jpeg",
        title: "Cérémonie de Remise de Certificats",
        category: "Événements",
        date: "Août 2024",
        location: "Centre des Congrès",
        description: "Remise de certificats aux participants du programme de leadership"
    },
    {
        id: 7,
        type: "image",
        src: "https://images.pexels.com/photos/30164276/pexels-photo-30164276.jpeg",
        title: "Vue sur le Lac Kivu",
        category: "Événements",
        date: "Septembre 2024",
        location: "Goma, Lac Kivu",
        description: "Événement de réseautage au bord du magnifique Lac Kivu"
    },
    {
        id: 8,
        type: "image",
        src: "https://images.unsplash.com/photo-1645263012668-a6617115f9b9",
        title: "Promotion Diplômés 2024",
        category: "Événements",
        date: "Octobre 2024",
        location: "Université de Goma",
        description: "Célébration de la promotion des jeunes diplômés du programme"
    }
]

import { Article } from "@/types";



export const articles: Article[] = [
    {
        id: 1,
        slug: "lancement-programme-leadership-2025",
        title: "Lancement du Programme Leadership 2025",
        excerpt: "Découvrez notre nouveau programme de formation au leadership pour les jeunes de la région des Grands Lacs, axé sur les Objectifs de Développement Durable.",
        content: "Notre organisation lance un programme innovant de développement du leadership étudiant...",
        date: "25 Juillet 2025",
        author: "Équipe WLD",
        category: "Programmes",
        readTime: "5 min",
        image: "https://images.pexels.com/photos/8349230/pexels-photo-8349230.jpeg"
    },
    {
        id: 2,
        slug: "conference-internationale-developpement-durable",
        title: "Conférence Internationale sur le Développement Durable",
        excerpt: "Retour sur notre participation à la conférence internationale qui s'est tenue à Kigali.",
        date: "20 Juillet 2025",
        author: "Marie K.",
        content: "Le contenu complet de l'article sur la conférence. C'était un événement majeur où nous avons présenté nos projets...",
        category: "Événements",
        readTime: "3 min",
        image: "https://images.unsplash.com/photo-1682617367233-a44415de6361"
    },
    {
        id: 3,
        slug: "impact-de-nos-actions-communautaires",
        title: "Impact de nos Actions Communautaires",
        excerpt: "Bilan des projets communautaires menés par nos jeunes au cours du premier semestre 2025.",
        date: "15 Juillet 2025",
        author: "Jean-Baptiste M.",
        content: "Cet article détaille les résultats de nos actions, comme le nettoyage du lac Kivu et les campagnes de sensibilisation...",
        category: "Impact",
        readTime: "4 min",
        image: "https://images.unsplash.com/photo-1739506314315-c7aff0d98d55"
    },
    {
        id: 4,
        slug: "nouveau-partenariat-avec-l'université-de-goma",
        title: "Nouveau Partenariat avec l'Université de Goma",
        excerpt: "Formalisation d'un partenariat stratégique pour renforcer nos programmes de formation.",
        date: "10 Juillet 2025",
        author: "Grace N.",
        content: "Notre organisation lance un programme innovant de développement du leadership étudiant...",
        category: "Partenariats",
        readTime: "2 min",
        image: "https://images.pexels.com/photos/5257457/pexels-photo-5257457.jpeg"
    },
    {
        id: 5,
        slug: "formation-master-class:gestion-de-projets-communautaires",
        title: "Formation Master Class: Gestion de Projets Communautaires",
        excerpt: "Session intensive de formation sur la gestion de projets destinée aux leaders jeunes.",
        date: "5 Juillet 2025",
        author: "Équipe Formation",
        content: "Notre organisation lance un programme innovant de développement du leadership étudiant...",
        category: "Formation",
        readTime: "6 min",
        image: "https://images.pexels.com/photos/8349230/pexels-photo-8349230.jpeg"
    },
    {
        id: 6,
        slug: "témoignage-mon-parcours-de-leader-communautaire",
        title: "Témoignage: Mon Parcours de Leader Communautaire",
        excerpt: "Le témoignage inspirant d'un étudiant qui a transformé sa communauté grâce à nos programmes.",
        date: "1 Juillet 2025",
        author: "Étudiant Membre",
        content: "Notre organisation lance un programme innovant de développement du leadership étudiant...",
        category: "Témoignages",
        readTime: "7 min",
        image: "https://images.pexels.com/photos/17314968/pexels-photo-17314968.jpeg"
    }
];

export function getArticleBySlug(slug: string): Article | undefined {
    return articles.find(article => article.slug === slug);
};

import type { Program, UpcomingEvent } from '@/types';
import { BookOpen, Presentation, GraduationCap } from 'lucide-react';

export const programs: Program[] = [
    {
        icon: Presentation,
        title: "Conférences",
        description: "Conférences inspirantes sur le leadership et le développement durable",
        features: ["Speakers internationaux", "Thèmes ODD", "Networking étudiant"],
        color: "from-blue-500 to-cyan-500",
        image: "https://images.unsplash.com/photo-1682617367233-a44415de6361"
    },
    {
        icon: GraduationCap,
        title: "Master Class",
        description: "Sessions intensives de formation avec des experts du développement",
        features: ["Formation pratique", "Certification", "Mentorat personnalisé"],
        color: "from-green-500 to-emerald-500",
        image: "https://images.pexels.com/photos/8349230/pexels-photo-8349230.jpeg"
    },
    {
        icon: BookOpen,
        title: "Séminaires",
        description: "Ateliers interactifs sur les compétences de leadership",
        features: ["Ateliers pratiques", "Travaux de groupe", "Projets communautaires"],
        color: "from-purple-500 to-indigo-500",
        image: "https://images.pexels.com/photos/5257457/pexels-photo-5257457.jpeg"
    },
    {
        icon: Heart,
        title: "Actions Sociales",
        description: "Projets humanitaires et actions communautaires sur le terrain",
        features: ["Impact direct", "Engagement communautaire", "Projets durables"],
        color: "from-pink-500 to-rose-500",
        image: "https://images.unsplash.com/photo-1739506314315-c7aff0d98d55"
    }
];

export const upcomingEvents: UpcomingEvent[] = [
    {
        date: "15 Août 2025",
        title: "Conférence Leadership Jeunes",
        location: "Université de Goma",
        type: "Conférence"
    },
    {
        date: "22 Août 2025",
        title: "Master Class ODD",
        location: "Centre Communautaire",
        type: "Formation"
    },
    {
        date: "30 Août 2025",
        title: "Action Humanitaire",
        location: "Communauté locale",
        type: "Action Sociale"
    }
];