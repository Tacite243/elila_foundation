"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Newspaper, Users,
    Calendar,
    X, Briefcase,
    TrendingUp
} from 'lucide-react';


const navLinks = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Articles', href: '/admin/articles', icon: Newspaper },
    { name: 'Projets', href: '/admin/projects', icon: Briefcase },
    // { name: 'Offres d\'emploi', href: '/admin/jobs', icon: ClipboardCheck },
    // { name: 'Médias', href: '/admin/media', icon: Image },
    // { name: 'Programmes', href: '/admin/programs', icon: Presentation },
    { name: 'Événements', href: '/admin/events', icon: Calendar },
    { name: 'Impact', href: '/admin/impact', icon: TrendingUp },
    // { name: 'Infos Contact', href: '/admin/contact-info', icon: Phone },
    // { name: 'Liens Sociaux', href: '/admin/social-links', icon: Link2 },
    // { name: 'Options de Soutien', href: '/admin/support-options', icon: Heart },
];

interface AdminSidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
}

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }: AdminSidebarProps) {
    const pathname = usePathname();

    return (
        <>
            {/* Overlay pour mobile : apparaît quand le menu est ouvert et le ferme au clic */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="lg:hidden fixed inset-0 bg-black opacity-50 z-20"
                ></div>
            )}

            {/* La sidebar elle-même */}
            <aside
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white p-4 transform transition-transform duration-300 ease-in-out 
                   ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                   lg:translate-x-0 lg:static lg:inset-0`}
            >
                <div className="flex justify-between items-center mb-8">
                    <Link href="/" className="text-2xl font-bold">WeLead Admin</Link>
                    {/* Bouton pour fermer sur mobile */}
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <nav>
                    <ul>
                        {navLinks.map((link) => {
                            // On vérifie si pathname existe avant de faire les comparaisons.
                            const isActive = pathname ? (pathname === link.href || pathname.startsWith(link.href + '/')) : false;
                            return (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={() => setSidebarOpen(false)} // Ferme le menu au clic sur un lien sur mobile
                                        className={`flex items-center p-3 my-1 rounded-md transition-colors ${isActive ? 'bg-green-600' : 'hover:bg-gray-700'
                                            }`}
                                    >
                                        <link.icon className="mr-3" />
                                        {link.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}