import React from 'react';
import { Hero } from './Hero';
import { AboutUs } from './AboutUs';
import { TeamSection } from './TeamSection';
import { Benefits } from './Benefits';
import { PainPoints } from './PainPoints';
import { ServicesList } from './ServicesList';
import { ContactSection } from './ContactSection';
import { FAQ } from './FAQ';

export const Home = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative">
      <div className="bg-grid-dark absolute inset-0 pointer-events-none opacity-20" />
      
      <Hero onCtaClick={() => scrollToSection('contato')} />
      
      <AboutUs />

      <TeamSection />

      <PainPoints />

      <div className="bg-bg-card section-slant py-32 relative z-10">
        <Benefits />
      </div>

      <ServicesList />
      
      <ContactSection />
      
      <FAQ />
    </main>
  );
};
