/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export const Hero = ({ onOpenLead }: { onOpenLead?: () => void }) => {
  return (
    <section className="relative min-h-screen py-40 flex items-center justify-center overflow-hidden" id="hero">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#050505] z-10" />
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent mix-blend-overlay z-10" />
        <img 
          src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
          alt="Studio Background" 
          className="w-full h-full object-cover filter contrast-125 saturate-50"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-20 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 glass-card text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8 shadow-2xl"
        >
          <Sparkles className="w-3 h-3 text-amber-500" />
          O Padrão de quem Foca em Resultado
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[6rem] font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase italic"
        >
          MAIS QUE UMA PRODUTORA <br/>
          <span className="gradient-text-premium not-italic text-4xl md:text-6xl lg:text-[5rem]">UM ECOSSISTEMA.</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-zinc-300 leading-relaxed mb-12 max-w-2xl font-medium uppercase tracking-wide"
        >
          Atendimento 100% personalizado para quem precisa de estratégia, posicionamento e escala no digital. Não vendemos apenas vídeos, construímos negócios.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-8"
        >
          <button 
            onClick={onOpenLead || (() => {})}
            className="glow-btn rounded-none"
          >
            Quero vencer!
          </button>
        </motion.div>
      </div>
    </section>
  );
};
