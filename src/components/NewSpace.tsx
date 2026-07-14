import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Construction, ShieldCheck, Flame, Compass, ChevronRight } from 'lucide-react';

export const NewSpace = () => {
  return (
    <section className="py-32 bg-transparent relative z-10 overflow-hidden" id="novo-espaco">
      {/* Background decoration elements */}
      <div className="absolute inset-0 bg-bg-dark z-0" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Decorative top border line with green glow */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Header Block */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-end mb-20">
          <div className="lg:col-span-8 space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full"
            >
              <Construction className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary led-bold-text">
                Expansão Vencer Hub
              </span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9]"
            >
              Novo Espaço <br /> 
              <span className="gradient-text-premium not-italic">Em Construção.</span>
            </motion.h2>
          </div>

          <div className="lg:col-span-4">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-zinc-400 text-sm font-bold uppercase tracking-wider leading-relaxed"
            >
              Estamos preparando um novo estúdio ultra-premium no coração de Porto Alegre. Equipamentos de ponta e infraestrutura focada na máxima conversão e autoridade.
            </motion.p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Info Details (Left Side) */}
          <div className="lg:col-span-5 space-y-8 order-2 lg:order-1">
            
            {/* Address Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 glass-card border border-zinc-800 hover:border-primary/30 transition-all duration-500 led-bold-glow rounded-xl space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Localização Privilegiada</p>
                  <h3 className="text-lg font-black text-white uppercase tracking-tight">Centro Histórico</h3>
                </div>
              </div>
              
              <div className="h-px bg-zinc-800/80 w-full" />
              
              <div className="space-y-1">
                <p className="text-zinc-200 font-extrabold uppercase text-sm tracking-wide">
                  Rua dos Andradas, 1560
                </p>
                <p className="text-primary text-xs font-black uppercase tracking-widest">
                  7º Andar
                </p>
                <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                  Porto Alegre - RS, CEP 90020-012
                </p>
              </div>
            </motion.div>

            {/* Differential Items */}
            <div className="space-y-4">
              {[
                { 
                  icon: <Flame className="w-5 h-5 text-primary" />, 
                  title: "Acústica Studio Grade", 
                  desc: "Isolamento absoluto e tratamento sonoro desenhado por especialistas." 
                },
                { 
                  icon: <Compass className="w-5 h-5 text-primary" />, 
                  title: "Cenografia Dinâmica", 
                  desc: "Painéis de LED, iluminação RGB inteligente e fundos adaptáveis para sua marca." 
                },
                { 
                  icon: <ShieldCheck className="w-5 h-5 text-primary" />, 
                  title: "Localização e Conforto", 
                  desc: "Acesso facilitado no centro de POA com sala de descompressão premium." 
                }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="flex gap-4 p-4 border border-zinc-900 hover:border-zinc-800 bg-black/40 transition-colors rounded-lg"
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase text-white tracking-wider mb-1">{item.title}</h4>
                    <p className="text-[11px] text-zinc-400 font-bold uppercase leading-normal tracking-wide">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="pt-4"
            >
              <a
                href="#contato"
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary hover:text-white transition-colors group"
              >
                Garantir condições de pré-lançamento
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Visual Presentation / Gallery (Right Side) */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-6 order-1 lg:order-2">
            
            {/* Main construction image card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-7 aspect-[4/5] relative rounded-xl overflow-hidden glass-card border border-zinc-800 hover:border-primary/20 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
              <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/80 backdrop-blur-md border border-zinc-800 text-[9px] font-black uppercase tracking-widest text-amber-500 flex items-center gap-1.5 rounded-full">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                Obra em Andamento
              </div>
              <img 
                src="/images/centro/studio.jpeg" 
                alt="Estúdio Centro de Porto Alegre em construção" 
                className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700"
              />
              <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Sala Principal</p>
                <h4 className="text-xl font-black uppercase text-white tracking-tight leading-tight">Estúdio de Podcasts & Vídeos</h4>
              </div>
            </motion.div>

            {/* Second image card + visual metrics */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="aspect-[4/3] relative rounded-xl overflow-hidden glass-card border border-zinc-800 hover:border-primary/20 transition-all duration-500 group flex-1"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <img 
                  src="/images/centro/studio 2.jpeg" 
                  alt="Nova infraestrutura Vencer Hub" 
                  className="absolute inset-0 w-full h-full object-cover filter contrast-110 saturate-50 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700"
                />
                <div className="absolute bottom-0 left-0 w-full p-5 z-20">
                  <p className="text-[9px] font-black uppercase tracking-widest text-primary mb-0.5">Área de Produção</p>
                  <h4 className="text-sm font-black uppercase text-white tracking-tight leading-tight">Suporte Técnico Integrado</h4>
                </div>
              </motion.div>

              {/* Progress metric box */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 glass-card border border-zinc-800 rounded-xl space-y-3"
              >
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-400">
                  <span>Progresso da Obra</span>
                  <span className="text-primary led-bold-text">70%</span>
                </div>
                
                <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "70%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-primary rounded-full shadow-[0_0_10px_#22c55e]"
                  />
                </div>
                
                <div className="flex items-center gap-2 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">Previsão de inauguração: Agosto 2026</span>
                </div>
              </motion.div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
