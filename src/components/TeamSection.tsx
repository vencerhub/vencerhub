import React from 'react';
import { motion } from 'framer-motion';

const ceos = [
  {
    name: "Rafael Berthes",
    role: "CEO & Fundador",
    desc: "Estrategista de negócios e conexões, transformando audiovisual em escala real.",
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Marco Revilo",
    role: "CEO & Fundador",
    desc: "Especialista em posicionamento e autoridade através de estética e resultados.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const team = [
  { name: "Nome", role: "Head de Conteúdo", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80" },
  { name: "Nome", role: "Editor de Vídeo", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80" },
  { name: "Nome", role: "Designer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80" },
  { name: "Nome", role: "Social Media", image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?auto=format&fit=crop&w=500&q=80" },
  { name: "Nome", role: "Comercial", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=500&q=80" }
];

export const TeamSection = () => {
  return (
    <section className="py-32 bg-transparent relative z-10 overflow-hidden" id="equipe">
      <div className="absolute inset-0 bg-bg-dark z-0" />
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full z-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        
        {/* Block 1: Introduction */}
        <div className="text-center md:text-left mb-24 max-w-3xl">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[10px] uppercase font-black tracking-[0.4em] text-amber-500 mb-4 led-warm-text"
          >
            Quem Somos
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.9]"
          >
            Quem está por trás da <span className="gradient-text-premium not-italic">Vencer Hub</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-zinc-400 text-lg md:text-xl leading-relaxed mt-8 font-medium uppercase tracking-wide"
          >
            Mais do que uma produtora, somos profissionais dedicados a elevar o nível do seu negócio. Reunimos estrategistas, mentes criativas e técnicos de excelência para construir autoridade, posicionamento e resultados reais.
          </motion.p>
        </div>

        {/* Block 2: CEOs */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {ceos.map((ceo, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative rounded-xl overflow-hidden glass-card border border-zinc-800 hover:border-amber-500/30 transition-all duration-500 h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
              <div className="absolute inset-0 bg-amber-500/10 mix-blend-overlay z-10 pointer-events-none" />
              
              <img 
                src={ceo.image} 
                alt={ceo.name}
                className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50 group-hover:scale-110 group-hover:saturate-100 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-12 h-1 bg-amber-500 led-warm-glow mb-6 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
                <h3 className="text-3xl font-black uppercase text-white tracking-tighter mb-1">{ceo.name}</h3>
                <p className="text-amber-500 text-xs font-black uppercase tracking-widest mb-4">{ceo.role}</p>
                <p className="text-zinc-300 text-sm font-bold uppercase tracking-wider leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  {ceo.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Block 3: Team */}
        <div className="pt-24 border-t border-zinc-800/50">
          <div className="mb-12">
            <h3 className="text-2xl font-black uppercase italic text-white tracking-tight">
              A <span className="gradient-text-premium not-italic">Equipe</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative rounded-lg overflow-hidden glass-card border border-zinc-800 hover:border-amber-500/20 transition-all duration-300 aspect-[3/4] led-warm-glow flex flex-col justify-end"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover filter contrast-125 saturate-50 group-hover:scale-105 group-hover:saturate-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="relative z-20 p-5 w-full">
                  <h4 className="text-sm font-black uppercase text-white tracking-tight mb-1">{member.name}</h4>
                  <p className="text-amber-500 text-[9px] font-black uppercase tracking-widest">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
