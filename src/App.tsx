/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './components/Home';
import { ServiceDetail } from './components/ServiceDetail';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { Check, Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const scrollToSection = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = '/#' + id;
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-[80] bg-bg-dark/80 backdrop-blur-xl border-b border-border-dark h-[80px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-primary flex items-center justify-center -skew-x-12">
             <Check className="text-black w-6 h-6" strokeWidth={4} />
          </div>
          <span className="font-sans font-black text-2xl tracking-tighter text-white uppercase italic">
            Vencer<span className="text-primary not-italic">Hub</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollToSection('sobre')} className="text-[11px] font-bold text-secondary-text uppercase tracking-widest hover:text-primary transition-colors">Sobre</button>
          <button onClick={() => scrollToSection('equipe')} className="text-[11px] font-bold text-secondary-text uppercase tracking-widest hover:text-primary transition-colors">Equipe</button>
          <div className="relative group">
            <button className="text-[11px] font-bold text-secondary-text uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-2">
              <Menu className="w-4 h-4" /> Serviços
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 bg-bg-dark border border-zinc-800 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 led-warm-glow rounded-md overflow-hidden flex flex-col">
              <Link to="/#servicos" onClick={() => scrollToSection('servicos')} className="px-6 py-4 text-xs font-black uppercase text-amber-500 hover:bg-amber-500/10 border-b border-zinc-800 transition-colors">
                Geral (Todos)
              </Link>
              <Link to="/servico/podcast" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                Estúdio de Podcast
              </Link>
              <Link to="/servico/cursos" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                Cursos Online
              </Link>
              <Link to="/servico/video" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                Vídeos & Edição
              </Link>
              <Link to="/servico/fotografia" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                Fotografia
              </Link>
              <Link to="/servico/web-design" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                Sites
              </Link>
              <Link to="/servico/identity" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                Design
              </Link>
              <Link to="/servico/drone" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
                Drone
              </Link>
              <Link to="/servico/live-stream" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors border-t border-zinc-800">
                Transmissão ao Vivo
              </Link>
            </div>
          </div>
          <button onClick={() => scrollToSection('beneficios')} className="text-[11px] font-bold text-secondary-text uppercase tracking-widest hover:text-primary transition-colors">Diferenciais</button>
          <button onClick={() => scrollToSection('contato')} className="text-[11px] font-bold text-secondary-text uppercase tracking-widest hover:text-primary transition-colors">Contato</button>
          <button 
            onClick={() => scrollToSection('contato')}
            className="px-6 py-2 bg-[#f59e0b] text-black font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)]"
          >
            Quero vencer!
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[80px] bg-bg-dark z-[70] flex flex-col p-10 gap-8 border-t border-zinc-800 animate-in slide-in-from-top duration-300">
          <button onClick={() => scrollToSection('sobre')} className="text-2xl font-black text-white uppercase italic text-left">Sobre</button>
          <button onClick={() => scrollToSection('equipe')} className="text-2xl font-black text-white uppercase italic text-left">Equipe</button>
          <button onClick={() => scrollToSection('solucoes')} className="text-2xl font-black text-white uppercase italic text-left">Soluções</button>
          <button onClick={() => scrollToSection('servicos')} className="text-2xl font-black text-white uppercase italic text-left flex items-center gap-4">
            <Menu className="w-8 h-8 text-amber-500" /> Serviços
          </button>
          <button onClick={() => scrollToSection('beneficios')} className="text-2xl font-black text-white uppercase italic text-left">Diferenciais</button>
          <button onClick={() => scrollToSection('contato')} className="text-2xl font-black text-white uppercase italic text-left">Contato</button>
          <button onClick={() => scrollToSection('contato')} className="glow-btn w-full text-center py-6 mt-4">Quero vencer!</button>
        </div>
      )}
    </nav>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-dark font-sans selection:bg-amber-500 selection:text-black">
        <FloatingWhatsApp />
        <Navigation />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servico/:serviceId" element={<ServiceDetail />} />
        </Routes>

        {/* Footer Cinematic */}
        <footer className="py-32 border-t border-zinc-800 bg-bg-dark relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-amber-500/5 blur-[120px] rounded-full" />
          <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
            <div className="space-y-6">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-6 h-6 bg-primary flex items-center justify-center -skew-x-12 led-warm-glow">
                   <Check className="text-black w-4 h-4" strokeWidth={4} />
                </div>
                <span className="font-sans font-black text-xl tracking-tighter text-white uppercase italic">Vencer<span className="gradient-text-premium not-italic">Hub</span></span>
              </Link>
              <p className="text-zinc-500 text-xs max-w-xs font-bold uppercase tracking-wider leading-relaxed text-shadow-sm">Lugar de empreendedores focados em resultado. Audiovisual premium.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-12 md:gap-24">
              <div className="space-y-4">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 led-warm-text">Links</h4>
                 <div className="flex flex-col gap-3">
                   <Link to="/" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">Home</Link>
                   <button onClick={() => { window.scrollTo({top: 0, behavior: 'smooth'}); }} className="text-left text-xs font-bold text-zinc-400 hover:text-white transition-colors">Voltar ao Topo</button>
                 </div>
              </div>
              <div className="space-y-4 text-xs font-bold text-zinc-400">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-500 led-warm-text">Localização e Contato</h4>
                 <p className="uppercase tracking-tight leading-relaxed">Av. Érico Veríssimo, 1140 <br/> Porto Alegre - RS</p>
                 <p className="mt-4 uppercase tracking-tight leading-relaxed">+55 51 99744-1369</p>
                 <p className="tracking-tight leading-relaxed">contato@vencerhub.com</p>
                 <p className="mt-8 text-zinc-600">© 2026 VencerHub</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
