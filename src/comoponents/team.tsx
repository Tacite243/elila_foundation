'use client'

import Image from 'next/image';
import React, { useEffect } from 'react';
import AOS from 'aos';



const Team = () => {
  
  const teamMembers = [
    {
      id: 1,
      name: 'Walter White',
      position: 'Chief Executive Officer',
      description: 'Explicabo voluptatem mollitia et repellat qui dolorum quasi',
      image: '/img/team/team-1.jpg',
      socialLinks: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      id: 2,
      name: 'Sarah Jhonson',
      position: 'Product Manager',
      description: 'Aut maiores voluptates amet et quis praesentium qui senda para',
      image: '/img/team/team-2.jpg',
      socialLinks: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      id: 3,
      name: 'William Anderson',
      position: 'CTO',
      description: 'Quisquam facilis cum velit laborum corrupti fuga rerum quia',
      image: '/img/team/team-3.jpg',
      socialLinks: {
        twitter: '#',
        facebook: '#',
        instagram: '#',
        linkedin: '#'
      }
    },
    {
      id: 4,
      name: 'Amanda Jepson',
      position: 'Accountant',
      description: 'Dolorum tempora officiis odit laborum officiis et et accusamus',
      image: '/img/team/team-4.jpg',
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
        <h2>Team</h2>
        <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
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