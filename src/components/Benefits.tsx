/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Camera, Users, Zap, TrendingUp } from 'lucide-react';

const benefits = [
  {
    title: "Equipe Técnica",
    description: "Profissionais de cinema operando equipamentos de alta performance.",
    icon: Users
  },
  {
    title: "Setup Premium",
    description: "Câmeras 4K, microfones de estúdio e iluminação hollywoodiana.",
    icon: Camera
  },
  {
    title: "Cortes Virais",
    description: "Edição voltada à neurociência para retenção absoluta.",
    icon: Zap
  },
  {
    title: "Conversão Real",
    description: "Layouts e estratégias desenhados para vender todos os dias.",
    icon: TrendingUp
  }
];

export const Benefits = () => {
  return (
    <section className="py-20 bg-transparent" id="beneficios">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[80px] rounded-full -z-10" />
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-amber-500 mb-4 led-warm-text">DNA VencerHub</p>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
              Performance over <br/><span className="text-zinc-600 not-italic">empty aesthetics.</span>
            </h2>
          </div>
          <div className="flex items-center gap-6 p-6 bg-bg-dark border border-zinc-800 shadow-2xl skew-x-[-10deg] led-warm-glow">
             <div className="text-center border-r border-zinc-800 pr-8 skew-x-[10deg]">
                <div className="text-4xl font-black text-amber-500 tracking-tighter led-warm-text">+300%</div>
                <div className="text-[9px] uppercase font-black tracking-widest text-zinc-500 mt-1">Autoridade Percebida</div>
             </div>
             <div className="text-[10px] font-bold text-zinc-400 leading-tight max-w-[140px] uppercase tracking-wider skew-x-[10deg]">
                Estratégias audiovisuais validadas para escala agressiva.
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group p-8 bg-bg-dark border border-zinc-900 hover:border-amber-500/40 transition-all cursor-default relative overflow-hidden led-warm-glow opacity-90 hover:opacity-100"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/5 blur-2xl group-hover:bg-amber-500/20 transition-all" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center mb-6 border border-amber-500/20">
                  <benefit.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2 italic">{benefit.title}</h4>
                <p className="text-[11px] text-zinc-400 leading-relaxed font-bold uppercase tracking-tight">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
