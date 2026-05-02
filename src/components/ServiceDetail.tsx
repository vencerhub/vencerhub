import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../constants/servicesData';

export const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = SERVICES_DATA.find(s => s.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center p-10">
        <h1 className="text-4xl font-black text-white italic uppercase mb-8">Serviço não encontrado</h1>
        <Link to="/" className="btn-vencer">Voltar para Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark text-white">
      {/* Hero Header */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
           <img 
             src={service.image} 
             alt={service.title} 
             className="w-full h-full object-cover grayscale opacity-30 scale-110"
           />
           <div className="absolute inset-0 bg-gradient-to-b from-transparent to-bg-dark" />
        </div>
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-black uppercase tracking-[0.3em] mb-8 led-warm-glow"
           >
             [{service.tag}] Vencer Hub Expert
           </motion.div>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-none mb-6"
           >
             {service.title}
           </motion.h1>
           <motion.p
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.3 }}
             className="text-zinc-400 text-sm md:text-lg uppercase font-bold tracking-[0.2em] max-w-2xl mx-auto"
           >
             {service.shortDescription}
           </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
             <div className="space-y-6 relative">
                <div className="absolute top-0 -left-10 w-20 h-20 bg-amber-500/10 blur-[50px] rounded-full -z-10" />
                <h2 className="text-3xl font-black uppercase italic tracking-tight flex items-center gap-4">
                  <service.icon className="w-8 h-8 text-amber-500 led-warm-text" />
                  Sobre o Serviço
                </h2>
                <div className="h-px w-20 bg-amber-500" />
                <p className="text-secondary-text text-lg leading-relaxed font-medium">
                  {service.fullDescription}
                </p>
             </div>

             <div className="space-y-8">
                <div className="w-full h-1 bg-amber-500 led-warm-glow opacity-50 rounded-full my-6" />
                <h3 className="text-xl font-black uppercase tracking-widest text-zinc-500">A Nossa Solução:</h3>
                <p className="text-zinc-300 font-bold leading-relaxed uppercase tracking-wide">
                  Desenhamos cada projeto do zero, oferecendo um atendimento 100% personalizado. Nossa equipe mergulha profundamente nas dores e objetivos do seu negócio, garantindo que o audiovisual entregue seja uma ferramenta real de tração e vendas.
                </p>
                <h3 className="text-xl font-black uppercase tracking-widest text-zinc-500 mt-12">O que você recebe:</h3>
                <div className="grid gap-4">
                  {service.benefits.map((b, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 p-6 bg-zinc-900 border border-zinc-800 group hover:border-amber-500/50 transition-colors led-warm-glow opacity-90 hover:opacity-100"
                    >
                      <CheckCircle2 className="w-5 h-5 text-amber-500" />
                      <span className="font-bold uppercase tracking-tight text-sm text-white group-hover:text-shadow-sm">{b}</span>
                    </motion.div>
                  ))}
                </div>
             </div>
          </div>

          <div className="space-y-12 relative z-10">
             <div className="bg-bg-dark p-10 border border-amber-500/20 relative overflow-hidden group shadow-[0_0_40px_rgba(245,158,11,0.1)] glass-card">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                   <service.icon className="w-40 h-40 text-amber-500" />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-8 relative z-10 text-glow">Transforme seu <br/> <span className="gradient-text-premium not-italic">negócio</span></h3>
                <p className="text-zinc-400 font-medium uppercase tracking-tight mb-10 relative z-10 leading-relaxed">
                  Não perca tempo com abordagens genéricas. Fale com um de nossos especialistas para ter um projeto adaptado à sua realidade, construindo seu ecossistema de vendas.
                </p>
                <div className="space-y-4 relative z-10">
                  <a 
                    href="https://wa.me/5551997441369" 
                    target="_blank" 
                    rel="noreferrer"
                    className="glow-btn w-full"
                  >
                    Quero vencer! <MessageSquare className="w-5 h-5" />
                  </a>
                  <Link 
                    to="/" 
                    className="w-full flex items-center justify-center py-5 border border-zinc-800 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors gap-2 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Link>
                </div>
             </div>
             
             {/* Portfolio Example section */}
             <div className="mt-12 bg-black border border-zinc-900 rounded-lg overflow-hidden led-warm-glow group relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80" 
                  alt="Portfolio Exemplo" 
                  className="w-full h-64 object-cover filter contrast-125 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-6 left-6 z-20">
                   <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Portfolio / Case de Sucesso</p>
                   <h4 className="text-xl font-bold uppercase text-white">Produção Executiva</h4>
                </div>
             </div>

             <div className="p-10 border border-amber-500/20 bg-amber-500/5 italic led-warm-glow">
                <p className="text-amber-500 font-black text-sm uppercase tracking-widest mb-4 italic led-warm-text">"Mais forte que uma marca."</p>
                <p className="text-zinc-400 text-xs font-bold leading-relaxed tracking-wider uppercase">
                  Na Vencer Hub, através de personalização e estratégia fidedigna, construímos parcerias sólidas para alavancar seu modelo de negócios.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Other Services Footer CTA */}
      <section className="py-20 bg-bg-card border-t border-zinc-800 relative z-10">
         <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <h4 className="text-2xl font-black uppercase italic text-center md:text-left">Deseja conhecer outros <br/> serviços do Hub?</h4>
            <Link to="/" className="flex items-center gap-4 text-primary font-black uppercase tracking-[0.3em] hover:gap-6 transition-all">
               Ver todos <ArrowRight className="w-5 h-5" />
            </Link>
         </div>
      </section>
    </div>
  );
};
