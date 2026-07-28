// ============================================================
// VENCER ERP — User Management Types & Permissions
// ============================================================

export type ERPRole = 'admin' | 'comercial' | 'producao' | 'gestao' | 'financeiro';

export const ROLE_LABELS: Record<ERPRole, string> = {
  admin: 'Administrador',
  comercial: 'Comercial',
  producao: 'Produção',
  gestao: 'Gestão',
  financeiro: 'Financeiro',
};

export const ROLE_COLORS: Record<ERPRole, string> = {
  admin: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  comercial: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
  producao: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  gestao: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  financeiro: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
};

// Modules visible by role (false = hidden, true = visible)
export const ROLE_PERMISSIONS: Record<ERPRole, Record<string, boolean>> = {
  admin: {
    dashboard: true, crm: true, timeline: true, services: true,
    checklist: true, incidents: true, financial: true,
    'client-dashboard': true, score: true, ai: true, board: true, users: true,
  },
  gestao: {
    dashboard: true, crm: true, timeline: true, services: true,
    checklist: true, incidents: true, financial: true,
    'client-dashboard': true, score: true, ai: true, board: true, users: false,
  },
  financeiro: {
    dashboard: true, crm: true, timeline: false, services: true,
    checklist: false, incidents: true, financial: true,
    'client-dashboard': true, score: false, ai: true, board: true, users: false,
  },
  comercial: {
    dashboard: true, crm: true, timeline: true, services: false,
    checklist: false, incidents: false, financial: false,
    'client-dashboard': true, score: true, ai: true, board: false, users: false,
  },
  producao: {
    dashboard: true, crm: false, timeline: true, services: true,
    checklist: true, incidents: true, financial: false,
    'client-dashboard': false, score: false, ai: false, board: false, users: false,
  },
};

export type UserStatus = 'pending' | 'approved' | 'rejected' | 'suspended';

export interface ERPMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: ERPRole;
  status: UserStatus;
  requestedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  notes?: string;
}

export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  pending: 'Aguardando Aprovação',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
  suspended: 'Suspenso',
};

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  pending: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  approved: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/30',
  rejected: 'text-red-400 bg-red-500/10 border-red-500/30',
  suspended: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/30',
};

// Admin master email — always gets admin role automatically
export const ADMIN_MASTER_EMAIL = 'vencerhub@gmail.com';

// LocalStorage key for persisting members
export const MEMBERS_STORAGE_KEY = 'vencer_erp_members';
