import React from 'react';
import { motion } from 'motion/react';
import { Target, Eye, Rocket, Network } from 'lucide-react';

export const AboutUs = () => {
  return (
    <section className="py-32 bg-bg-card relative z-10" id="sobre">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <div>
              <p className="text-[10px] uppercase font-black tracking-[0.4em] text-amber-500 mb-4 led-warm-text">O Ecossistema</p>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                Ecossistema <br/> <span className="gradient-text-premium not-italic">de Negócios.</span>
              </h2>
            </div>
            
            <p className="text-zinc-300 text-xl leading-relaxed font-medium uppercase tracking-tight">
              A Vencer Hub é um ecossistema estratégico. Mergulhamos no seu modelo de negócio para criar audiovisual personalizado, conectando pessoas e escalando resultados físicos para o digital.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2 p-6 glass-card led-warm-glow hover:border-amber-500/30 transition-all border border-zinc-800">
                <div className="flex items-center gap-2 text-amber-500 mb-2">
                  <Target className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Pragmatismo</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-bold uppercase leading-relaxed tracking-wider">Transformar visões em realidade digital com foco em faturamento.</p>
              </div>
              <div className="space-y-2 p-6 glass-card led-warm-glow hover:border-amber-500/30 transition-all border border-zinc-800">
                <div className="flex items-center gap-2 text-amber-500 mb-2">
                  <Eye className="w-5 h-5" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Posicionamento</span>
                </div>
                <p className="text-[11px] text-zinc-400 font-bold uppercase leading-relaxed tracking-wider">Acabar com o conteúdo amador e criar marcas que dominam seus nichos.</p>
              </div>
            </div>
          </div>

           <div className="relative">
             <div className="aspect-square bg-bg-dark border border-zinc-800 p-2 transform -rotate-2 hover:rotate-0 transition-all duration-700 led-warm-glow shadow-xl">
               <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/10 to-transparent pointer-events-none z-20" />
               <img 
                 src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                 alt="Networking Hub Studio"
                 className="w-full h-full object-cover relative z-10 transition-all duration-700 filter contrast-125"
                 referrerPolicy="no-referrer"
               />
               <div className="absolute -bottom-10 -right-10 bg-amber-500 p-10 hidden md:block z-30 skew-x-[10deg] shadow-[0_0_40px_rgba(245,158,11,0.5)]">
                  <Network className="w-10 h-10 text-black mb-4 skew-x-[-10deg]" />
                  <p className="text-black font-black text-sm uppercase tracking-widest skew-x-[-10deg]">Vencer<br/>O Mercado</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};
