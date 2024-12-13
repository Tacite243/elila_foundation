'use cleint'

import React, { useState, useEffect } from 'react';
import AOS from 'aos';

const FAQ = () => {
    const faqItems = [
        { id: 1, question: "A quoi sert réellement ce site web ?", answer: "Le site permet de promouvoir la culture LEGA Le site permet d'informer sur actualités du BULEGA. Vendre l'image du BULEGA dans sa biodiversité (Faune et Flore) envie de stimuler le tourisme" },
        { id: 2, question: "Qui sont les bénéficiaires de ce site ?", answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.' },
        { id: 3, question: "comment soutenir cette initiative ?", answer: 'Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis.' },
        // { id: 4, question: 'Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?', answer: 'Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.' },
        // { id: 5, question: 'Tempus quam pellentesque nec nam aliquam sem et tortor consequat?', answer: 'Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in.' }
    ];

    const [openFAQ, setOpenFAQ] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        if (openFAQ === id) {
            setOpenFAQ(null);
        } else {
            setOpenFAQ(id);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            AOS.init();
        }
    }, []);

    return (
        <section id="faq" className="faq section light-background">
            <div className="container">
                <div className="row gy-4">
                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="content px-xl-5">
                            <h3><strong>Questions</strong><br /><span>Fréquemment posées</span></h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">
                        <div className="faq-container">
                            {faqItems.map(item => (
                                <div key={item.id} className={`faq-item ${openFAQ === item.id ? 'faq-active' : ''}`}>
                                    <h3 onClick={() => toggleFAQ(item.id)}>
                                        <span className="num">{item.id}.</span> <span>{item.question}</span>
                                    </h3>
                                    {openFAQ === item.id && (
                                        <div className="faq-content">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                    <i className="faq-toggle bi bi-chevron-right"></i>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
