'use client';

import React from 'react';

interface Testimonial {
    image: string;
    text: string;
    name: string;
}

const testimonials: Testimonial[] = [
    {
        image: '/img/testimonials/testimonials-1.jpg',
        text: `“Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?”`,
        name: 'James Smith',
    },
    {
        image: '/img/testimonials/testimonials-2.jpg',
        text: `“Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?”`,
        name: 'Kate Smith',
    },
    {
        image: '/img/testimonials/testimonials-3.jpg',
        text: `“Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?”`,
        name: 'Claire Anderson',
    },
    {
        image: '/img/testimonials/testimonials-4.jpg',
        text: `“Lorem ipsum dolor sit, amet consectetur adipisicing elit. Provident deleniti iusto molestias, dolore vel fugiat ab placeat ea?”`,
        name: 'Dan Smith',
    },
];

const Testimonials: React.FC = () => {
    return (
        <section className="testimonials-12 testimonials section" id="testimonials">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>TESTIMONIALS</h2>
                <p>Necessitatibus eius consequatur</p>
            </div>

            {/* Testimonials Content */}
            <div className="testimonial-wrap">
                <div className="container">
                    <div className="row">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={index}
                                className="col-md-6 mb-4 mb-md-4"
                                data-aos="fade-up"
                                data-aos-delay={index * 100} // Décalage pour des animations progressives
                            >
                                <div className="testimonial">
                                    <img
                                        src={testimonial.image}
                                        alt={`Testimonial from ${testimonial.name}`}
                                        className="img-fluid rounded-circle mb-3"
                                    />
                                    <blockquote>
                                        <p>{testimonial.text}</p>
                                    </blockquote>
                                    <p className="client-name">{testimonial.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
