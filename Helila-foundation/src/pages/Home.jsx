import React from 'react';
import Header from '../components/Header';
import BackgroundCarousel from '../components/BackgroundCarousel';
import Counter from '../components/Counter';
import Citation from '../components/Citation';
import AboutSection from '../components/AboutSection';
import ContactSection from '../components/ContactSection';


export default function Home() {
    return (
        <div>
            <Header />
            <main>
                <div className="home-first-section">
                    <div className="info-card">
                        <h1 className='home-title'>Bienvenue sur Helila Foundation.net</h1>
                        <ul className='list-deroulable'>
                            <li>Actualités</li>
                            <li>Qui sommes-nous ?</li>
                            <li>Identifies-toi</li>
                        </ul>
                    </div>
                    <div className="description">
                        <p>La Elila Foundation est une organisation dédiée au développement socioéconomique, culturel et politique de l'espace Lega, couvrant les territoires de Mwenga, Walikale, Pangi et Shabunda, avec des initiatives visant à autonomiser les communautés locales et à promouvoir un avenir prospère et inclusif.</p>
                    </div>
                </div>
                <Citation />
                <div className="counter">
                    <div className="items">
                        <div className="item">
                            <h1>Plus de <Counter target={10} speed={1000} /></h1>
                            <p>Projets réalisés</p>
                        </div>
                        <div className="item">
                            <h1>Plus de <Counter target={1000} speed={10} /></h1>
                            <p>Personnes identifiées</p>
                        </div>
                        <div className="item">
                            <h1>Plus de <Counter target={1000} speed={10} /></h1>
                            <p>Témoignages</p>
                        </div>
                    </div>
                </div>
                <AboutSection />
                <ContactSection/>
            </main>
        </div>
    );
};