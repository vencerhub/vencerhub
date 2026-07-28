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
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col justify-between p-4 md:p-8 font-sans relative overflow-x-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#22c55e]/5 via-transparent to-transparent pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between py-4 border-b border-white/5 relative z-10">
        <Link to="/" className="flex items-center gap-2">
          <img src="/images/logo/logo.png" alt="VencerHub" className="h-10 w-auto" />
        </Link>
        <Link
          to="/"
          className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors font-medium bg-white/5 px-3 py-1.5 rounded-lg border border-white/8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao site principal
        </Link>
      </div>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full my-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* Left Column: App Purpose & Google Verification details */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold px-3 py-1 rounded-full">
            <Zap className="w-3.5 h-3.5" /> Sistema de Gestão Audiovisual
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tight leading-tight">
            Vencer HUB ERP
          </h1>

          <p className="text-sm md:text-base text-zinc-400 leading-relaxed font-medium">
            O <strong>Vencer HUB ERP</strong> é a plataforma integrada de gestão empresarial desenvolvida especialmente para empresas de produção audiovisual, estúdios de podcast e produtoras de conteúdo.
          </p>

          {/* App Purpose Box */}
          <div className="bg-[#111111] border border-white/8 rounded-2xl p-6 space-y-4">
            <h2 className="text-xs font-black uppercase tracking-widest text-[#22c55e] flex items-center gap-2">
              <Building2 className="w-4 h-4" /> Finalidade do Aplicativo
            </h2>
            <p className="text-xs text-zinc-300 leading-relaxed">
              O software otimiza todas as etapas operacionais e financeiras de uma produtora audiovisual:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
              <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span>CRM & Score Inteligente de Clientes</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span>Gestão de Projetos e Prontuário</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span>Controle Financeiro & DRE por Projeto</span>
              </div>
              <div className="flex items-center gap-2 bg-black/40 p-2.5 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0" />
                <span>Checklists Pós-Produção & Ocorrências</span>
              </div>
            </div>
          </div>

          {/* Google OAuth Use Notice */}
          <div className="bg-[#111111] border border-white/8 rounded-2xl p-6 space-y-3">
            <h2 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" /> Autenticação Google OAuth
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Utilizamos a autenticação segura do Google OAuth para validar a identidade dos colaboradores e gerenciar permissões de acesso por perfil (Admin, Comercial, Produção, Gestão e Financeiro).
            </p>
          </div>
        </div>

        {/* Right Column: Google Login Box */}
        <div className="lg:col-span-5 bg-[#111111] border border-white/10 rounded-2xl p-8 space-y-6 shadow-2xl">
          <div>
            <h2 className="text-xl font-black text-white">Acessar o Vencer HUB ERP</h2>
            <p className="text-xs text-zinc-500 mt-1">Entre com sua conta Google profissional</p>
          </div>

          <button
            onClick={signIn}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold text-sm py-3.5 rounded-xl hover:bg-gray-100 transition-all shadow-lg hover:scale-[1.01]"
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
            <div className="border border-amber-500/20 bg-amber-500/5 rounded-xl p-4">
              <p className="text-[11px] text-amber-400 font-semibold mb-1">Modo Demonstração</p>
              <p className="text-[10px] text-zinc-500 leading-relaxed">
                Clique no botão acima para testar o sistema como Admin Master (<code className="text-zinc-300">vencerhub@gmail.com</code>).
              </p>
            </div>
          )}

          <div className="pt-4 border-t border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <ShieldCheck className="w-4 h-4 text-[#22c55e] shrink-0" />
              <span>Conexão criptografada via Google OAuth 2.0</span>
            </div>
            <p className="text-[10px] text-zinc-600 leading-relaxed">
              Novos usuários cadastrados entram na fila para aprovação do administrador master.
            </p>
          </div>
        </div>
      </main>

      {/* Footer Legal Links for Google OAuth Verification */}
      <footer className="max-w-5xl mx-auto w-full pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 relative z-10">
        <p>© 2026 Vencer Hub Produções Ltda. Todos os direitos reservados.</p>
        <div className="flex items-center gap-6">
          <Link to="/politica-de-privacidade" className="hover:text-white transition-colors">
            Política de Privacidade (LGPD)
          </Link>
          <Link to="/termos-de-uso" className="hover:text-white transition-colors">
            Termos de Serviço
          </Link>
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
