import React, { useState } from 'react';
import { AlertTriangle, Plus, CheckCircle, Clock, Filter } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { IncidentCategory, IncidentImpact, IncidentStatus } from '../types/erpTypes';
import { INCIDENT_CATEGORY_LABELS, INCIDENT_IMPACT_LABELS } from '../types/erpTypes';

const IMPACT_COLORS: Record<IncidentImpact, string> = {
  low: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
  medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  high: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  critical: 'text-red-400 bg-red-500/10 border-red-500/20',
};

const STATUS_COLORS: Record<IncidentStatus, string> = {
  open: 'text-red-400 bg-red-500/10 border-red-500/20',
  in_progress: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  resolved: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20',
  closed: 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20',
};

const STATUS_LABELS: Record<IncidentStatus, string> = {
  open: 'Aberta',
  in_progress: 'Em Andamento',
  resolved: 'Resolvida',
  closed: 'Encerrada',
};

function fmt(n: number) {
  return `R$ ${n.toFixed(0)}`;
}

export function IncidentsModule() {
  const { state, dispatch } = useERP();
  const [categoryFilter, setCategoryFilter] = useState<IncidentCategory | 'all'>('all');
  const [impactFilter, setImpactFilter] = useState<IncidentImpact | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<IncidentStatus | 'all'>('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    description: '', category: 'equipment' as IncidentCategory,
    impact: 'medium' as IncidentImpact, timeLost: 0, financialImpact: 0,
    responsible: '', solution: '', date: new Date().toISOString().split('T')[0],
    status: 'open' as IncidentStatus, clientId: '', projectId: '',
  });

  const filtered = state.incidents.filter(i => {
    const matchCat = categoryFilter === 'all' || i.category === categoryFilter;
    const matchImpact = impactFilter === 'all' || i.impact === impactFilter;
    const matchStatus = statusFilter === 'all' || i.status === statusFilter;
    return matchCat && matchImpact && matchStatus;
  });

  const totalTimeLost = filtered.reduce((a, i) => a + i.timeLost, 0);
  const totalFinancialImpact = filtered.reduce((a, i) => a + (i.financialImpact || 0), 0);

  const handleSubmit = () => {
    if (!form.description || !form.responsible) return;
    dispatch({
      type: 'ADD_INCIDENT',
      payload: { id: `inc-${Date.now()}`, ...form, attachments: [] },
    });
    setShowForm(false);
    setForm({ description: '', category: 'equipment', impact: 'medium', timeLost: 0, financialImpact: 0, responsible: '', solution: '', date: new Date().toISOString().split('T')[0], status: 'open', clientId: '', projectId: '' });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#0d0d0d] flex-wrap">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="font-semibold">{filtered.length} ocorrências</span>
        </div>
        <div className="text-xs text-zinc-500 hidden sm:flex gap-4">
          <span>Tempo perdido: <span className="text-amber-400 font-bold">{totalTimeLost}min</span></span>
          <span>Impacto: <span className="text-red-400 font-bold">{fmt(totalFinancialImpact)}</span></span>
        </div>
        <div className="flex gap-2 ml-auto">
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value as IncidentCategory | 'all')}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none">
            <option value="all">Categoria</option>
            {(Object.entries(INCIDENT_CATEGORY_LABELS) as [IncidentCategory, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select value={impactFilter} onChange={e => setImpactFilter(e.target.value as IncidentImpact | 'all')}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none">
            <option value="all">Impacto</option>
            {(Object.entries(INCIDENT_IMPACT_LABELS) as [IncidentImpact, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <button onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-1.5 bg-[#22c55e] text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:brightness-110 transition-all">
            <Plus className="w-3.5 h-3.5" /> Registrar
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="border-b border-white/5 bg-[#111111]/50 p-5">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Nova Ocorrência</h3>
            <textarea
              placeholder="Descrição da ocorrência..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              rows={2}
              className="w-full bg-[#111111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none resize-none"
            />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value as IncidentCategory }))}
                className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-zinc-300 focus:outline-none">
                {(Object.entries(INCIDENT_CATEGORY_LABELS) as [IncidentCategory, string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <select value={form.impact} onChange={e => setForm(f => ({ ...f, impact: e.target.value as IncidentImpact }))}
                className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-zinc-300 focus:outline-none">
                {(Object.entries(INCIDENT_IMPACT_LABELS) as [IncidentImpact, string][]).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
              <input type="number" placeholder="Tempo perdido (min)" value={form.timeLost || ''}
                onChange={e => setForm(f => ({ ...f, timeLost: Number(e.target.value) }))}
                className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none" />
              <input type="number" placeholder="Impacto financeiro R$" value={form.financialImpact || ''}
                onChange={e => setForm(f => ({ ...f, financialImpact: Number(e.target.value) }))}
                className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input placeholder="Responsável" value={form.responsible}
                onChange={e => setForm(f => ({ ...f, responsible: e.target.value }))}
                className="bg-[#111111] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none" />
              <input placeholder="Solução aplicada (opcional)" value={form.solution}
                onChange={e => setForm(f => ({ ...f, solution: e.target.value }))}
                className="bg-[#111111] border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none" />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowForm(false)} className="text-xs text-zinc-500 hover:text-white px-3 py-1.5 transition-colors">Cancelar</button>
              <button onClick={handleSubmit} className="bg-[#22c55e] text-black text-xs font-bold px-4 py-1.5 rounded-lg hover:brightness-110 transition-all">Salvar</button>
            </div>
          </div>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {filtered.map(inc => {
          const client = state.clients.find(c => c.id === inc.clientId);
          const project = state.projects.find(p => p.id === inc.projectId);
          return (
            <div key={inc.id} className={`bg-[#111111] border rounded-xl p-4 hover:border-white/10 transition-all ${
              inc.impact === 'critical' ? 'border-red-500/20' : 'border-white/5'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${IMPACT_COLORS[inc.impact]}`}>
                      {INCIDENT_IMPACT_LABELS[inc.impact]}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-semibold bg-zinc-800 px-2 py-0.5 rounded-full">
                      {INCIDENT_CATEGORY_LABELS[inc.category]}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_COLORS[inc.status]}`}>
                      {STATUS_LABELS[inc.status]}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-white">{inc.description}</p>
                  {inc.solution && (
                    <p className="text-[11px] text-[#22c55e] mt-1">→ {inc.solution}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-600 flex-wrap">
                    <span>{inc.date}</span>
                    <span>·</span>
                    <span>{inc.responsible}</span>
                    {client && <><span>·</span><span>{client.name}</span></>}
                    {project && <><span>·</span><span>{project.title.substring(0, 30)}...</span></>}
                  </div>
                </div>
                <div className="text-right shrink-0 space-y-1">
                  {inc.timeLost > 0 && (
                    <div>
                      <p className="text-[10px] text-zinc-600">Tempo perdido</p>
                      <p className="text-xs font-bold text-amber-400">{inc.timeLost}min</p>
                    </div>
                  )}
                  {inc.financialImpact && inc.financialImpact > 0 && (
                    <div>
                      <p className="text-[10px] text-zinc-600">Impacto</p>
                      <p className="text-xs font-bold text-red-400">{fmt(inc.financialImpact)}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Update status */}
              <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
                {(['open', 'in_progress', 'resolved', 'closed'] as IncidentStatus[]).map(s => (
                  <button
                    key={s}
                    onClick={() => dispatch({ type: 'UPDATE_INCIDENT', payload: { ...inc, status: s } })}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full transition-all border ${
                      inc.status === s ? STATUS_COLORS[s] : 'border-white/5 text-zinc-600 hover:border-white/10 hover:text-zinc-400'
                    }`}
                  >
                    {STATUS_LABELS[s]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-zinc-600">
            <CheckCircle className="w-8 h-8 mx-auto mb-3 opacity-30 text-[#22c55e]" />
            <p className="text-sm">Nenhuma ocorrência registrada</p>
            <p className="text-xs mt-1">Sistema limpo! Excelente operação.</p>
          </div>
        )}
      </div>
    </div>
  );
}
