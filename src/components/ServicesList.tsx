import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '../constants/servicesData';

export const ServicesList = () => {
  return (
    <section className="py-32 bg-transparent relative overflow-hidden" id="servicos">
      <div className="absolute inset-0 bg-bg-dark/50 z-0" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        <div className="mb-24">
          <p className="text-[10px] uppercase font-black tracking-[0.4em] text-primary mb-4">O que entregamos (HUB)</p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-[0.85]">
            Soluções para <br/> <span className="text-amber-500 led-warm-text not-italic">Escala Digital</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900 shadow-2xl">
          {SERVICES_DATA.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-bg-dark p-10 group hover:bg-amber-500/5 transition-all relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-zinc-800 group-hover:text-amber-500 transition-colors">
                [{s.tag}]
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-500/0 group-hover:bg-amber-500/10 blur-[50px] rounded-full transition-all duration-700 pointer-events-none" />
              <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center mb-8 border border-amber-500/20 group-hover:border-amber-500/50 transition-all">
                <s.icon className="w-6 h-6 text-amber-500" />
              </div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest mb-4 italic group-hover:text-shadow-sm transition-all">{s.title}</h4>
              <p className="text-[11px] text-zinc-500 font-medium leading-relaxed uppercase tracking-tight mb-8">
                {s.shortDescription}
              </p>
              <Link 
                to={`/servico/${s.id}`}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
              >
                Detalhes <ChevronRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

