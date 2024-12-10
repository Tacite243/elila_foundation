'use client'

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import '@/app/globals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const Header: React.FC = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    const toggleMobileNav = () => {
        setIsMobileNavOpen(!isMobileNavOpen);
    };

    const menuItems = [
        { href: "#hero", label: "Acceuil", active: true },
        { href: "#about", label: "A propos" },
        { href: "#cards", label: "Nos formations" },
        { href: "#projects", label: "Nos projets" },
        { href: "#team", label: "Team" },
        {
            label: "Actualités",
            dropdown: [
                { href: "#", label: "Dropdown 1" },
                {
                    label: "Deep Dropdown",
                    dropdown: [
                        { href: "#", label: "Deep Dropdown 1" },
                        { href: "#", label: "Deep Dropdown 2" },
                        { href: "#", label: "Deep Dropdown 3" },
                        { href: "#", label: "Deep Dropdown 4" },
                        { href: "#", label: "Deep Dropdown 5" },
                    ]
                },
                { href: "#", label: "Dropdown 2" },
                { href: "#", label: "Dropdown 3" },
                { href: "#", label: "Dropdown 4" },
            ]
        },
        { href: "#contact", label: "Nous contacter" },
    ];

    const renderMenu = (items: { href?: string; label: string; active?: boolean; dropdown?: { href?: string; label: string; dropdown?: { href?: string; label: string; }[] }[] }[]) =>
        items.map((item, index) => (
            <li key={index} className={item.dropdown ? "dropdown" : ""}>
                <Link href={item.href || "#"} className={item.active ? "active" : ""}>
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
                    <Image src="/elila-logo.png" alt="Logo" width={50} height={50} />
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
