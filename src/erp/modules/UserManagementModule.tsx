import React, { useState } from 'react';
import {
  Users, Clock, CheckCircle, XCircle, Shield, ChevronDown,
  Trash2, RefreshCw, Search, Crown, AlertCircle,
} from 'lucide-react';
import type { ERPMember, ERPRole, UserStatus } from '../types/userTypes';
import {
  ROLE_LABELS, ROLE_COLORS, USER_STATUS_LABELS, USER_STATUS_COLORS,
  ADMIN_MASTER_EMAIL, ROLE_PERMISSIONS,
} from '../types/userTypes';
import { useUserMgmt } from '../context/ERPContext';

function Avatar({ member, size = 'md' }: { member: ERPMember; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'w-12 h-12 text-base' : size === 'sm' ? 'w-7 h-7 text-xs' : 'w-9 h-9 text-sm';
  return (
    <div className={`${sizeClass} rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center overflow-hidden shrink-0`}>
      {member.avatar ? (
        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
      ) : (
        <span className="font-black text-[#22c55e]">{member.name.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
}

const ROLES: ERPRole[] = ['admin', 'gestao', 'financeiro', 'comercial', 'producao'];

export function UserManagementModule() {
  const { members, approveMember, rejectMember, suspendMember, changeRole, deleteMember, currentUser } = useUserMgmt();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<UserStatus | 'all'>('all');
  const [approveModal, setApproveModal] = useState<ERPMember | null>(null);
  const [selectedRole, setSelectedRole] = useState<ERPRole>('producao');
  const [approveNotes, setApproveNotes] = useState('');
  const [rejectModal, setRejectModal] = useState<ERPMember | null>(null);
  const [rejectNotes, setRejectNotes] = useState('');

  const pending = members.filter(m => m.status === 'pending');
  const filtered = members.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase())
      || m.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleApprove = () => {
    if (!approveModal) return;
    approveMember(approveModal.id, selectedRole, currentUser?.name || 'Admin', approveNotes);
    setApproveModal(null);
    setApproveNotes('');
  };

  const handleReject = () => {
    if (!rejectModal) return;
    rejectMember(rejectModal.id, rejectNotes);
    setRejectModal(null);
    setRejectNotes('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Pending Banner */}
      {pending.length > 0 && (
        <div className="flex items-center gap-3 px-5 py-3 bg-amber-500/10 border-b border-amber-500/20">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <p className="text-xs font-semibold text-amber-400">
            {pending.length} {pending.length === 1 ? 'usuário aguarda' : 'usuários aguardam'} aprovação de acesso ao ERP.
          </p>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#0d0d0d] flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Buscar por nome ou e-mail..."
            className="w-full bg-[#111111] border border-white/8 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#22c55e]/40" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as UserStatus | 'all')}
          className="bg-[#111111] border border-white/8 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none">
          <option value="all">Todos</option>
          {(['pending', 'approved', 'rejected', 'suspended'] as UserStatus[]).map(s => (
            <option key={s} value={s}>{USER_STATUS_LABELS[s]}</option>
          ))}
        </select>
        <div className="flex gap-3 text-xs text-zinc-500">
          <span><span className="text-white font-bold">{members.length}</span> total</span>
          <span><span className="text-[#22c55e] font-bold">{members.filter(m => m.status === 'approved').length}</span> aprovados</span>
          <span><span className="text-amber-400 font-bold">{pending.length}</span> pendentes</span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-[#0d0d0d] border-b border-white/5">
            <tr>
              <th className="text-left px-5 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Usuário</th>
              <th className="text-left px-3 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider hidden sm:table-cell">E-mail</th>
              <th className="text-left px-3 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Status</th>
              <th className="text-left px-3 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider hidden md:table-cell">Perfil</th>
              <th className="text-left px-3 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider hidden lg:table-cell">Desde</th>
              <th className="text-right px-5 py-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map(member => {
              const isAdminMaster = member.email.toLowerCase() === ADMIN_MASTER_EMAIL.toLowerCase();
              const isSelf = member.id === currentUser?.id;
              return (
                <tr key={member.id} className="hover:bg-white/2 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar member={member} />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-semibold text-white">{member.name}</p>
                          {isAdminMaster && <span title="Admin Master"><Crown className="w-3 h-3 text-amber-400" /></span>}
                          {isSelf && <span className="text-[9px] text-zinc-600 font-bold">(você)</span>}
                        </div>
                        <p className="text-zinc-500 text-[10px] sm:hidden">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-zinc-400 hidden sm:table-cell">{member.email}</td>
                  <td className="px-3 py-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${USER_STATUS_COLORS[member.status]}`}>
                      {USER_STATUS_LABELS[member.status]}
                    </span>
                  </td>
                  <td className="px-3 py-4 hidden md:table-cell">
                    {member.role ? (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ROLE_COLORS[member.role]}`}>
                        {ROLE_LABELS[member.role]}
                      </span>
                    ) : (
                      <span className="text-zinc-600 text-[10px]">— sem perfil</span>
                    )}
                  </td>
                  <td className="px-3 py-4 text-zinc-500 hidden lg:table-cell">
                    {new Date(member.requestedAt).toLocaleDateString('pt-BR')}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {member.status === 'pending' && (
                        <>
                          <button onClick={() => { setApproveModal(member); setSelectedRole('producao'); }}
                            className="flex items-center gap-1 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-[#22c55e]/20 transition-all">
                            <CheckCircle className="w-3 h-3" /> Aprovar
                          </button>
                          <button onClick={() => setRejectModal(member)}
                            className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-red-500/20 transition-all">
                            <XCircle className="w-3 h-3" /> Rejeitar
                          </button>
                        </>
                      )}
                      {member.status === 'approved' && !isAdminMaster && !isSelf && (
                        <>
                          <select
                            value={member.role || ''}
                            onChange={e => changeRole(member.id, e.target.value as ERPRole)}
                            className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1 text-[10px] text-zinc-300 focus:outline-none"
                          >
                            {ROLES.map(r => (
                              <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                            ))}
                          </select>
                          <button onClick={() => suspendMember(member.id)}
                            className="text-zinc-500 hover:text-amber-400 transition-colors p-1.5" title="Suspender">
                            <Shield className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}
                      {member.status === 'suspended' && (
                        <button onClick={() => approveMember(member.id, member.role || 'producao', currentUser?.name || 'Admin')}
                          className="flex items-center gap-1 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold px-2.5 py-1.5 rounded-lg hover:bg-[#22c55e]/20 transition-all">
                          <RefreshCw className="w-3 h-3" /> Reativar
                        </button>
                      )}
                      {!isAdminMaster && !isSelf && member.status !== 'pending' && (
                        <button onClick={() => deleteMember(member.id)}
                          className="text-zinc-600 hover:text-red-400 transition-colors p-1.5" title="Remover">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <Users className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum usuário encontrado</p>
          </div>
        )}
      </div>

      {/* Approve Modal */}
      {approveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">Aprovar Acesso</h3>
                <p className="text-xs text-zinc-500">{approveModal.name} · {approveModal.email}</p>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Perfil de Acesso</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(r => (
                  <button key={r} onClick={() => setSelectedRole(r)}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                      selectedRole === r
                        ? `${ROLE_COLORS[r]} border-opacity-100`
                        : 'text-zinc-500 bg-white/3 border-white/5 hover:border-white/15'
                    }`}>
                    {ROLE_LABELS[r]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Observações (opcional)</label>
              <textarea value={approveNotes} onChange={e => setApproveNotes(e.target.value)} rows={2}
                placeholder="Ex: Responsável pelo setor comercial..."
                className="w-full bg-black/20 border border-white/8 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none resize-none" />
            </div>

            {/* Permissions preview */}
            <div className="bg-black/20 border border-white/5 rounded-xl p-3">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Módulos com acesso</p>
              <div className="flex flex-wrap gap-1">
                {Object.entries(ROLE_PERMISSIONS[selectedRole] || {})
                  .filter(([, v]) => v)
                  .map(([k]) => (
                    <span key={k} className="text-[9px] text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">{k}</span>
                  ))}
              </div>
            </div>

            <div className="flex gap-2">
              <button onClick={() => setApproveModal(null)}
                className="flex-1 text-xs text-zinc-500 hover:text-white border border-white/8 px-4 py-2.5 rounded-xl transition-colors">
                Cancelar
              </button>
              <button onClick={handleApprove}
                className="flex-1 bg-[#22c55e] text-black text-xs font-black px-4 py-2.5 rounded-xl hover:brightness-110 transition-all">
                Aprovar como {ROLE_LABELS[selectedRole]}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 w-full max-w-md space-y-5 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">Rejeitar Acesso</h3>
                <p className="text-xs text-zinc-500">{rejectModal.name} · {rejectModal.email}</p>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Motivo (opcional)</label>
              <textarea value={rejectNotes} onChange={e => setRejectNotes(e.target.value)} rows={2}
                placeholder="Ex: Não faz parte da equipe."
                className="w-full bg-black/20 border border-white/8 rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none resize-none" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setRejectModal(null)}
                className="flex-1 text-xs text-zinc-500 hover:text-white border border-white/8 px-4 py-2.5 rounded-xl transition-colors">
                Cancelar
              </button>
              <button onClick={handleReject}
                className="flex-1 bg-red-500/80 text-white text-xs font-black px-4 py-2.5 rounded-xl hover:bg-red-500 transition-all">
                Rejeitar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
