'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importation des styles AOS

const About: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    const features = [
        {
            id: 1,
            icon: <i className="bi bi-cloud-rain me-4 display-6"></i>,
            title: 'Plants needs rain',
            description: 'Lorem ipsum dolor sit amet.',
        },
        {
            id: 2,
            icon: <i className="bi bi-heart me-4 display-6"></i>,
            title: 'Love organic foods',
            description: 'Lorem ipsum dolor sit amet.',
        },
        {
            id: 3,
            icon: <i className="bi bi-shop me-4 display-6"></i>,
            title: 'Sell vegies',
            description: 'Lorem ipsum dolor sit amet.',
        },
    ];

    return (
        <section id="about" className="about section">
            <div className="content">
                <div className="container">
                    <div className="row">
                        {/* Image Section */}
                        <div className="col-lg-6 mb-4 mb-lg-0">
                            <img
                                src="/img/img_long_5.jpg"
                                alt="About us"
                                className="img-fluid img-overlap"
                                data-aos="zoom-out"
                            />
                        </div>

                        {/* Text Section */}
                        <div className="col-lg-5 ml-auto" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="content-subtitle text-white opacity-50">Why Choose Us</h3>
                            <h2 className="content-title mb-4">
                                More than <strong>50 years experience</strong> in agriculture industry
                            </h2>
                            <p className="opacity-50">
                                Reprehenderit, odio laboriosam? Blanditiis quae ullam quasi illum minima
                                nostrum perspiciatis error consequatur sit nulla.
                            </p>

                            {/* Feature List */}
                            <div className="row my-5">
                                {features.map((feature) => (
                                    <div
                                        key={feature.id}
                                        className="col-lg-12 d-flex align-items-start mb-4"
                                    >
                                        {feature.icon}
                                        <div>
                                            <h4 className="m-0 h5 text-white">{feature.title}</h4>
                                            <p className="text-white opacity-50">{feature.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
