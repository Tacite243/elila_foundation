'use client'
import About from '@/components/about';
import AboutThree from '@/components/about3';
import CallToAction from '@/components/callToAction';
import Footer from '@/components/footer';
import Hero from '@/components/hero';
import RecentPosts from '@/components/recentPost';
import Services from '@/components/services';
import ServicesTwo from '@/components/services2';
import Testimonials from '@/components/testimonials';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Home() {
  return (
    <main className='main'>
      <Hero />
      <Services />
      <About />
      <AboutThree />
      <ServicesTwo />
      <Testimonials />
      <RecentPosts />
      <CallToAction />
      <Footer />
    </main>
  );
}
