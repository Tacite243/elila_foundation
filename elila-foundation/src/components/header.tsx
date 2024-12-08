'use client'

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentPath, setCurrentPath] = useState("");

    useEffect(() => {
        setCurrentPath(window.location.pathname); // Récupère le chemin de la page actuelle
    }, []);

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

    return (
        <header id="header" className="header d-flex align-items-center position-relative">
            <div className="container-fluid container-xl d-flex align-items-center justify-content-between">
                {/* Logo */}
                <Link href="/" className="logo d-flex align-items-center">
                    <Image
                        src="/elila-logo.png"
                        alt="logo de elila foundation"
                        width={100} height={40}
                        priority // pour optimiser le chargement du logo
                    />
                </Link>

                {/* Navigation */}
                <nav id="navmenu" className="navmenu">
                    <ul>
                        {['/', '/about', '/services', '/testimonials', '/blog', '/contact'].map((path) => (
                            <li key={path}>
                                <Link href={path} className={currentPath === path ? 'active' : ''}>
                                    {path.charAt(1).toUpperCase() + path.slice(2) || 'Home'}
                                </Link>
                            </li>
                        ))}
                        <li className={`dropdown ${isDropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
                            <a href="#" role="button" aria-expanded={isDropdownOpen ? 'true' : 'false'}>
                                <span>Dropdown</span>
                                <i className="bi bi-chevron-down toggle-dropdown"></i>
                            </a>
                            {isDropdownOpen && (
                                <ul>
                                    <li><a href="#">Dropdown 1</a></li>
                                    <li className="dropdown">
                                        <a href="#" role="button">
                                            <span>Deep Dropdown</span>
                                            <i className="bi bi-chevron-down toggle-dropdown"></i>
                                        </a>
                                        <ul>
                                            {['Deep Dropdown 1', 'Deep Dropdown 2', 'Deep Dropdown 3'].map((item, index) => (
                                                <li key={index}><a href="#">{item}</a></li>
                                            ))}
                                        </ul>
                                    </li>
                                    {['Dropdown 2', 'Dropdown 3', 'Dropdown 4'].map((item, index) => (
                                        <li key={index}><a href="#">{item}</a></li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    </ul>
                    <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
                </nav>
            </div>
        </header>
    );
};

export default Header;