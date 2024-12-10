'use client'

import Image from 'next/image';
import { useState } from 'react';

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const images = [
        { src: '/img/hero_1.jpg', alt: 'Farming is the best solution of worlds starvation', title: 'Farming is the best solution of worlds starvation', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { src: '/img/hero_2.jpg', alt: 'Organic vegetables is good for health', title: 'Organic vegetables is good for health', description: 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.' },
        { src: '/img/hero_3.jpg', alt: 'Providing Fresh Produce Every Single Day', title: 'Providing Fresh Produce Every Single Day', description: 'Beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.' },
        { src: '/img/hero_4.jpg', alt: 'Farming as a Passione', title: 'Farming as a Passione', description: 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius.' },
        { src: '/img/hero_5.jpg', alt: 'Good Food For All', title: 'Good Food For All', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
    ];

    const handlePrev = () => setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    const handleNext = () => setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));

    return (
        <section id="hero" className="hero section dark-background">
            <div id="hero-carousel" className="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-interval="5000">

                {/* Carousel Items */}
                <div className="carousel-inner">
                    {images.map((image, index) => (
                        <div key={index} className={`carousel-item ${activeIndex === index ? 'active' : ''}`}>
                            <Image src={image.src} alt={image.alt} layout="responsive" width={1000} height={600} />
                            <div className="carousel-container">
                                <h2>{image.title}</h2>
                                <p>{image.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Carousel Controls */}
                <a className="carousel-control-prev" href="#hero-carousel" role="button" data-bs-slide="prev" onClick={handlePrev}>
                    <span className="carousel-control-prev-icon bi bi-chevron-left" aria-hidden="true"></span>
                </a>

                <a className="carousel-control-next" href="#hero-carousel" role="button" data-bs-slide="next" onClick={handleNext}>
                    <span className="carousel-control-next-icon bi bi-chevron-right" aria-hidden="true"></span>
                </a>

                {/* Carousel Indicators */}
                <ol className="carousel-indicators">
                    {images.map((_, index) => (
                        <li
                            key={index}
                            data-bs-target="#hero-carousel"
                            data-bs-slide-to={index}
                            className={activeIndex === index ? 'active' : ''}
                            onClick={() => setActiveIndex(index)}
                        ></li>
                    ))}
                </ol>
            </div>
        </section>
    );
};

export default Hero;