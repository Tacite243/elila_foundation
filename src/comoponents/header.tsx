'use client';

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from 'next/navigation';
import '@/app/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const pathname = usePathname(); // Récupérer la route actuelle

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const menuItems = [
        { href: "#hero", label: "Acceuil" },
        { href: "#about", label: "A propos" },
        { href: "#cards", label: "Nos formations" },
        { href: "#projects", label: "Nos projets" },
        { href: "#team", label: "Team" },
        {
            label: "Actualités",
            dropdown: [
                { href: "#dropdown1", label: "Dropdown 1" },
                {
                    label: "Deep Dropdown",
                    dropdown: [
                        { href: "#deep-dropdown1", label: "Deep Dropdown 1" },
                        { href: "#deep-dropdown2", label: "Deep Dropdown 2" },
                    ]
                },
                { href: "#dropdown2", label: "Dropdown 2" },
            ]
        },
        { href: "#contact", label: "Nous contacter" },
    ];

    // Fonction pour générer les liens avec gestion des ancres sur la page d'accueil
    const generateHref = (href: string) => {
        if (pathname === "/" && href.startsWith("#")) {
            return href; // Si sur la page d'accueil, utiliser uniquement l'ancre
        }
        return `/${href}`; // Sinon, préfixer avec "/"
    };

    const renderMenu = (
        items: {
            href?: string;
            label: string;
            dropdown?: { href?: string; label: string; dropdown?: { href?: string; label: string; }[] }[];
        }[]
    ) =>
        items.map((item, index) => (
            <li key={index} className={item.dropdown ? "dropdown" : ""}>
                <Link
                    href={generateHref(item.href || "#")}
                    scroll={pathname === "/" || !item.href?.startsWith("#")} // Permettre le défilement uniquement sur les ancres internes
                >
                    <span>{item.label}</span>
                    {item.dropdown && <i className="bi bi-chevron-down toggle-dropdown"></i>}
                </Link>
                {item.dropdown && <ul>{renderMenu(item.dropdown)}</ul>}
            </li>
        ));

    return (
        <header id="header" className="header d-flex align-items-center sticky-top">
            <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
                <Link href="/" className="logo d-flex align-items-center">
                    {/* <Image src="/elila-logo.png" alt="Logo" width={50} height={50} /> */}
                    <h1>Elila foundation</h1>
                </Link>

                <nav
                    id="navmenu"
                    className={`navmenu ${isMobileNavOpen ? "mobile-nav-active" : ""}`}
                >
                    <ul>{renderMenu(menuItems)}</ul>
                    <i
                        className="mobile-nav-toggle d-xl-none bi bi-list"
                        onClick={toggleMobileNav}
                    ></i>
                </nav>
            </div>
        </header>
    );
};

export default Header;