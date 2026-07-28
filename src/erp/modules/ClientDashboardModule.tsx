import React, { useState } from 'react';
import { UserSquare2, TrendingUp, Star, AlertTriangle, RefreshCw, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { Client, ClientScore } from '../types/erpTypes';
import { CLIENT_SCORE_LABELS, CLIENT_STATUS_LABELS, SERVICE_TYPE_LABELS } from '../types/erpTypes';

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

function StatCard({ label, value, sub, color = 'default' }: { label: string; value: string | number; sub?: string; color?: string }) {
  return (
    <div className="bg-black/20 border border-white/5 rounded-xl p-4">
      <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{label}</p>
      <p className={`text-xl font-black mt-1 ${color === 'green' ? 'text-[#22c55e]' : color === 'red' ? 'text-red-400' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-[10px] text-zinc-600 mt-0.5">{sub}</p>}
    </div>
  );
}

export function ClientDashboardModule() {
  const { state, dispatch } = useERP();
  const [selectedId, setSelectedId] = useState<string>(state.clients[0]?.id || '');

  const client = state.clients.find(c => c.id === selectedId);
  const clientProjects = state.projects.filter(p => p.clientId === selectedId);
  const clientIncidents = state.incidents.filter(i => i.clientId === selectedId);

  const completedProjects = clientProjects.filter(p => p.status === 'completed');
  const totalRevenue = completedProjects.reduce((a, p) => a + p.revenue, 0);
  const totalCosts = completedProjects.reduce((a, p) => a + Object.values(p.costs).reduce((x, y) => x + y, 0), 0);
  const totalProfit = totalRevenue - totalCosts;
  const avgMargin = totalRevenue > 0 ? (totalProfit / totalRevenue * 100) : 0;
  const totalHours = clientProjects.reduce((a, p) => a + p.hoursUsed, 0);
  const npsProjects = completedProjects.filter(p => p.nps !== undefined);
  const avgNps = npsProjects.length > 0 ? npsProjects.reduce((a, p) => a + (p.nps ?? 0), 0) / npsProjects.length : 0;
  const reworks = clientIncidents.filter(i => i.category === 'client').length;
  const daysSinceEntry = client ? Math.floor((Date.now() - new Date(client.entryDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;
  const lastProject = clientProjects.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0];

  return (
    <div className="flex flex-col h-full">
      {/* Client Selector */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#0d0d0d]">
        <UserSquare2 className="w-4 h-4 text-[#22c55e]" />
        <span className="text-xs font-semibold text-zinc-400">Dashboard do Cliente:</span>
        <select
          value={selectedId}
          onChange={e => setSelectedId(e.target.value)}
          className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none flex-1 max-w-xs"
        >
          {state.clients.map(c => (
            <option key={c.id} value={c.id}>{c.name} — {c.company}</option>
          ))}
        </select>
      </div>

      {!client ? (
        <div className="flex items-center justify-center flex-1 text-zinc-600">
          <p>Selecione um cliente</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-xl font-black text-white">{client.name}</h2>
                {client.score && (
                  <span className={`text-xs font-black px-3 py-1 rounded-full border ${SCORE_COLORS[client.score]}`}>
                    {CLIENT_SCORE_LABELS[client.score]}
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500">{client.company} · {client.segment}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-zinc-600">Score</p>
              <p className="text-3xl font-black text-white">{client.scorePoints || 0}</p>
              <p className="text-[10px] text-zinc-600">pontos</p>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            <StatCard label="Receita Total" value={fmt(totalRevenue)} color="green" />
            <StatCard label="Lucro Total" value={fmt(totalProfit)} sub={`Margem ${avgMargin.toFixed(1)}%`} color={totalProfit >= 0 ? 'green' : 'red'} />
            <StatCard label="LTV" value={fmt(client.lifetimeValue)} />
            <StatCard label="Projetos" value={clientProjects.length} sub={`${completedProjects.length} concluídos`} />
            <StatCard label="Horas" value={totalHours} sub="Horas produzidas" />
            <StatCard label="NPS Médio" value={avgNps.toFixed(1)} sub="0-10" color={avgNps >= 9 ? 'green' : avgNps >= 7 ? 'default' : 'red'} />
            <StatCard label="Retrabalhos" value={reworks} color={reworks > 2 ? 'red' : 'default'} />
            <StatCard label="Como cliente" value={`${daysSinceEntry}d`} sub={`desde ${new Date(client.entryDate).toLocaleDateString('pt-BR')}`} />
          </div>

          {/* Progress bar for score */}
          <div className="bg-[#111111] border border-white/5 rounded-xl p-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-white">Potencial de Crescimento</span>
              <span className="text-xs text-zinc-500">{client.scorePoints || 0}/100</span>
            </div>
            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  (client.scorePoints || 0) >= 85 ? 'bg-purple-500' :
                  (client.scorePoints || 0) >= 70 ? 'bg-amber-500' :
                  (client.scorePoints || 0) >= 55 ? 'bg-zinc-400' :
                  (client.scorePoints || 0) >= 35 ? 'bg-orange-500' : 'bg-red-500'
                }`}
                style={{ width: `${client.scorePoints || 0}%` }}
              />
            </div>
            <p className="text-[10px] text-zinc-600 mt-2">
              {(client.scorePoints || 0) < 55
                ? 'Atenção: cliente com risco de churn. Priorizar ações de relacionamento.'
                : (client.scorePoints || 0) < 70
                ? 'Cliente estável. Oportunidade de upsell com pacotes de recorrência.'
                : 'Cliente de alto valor. Fortalecer vínculo e explorar crescimento de receita.'}
            </p>
          </div>

          {/* Last interactions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Last project */}
            {lastProject && (
              <div className="bg-[#111111] border border-white/5 rounded-xl p-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Último Projeto</h4>
                <p className="text-xs font-bold text-white">{lastProject.title}</p>
                <p className="text-[11px] text-zinc-500 mt-1">{SERVICE_TYPE_LABELS[lastProject.serviceType]}</p>
                <p className="text-[11px] text-zinc-600 mt-0.5">{new Date(lastProject.updatedAt).toLocaleDateString('pt-BR')}</p>
              </div>
            )}

            {/* Notes */}
            {client.notes && (
              <div className="bg-[#111111] border border-white/5 rounded-xl p-4">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Observações</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{client.notes}</p>
              </div>
            )}
          </div>

          {/* Projects */}
          {clientProjects.length > 0 && (
            <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Histórico de Projetos</h4>
              </div>
              <div className="divide-y divide-white/5">
                {clientProjects.map(proj => {
                  const costs = Object.values(proj.costs).reduce((a, b) => a + b, 0);
                  const profit = proj.revenue - costs;
                  return (
                    <div key={proj.id} className="flex items-center justify-between px-4 py-3 hover:bg-white/2">
                      <div>
                        <p className="text-xs font-semibold text-white">{proj.title}</p>
                        <p className="text-[10px] text-zinc-500">{SERVICE_TYPE_LABELS[proj.serviceType]} · {proj.startDate}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold text-white">{fmt(proj.revenue)}</p>
                        <p className={`text-[10px] font-bold ${profit >= 0 ? 'text-[#22c55e]' : 'text-red-400'}`}>
                          {profit >= 0 ? '+' : ''}{fmt(profit)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Incidents */}
          {clientIncidents.length > 0 && (
            <div className="bg-[#111111] border border-red-500/10 rounded-xl overflow-hidden">
              <div className="p-4 border-b border-white/5">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
                  <AlertTriangle className="w-3 h-3 text-red-400" /> Ocorrências Relacionadas
                </h4>
              </div>
              <div className="divide-y divide-white/5">
                {clientIncidents.map(inc => (
                  <div key={inc.id} className="flex items-center justify-between px-4 py-3">
                    <p className="text-xs text-zinc-400 flex-1 pr-4">{inc.description}</p>
                    <span className="text-[10px] text-red-400 font-bold shrink-0">{inc.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
