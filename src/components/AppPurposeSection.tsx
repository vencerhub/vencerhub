import React from 'react';
import { Zap, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AppPurposeSection = () => {
  return (
    <section className="py-16 bg-black/60 border-t border-b border-zinc-800/80 relative z-10" id="erp-app">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#22c55e]/5 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Zap className="w-3.5 h-3.5" /> Aplicativo & Sistema de Gestão Audiovisual
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tight">
                Vencer HUB
              </h2>
              <p className="text-sm md:text-base text-zinc-300 leading-relaxed font-medium">
                <strong>Finalidade do Aplicativo:</strong> O aplicativo <strong>Vencer HUB</strong> (integrado à plataforma Vencer ERP) é o sistema de gestão empresarial da Vencer Hub Produções. Ele centraliza a autenticação segura via Google OAuth, CRM de clientes, planejamento de projetos audiovisuais, acompanhamento financeiro DRE, pós-produção e controle de acesso por perfil.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-zinc-400">
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span>CRM, LTV & Score de Clientes</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span>Controle Financeiro & Margens DRE</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span>Prontuário Cronológico de Projetos</span>
                </div>
                <div className="flex items-center gap-2 bg-black/40 p-3 rounded-xl border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                  <span>Autenticação Segura via Google OAuth</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center gap-4 text-center lg:text-right border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8">
              <div className="space-y-1">
                <p className="text-xs font-bold text-white uppercase tracking-wider">Acesso Restrito à Equipe</p>
                <p className="text-[11px] text-zinc-500">Login exclusivo com permissões por perfil.</p>
              </div>
              <Link
                to="/erp"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#22c55e] text-black font-black text-xs uppercase tracking-widest hover:brightness-110 transition-all rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.3)] flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" /> Acessar Vencer HUB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
