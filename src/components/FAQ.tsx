/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Onde vocês estão localizados?",
    answer: "A Vencer Hub está localizada na Av. Érico Veríssimo, 1140, no bairro Menino Deus, em Porto Alegre - RS. Dispomos de estúdios equipados para diversas necessidades."
  },
  {
    question: "Quais tipos de empresas vocês atendem?",
    answer: "Atendemos empreendedores, infoprodutores, clínicas, escritórios de advocacia, indústrias e empresas de tecnologia que buscam escalar seu faturamento através de um posicionamento premium digital."
  },
  {
    question: "Vocês fazem conteúdo para redes sociais (Reels/TikTok)?",
    answer: "Sim, realizamos a captação e edição de CORTES VIRAIS voltados à conversão e retenção, baseados em neurociência, tudo com qualidade de cinema."
  },
  {
    question: "Como funciona para iniciar um projeto?",
    answer: "Tudo começa clicando no botão para falar com nosso time de especialistas. Faremos uma breve reunião de alinhamento estratégico para entender seu objetivo e formatar a melhor proposta de serviço e gravação."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-bg-dark border-t border-zinc-800" id="faq">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-24">
          <p className="text-[11px] uppercase font-black tracking-[0.4em] text-amber-500 mb-4 italic led-warm-text">FAQ</p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Dúvidas <span className="gradient-text-premium not-italic">Frequentes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border transition-all duration-300 ${openIndex === index ? 'border-amber-500 bg-bg-card led-warm-glow' : 'border-zinc-800 bg-black/40 hover:border-zinc-700'}`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left group"
              >
                <span className={`font-black uppercase tracking-widest text-[11px] pr-8 transition-colors ${openIndex === index ? 'text-amber-500 text-shadow-sm' : 'text-zinc-500 group-hover:text-white'}`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 text-zinc-700 transition-transform duration-500 ${openIndex === index ? 'rotate-180 text-amber-500' : ''}`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-8 pb-8 text-sm font-medium text-zinc-400 leading-relaxed uppercase tracking-tighter">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
