'use client';

import { useEffect } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ServicesTwo: React.FC = () => {
    useEffect(() => {
        // Aucun effet spécial requis, Swiper est initialisé automatiquement
    }, []);

    // Liste des services
    const services = [
        { title: 'Planting', image: '/img/img_sq_1.jpg' },
        { title: 'Mulching', image: '/img/img_sq_3.jpg' },
        { title: 'Watering', image: '/img/img_sq_8.jpg' },
        { title: 'Fertilizing', image: '/img/img_sq_4.jpg' },
        { title: 'Harvesting', image: '/img/img_sq_5.jpg' },
        { title: 'Mowing', image: '/img/img_sq_6.jpg' },
        { title: 'Seeding Plants', image: '/img/img_sq_8.jpg' },
    ];

    return (
        <section id="services-2" className="services-2 section dark-background">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Services</h2>
                <p>Necessitatibus eius consequatur</p>
            </div>

            {/* Swiper Carousel */}
            <div className="services-carousel-wrap">
                <div className="container">
                    <Swiper
                        loop={true}
                        speed={600}
                        autoplay={{ delay: 5000 }}
                        slidesPerView="auto"
                        spaceBetween={40}
                        pagination={{
                            el: '.swiper-pagination',
                            clickable: true,
                            type: 'bullets',
                        }}
                        navigation={{
                            nextEl: '.js-custom-next',
                            prevEl: '.js-custom-prev',
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 40,
                            },
                            1200: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                    >
                        {/* Boutons de navigation */}
                        <button className="navigation-prev js-custom-prev">
                            <i className="bi bi-arrow-left-short"></i>
                        </button>
                        <button className="navigation-next js-custom-next">
                            <i className="bi bi-arrow-right-short"></i>
                        </button>

                        {/* Slides */}
                        <div className="swiper-wrapper">
                            {services.map((service, index) => (
                                <SwiperSlide key={index} className="swiper-slide">
                                    <div className="service-item">
                                        <div className="service-item-contents">
                                            <a href="#">
                                                <span className="service-item-category">We do</span>
                                                <h2 className="service-item-title">{service.title}</h2>
                                            </a>
                                        </div>
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="img-fluid"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </div>
                        <div className="swiper-pagination"></div>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default ServicesTwo;
