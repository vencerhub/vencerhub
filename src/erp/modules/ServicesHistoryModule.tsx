import React, { useState } from 'react';
import {
  Briefcase, Clock, DollarSign, TrendingUp, Users, CheckCircle,
  AlertTriangle, ChevronDown, ChevronUp, Play, ClipboardCheck,
} from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { Project } from '../types/erpTypes';
import { SERVICE_TYPE_LABELS, PROJECT_STATUS_LABELS, COST_LABELS } from '../types/erpTypes';

function fmt(n: number) {
  if (n >= 1000) return `R$ ${(n / 1000).toFixed(1)}k`;
  return `R$ ${n.toFixed(0)}`;
}

const STATUS_COLORS: Record<string, string> = {
  completed: 'text-[#22c55e] bg-[#22c55e]/10',
  in_progress: 'text-blue-400 bg-blue-500/10',
  checklist_pending: 'text-amber-400 bg-amber-500/10',
  approved: 'text-purple-400 bg-purple-500/10',
  cancelled: 'text-red-400 bg-red-500/10',
  draft: 'text-zinc-400 bg-zinc-500/10',
  negotiation: 'text-cyan-400 bg-cyan-500/10',
};

function ProjectRow({ project }: { project: Project }) {
  const { state, dispatch, completeProject } = useERP();
  const [open, setOpen] = useState(false);
  const client = state.clients.find(c => c.id === project.clientId);
  const totalCosts = Object.values(project.costs).reduce((a, b) => a + b, 0);
  const grossProfit = project.revenue - totalCosts;
  const margin = project.revenue > 0 ? (grossProfit / project.revenue * 100).toFixed(1) : '0';

  return (
    <div className="border border-white/5 rounded-xl overflow-hidden bg-[#111111] hover:border-white/10 transition-all">
      {/* Header */}
      <div className="flex items-center gap-4 p-4 cursor-pointer" onClick={() => setOpen(!open)}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-white">{project.title}</p>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${STATUS_COLORS[project.status]}`}>
              {PROJECT_STATUS_LABELS[project.status]}
            </span>
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">
            {client?.company || '—'} · {SERVICE_TYPE_LABELS[project.serviceType]} · Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}
          </p>
        </div>
        <div className="flex items-center gap-6 shrink-0">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-white">{fmt(project.revenue)}</p>
            <p className="text-[10px] text-zinc-500">Receita</p>
          </div>
          <div className="text-right hidden md:block">
            <p className={`text-xs font-bold ${grossProfit >= 0 ? 'text-[#22c55e]' : 'text-red-400'}`}>{fmt(grossProfit)}</p>
            <p className="text-[10px] text-zinc-500">Lucro</p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-xs font-bold text-white">{margin}%</p>
            <p className="text-[10px] text-zinc-500">Margem</p>
          </div>
          <div className="text-right">
            <p className="text-xs font-bold text-white">{project.hoursUsed}/{project.hoursContracted}h</p>
            <p className="text-[10px] text-zinc-500">Horas</p>
          </div>
          {open ? <ChevronUp className="w-4 h-4 text-zinc-500" /> : <ChevronDown className="w-4 h-4 text-zinc-500" />}
        </div>
      </div>

      {/* Detail Panel */}
      {open && (
        <div className="border-t border-white/5 p-5 space-y-4">
          {/* DRE breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">DRE do Projeto</h4>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Receita</span>
                  <span className="text-white font-bold">{fmt(project.revenue)}</span>
                </div>
                <div className="h-px bg-white/5 my-1" />
                {(Object.keys(project.costs) as (keyof typeof project.costs)[]).map(key => (
                  project.costs[key] > 0 && (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-zinc-500">{COST_LABELS[key]}</span>
                      <span className="text-zinc-300">({fmt(project.costs[key])})</span>
                    </div>
                  )
                ))}
                <div className="h-px bg-white/5 my-1" />
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">Total Custos</span>
                  <span className="text-red-400 font-bold">({fmt(totalCosts)})</span>
                </div>
                <div className="flex justify-between text-sm font-black">
                  <span className="text-white">Lucro Líquido</span>
                  <span className={grossProfit >= 0 ? 'text-[#22c55e]' : 'text-red-400'}>{fmt(grossProfit)} ({margin}%)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {/* Team */}
              {project.team.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Equipe</h4>
                  <div className="space-y-1">
                    {project.team.map(m => (
                      <div key={m.id} className="flex items-center justify-between text-xs">
                        <span className="text-zinc-300">{m.name}</span>
                        <span className="text-zinc-500">{m.role}</span>
                      </div>
                    ))}
                    {project.freelancers.map(f => (
                      <div key={f.freelancerId} className="flex items-center justify-between text-xs">
                        <span className="text-amber-300">{f.name} (FL)</span>
                        <span className="text-zinc-500">{fmt(f.total)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Incidents */}
              {project.incidents.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Ocorrências ({project.incidents.length})</h4>
                  {project.incidents.map(inc => (
                    <div key={inc.id} className="text-xs text-red-400 bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
                      {inc.description}
                    </div>
                  ))}
                </div>
              )}

              {/* NPS */}
              {project.nps !== undefined && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-zinc-500">NPS:</span>
                  <span className={`text-sm font-black ${project.nps >= 9 ? 'text-[#22c55e]' : project.nps >= 7 ? 'text-amber-400' : 'text-red-400'}`}>
                    {project.nps}/10
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t border-white/5">
            {project.status === 'in_progress' && (
              <button
                onClick={() => dispatch({ type: 'UPDATE_PROJECT', payload: { ...project, status: 'checklist_pending' } })}
                className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-3 py-2 rounded-lg hover:bg-amber-500/20 transition-all"
              >
                <ClipboardCheck className="w-3.5 h-3.5" /> Ir para Checklist
              </button>
            )}
            {project.status === 'checklist_pending' && (
              <button
                onClick={() => dispatch({ type: 'SET_MODULE', payload: 'checklist' })}
                className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold px-3 py-2 rounded-lg hover:bg-[#22c55e]/20 transition-all"
              >
                <CheckCircle className="w-3.5 h-3.5" /> Preencher Checklist
              </button>
            )}
            {project.status === 'approved' && (
              <button
                onClick={() => dispatch({ type: 'UPDATE_PROJECT', payload: { ...project, status: 'in_progress' } })}
                className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold px-3 py-2 rounded-lg hover:bg-blue-500/20 transition-all"
              >
                <Play className="w-3.5 h-3.5" /> Iniciar Projeto
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function ServicesHistoryModule() {
  const { state } = useERP();
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filtered = state.projects.filter(p => {
    const matchType = typeFilter === 'all' || p.serviceType === typeFilter;
    const matchStatus = statusFilter === 'all' || p.status === statusFilter;
    return matchType && matchStatus;
  });

  const totalRevenue = filtered.reduce((a, p) => a + p.revenue, 0);
  const totalCosts = filtered.reduce((a, p) => a + Object.values(p.costs).reduce((x, y) => x + y, 0), 0);
  const totalProfit = totalRevenue - totalCosts;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#0d0d0d] flex-wrap">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <Briefcase className="w-4 h-4 text-[#22c55e]" />
          <span className="font-semibold">{filtered.length} projetos</span>
        </div>
        <div className="flex gap-3 ml-auto flex-wrap">
          <div className="flex gap-4 text-xs hidden sm:flex">
            <span className="text-zinc-500">Receita: <span className="text-white font-bold">{fmt(totalRevenue)}</span></span>
            <span className="text-zinc-500">Lucro: <span className={`font-bold ${totalProfit >= 0 ? 'text-[#22c55e]' : 'text-red-400'}`}>{fmt(totalProfit)}</span></span>
          </div>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none">
            <option value="all">Tipo de Serviço</option>
            {(Object.entries(SERVICE_TYPE_LABELS) as [string, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none">
            <option value="all">Status</option>
            {(Object.entries(PROJECT_STATUS_LABELS) as [string, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.map(proj => (
          <ProjectRow key={proj.id} project={proj} />
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <Briefcase className="w-8 h-8 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Nenhum projeto encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
