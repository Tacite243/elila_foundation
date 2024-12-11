'use client'

import '@/app/globals.css';
import AboutSection from '@/comoponents/about';
import HeroSection from '@/comoponents/hero';
import ProgrammeSection from '@/comoponents/programmes';
import DonationSection from '@/comoponents/donate';
// import ProjectSection from '@/comoponents/project';
import FAQ from '@/comoponents/faq';
import Team from '@/comoponents/team';
import Contact from '@/comoponents/contact';
import OurCultureSection from '@/comoponents/culture';



export default function Home() {
  return (
    <main className='main'>
      <HeroSection />
      <AboutSection />
      <ProgrammeSection />
      <DonationSection />
      <OurCultureSection />
      {/* <ProjectSection /> */}
      <FAQ />
      <Team />
      <Contact />
    </main>
  );
}
