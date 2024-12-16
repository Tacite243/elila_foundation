'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import Image from 'next/image';
import 'aos/dist/aos.css';

const AboutSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
        });
    }, []);


    return (
        <section id="about" className="about section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2 className="title-with-underline">
                    A propos de nous
                    <span className="underline">
                        <span></span>
                    </span>
                </h2>
                <p>Elila foundation en quelques mots</p>
            </div>


            {/* Section Content */}
            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-4">
                    <div className="col-lg-6 order-1 order-lg-2">
                        <br /><br /><br />
                        <Image
                            src="/propos.jpg"
                            className="img-fluid"
                            alt="About Us"
                            width={1000}
                            height={1000}
                        />
                    </div>
                    <div className="col-lg-6 order-2 order-lg-1 content">
                        <h3>Elila foundation</h3>
                        <p className="fst-italic">
                            Rejoignez-nous dans notre engagement à transformer positivement l&#39;espace Lega et à bâtir un avenir meilleur pour les générations à venir.
                        </p>
                        <p>
                            Elila Foundation est une organisation dédiée au développement socioéconomique, culturel et politique de l&#39;espace Lega.
                            Notre mission est d&#39;améliorer la qualité de vie des habitants des territoires de Mwenga, Walikale, Pangi et Shabunda. Nous travaillons sans relâche pour promouvoir l&#39;éducation, la santé, l&#39;économie locale et la culture, tout en renforçant la participation politique et la gouvernance locale.
                            Nos initiatives visent à autonomiser les communautés locales en mettant en place des programmes de formation, des projets de développement durable et des campagnes de sensibilisation. En collaborant avec divers partenaires, nous nous efforçons de créer un avenir prospère et inclusif pour tous les résidents de la région Lega.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
