import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { SERVICES_DATA } from '../constants/servicesData';

export const ServiceDetail = ({ onOpenLead }: { onOpenLead?: () => void }) => {
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
                  <button 
                    onClick={onOpenLead}
                    className="glow-btn w-full"
                  >
                    Quero vencer! <MessageSquare className="w-5 h-5" />
                  </button>
                  <Link 
                    to="/" 
                    className="w-full flex items-center justify-center py-5 border border-zinc-800 text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors gap-2 text-white"
                  >
                    <ChevronLeft className="w-4 h-4" /> Voltar
                  </Link>
                </div>
             </div>
             
             {/* Portfolio Example section */}
             {!service.portfolio && (
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
             )}

              <div className="p-10 border border-amber-500/20 bg-amber-500/5 italic led-warm-glow">
                 <p className="text-amber-500 font-black text-sm uppercase tracking-widest mb-4 italic led-warm-text">"Mais forte que uma marca."</p>
                 <p className="text-zinc-400 text-xs font-bold leading-relaxed tracking-wider uppercase">
                    Na Vencer Hub, através de personalização e estratégia fidedigna, construímos parcerias sólidas para alavancar seu modelo de negócios.
                 </p>
              </div>
          </div>
        </div>

      {/* Personalities Section - Full Width (Above Modalidades) */}
      {service.id === 'podcast' && (
        <section className="py-24 border-t border-zinc-800 bg-black/40 relative z-10 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12 text-center md:text-left">
            <p className="text-[10px] uppercase font-black tracking-[0.4em] text-amber-500 mb-4 led-warm-text">
              Personalidades
            </p>
            <h3 className="text-3xl md:text-5xl font-black uppercase italic text-white tracking-tighter">
              Quem já passou <span className="text-amber-500 not-italic">por aqui</span>
            </h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1 w-full bg-zinc-950/80 border-y border-zinc-900">
             <img src="/images/pesonalidades/PV048-85.jpg" alt="PodeVencer" className="w-full aspect-square object-cover object-center filter contrast-125 saturate-50 hover:saturate-100 hover:scale-105 transition-all duration-500" referrerPolicy="no-referrer" />
             <img src="/images/pesonalidades/EJ015-13.jpg" alt="Entregando o Jogo" className="w-full aspect-square object-cover object-center filter contrast-125 saturate-50 hover:saturate-100 hover:scale-105 transition-all duration-500" referrerPolicy="no-referrer" />
             <img src="/images/pesonalidades/BC001-56.jpg" alt="Banricoop" className="w-full aspect-square object-cover object-center filter contrast-125 saturate-50 hover:saturate-100 hover:scale-105 transition-all duration-500" referrerPolicy="no-referrer" />
             <img src="/images/pesonalidades/IMG_2180.JPG" alt="Personalidade 1" className="w-full aspect-square object-cover object-center filter contrast-125 saturate-50 hover:saturate-100 hover:scale-105 transition-all duration-500" referrerPolicy="no-referrer" />
             <img src="/images/pesonalidades/IMG_9256.JPG" alt="Personalidade 2" className="w-full aspect-square object-cover object-center filter contrast-125 saturate-50 hover:saturate-100 hover:scale-105 transition-all duration-500" referrerPolicy="no-referrer" />
             <img src="/images/pesonalidades/_MG_1819.JPG" alt="Personalidade 3" className="w-full aspect-square object-cover object-center filter contrast-125 saturate-50 hover:saturate-100 hover:scale-105 transition-all duration-500" referrerPolicy="no-referrer" />
          </div>
        </section>
      )}

      {/* Modalidades Section (Below Personalidades) */}
      {service.id === 'podcast' && (
        <section className="py-24 bg-bg-dark border-t border-zinc-800 relative z-10">
          <div className="max-w-7xl mx-auto px-6 md:px-10">
             <div className="text-center max-w-3xl mx-auto mb-16">
                <h3 className="text-3xl md:text-5xl font-black uppercase italic text-white tracking-tighter mb-6">
                   Duas Modalidades Prontas Para <span className="text-amber-500 not-italic">Escalar seu Nome</span>
                </h3>
                <p className="text-zinc-400 font-medium uppercase tracking-widest text-sm leading-relaxed">
                   Escolha entre lançar seu próprio programa ou ser o grande convidado do PodeVencer.
                </p>
             </div>
             
             <div className="grid md:grid-cols-2 gap-10">
                <div className="bg-bg-dark border border-zinc-800 p-8 rounded-lg shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 left-0 w-full h-1 bg-amber-500 led-warm-glow" />
                   <h4 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group-hover:text-amber-500 transition-colors">
                      PodeVencer <br/> <span className="text-sm font-bold tracking-widest text-zinc-400 not-italic">O Podcast para Vencedores</span>
                   </h4>
                   <p className="text-zinc-300 font-medium leading-relaxed mb-8">
                      Participe do nosso podcast oficial da casa! Venha sentar na mesa do PodeVencer, compartilhar sua história, gerar autoridade instantânea e distribuir cortes de alto impacto pelas redes sociais.
                   </p>
                   <a href="https://www.youtube.com/@PodeVencer/streams" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-4 py-4 w-full bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest transition-colors mb-6 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                      Assista no YouTube 
                   </a>
                </div>
                
                <div className="bg-bg-dark border border-zinc-800 p-8 rounded-lg shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-[50px] rounded-full -z-10" />
                   <h4 className="text-2xl font-black text-white uppercase italic tracking-tight mb-4 group-hover:text-amber-500 transition-colors">
                      Seu Próprio <br/> <span className="text-sm font-bold tracking-widest text-zinc-400 not-italic">Programa / Mesacast</span>
                   </h4>
                   <p className="text-zinc-300 font-medium leading-relaxed mb-6">
                      Use toda a estrutura premium da VencerHub para filmar o *seu* podcast. Oferecemos o estúdio, cenografia, equipamentos hollywoodianos, operação multí-câmeras e edição completa focada em distribuição.
                   </p>
                   <ul className="mb-10 space-y-4">
                     <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-400"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Cenografia Flexível & Personalizada</li>
                     <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-400"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Operador de Cortes/Switching</li>
                     <li className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-zinc-400"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Isolamento Acústico Direcionado</li>
                   </ul>
                   <img src="/images/centro/studio.jpeg" alt="Studio" className="w-full h-36 object-cover rounded filter contrast-125 opacity-80 group-hover:opacity-100 transition-all duration-700" referrerPolicy="no-referrer" />
                </div>
             </div>
          </div>
        </section>
      )}
      </section>

      {/* Portfolio Section */}
      {service.portfolio && service.portfolio.length > 0 && (
        <section className="py-24 bg-bg-card relative border-t border-zinc-800">
          <div className="absolute inset-0 bg-grid-dark pointer-events-none opacity-20" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[10px] uppercase font-black tracking-[0.4em] text-primary mb-4 led-bold-text">
                Portfólio em Foco
              </p>
              <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
                Trabalhos <br /> <span className="gradient-text-premium not-italic">Recentes.</span>
              </h2>
              <p className="text-zinc-400 text-sm font-bold uppercase tracking-wider leading-relaxed mt-6">
                Clique em qualquer projeto abaixo para navegar pelas galerias exclusivas de entrega aos nossos parceiros.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.portfolio.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group block relative rounded-xl overflow-hidden glass-card border border-zinc-800 hover:border-primary/40 transition-all duration-500 h-[380px] led-bold-glow"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  
                  {/* Hover visual highlight border overlay */}
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/25 rounded-xl transition-all duration-500 z-20 pointer-events-none" />

                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="absolute inset-0 w-full h-full object-cover filter contrast-110 saturate-50 group-hover:scale-105 group-hover:saturate-100 transition-all duration-700"
                  />
                  
                  <div className="absolute bottom-0 left-0 w-full p-8 z-20">
                    <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[8px] font-black uppercase tracking-widest rounded-full mb-3">
                      Acessar Galeria
                    </span>
                    <h4 className="text-xl font-black uppercase text-white tracking-tight leading-tight mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase leading-normal tracking-wide">
                      {item.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      )}



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
