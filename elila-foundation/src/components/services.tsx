'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importation des styles AOS

const servicesData = [
    {
        id: 1,
        title: 'Planting',
        description: 'Gravida sodales condimentum pellen tesq accumsan orci quam sagittis sapie.',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2a10 10 0 1 1-10 10"></path>
                <line x1="12" y1="12" x2="12" y2="22"></line>
            </svg>
        ),
    },
    {
        id: 2,
        title: 'Mulching',
        description: 'Gravida sodales condimentum pellen tesq accumsan orci quam sagittis sapie.',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            </svg>
        ),
    },
    {
        id: 3,
        title: 'Plowing',
        description: 'Gravida sodales condimentum pellen tesq accumsan orci quam sagittis sapie.',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <circle cx="12" cy="12" r="10"></circle>
            </svg>
        ),
    },
    {
        id: 4,
        title: 'Mowing',
        description: 'Gravida sodales condimentum pellen tesq accumsan orci quam sagittis sapie.',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <line x1="12" y1="2" x2="12" y2="22"></line>
                <line x1="2" y1="12" x2="22" y2="12"></line>
            </svg>
        ),
    },
    {
        id: 5,
        title: 'Seeding',
        description: 'Gravida sodales condimentum pellen tesq accumsan orci quam sagittis sapie.',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="22 12 18 15 15 18"></polyline>
            </svg>
        ),
    },
    {
        id: 6,
        title: 'Fresh Vegetables',
        description: 'Gravida sodales condimentum pellen tesq accumsan orci quam sagittis sapie.',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2a10 10 0 1 1-10 10"></path>
            </svg>
        ),
    },
    {
        id: 7,
        title: 'Watering',
        description: 'Gravida sodales condimentum pellen tesq accumsan orci quam sagittis sapie.',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M22 12h-4"></path>
            </svg>
        ),
    },
    {
        id: 8,
        title: 'Vegetable Selling',
        description: 'Gravida sodales condimentum pellen tesq accumsan orci quam sagittis sapie.',
        svg: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M12 2a10 10 0 1 1-10 10"></path>
            </svg>
        ),
    },
];

const Services: React.FC = () => {
    useEffect(() => {
        AOS.init({ duration: 1000, once: true });
    }, []);

    return (
        <section id="services" className="services section">
            <div className="container section-title" data-aos="fade-up">
                <h2>SERVICES</h2>
                <p>Providing Fresh Produce Every Single Day</p>
            </div>

            <div className="content">
                <div className="container">
                    <div className="row g-0">
                        {servicesData.map((service, index) => (
                            <div
                                key={service.id}
                                className="col-lg-3 col-md-6"
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                            >
                                <div className="service-item">
                                    <span className="number">{`0${service.id}`}</span>
                                    <div className="service-item-icon">{service.svg}</div>
                                    <div className="service-item-content">
                                        <h3 className="service-heading">{service.title}</h3>
                                        <p>{service.description}</p>
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

export default Services;