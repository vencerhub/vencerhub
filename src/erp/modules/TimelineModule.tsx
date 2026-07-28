import React, { useState } from 'react';
import {
  GitBranch, Users, Phone, FileText, DollarSign, Package, AlertTriangle,
  RefreshCw, Star, MessageCircle, FileCheck, XCircle, Plus, Filter,
} from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { TimelineEventType } from '../types/erpTypes';
import { TIMELINE_EVENT_LABELS } from '../types/erpTypes';

const EVENT_ICONS: Record<TimelineEventType, React.FC<{ className?: string }>> = {
  first_contact: Users,
  meeting: Users,
  call: Phone,
  message: MessageCircle,
  proposal: FileText,
  contract: FileCheck,
  payment: DollarSign,
  project: Package,
  complaint: AlertTriangle,
  rework: RefreshCw,
  incident: AlertTriangle,
  renewal: RefreshCw,
  cancellation: XCircle,
  nps: Star,
  note: FileText,
};

const EVENT_COLORS: Record<TimelineEventType, string> = {
  first_contact: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  meeting: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  call: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400',
  message: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400',
  proposal: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
  contract: 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
  payment: 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
  project: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
  complaint: 'bg-red-500/10 border-red-500/30 text-red-400',
  rework: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  incident: 'bg-red-500/10 border-red-500/30 text-red-400',
  renewal: 'bg-[#22c55e]/10 border-[#22c55e]/30 text-[#22c55e]',
  cancellation: 'bg-red-500/10 border-red-500/30 text-red-400',
  nps: 'bg-purple-500/10 border-purple-500/30 text-purple-400',
  note: 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400',
};

export function TimelineModule() {
  const { state } = useERP();
  const [clientFilter, setClientFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<TimelineEventType | 'all'>('all');

  const filtered = state.timeline.filter(ev => {
    const matchClient = clientFilter === 'all' || ev.clientId === clientFilter;
    const matchType = typeFilter === 'all' || ev.type === typeFilter;
    return matchClient && matchType;
  });

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-4 border-b border-white/5 bg-[#0d0d0d] flex-wrap">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <GitBranch className="w-4 h-4 text-[#22c55e]" />
          <span className="font-semibold">Prontuário de Clientes</span>
        </div>
        <div className="flex gap-2 ml-auto">
          <select
            value={clientFilter}
            onChange={e => setClientFilter(e.target.value)}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
          >
            <option value="all">Todos os clientes</option>
            {state.clients.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as TimelineEventType | 'all')}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none"
          >
            <option value="all">Todos os eventos</option>
            {(Object.entries(TIMELINE_EVENT_LABELS) as [TimelineEventType, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 bg-[#22c55e] text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:brightness-110 transition-all">
            <Plus className="w-3.5 h-3.5" /> Registrar
          </button>
        </div>
      </div>

      {/* Timeline Feed */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-white/5" />

          <div className="space-y-4">
            {filtered.map((ev, idx) => {
              const Icon = EVENT_ICONS[ev.type] || FileText;
              const color = EVENT_COLORS[ev.type] || 'bg-zinc-500/10 border-zinc-500/30 text-zinc-400';
              const client = state.clients.find(c => c.id === ev.clientId);

              return (
                <div key={ev.id} className="flex gap-4 relative">
                  {/* Icon dot */}
                  <div className={`w-10 h-10 rounded-full border flex items-center justify-center shrink-0 z-10 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Card */}
                  <div className={`flex-1 bg-[#111111] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all ${ev.automated ? 'border-dashed' : ''}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${color}`}>
                            {TIMELINE_EVENT_LABELS[ev.type]}
                          </span>
                          {ev.automated && (
                            <span className="text-[10px] text-zinc-600 font-semibold bg-zinc-800 px-2 py-0.5 rounded-full border border-zinc-700">
                              Automático
                            </span>
                          )}
                          {client && (
                            <span className="text-[10px] text-zinc-500 font-semibold">
                              {client.name} · {client.company}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{ev.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-[10px] text-zinc-600">
                          <span>{new Date(ev.date).toLocaleDateString('pt-BR')} às {ev.time}</span>
                          <span>·</span>
                          <span>{ev.responsible}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filtered.length === 0 && (
              <div className="text-center py-16 text-zinc-600">
                <GitBranch className="w-8 h-8 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Nenhum evento encontrado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
