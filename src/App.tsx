/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './components/Home';
import { ServiceDetail } from './components/ServiceDetail';
import { FloatingAIChat } from './components/FloatingAIChat';
import { LeadCaptureModal } from './components/LeadCaptureModal';
import { LegalModal } from './components/LegalModal';
import { SERVICES_DATA } from './constants/servicesData';
import { Check, Menu, X, Instagram, Camera, ShieldCheck, MessageCircle } from 'lucide-react';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';

const Navigation = ({ onOpenLead }: { onOpenLead?: () => void }) => {
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
          <img src="/images/logo/logo.png" alt="VencerHub" className="h-10 w-auto" />
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
              <Link to="/#servicos" onClick={() => scrollToSection('servicos')} className="px-6 py-4 text-xs font-black uppercase text-primary hover:bg-primary/10 border-b border-zinc-800 transition-colors">
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
              <a href="https://vencerhub.fotto.com.br/" target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)} className="px-6 py-3 text-[10px] font-bold uppercase text-amber-500 hover:bg-amber-500/10 hover:text-amber-400 transition-colors border-t border-zinc-800 flex items-center gap-2">
                <Camera className="w-3 h-3" /> Fotto (Galerias)
              </a>
            </div>
          </div>
          <button onClick={() => scrollToSection('beneficios')} className="text-[11px] font-bold text-secondary-text uppercase tracking-widest hover:text-primary transition-colors">Diferenciais</button>
          <button onClick={() => scrollToSection('contato')} className="text-[11px] font-bold text-secondary-text uppercase tracking-widest hover:text-primary transition-colors">Contato</button>
          <button 
            onClick={onOpenLead}
            className="px-6 py-2 bg-primary text-black font-black text-[11px] uppercase tracking-widest hover:brightness-110 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]"
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
            <Menu className="w-8 h-8 text-primary" /> Serviços
          </button>
          <button onClick={() => scrollToSection('beneficios')} className="text-2xl font-black text-white uppercase italic text-left">Diferenciais</button>
          <button onClick={() => scrollToSection('contato')} className="text-2xl font-black text-white uppercase italic text-left">Contato</button>
          <a href="https://vencerhub.fotto.com.br/" target="_blank" rel="noreferrer" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-xl font-black text-amber-500 uppercase italic text-left">
            <Camera className="w-6 h-6" /> Fotto (Galerias)
          </a>
          <button onClick={() => { setIsMenuOpen(false); onOpenLead?.(); }} className="glow-btn w-full text-center py-6 mt-4">Quero vencer!</button>
        </div>
      )}
    </nav>
  );
};

function PublicLayout({
  children,
  onOpenLead,
  onOpenLegal,
}: {
  children: React.ReactNode;
  onOpenLead: () => void;
  onOpenLegal: (type: 'privacy' | 'terms') => void;
}) {
  return (
    <div className="min-h-screen bg-bg-dark font-sans selection:bg-primary selection:text-black flex flex-col">
      <FloatingAIChat />
      <Navigation onOpenLead={onOpenLead} />
      <main className="flex-1">
        {children}
      </main>
      {/* Footer Cinematic */}
      <footer className="py-32 border-t border-zinc-800 bg-bg-dark relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-start gap-12 relative z-10">
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img src="/images/logo/logo.png" alt="VencerHub" className="h-9 w-auto" />
            </Link>
            <p className="text-zinc-500 text-xs max-w-xs font-bold uppercase tracking-wider leading-relaxed text-shadow-sm">Ecossistema audiovisual de alto impacto. Estratégia, autoridade e posicionamento para quem busca escala real.</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-12 md:gap-16">
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary led-bold-text">Acesso Rápido</h4>
               <div className="flex flex-col gap-3">
                 <button onClick={() => { window.location.href = '/#sobre'; }} className="text-left text-xs font-bold text-zinc-400 hover:text-white transition-colors">Sobre Nós</button>
                 <button onClick={() => { window.location.href = '/#equipe'; }} className="text-left text-xs font-bold text-zinc-400 hover:text-white transition-colors">Equipe</button>
                 <button onClick={() => { window.location.href = '/#servicos'; }} className="text-left text-xs font-bold text-zinc-400 hover:text-white transition-colors">O que entregamos</button>
                 <button onClick={() => { window.location.href = '/#faq'; }} className="text-left text-xs font-bold text-zinc-400 hover:text-white transition-colors">Perguntas Frequentes</button>
                 <a href="https://vencerhub.fotto.com.br/" target="_blank" rel="noreferrer" className="text-xs font-bold text-amber-500 hover:text-amber-400 transition-colors flex items-center gap-1.5 mt-1">
                   <Camera className="w-3 h-3" /> Fotto (Galerias)
                 </a>
                 <a href="https://app.vencerhub.com" target="_blank" rel="noreferrer" className="text-xs font-bold text-primary hover:text-white transition-colors flex items-center gap-1.5 mt-1">
                   <ShieldCheck className="w-3 h-3" /> Vencer Workspace (Restrito)
                 </a>
               </div>
            </div>
            <div className="space-y-4">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary led-bold-text">Serviços</h4>
               <div className="flex flex-col gap-2.5">
                 {SERVICES_DATA.map((s) => (
                   <Link key={s.id} to={`/servico/${s.id}`} className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                     {s.title}
                   </Link>
                 ))}
               </div>
            </div>
            <div className="space-y-4 text-xs font-bold text-zinc-400">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary led-bold-text">Localização</h4>
               <p className="uppercase tracking-tight leading-relaxed">Av. Érico Veríssimo, 1140 <br/> Porto Alegre - RS</p>
            </div>
            <div className="space-y-4 text-xs font-bold text-zinc-400">
               <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-primary led-bold-text">Contato</h4>
               <div className="flex flex-col gap-3">
                 <p className="tracking-tight leading-relaxed">vencerhub@gmail.com</p>
                 <a href="https://www.instagram.com/vencerhub/" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                    <Instagram className="w-4 h-4 text-primary" />
                    <span className="uppercase tracking-wider">@vencerhub</span>
                 </a>
               </div>
               <div className="mt-4 space-y-2">
                 <p className="uppercase tracking-tight leading-relaxed">+55 51 99744-1369</p>
                 <a href="https://wa.me/5551997441369" target="_blank" rel="noreferrer" className="inline-flex bg-[#25D366] text-white px-3 py-1.5 rounded-md text-[10px] hover:bg-[#1ebe57] transition-colors font-black uppercase tracking-wider items-center gap-1.5">
                   <MessageCircle className="w-3.5 h-3.5" /> FALE CONOSCO
                 </a>
               </div>
            </div>
          </div>
        </div>
        
        {/* BOTTOM BAR */}
        <div className="border-t border-zinc-800/50 mt-16 pt-8 max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-600 font-medium relative z-10">
          <p>© 2026 VencerHub. Site desenvolvido por VENCER HUB.</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link to="/politica-de-privacidade" className="hover:text-zinc-400 transition-colors">Política de Privacidade (LGPD)</Link>
            <Link to="/termos-de-uso" className="hover:text-zinc-400 transition-colors">Termos de Uso</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = React.useState(false);
  const [legalModalType, setLegalModalType] = React.useState<'privacy' | 'terms' | null>(null);

  return (
    <BrowserRouter>
      <LeadCaptureModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
      
      <Routes>
        <Route
          path="/"
          element={
            <PublicLayout
              onOpenLead={() => setIsLeadModalOpen(true)}
              onOpenLegal={(type) => setLegalModalType(type)}
            >
              <Home onOpenLead={() => setIsLeadModalOpen(true)} />
            </PublicLayout>
          }
        />
        <Route
          path="/servico/:serviceId"
          element={
            <PublicLayout
              onOpenLead={() => setIsLeadModalOpen(true)}
              onOpenLegal={(type) => setLegalModalType(type)}
            >
              <ServiceDetail onOpenLead={() => setIsLeadModalOpen(true)} />
            </PublicLayout>
          }
        />
        <Route
          path="/politica-de-privacidade"
          element={
            <PublicLayout
              onOpenLead={() => setIsLeadModalOpen(true)}
              onOpenLegal={(type) => setLegalModalType(type)}
            >
              <PrivacyPolicyPage />
            </PublicLayout>
          }
        />
        <Route
          path="/termos-de-uso"
          element={
            <PublicLayout
              onOpenLead={() => setIsLeadModalOpen(true)}
              onOpenLegal={(type) => setLegalModalType(type)}
            >
              <TermsPage />
            </PublicLayout>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}
