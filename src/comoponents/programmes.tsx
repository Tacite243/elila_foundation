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

  const programData = [
    {
      id: 1,
      icon: 'bi-briefcase',
      title: 'Activités culturelles',
      description: 'Nous mettons en avant les talents de notre jeunesse à travers différentes activités culturelles',
      link: '/',
      delay: 100,
    },
    {
      id: 2,
      icon: 'bi-card-checklist',
      title: 'Activités scientifiques',
      description: "A travers ce programme nous facilitons à nos jeunes l&#39;accès à la crème scientifique de notre communauté et d'ailleurs",
      link: '#',
      delay: 200,
    },
    {
      id: 3,
      icon: 'bi-bar-chart',
      title: 'Partage d&#39;opportunités',
      description: 'Nous sommes une structure de facilitation à l&#39;accès à des opportunités économique, professionnel, politique ...',
      link: '#',
      delay: 300,
    },
    {
      id: 4,
      icon: 'bi-binoculars',
      title: 'Le social',
      description: "Dans le volet social, nous volons au secours des membres de la communauté en détresse",
      link: '#',
      delay: 400,
    },
    {
      id: 5,
      icon: 'bi-brightness-high',
      title: "Partage d'epériences",
      description: "A travers différentes programmes, nous promouvons le partage d'expérience",
      link: '#',
      delay: 500,
    },
    // {
    //   id: 6,
    //   icon: 'bi-calendar4-week',
    //   title: 'Eiusmod Tempor',
    //   description: 'Et harum quidem rerum facilis est et expedita distinctio dasa fermo lind saca',
    //   link: 'service-details.html',
    //   delay: 600,
    // },
  ];

  return (
    <section id="services" className="services section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2>Nos Programmes</h2>
        <p>Elila foundation est une structure très dynamique avec une large gamme de programme qu&#39;il met à la portée de la communauté</p>
      </div>

      {/* Programmes List */}
      <div className="container">
        <div className="row gy-4">
          {programData.map(({ id, icon, title, description, link, delay }) => (
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