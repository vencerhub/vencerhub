import React from 'react';
import { ERPProvider, useERP, useUserMgmt } from '../context/ERPContext';
import { ERPLayout } from '../components/ERPLayout';
import { ExecutiveDashboard } from '../modules/ExecutiveDashboard';
import { CRMModule } from '../modules/CRMModule';
import { TimelineModule } from '../modules/TimelineModule';
import { ServicesHistoryModule } from '../modules/ServicesHistoryModule';
import { PostProductionChecklistModule } from '../modules/PostProductionChecklistModule';
import { IncidentsModule } from '../modules/IncidentsModule';
import { FinancialModule } from '../modules/FinancialModule';
import { ClientDashboardModule } from '../modules/ClientDashboardModule';
import { SmartScoreModule } from '../modules/SmartScoreModule';
import { AIAssistantModule } from '../modules/AIAssistantModule';
import { ExecutiveBoardModule } from '../modules/ExecutiveBoardModule';
import { UserManagementModule } from '../modules/UserManagementModule';
import { isSupabaseConfigured } from '../../lib/supabase';
import { Zap, Clock, XCircle, ShieldAlert, LogOut, ArrowLeft, ShieldCheck, CheckCircle2, Lock, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const MODULE_MAP: Record<string, React.FC> = {
  dashboard: ExecutiveDashboard,
  crm: CRMModule,
  timeline: TimelineModule,
  services: ServicesHistoryModule,
  checklist: PostProductionChecklistModule,
  incidents: IncidentsModule,
  financial: FinancialModule,
  'client-dashboard': ClientDashboardModule,
  score: SmartScoreModule,
  ai: AIAssistantModule,
  board: ExecutiveBoardModule,
  users: UserManagementModule,
};

function ERPLogin() {
  const { signIn } = useERP();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col font-sans relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between py-6 px-6 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-2">
          <img src="/images/logo/logo.png" alt="Vencer HUB" className="h-10 w-auto" />
        </div>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors font-medium bg-white/5 px-4 py-2 rounded-lg border border-white/8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site principal
        </Link>
      </header>

      <main className="max-w-6xl mx-auto w-full px-6 py-12 space-y-20 relative z-10 flex-grow">
        
        {/* Seção 1: Sobre o Aplicativo */}
        <section className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" /> Sobre o Aplicativo
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Vencer HUB
          </h1>
          <div className="space-y-4 text-sm md:text-base text-zinc-400 leading-relaxed font-medium bg-[#111111] border border-white/5 p-6 md:p-8 rounded-2xl">
            <p><strong className="text-white">Nome oficial do aplicativo:</strong> Vencer HUB</p>
            <p><strong className="text-white">Empresa desenvolvedora:</strong> Vencer HUB</p>
            <p><strong className="text-white">Finalidade do sistema:</strong> O Vencer HUB é uma plataforma integrada de gestão empresarial desenvolvida especificamente para centralizar e otimizar as operações internas.</p>
            <p><strong className="text-white">Público-alvo:</strong> Colaboradores, gestores e equipe interna da produtora Vencer HUB.</p>
            
            <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 p-4 rounded-xl mt-6">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-200">
                <strong className="text-red-400">Atenção:</strong> Este é um sistema privado e de uso restrito. O acesso é destinado estritamente a usuários autorizados e previamente cadastrados pela administração.
              </p>
            </div>
          </div>
        </section>

        {/* Seção 2: Funcionalidades */}
        <section className="space-y-8">
          <h2 className="text-2xl font-black text-white flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[#22c55e]" /> Funcionalidades
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "CRM", desc: "Gestão inteligente de relacionamento com clientes." },
              { title: "Gestão Financeira", desc: "Controle financeiro e análise de DRE." },
              { title: "Gestão de Projetos", desc: "Acompanhamento detalhado de prazos e entregas." },
              { title: "Produção Audiovisual", desc: "Controle de etapas e checklists de produção." },
              { title: "Controle de Clientes", desc: "Histórico completo de serviços e análise de score." },
              { title: "Autenticação Google OAuth", desc: "Login seguro, criptografado e integrado." }
            ].map((feature, i) => (
              <div key={i} className="bg-[#111111] border border-white/5 hover:border-[#22c55e]/30 transition-colors p-6 rounded-2xl flex flex-col gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#22c55e]" />
                <h3 className="font-bold text-white text-sm">{feature.title}</h3>
                <p className="text-xs text-zinc-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Seção 3: Autenticação & Login */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#111111] border border-white/5 rounded-3xl p-8 lg:p-12">
          <div className="space-y-8">
            <h2 className="text-2xl font-black text-white flex items-center gap-3">
              <Lock className="w-6 h-6 text-[#22c55e]" /> Autenticação
            </h2>
            <div className="space-y-5 text-sm text-zinc-400 leading-relaxed">
              <p>O acesso ao <strong>Vencer HUB</strong> exige validação de identidade segura corporativa.</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-xs md:text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#22c55e] shrink-0" /> 
                  <span>O login Google é utilizado apenas para autenticação e verificação de identidade.</span>
                </li>
                <li className="flex items-start gap-3 text-xs md:text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#22c55e] shrink-0" /> 
                  <span>Nenhum dado da conta Google é compartilhado com terceiros ou utilizado para outros fins.</span>
                </li>
                <li className="flex items-start gap-3 text-xs md:text-sm">
                  <ShieldCheck className="w-5 h-5 text-[#22c55e] shrink-0" /> 
                  <span>Apenas nome, email e foto são utilizados para identificação visual e nominal do usuário logado no painel.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-black/50 border border-white/5 rounded-2xl p-8 space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-black text-white">Acessar o Vencer HUB</h3>
              <p className="text-xs text-zinc-500">Identifique-se com sua conta corporativa</p>
            </div>
            
            <button
              onClick={signIn}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold text-sm py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Entrar com Google
            </button>

            {!isSupabaseConfigured && (
              <div className="text-center mt-4">
                <p className="text-[10px] text-amber-500 font-bold">Modo de demonstração ativado</p>
              </div>
            )}
          </div>
        </section>

      </main>

      {/* Rodapé Institucional */}
      <footer className="border-t border-white/5 bg-[#050505]">
        <div className="max-w-6xl mx-auto w-full px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-zinc-500">
          <div className="flex items-center gap-4">
            <img src="/images/logo/logo.png" alt="Vencer HUB" className="h-6 w-auto opacity-50 grayscale" />
            <p className="font-medium">Empresa: Vencer HUB</p>
          </div>
          
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 font-medium">
            <a href="mailto:vencerhub@gmail.com" className="hover:text-white transition-colors">Contato</a>
            <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">Política de Privacidade</Link>
            <Link to="/termos-de-uso" className="hover:text-white transition-colors">Termos de Uso</Link>
            <span className="text-zinc-700">Desenvolvido por Vencer HUB</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function PendingApprovalScreen() {
  const { signOut } = useERP();
  const { currentUser } = useUserMgmt();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111111] border border-amber-500/20 rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto">
          <Clock className="w-8 h-8 text-amber-400 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Aguardando Aprovação
          </span>
          <h2 className="text-xl font-black text-white mt-4">Acesso em análise</h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Olá, <strong className="text-white">{currentUser?.name || 'membro'}</strong>! Sua solicitação de acesso ao Vencer HUB ERP foi enviada ao administrador (<code className="text-amber-400">vencerhub@gmail.com</code>).
          </p>
          <p className="text-[11px] text-zinc-500 mt-2">
            Assim que for aprovado e atribuído a um perfil, seus módulos serão liberados.
          </p>
        </div>
        <div className="pt-4 border-t border-white/5 flex gap-3">
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-white/5 border border-white/10 text-xs font-bold text-white py-2.5 rounded-xl hover:bg-white/10 transition-all"
          >
            Verificar status
          </button>
          <button
            onClick={async () => { await signOut(); window.location.href = '/'; }}
            className="flex-1 bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400 py-2.5 rounded-xl hover:bg-red-500/20 transition-all flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" /> Voltar ao site
          </button>
        </div>
      </div>
    </div>
  );
}

function RejectedScreen() {
  const { signOut } = useERP();
  const { currentUser } = useUserMgmt();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111111] border border-red-500/20 rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto">
          <XCircle className="w-8 h-8 text-red-400" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white">Solicitação Rejeitada</h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Sua solicitação de acesso ao Vencer HUB ERP não foi aprovada pelo administrador.
          </p>
          {currentUser?.notes && (
            <p className="text-xs text-zinc-500 mt-3 bg-red-500/5 p-3 rounded-lg border border-red-500/10">
              Motivo: {currentUser.notes}
            </p>
          )}
        </div>
        <button
          onClick={async () => { await signOut(); window.location.href = '/'; }}
          className="w-full bg-white/5 border border-white/10 text-xs font-bold text-white py-2.5 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site principal
        </button>
      </div>
    </div>
  );
}

function SuspendedScreen() {
  const { signOut } = useERP();

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#111111] border border-zinc-700/30 rounded-2xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8 text-zinc-400" />
        </div>
        <div>
          <h2 className="text-xl font-black text-white">Conta Suspensa</h2>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Seu acesso ao Vencer HUB ERP foi temporariamente suspenso. Entre em contato com a diretoria para mais informações.
          </p>
        </div>
        <button
          onClick={async () => { await signOut(); window.location.href = '/'; }}
          className="w-full bg-white/5 border border-white/10 text-xs font-bold text-white py-2.5 rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site principal
        </button>
      </div>
    </div>
  );
}

function ERPRouter() {
  const { state } = useERP();
  const { currentUser } = useUserMgmt();

  if (!state.isAuthenticated && !currentUser) {
    return <ERPLogin />;
  }

  // User Status checks
  if (currentUser) {
    if (currentUser.status === 'pending') {
      return <PendingApprovalScreen />;
    }
    if (currentUser.status === 'rejected') {
      return <RejectedScreen />;
    }
    if (currentUser.status === 'suspended') {
      return <SuspendedScreen />;
    }
  }

  const ActiveModule = MODULE_MAP[state.activeModule] || ExecutiveDashboard;

  return (
    <ERPLayout>
      <ActiveModule />
    </ERPLayout>
  );
}

export function ERPApp() {
  return (
    <ERPProvider>
      <ERPRouter />
    </ERPProvider>
  );
}
