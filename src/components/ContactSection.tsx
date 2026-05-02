import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, ArrowUpRight } from 'lucide-react';

export const ContactSection = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden" id="contato">
      <div className="absolute inset-0 bg-bg-dark/80 z-0" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent z-10 led-warm-glow" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-16">
            <div>
              <div className="w-12 h-1 bg-amber-500 led-warm-glow mb-6" />
              <p className="text-[10px] uppercase font-black tracking-[0.4em] text-amber-500 mb-4 led-warm-text">Próximo Passo</p>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
                Vamos gravar <br/> <span className="gradient-text-premium not-italic">Seu Sucesso?</span>
              </h2>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-amber-500/50 transition-colors led-warm-glow">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 group-hover:text-amber-500 transition-colors">Localização</h4>
                  <p className="text-white font-bold uppercase tracking-tight text-sm text-shadow-sm">Av. Érico Veríssimo, 1140 <br/> Menino Deus, Porto Alegre - RS</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-zinc-800 group-hover:border-amber-500/50 transition-colors led-warm-glow">
                   <Clock className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2 group-hover:text-amber-500 transition-colors">Horário</h4>
                  <p className="text-white font-bold uppercase tracking-tight text-sm text-shadow-sm">Seg - Sex: 09:00 - 19:00 <br/> Sáb: Sob Agendamento</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://wa.me/5551999999999" 
                target="_blank" 
                rel="noreferrer"
                className="glow-btn"
              >
                Falar com especialista <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div className="relative h-[600px] bg-zinc-900 border border-zinc-800 overflow-hidden group led-warm-glow shadow-2xl">
             {/* Map Placeholder with Cinematic Overlay */}
             <div className="absolute inset-0 bg-amber-500/10 group-hover:bg-transparent transition-all duration-700 pointer-events-none z-10 mix-blend-overlay" />
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6421586716597!2d-51.2223!3d-30.0535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95197858c087b003%3A0xc34ba98440954b0!2sAv.%20%C3%89rico%20Ver%C3%ADssimo%2C%201140%20-%20Menino%20Deus%2C%20Porto%20Alegre%20-%20RS!5e0!3m2!1spt-BR!2sbr!4v1713800000000!5m2!1spt-BR!2sbr" 
               className="w-full h-full grayscale invert opacity-70 contrast-125 group-hover:opacity-100 group-hover:grayscale-0 group-hover:invert-0 transition-all duration-1000"
               loading="lazy"
               title="Vencer Hub Location"
             />
          </div>
        </div>
      </div>
    </section>
  );
};
