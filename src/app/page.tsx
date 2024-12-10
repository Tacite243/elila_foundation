'use client'

import '@/app/globals.css';
import AboutSection from '@/comoponents/about';
import HeroSection from '@/comoponents/hero';
// import FormationSection from '@/comoponents/formation';
import ProgrammeSection from '@/comoponents/programmes';
import DonationSection from '@/comoponents/donate';
import ProjectSection from '@/comoponents/project';
import FAQ from '@/comoponents/faq';
import Team from '@/comoponents/team';
import Contact from '@/comoponents/contact';



export default function Home() {
  return (
    <main className='main'>
      <HeroSection />
      <AboutSection />
      {/* <FormationSection /> */}
      <ProgrammeSection />
      <DonationSection />
      <ProjectSection />
      <FAQ />
      <Team />
      <Contact />
    </main>
  );
}
