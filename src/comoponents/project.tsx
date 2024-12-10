'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import AOS from 'aos';


const ProjectSection = () => {
    
    const portfolioItems = [
        { id: 1, category: 'done', title: 'Réalisé', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/app-1.jpg' },
        { id: 2, category: 'progress', title: 'En cours', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/product-1.jpg' },
        { id: 3, category: 'feature', title: 'A venir', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/branding-1.jpg' },
        { id: 4, category: 'ideal', title: 'Idéal', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/books-1.jpg' },
        { id: 5, category: 'done', title: 'Réalisé', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/app-2.jpg' },
        { id: 6, category: 'progress', title: 'En cours', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/product-2.jpg' },
        { id: 7, category: 'feature', title: 'A venir', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/branding-2.jpg' },
        { id: 8, category: 'ideal', title: 'Idéal', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/books-2.jpg' },
        { id: 9, category: 'done', title: 'Réalisé', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/app-3.jpg' },
        { id: 10, category: 'progress', title: 'En cours', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/product-3.jpg' },
        { id: 11, category: 'feature', title: 'A venir', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/branding-3.jpg' },
        { id: 12, category: 'ideal', title: 'Idéal', description: 'Lorem ipsum, dolor sit amet consectetur', imgSrc: '/img/portfolio/books-3.jpg' }
    ];

    const [filter, setFilter] = useState('*');

    const filteredItems = portfolioItems.filter(item => filter === '*' || item.category === filter);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            AOS.init(); // Initialisation d'AOS
        }
    }, []);

    return (
        <section id="portfolio" className="portfolio section">
            <div className="container section-title" data-aos="fade-up">
                <h2>Nos Projets</h2>
                <p>Voici un recaputulatif de toutes nos réalisations et de nos projets en cours d&#39;exécution</p>
            </div>

            <div className="container">
                <div className="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">
                    <ul className="portfolio-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
                        <li data-filter="*" className={filter === '*' ? 'filter-active' : ''} onClick={() => setFilter('*')}>tous</li>
                        <li data-filter=".filter-app" className={filter === 'done' ? 'filter-active' : ''} onClick={() => setFilter('done')}>Réalisés</li>
                        <li data-filter=".filter-product" className={filter === 'progress' ? 'filter-active' : ''} onClick={() => setFilter('progress')}>En cours</li>
                        <li data-filter=".filter-branding" className={filter === 'feature'? 'filter-active' : ''} onClick={() => setFilter('feature')}>A venir</li>
                        <li data-filter=".filter-books" className={filter === 'ideal' ? 'filter-active' : ''} onClick={() => setFilter('ideal')}>Idéal</li>
                    </ul>

                    <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
                        {filteredItems.map(item => (
                            <div key={item.id} className={`col-lg-4 col-md-6 portfolio-item isotope-item filter-${item.category}`}>
                                <div className="portfolio-content h-100">
                                    <Image src={item.imgSrc} className="img-fluid" alt={item.title} width={1000} height={1000} />
                                    <div className="portfolio-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.description}</p>
                                        <a href={item.imgSrc} title={item.title} data-gallery={`portfolio-gallery-${item.category}`} className="glightbox preview-link">
                                            <i className="bi bi-zoom-in"></i>
                                        </a>
                                        <a href="portfolio-details.html" title="More Details" className="details-link">
                                            <i className="bi bi-link-45deg"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectSection;