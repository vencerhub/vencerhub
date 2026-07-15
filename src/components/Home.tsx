import React from 'react';
import { Hero } from './Hero';
import { AboutUs } from './AboutUs';
import { TeamSection } from './TeamSection';
import { Benefits } from './Benefits';
import { PainPoints } from './PainPoints';
import { ServicesList } from './ServicesList';
import { NewSpace } from './NewSpace';
import { ContactSection } from './ContactSection';
import { FAQ } from './FAQ';
import { Camera } from 'lucide-react';

export const Home = ({ onOpenLead }: { onOpenLead?: () => void }) => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="relative">
      <div className="bg-grid-dark absolute inset-0 pointer-events-none opacity-20" />
      
      <Hero onOpenLead={onOpenLead} />
      
      <AboutUs />

      <TeamSection />

      <PainPoints />

      <div className="bg-bg-card section-slant py-32 relative z-10">
        <Benefits />
      </div>

      <ServicesList />

      {/* Fotto Quick Access Banner */}
      <section className="py-12 bg-black border-t border-b border-amber-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 led-warm-glow">
              <Camera className="w-7 h-7 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.35em] text-amber-500 mb-1 led-warm-text">Galeria Oficial</p>
              <h3 className="text-xl md:text-2xl font-black uppercase italic text-white tracking-tight leading-tight">
                Coberturas Fotográficas <span className="text-amber-500 not-italic">ao Vivo</span>
              </h3>
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-wider mt-1">Acesse nossa plataforma exclusiva com todas as galerias de eventos e coberturas.</p>
            </div>
          </div>
          <a
            href="https://vencerhub.fotto.com.br/"
            target="_blank"
            rel="noreferrer"
            className="flex-shrink-0 flex items-center gap-3 px-8 py-4 border-2 border-amber-500 text-amber-500 font-black text-[11px] uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-all duration-300 led-warm-glow group"
          >
            <Camera className="w-4 h-4 group-hover:scale-110 transition-transform" />
            Acessar Fotto
          </a>
        </div>
      </section>

      <NewSpace />
      
      <ContactSection />
      
      <FAQ />
    </main>
  );
};
