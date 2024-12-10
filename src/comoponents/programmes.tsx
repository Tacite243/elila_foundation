'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProgrammeSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const servicesData = [
    {
      id: 1,
      icon: 'bi-briefcase',
      title: 'Lorem Ipsum',
      description: 'Voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi',
      link: 'service-details.html',
      delay: 100,
    },
    {
      id: 2,
      icon: 'bi-card-checklist',
      title: 'Dolor Sitema',
      description: 'Minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exa',
      link: 'service-details.html',
      delay: 200,
    },
    {
      id: 3,
      icon: 'bi-bar-chart',
      title: 'Sed ut perspiciatis',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum',
      link: 'service-details.html',
      delay: 300,
    },
    {
      id: 4,
      icon: 'bi-binoculars',
      title: 'Magni Dolores',
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt',
      link: 'service-details.html',
      delay: 400,
    },
    {
      id: 5,
      icon: 'bi-brightness-high',
      title: 'Nemo Enim',
      description: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praese',
      link: 'service-details.html',
      delay: 500,
    },
    {
      id: 6,
      icon: 'bi-calendar4-week',
      title: 'Eiusmod Tempor',
      description: 'Et harum quidem rerum facilis est et expedita distinctio dasa fermo lind saca',
      link: 'service-details.html',
      delay: 600,
    },
  ];

  return (
    <section id="services" className="services section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Nos Programmes</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
      </div>

      {/* Programmes List */}
      <div className="container">
        <div className="row gy-4">
          {servicesData.map(({ id, icon, title, description, link, delay }) => (
            <div
              key={id}
              className="col-xl-4 col-lg-6"
              data-aos="fade-up"
              data-aos-delay={delay}
            >
              <div className="service-item d-flex">
                <div className="icon flex-shrink-0">
                  <i className={`bi ${icon}`} />
                </div>
                <div>
                  <h4 className="title">
                    <a href={link} className="stretched-link">
                      {title}
                    </a>
                  </h4>
                  <p className="description">{description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgrammeSection;