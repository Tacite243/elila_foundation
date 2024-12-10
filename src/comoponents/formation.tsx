'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FormationSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const cardsData = [
    {
      id: 1,
      title: 'Lorem Ipsum',
      description: 'Ulamco laboris nisi ut aliquip ex ea commodo consequat. Et consectetur ducimus vero placeat',
      link: '#',
      delay: 100,
    },
    {
      id: 2,
      title: 'Repellat Nihil',
      description: 'Dolorem est fugiat occaecati voluptate velit esse. Dicta veritatis dolor quod et vel dire leno para dest',
      link: '#',
      delay: 200,
    },
    {
      id: 3,
      title: 'Ad ad velit qui',
      description: 'Molestiae officiis omnis illo asperiores. Aut doloribus vitae sunt debitis quo vel nam quis',
      link: '#',
      delay: 300,
    },
  ];

  return (
    <section id="cards" className="cards section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Nos Formations</h2>
        <p>Nous avons également une mission éducative</p>
      </div>
      
      <div className="container">
        <div className="row gy-4">
          {cardsData.map(({ id, title, description, link, delay }) => (
            <div
              key={id}
              className="col-lg-4"
              data-aos="fade-up"
              data-aos-delay={delay}
            >
              <div className="card-item">
                <span>{String(id).padStart(2, '0')}</span>
                <h4>
                  <a href={link} className="stretched-link">
                    {title}
                  </a>
                </h4>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationSection;