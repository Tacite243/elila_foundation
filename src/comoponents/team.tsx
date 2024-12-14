'use client'

import Image from 'next/image';
import React, { useEffect } from 'react';
import AOS from 'aos';



const Team = () => {

  const teamMembers = [
    {
      id: 1,
      name: 'Lucien Azmayawa',
      position: 'Chargé du développement Jeunesse Luusu Mwenga',
      description: "Entrepreneur, coach d'entreprise expérimenté, spécialiste dans le développement commercial et le leardship",
      image: '/Lucien.jpg',
      socialLinks: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      id: 2,
      name: 'Trésor ILUNGA',
      position: 'Président Jeunesse Luusu Lega Goma',
      description: "Chef de travaux, et chercheur en économie",
      image: '/tresor.jpg',
      socialLinks: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      id: 3,
      name: 'TOMBO GARY Amani',
      position: 'Chargé de la culture et du social',
      description: 'PDG Appui print service',
      image: '/gary.jpg',
      socialLinks: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      id: 4,
      name: 'Tombo USHINDI',
      position: 'Chargé de communication',
      description: "Humanitaire et Master en communication",
      image: '/ushindi.jpg',
      socialLinks: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    }
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init();
    }
  }, []);

  return (
    <section id="team" className="team section">
      {/* Section Title */}
      <div className="container section-title" data-aos="fade-up">
        <h2 className="title-with-underline">
          Team
          <span className="underline">
            <span></span>
          </span>
        </h2>
        <p>Une équipe forte derrière cette grande structure</p>
      </div>

      <div className="container">
        <div className="row gy-4">
          {teamMembers.map((member, index) => (
            <div key={member.id} className={`col-lg-6`} data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
              <div className="team-member d-flex align-items-start">
                <div className="pic">
                  <Image src={member.image} className="img-fluid" alt={member.name} width={1000} height={1000} />
                </div>
                <div className="member-info">
                  <h4>{member.name}</h4>
                  <span>{member.position}</span>
                  <p>{member.description}</p>
                  <div className="social">
                    {member.socialLinks.twitter && <a href={member.socialLinks.twitter}><i className="bi bi-twitter-x"></i></a>}
                    {member.socialLinks.facebook && <a href={member.socialLinks.facebook}><i className="bi bi-facebook"></i></a>}
                    {member.socialLinks.instagram && <a href={member.socialLinks.instagram}><i className="bi bi-instagram"></i></a>}
                    {member.socialLinks.linkedin && <a href={member.socialLinks.linkedin}><i className="bi bi-linkedin"></i></a>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;