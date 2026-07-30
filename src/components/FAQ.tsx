/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "Onde a VENCER HUB está localizada?",
    answer: "Estamos situados na Av. Érico Veríssimo, 1140, no bairro Menino Deus, em Porto Alegre - RS. Dispomos de estúdios modernos, infraestrutura acústica de alta performance, fácil acesso e suporte técnico completo para produções de nível corporativo e artístico."
  },
  {
    question: "Quais tipos de empresas e profissionais vocês atendem?",
    answer: "Atendemos empreendedores, empresários, executivos, escritórios de advocacia, clínicas de saúde, startups, infoprodutores e indústrias que buscam transformar sua presença digital em autoridade de mercado e geração contínua de negócios."
  },
  {
    question: "Como funciona a produção de Podcasts e Conteúdo Audiovisual?",
    answer: "Oferecemos uma experiência completa end-to-end: desde a preparação do estúdio com câmeras cinema 4K e áudio profissional até a direção de cena, pós-produção, cortes verticais inteligentes e entrega dos episódios prontos para publicação."
  },
  {
    question: "Vocês produzem vídeos institucionais e materiais publicitários para marcas?",
    answer: "Sim. Desenvolvemos campanhas completas, vídeos institucionais, apresentações comerciais de alto impacto, coberturas de grandes eventos e vídeos promocionais focados em posicionamento de marca e alta conversão."
  },
  {
    question: "Como funciona para contratar e agendar uma gravação?",
    answer: "O processo é simples e rápido: clique no botão de contato para falar com nosso time estratégico. Entenderemos seu objetivo de negócio, definiremos a melhor estrutura de pacote e agendaremos as diárias conforme a sua disponibilidade."
  },
  {
    question: "Posso utilizar a estrutura da VENCER HUB para eventos privativos ou cursos online?",
    answer: "Com certeza. Nosso espaço conta com infraestrutura completa para Live Streaming em tempo real, gravação de módulos de cursos online, workshops corporativos e treinamentos com total estabilidade de sinal e qualidade técnica."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-32 bg-bg-dark border-t border-zinc-800" id="faq">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-[11px] uppercase font-black tracking-[0.4em] text-amber-500 mb-4 italic led-warm-text">
            Perguntas Frequentes
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter">
            Dúvidas <span className="gradient-text-premium not-italic">Frequentes</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border transition-all duration-300 rounded-xl overflow-hidden ${
                openIndex === index 
                  ? 'border-amber-500/50 bg-zinc-900/60 led-warm-glow' 
                  : 'border-zinc-800 bg-black/40 hover:border-zinc-700'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left group"
              >
                <span className={`font-bold text-xs uppercase tracking-wider pr-4 transition-colors leading-snug ${
                  openIndex === index ? 'text-amber-500' : 'text-zinc-300 group-hover:text-white'
                }`}>
                  {faq.question}
                </span>
                <ChevronDown 
                  className={`w-4 h-4 shrink-0 text-zinc-600 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180 text-amber-500' : ''
                  }`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="px-6 pb-6 text-xs font-normal text-zinc-400 leading-relaxed tracking-normal border-t border-zinc-800/40 pt-4">
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
