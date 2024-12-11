'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

const HeroSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Durée de l'animation
      easing: 'ease-in-out', // Type de courbe d'animation
      once: true, // L'animation se produit une seule fois
    });
  }, []);

  return (
    <section id="hero" className="hero section dark-background">
      <Image
        src="/nature.jpg"
        alt="Hero Background"
        data-aos="fade-in"
        width={1200}
        height={2000}
      />
      <div className="container text-center" data-aos="fade-up" data-aos-delay="100">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2>Elila foundation</h2>
            <p>Espace où les legas de la diaspora et du pays se rencontrent</p>
            <a href="identification" className="btn-get-started">Identifier vous ici</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;