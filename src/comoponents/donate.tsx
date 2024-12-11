'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

const DonationSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  const ctaData = {
    title: 'Croyiez en nous',
    description:
      'Croyiez-vous en nous et en notre potentienls ? soutenez notre fondation en faisant un don simplement',
    buttonText: 'Faire un don',
    buttonLink: '#contact',
    backgroundImage: '/PXL_20230520_141244801.jpg',
  };

  return (
    <section id="call-to-action" className="call-to-action section dark-background">
      <Image src={ctaData.backgroundImage} alt="Call to action background" width={1000} height={1000} />

      <div className="container">
        <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
          <div className="col-xl-10">
            <div className="text-center">
              <h3>{ctaData.title}</h3>
              <p>{ctaData.description}</p>
              <a className="cta-btn" href={ctaData.buttonLink}>
                {ctaData.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;