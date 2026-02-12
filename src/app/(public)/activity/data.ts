import type { Program, UpcomingEvent } from '@/types';
import { BookOpen, Presentation, GraduationCap, Heart } from 'lucide-react';

export const programs: Program[] = [
    {
        icon: Presentation,
        title: "Conférences",
        description: "Conférences inspirantes sur le leadership et le développement durable",
        features: ["Speakers internationaux", "Thèmes ODD", "Networking étudiant"],
        color: "from-blue-500 to-cyan-500",
        image: "/images/1.jpeg"
    },
    {
        icon: GraduationCap,
        title: "Master Class",
        description: "Sessions intensives de formation avec des experts du développement",
        features: ["Formation pratique", "Certification", "Mentorat personnalisé"],
        color: "from-green-500 to-emerald-500",
        image: "/images/2.jpeg"
    },
    {
        icon: BookOpen,
        title: "Séminaires",
        description: "Ateliers interactifs sur les compétences de leadership",
        features: ["Ateliers pratiques", "Travaux de groupe", "Projets communautaires"],
        color: "from-purple-500 to-indigo-500",
        image: "/images/3.jpeg"
    },
    {
        icon: Heart,
        title: "Actions Sociales",
        description: "Projets humanitaires et actions communautaires sur le terrain",
        features: ["Impact direct", "Engagement communautaire", "Projets durables"],
        color: "from-pink-500 to-rose-500",
        image: "/images/5.jpeg"
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