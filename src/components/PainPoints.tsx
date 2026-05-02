import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, CheckCircle, VideoOff, MicOff, TrendingDown, Eye, Mic, TrendingUp } from 'lucide-react';

const PAIN_POINTS = [
  {
    icon: MicOff,
    title: "Áudio Amador",
    desc: "Clientes desistem nos primeiros segundos por conta de eco e ruídos."
  },
  {
    icon: VideoOff,
    title: "Imagem Escura",
    desc: "A falta de iluminação destrói a percepção de valor do seu produto."
  },
  {
    icon: TrendingDown,
    title: "Zero Autoridade",
    desc: "Conteúdo feito sem estratégia não converte, apenas gera curtidas vazias."
  }
];

const SOLUTIONS = [
  {
    icon: Mic,
    title: "Áudio Impecável",
    desc: "Tratamento acústico e equipamentos que garantem voz de locutor."
  },
  {
    icon: Eye,
    title: "Alto Valor Percebido",
    desc: "Setup de luz e câmeras configuradas para mostrar você no seu melhor ângulo e transmitir máxima autoridade."
  },
  {
    icon: TrendingUp,
    title: "Foco na Conversão",
    desc: "Roteiros e cortes pensados milimetricamente para gerar desejo e vendas."
  }
];

export const PainPoints = () => {
  return (
    <section className="py-32 bg-transparent relative z-10" id="solucoes">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="text-center mb-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/10 blur-[100px] rounded-full -z-10" />
          <p className="text-[11px] uppercase font-black tracking-[0.4em] text-amber-500 mb-4 led-warm-text">Realidade do Mercado</p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            O mercado <span className="text-zinc-600 not-italic">não perdoa</span> <br/>
            conteúdo amador.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 relative">
          
          {/* Pain Points (Left) */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-2xl font-black uppercase italic tracking-widest text-red-500">A Dor</h3>
            </div>
            {PAIN_POINTS.map((point, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-6 p-6 border-l-2 border-red-900 bg-bg-dark/40"
              >
                <div className="w-12 h-12 bg-red-500/10 flex items-center justify-center shrink-0">
                  <point.icon className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2">{point.title}</h4>
                  <p className="text-zinc-500 text-[11px] uppercase tracking-wider font-bold leading-relaxed">{point.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Solutions (Right) - Warm LED Vibe */}
          <div className="space-y-8 relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent blur-3xl -z-10" />
            <div className="flex items-center gap-3 mb-8">
              <CheckCircle className="w-6 h-6 text-amber-500" />
              <h3 className="text-2xl font-black uppercase italic tracking-widest text-amber-500 led-warm-text">O Padrão VencerHub</h3>
            </div>
            {SOLUTIONS.map((sol, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-start gap-6 p-6 border border-zinc-900 bg-bg-dark/80 led-warm-glow hover:border-amber-500/30 transition-all"
              >
                <div className="w-12 h-12 bg-amber-500/10 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <sol.icon className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-white uppercase tracking-widest mb-2 text-shadow-sm">{sol.title}</h4>
                  <p className="text-zinc-400 text-[11px] uppercase tracking-wider font-bold leading-relaxed">{sol.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

        <div className="mt-20 relative h-[400px] border border-zinc-800 overflow-hidden group led-warm-glow opacity-90 hover:opacity-100 transition-all duration-700">
           {/* Cinematic Ambient Image */}
           <div className="absolute inset-0 bg-gradient-to-t from-bg-dark to-transparent z-10" />
           <img 
             src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1500&q=80" 
             alt="VencerHub Studio Ambient"
             className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-1000"
             referrerPolicy="no-referrer"
           />
           <div className="absolute bottom-10 left-10 z-20 max-w-2xl">
             <h3 className="text-3xl font-black text-amber-500 uppercase italic tracking-tighter mb-4 led-warm-text">Sua Imagem é Seu Maior Ativo</h3>
             <p className="text-zinc-300 font-medium leading-relaxed">Não deixe que um cenário caseiro destrua anos de especialização. No hub, nós lapidamos a sua entrega para o mundo digital.</p>
           </div>
        </div>

      </div>
    </section>
  );
};
