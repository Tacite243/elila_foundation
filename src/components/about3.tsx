'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importation des styles AOS

const AboutThree: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section id="about-3" className="about-3 section">
            <div className="container">
                <div className="row gy-4 justify-content-between align-items-center">
                    {/* Image Section with Play Button */}
                    <div
                        className="col-lg-6 order-lg-2 position-relative"
                        data-aos="zoom-out"
                    >
                        <img
                            src="/img/img_sq_1.jpg"
                            alt="Plants Make Life Better"
                            className="img-fluid"
                        />
                        <a
                            href="https://www.youtube.com/watch?v=Y7f98aduVJ8"
                            className="glightbox pulsating-play-btn"
                        >
                            <span className="play">
                                <i className="bi bi-play-fill"></i>
                            </span>
                        </a>
                    </div>

                    {/* Text Section */}
                    <div
                        className="col-lg-5 order-lg-1"
                        data-aos="fade-up"
                        data-aos-delay="100"
                    >
                        <h2 className="content-title mb-4">Plants Make Life Better</h2>
                        <p className="mb-4">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
                            necessitatibus placeat, atque qui voluptatem velit explicabo vitae
                            repellendus architecto provident nisi ullam minus asperiores commodi!
                            Tenetur, repellat aliquam nihil illo.
                        </p>
                        <ul className="list-unstyled list-check">
                            <li>Lorem ipsum dolor sit amet</li>
                            <li>Velit explicabo vitae repellendu</li>
                            <li>Repellat aliquam nihil illo</li>
                        </ul>
                        <p>
                            <a href="#" className="btn-cta">
                                Get in touch
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutThree;