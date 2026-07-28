import React, { useState } from 'react';
import { Search, Plus, Filter, Phone, Mail, Instagram, ExternalLink, Building2, Tag } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { Client, ClientStatus, ClientScore } from '../types/erpTypes';
import { CLIENT_STATUS_LABELS, CLIENT_SCORE_LABELS, CLIENT_SCORE_LABELS as scoreLbl } from '../types/erpTypes';

const STATUS_COLORS: Record<ClientStatus, string> = {
  active: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20',
  inactive: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
  lead: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
  prospect: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
  churned: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const SCORE_COLORS: Record<ClientScore, string> = {
  premium: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
  gold: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
  silver: 'text-zinc-300 bg-zinc-500/10 border-zinc-500/30',
  bronze: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
  risk: 'text-red-400 bg-red-500/10 border-red-500/30',
};

function fmt(n: number) {
  if (n >= 1000) return `R$ ${(n / 1000).toFixed(1)}k`;
  return `R$ ${n.toFixed(0)}`;
}

export function CRMModule() {
  const { state, dispatch } = useERP();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<ClientStatus | 'all'>('all');
  const [scoreFilter, setScoreFilter] = useState<ClientScore | 'all'>('all');
  const [selected, setSelected] = useState<Client | null>(null);

  const filtered = state.clients.filter(c => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.segment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchScore = scoreFilter === 'all' || c.score === scoreFilter;
    return matchSearch && matchStatus && matchScore;
  });

  const clientProjects = selected ? state.projects.filter(p => p.clientId === selected.id) : [];

  return (
    <div className="flex h-full">
      {/* List */}
      <div className={`flex flex-col border-r border-white/5 transition-all duration-300 ${selected ? 'w-[52%]' : 'w-full'}`}>
        {/* Toolbar */}
        <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#0d0d0d]">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-500" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar cliente, empresa, segmento..."
              className="w-full bg-[#111111] border border-white/8 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#22c55e]/40"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as ClientStatus | 'all')}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none"
          >
            <option value="all">Status</option>
            {(Object.keys(CLIENT_STATUS_LABELS) as ClientStatus[]).map(s => (
              <option key={s} value={s}>{CLIENT_STATUS_LABELS[s]}</option>
            ))}
          </select>
          <select
            value={scoreFilter}
            onChange={e => setScoreFilter(e.target.value as ClientScore | 'all')}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-2 text-xs text-zinc-300 focus:outline-none"
          >
            <option value="all">Score</option>
            {(Object.keys(scoreLbl) as ClientScore[]).map(s => (
              <option key={s} value={s}>{scoreLbl[s]}</option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 bg-[#22c55e] text-black text-xs font-bold px-3 py-2 rounded-lg hover:brightness-110 transition-all shrink-0">
            <Plus className="w-3.5 h-3.5" /> Novo
          </button>
        </div>

        {/* Stats Row */}
        <div className="flex gap-4 px-4 py-2.5 border-b border-white/5 text-[11px] text-zinc-500">
          <span><span className="text-white font-bold">{filtered.length}</span> clientes</span>
          <span><span className="text-[#22c55e] font-bold">{filtered.filter(c => c.status === 'active').length}</span> ativos</span>
          <span><span className="text-amber-400 font-bold">{filtered.filter(c => c.score === 'premium').length}</span> premium</span>
          <span><span className="text-red-400 font-bold">{filtered.filter(c => c.score === 'risk').length}</span> risco</span>
        </div>

        {/* Client Table */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="sticky top-0 bg-[#0d0d0d] border-b border-white/5">
              <tr>
                <th className="text-left px-4 py-2.5 font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">Cliente</th>
                <th className="text-left px-3 py-2.5 font-semibold text-zinc-500 uppercase tracking-wider text-[10px] hidden lg:table-cell">Segmento</th>
                <th className="text-left px-3 py-2.5 font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">Status</th>
                <th className="text-left px-3 py-2.5 font-semibold text-zinc-500 uppercase tracking-wider text-[10px]">Score</th>
                <th className="text-right px-4 py-2.5 font-semibold text-zinc-500 uppercase tracking-wider text-[10px] hidden sm:table-cell">LTV</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(client => (
                <tr
                  key={client.id}
                  onClick={() => setSelected(selected?.id === client.id ? null : client)}
                  className={`cursor-pointer hover:bg-white/3 transition-colors ${selected?.id === client.id ? 'bg-[#22c55e]/5 border-l-2 border-[#22c55e]' : ''}`}
                >
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-semibold text-white">{client.name}</p>
                      <p className="text-zinc-500 text-[10px] flex items-center gap-1">
                        <Building2 className="w-2.5 h-2.5" /> {client.company}
                      </p>
                    </div>
                  </td>
                  <td className="px-3 py-3 hidden lg:table-cell">
                    <span className="text-zinc-400">{client.segment}</span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`px-2 py-0.5 rounded-full border font-bold text-[10px] ${STATUS_COLORS[client.status]}`}>
                      {CLIENT_STATUS_LABELS[client.status]}
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    {client.score && (
                      <div className="flex items-center gap-1.5">
                        <span className={`px-2 py-0.5 rounded-full border font-bold text-[10px] ${SCORE_COLORS[client.score]}`}>
                          {CLIENT_SCORE_LABELS[client.score]}
                        </span>
                        {client.scorePoints && (
                          <span className="text-zinc-500 text-[10px]">{client.scorePoints}pts</span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right hidden sm:table-cell">
                    <span className="font-bold text-white">{fmt(client.lifetimeValue)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="flex-1 overflow-y-auto bg-[#0d0d0d]">
          <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-black text-white">{selected.name}</h3>
                <p className="text-sm text-zinc-400 flex items-center gap-2 mt-0.5">
                  <Building2 className="w-3.5 h-3.5" /> {selected.company}
                </p>
              </div>
              <div className="flex gap-2">
                {selected.status && (
                  <span className={`px-3 py-1 rounded-full border font-bold text-xs ${STATUS_COLORS[selected.status]}`}>
                    {CLIENT_STATUS_LABELS[selected.status]}
                  </span>
                )}
                {selected.score && (
                  <span className={`px-3 py-1 rounded-full border font-bold text-xs ${SCORE_COLORS[selected.score]}`}>
                    {CLIENT_SCORE_LABELS[selected.score]} · {selected.scorePoints}pts
                  </span>
                )}
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[#111111] rounded-xl p-4 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">LTV</p>
                <p className="text-xl font-black text-white mt-1">{fmt(selected.lifetimeValue)}</p>
              </div>
              <div className="bg-[#111111] rounded-xl p-4 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Projetos</p>
                <p className="text-xl font-black text-white mt-1">{clientProjects.length}</p>
              </div>
              <div className="bg-[#111111] rounded-xl p-4 border border-white/5">
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Segmento</p>
                <p className="text-sm font-bold text-white mt-1 truncate">{selected.segment}</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-[#111111] rounded-xl p-4 border border-white/5 space-y-3">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Contato</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Phone className="w-3.5 h-3.5 text-zinc-500" /> {selected.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-300">
                  <Mail className="w-3.5 h-3.5 text-zinc-500" /> {selected.email}
                </div>
                {selected.instagram && (
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <Instagram className="w-3.5 h-3.5 text-zinc-500" /> {selected.instagram}
                  </div>
                )}
                {selected.cnpj && (
                  <div className="flex items-center gap-2 text-xs text-zinc-300">
                    <Tag className="w-3.5 h-3.5 text-zinc-500" /> CNPJ: {selected.cnpj}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="bg-[#111111] rounded-xl p-4 border border-white/5 space-y-2">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Dados Comerciais</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div><span className="text-zinc-500">Responsável: </span><span className="text-white">{selected.responsible}</span></div>
                <div><span className="text-zinc-500">Origem: </span><span className="text-white capitalize">{selected.origin}</span></div>
                <div><span className="text-zinc-500">Entrada: </span><span className="text-white">{new Date(selected.entryDate).toLocaleDateString('pt-BR')}</span></div>
                <div><span className="text-zinc-500">Valor Est.: </span><span className="text-white">{fmt(selected.estimatedValue)}</span></div>
              </div>
            </div>

            {/* Projects */}
            {clientProjects.length > 0 && (
              <div className="bg-[#111111] rounded-xl overflow-hidden border border-white/5">
                <div className="p-4 border-b border-white/5">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Projetos ({clientProjects.length})</h4>
                </div>
                <div className="divide-y divide-white/5">
                  {clientProjects.map(proj => {
                    const totalCosts = Object.values(proj.costs).reduce((a, b) => a + b, 0);
                    const margin = proj.revenue > 0 ? ((proj.revenue - totalCosts) / proj.revenue * 100).toFixed(0) : '0';
                    return (
                      <div key={proj.id} className="flex items-center justify-between px-4 py-3">
                        <div>
                          <p className="text-xs font-semibold text-white">{proj.title}</p>
                          <p className="text-[10px] text-zinc-500">{proj.startDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-white">{fmt(proj.revenue)}</p>
                          <p className="text-[10px] text-zinc-500">Margem {margin}%</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Notes */}
            {selected.notes && (
              <div className="bg-[#111111] rounded-xl p-4 border border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Observações</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{selected.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => dispatch({ type: 'SET_MODULE', payload: 'timeline' })}
                className="flex-1 bg-[#111111] border border-white/8 text-zinc-300 text-xs font-semibold py-2.5 rounded-lg hover:border-white/20 hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Ver Timeline
              </button>
              <button
                onClick={() => dispatch({ type: 'SET_MODULE', payload: 'client-dashboard' })}
                className="flex-1 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold py-2.5 rounded-lg hover:bg-[#22c55e]/20 transition-all flex items-center justify-center gap-1.5"
              >
                Dashboard Completo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
