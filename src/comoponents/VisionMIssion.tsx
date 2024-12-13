'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';



const VisionMission = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            AOS.init();
        }
    }, []);

    return (
        <section id="vision-mission" className="vision-mission section py-5" style={{ backgroundColor: '#f9f9f9' }}>
            {/* Section Title */}
            <div className="container section-title text-center mb-5" data-aos="fade-up">
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#333' }}>Notre Vision et Mission</h2>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>
                    Découvrez nos aspirations et nos engagements qui guident nos actions.
                </p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <div className="row gy-4 justify-content-center">
                    {/* Vision Section */}
                    <div className="col-lg-5 d-flex flex-column align-items-center text-center">
                        <div className="info-item p-4 rounded shadow" style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }} data-aos="fade-up" data-aos-delay="200">
                            <i className="bi bi-eye flex-shrink-0" style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#007BFF' }}></i>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#007BFF' }}>Notre Vision</h3>
                                <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
                                    Bulega Foundation aspire à devenir une force motrice pour l&#39;émergence et l&#39;influence de la communauté Léga,
                                    promouvant l&#39;unité, le développement et l&#39;excellence dans tous les domaines.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mission Section */}
                    <div className="col-lg-5 d-flex flex-column align-items-center text-center">
                        <div className="info-item p-4 rounded shadow" style={{ backgroundColor: '#ffffff', border: '1px solid #ddd' }} data-aos="fade-up" data-aos-delay="300">
                            <i className="bi bi-flag flex-shrink-0" style={{ fontSize: '3.5rem', marginBottom: '1rem', color: '#28A745' }}></i>
                            <div>
                                <h3 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#28A745' }}>Notre Mission</h3>
                                <p style={{ fontSize: '1rem', color: '#555', lineHeight: '1.6' }}>
                                    Nous visons à être une référence pour les Léga partout dans le monde, en favorisant un développement durable et
                                    équitable au sein de notre espace communautaire.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisionMission;