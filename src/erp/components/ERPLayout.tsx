import React, { useState } from 'react';
import {
  LayoutDashboard, Users, GitBranch, Briefcase, ClipboardCheck,
  AlertTriangle, DollarSign, UserSquare2, Star, Brain, BarChart3,
  LogOut, X, Menu, ChevronRight, Bell, Settings, Zap, ShieldCheck,
} from 'lucide-react';
import { useERP, useUserMgmt } from '../context/ERPContext';
import { ROLE_LABELS, ROLE_PERMISSIONS, ERPRole } from '../types/userTypes';

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard Executivo' },
  { id: 'crm', icon: Users, label: 'CRM / Clientes' },
  { id: 'timeline', icon: GitBranch, label: 'Timeline' },
  { id: 'services', icon: Briefcase, label: 'Hist. de Serviços' },
  { id: 'checklist', icon: ClipboardCheck, label: 'Checklist Pós-Prod.' },
  { id: 'incidents', icon: AlertTriangle, label: 'Ocorrências' },
  { id: 'financial', icon: DollarSign, label: 'Financeiro & DRE' },
  { id: 'client-dashboard', icon: UserSquare2, label: 'Dashboard Cliente' },
  { id: 'score', icon: Star, label: 'Score Inteligente' },
  { id: 'ai', icon: Brain, label: 'Inteligência IA' },
  { id: 'board', icon: BarChart3, label: 'Painel Diretoria' },
  { id: 'users', icon: ShieldCheck, label: 'Gestão de Usuários' },
];

interface ERPLayoutProps {
  children: React.ReactNode;
}

export function ERPLayout({ children }: ERPLayoutProps) {
  const { state, dispatch, signOut } = useERP();
  const { pendingCount, currentUser } = useUserMgmt();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = (state.user?.role || currentUser?.role || 'admin') as ERPRole;
  const permissions = ROLE_PERMISSIONS[role] || ROLE_PERMISSIONS.admin;

  const visibleNavItems = NAV_ITEMS.filter(item => permissions[item.id] !== false);

  const setModule = (id: string) => {
    dispatch({ type: 'SET_MODULE', payload: id });
    setMobileOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const activeItem = NAV_ITEMS.find(n => n.id === state.activeModule);

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans">
      {/* Sidebar Desktop */}
      <aside
        className={`hidden md:flex flex-col border-r border-white/5 transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-[68px]'}`}
        style={{ background: 'linear-gradient(180deg, #111111 0%, #0d0d0d 100%)' }}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-white/5 h-[72px]">
          {sidebarOpen && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-[#22c55e] flex items-center justify-center -skew-x-12 shrink-0">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <div>
                <span className="font-black text-sm tracking-tight text-white uppercase italic">Vencer</span>
                <span className="font-black text-sm text-[#22c55e] uppercase not-italic"> ERP</span>
              </div>
            </div>
          )}
          {!sidebarOpen && (
            <div className="w-7 h-7 bg-[#22c55e] flex items-center justify-center -skew-x-12 mx-auto">
              <Zap className="w-4 h-4 text-black" />
            </div>
          )}
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(false)} className="text-zinc-500 hover:text-white transition-colors ml-auto">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5 scrollbar-none">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="w-full flex justify-center p-2 mb-3 text-zinc-500 hover:text-white transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          )}
          {visibleNavItems.map(item => {
            const Icon = item.icon;
            const isActive = state.activeModule === item.id;
            const isUserMgmt = item.id === 'users';
            return (
              <button
                key={item.id}
                onClick={() => setModule(item.id)}
                title={!sidebarOpen ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-150 group relative ${
                  isActive
                    ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                } ${!sidebarOpen ? 'justify-center px-2' : ''}`}
              >
                <Icon className={`shrink-0 ${sidebarOpen ? 'w-4 h-4' : 'w-5 h-5'} ${isActive ? 'text-[#22c55e]' : ''}`} />
                {sidebarOpen && (
                  <span className="text-xs font-semibold truncate flex-1">{item.label}</span>
                )}
                {isUserMgmt && pendingCount > 0 && (
                  <span className="bg-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full shrink-0">
                    {pendingCount}
                  </span>
                )}
                {sidebarOpen && isActive && !isUserMgmt && (
                  <ChevronRight className="w-3 h-3 ml-auto shrink-0 text-[#22c55e]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className={`border-t border-white/5 p-3 ${!sidebarOpen ? 'flex justify-center' : ''}`}>
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center shrink-0 overflow-hidden">
                {state.user?.avatar ? (
                  <img src={state.user.avatar} alt={state.user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#22c55e] text-xs font-black">
                    {state.user?.name?.charAt(0).toUpperCase() || 'V'}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-white truncate">{state.user?.name || currentUser?.name || 'Usuário'}</p>
                <p className="text-[10px] text-zinc-500 truncate">{ROLE_LABELS[role] || 'Membro'}</p>
              </div>
              <button onClick={handleSignOut} title="Sair do ERP e voltar ao site" className="text-zinc-500 hover:text-red-400 transition-colors">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={handleSignOut} title="Sair do ERP e voltar ao site" className="text-zinc-500 hover:text-red-400 transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 bg-[#111111] border-r border-white/5 flex flex-col h-full z-10">
            <div className="flex items-center justify-between p-4 border-b border-white/5 h-[72px]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-[#22c55e] flex items-center justify-center -skew-x-12">
                  <Zap className="w-4 h-4 text-black" />
                </div>
                <span className="font-black text-sm text-white uppercase italic">Vencer<span className="text-[#22c55e] not-italic"> ERP</span></span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-zinc-500"><X className="w-5 h-5" /></button>
            </div>
            <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
              {visibleNavItems.map(item => {
                const Icon = item.icon;
                const isActive = state.activeModule === item.id;
                const isUserMgmt = item.id === 'users';
                return (
                  <button key={item.id} onClick={() => setModule(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all ${
                      isActive ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}>
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="text-xs font-semibold flex-1">{item.label}</span>
                    {isUserMgmt && pendingCount > 0 && (
                      <span className="bg-amber-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full">
                        {pendingCount}
                      </span>
                    )}
                    {isActive && <ChevronRight className="w-3 h-3 text-[#22c55e]" />}
                  </button>
                );
              })}
            </nav>
            <div className="border-t border-white/5 p-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/40 flex items-center justify-center shrink-0">
                  <span className="text-[#22c55e] text-xs font-black">{state.user?.name?.charAt(0).toUpperCase() || 'V'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate">{state.user?.name}</p>
                  <p className="text-[10px] text-zinc-500">{state.user?.role ? ROLE_LABELS[state.user.role] : ''}</p>
                </div>
                <button onClick={handleSignOut} className="text-zinc-500 hover:text-red-400"><LogOut className="w-4 h-4" /></button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex items-center justify-between px-6 h-[72px] border-b border-white/5 bg-[#0d0d0d] shrink-0">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-zinc-400 hover:text-white" onClick={() => setMobileOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-sm font-bold text-white">{activeItem?.label || 'Dashboard'}</h1>
              <p className="text-[11px] text-zinc-500">Vencer ERP — Produção Audiovisual</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-zinc-500 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#22c55e] rounded-full" />
            </button>
            <button className="text-zinc-500 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <div className="w-7 h-7 rounded-full bg-[#22c55e]/20 border border-[#22c55e]/30 flex items-center justify-center overflow-hidden">
                {state.user?.avatar ? (
                  <img src={state.user.avatar} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[#22c55e] text-xs font-black">{state.user?.name?.charAt(0) || 'V'}</span>
                )}
              </div>
              <span className="text-xs font-semibold text-zinc-300 hidden sm:block">{state.user?.name?.split(' ')[0] || 'Usuário'}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
