'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';



const OurCultureSection = () => {
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
      title: 'Mariage',
      description: "Découvrez ici les valeurs coutimières du mariage dans notre communauté ",
      link: '/articles/mariage',
      delay: 100,
    },
    {
      id: 2,
      title: 'Education (initiation)',
      description: "Découvrer ce qu'est vraiment l'initiation chez nous, lutende",
      link: '/articles/education',
      delay: 200,
    },
    {
      id: 3,
      title: 'Spiritualité',
      description: 'Chaque peuple a sa propre spiritualité, découvrez celle de nos ancetres',
      link: '/articles/spiritualite',
      delay: 300,
    },
    // {
    //   id: 4,
    //   title: "Histoire",
    //   description: "D'où viennent nos ancetres ? Qui étaient-ils ? Comment vivaient-ils ?",
    //   link: "/articles/histoire",
    //   delay: 400,
    // },
    // {
    //   id: 5,
    //   title: "Nos territoires",
    //   description: "Découvrez le pays du Mulega, les territoires où il a ancré sa culture",
    //   link: '/articles/territoires',
    //   delay: '500'
    // },
    // {
    //   id: 6,
    //   title: "Notabilité chez les Balega",
    //   description: "Découvrez qui sont ceux qui portent les blasons de notre communauté",
    //   link: '/articles/notabilite',
    //   delay: '600'
    // }
  ];

  return (
    <section id="cards" className="cards section">
      <div className="container section-title" data-aos="fade-up">
        <h2 className="title-with-underline">
          Notre culture
          <span className="underline">
            <span></span>
          </span>
        </h2>
        <p>Nous avons également une mission d&#39;éduquer les jeunes sur les valeurs culturelles de notre communauté</p>
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

export default OurCultureSection;