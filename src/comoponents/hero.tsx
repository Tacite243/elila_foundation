'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';
import Link from 'next/link';

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
      {/* <svg
        className="hero-waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 120 28"
        preserveAspectRatio="none"
      >
        <defs>
          <path
            id="wave-path"
            d="M-160 28c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v40h-352z"
          ></path>
        </defs>
        <g className="wave1" transform="scale(1, -1)" style={{ transformOrigin: 'center' }}>
          <use xlinkHref="#wave-path" x="50" y="3"></use>
        </g>
        <g className="wave2" transform="scale(1, -1)" style={{ transformOrigin: 'center' }}>
          <use xlinkHref="#wave-path" x="50" y="0"></use>
        </g>
        <g className="wave3" transform="scale(1, -1)" style={{ transformOrigin: 'center' }}>
          <use xlinkHref="#wave-path" x="50" y="9"></use>
        </g>
      </svg> */}
      <div className="container text-center" data-aos="fade-up" data-aos-delay="100">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <h2>Elila foundation</h2>
            <p>Espace où les legas de la diaspora et du pays se rencontrent</p>
            <Link href="/identification" className="btn-get-started">Identifier vous ici</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;