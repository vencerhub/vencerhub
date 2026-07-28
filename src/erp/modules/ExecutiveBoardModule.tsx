import React, { useState } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, AlertTriangle, Star } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { SERVICE_TYPE_LABELS, CLIENT_SCORE_LABELS } from '../types/erpTypes';

function fmt(n: number) {
  if (n >= 1000) return `R$ ${(n / 1000).toFixed(1)}k`;
  return `R$ ${n.toFixed(0)}`;
}

function fmtFull(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function BarMini({ value, max, color = '#22c55e' }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

export function ExecutiveBoardModule() {
  const { state } = useERP();
  const { clients, projects, transactions, incidents, financialMetrics: fm } = state;

  const completedProjects = projects.filter(p => p.status === 'completed');

  // Client profit ranking
  const clientProfits = clients.map(c => {
    const cProjects = completedProjects.filter(p => p.clientId === c.id);
    const revenue = cProjects.reduce((a, p) => a + p.revenue, 0);
    const costs = cProjects.reduce((a, p) => a + Object.values(p.costs).reduce((x, y) => x + y, 0), 0);
    const profit = revenue - costs;
    const margin = revenue > 0 ? profit / revenue * 100 : 0;
    const incidents = state.incidents.filter(i => i.clientId === c.id).length;
    const npsProjects = cProjects.filter(p => p.nps !== undefined);
    const avgNps = npsProjects.length > 0 ? npsProjects.reduce((a, p) => a + (p.nps ?? 0), 0) / npsProjects.length : 0;
    return { ...c, revenue, costs, profit, margin, incidents, avgNps };
  }).sort((a, b) => b.profit - a.profit);

  const maxProfit = Math.max(...clientProfits.map(c => Math.abs(c.profit)));

  // Service performance
  const servicePerf = Object.entries(
    completedProjects.reduce((acc, p) => {
      if (!acc[p.serviceType]) acc[p.serviceType] = { revenue: 0, costs: 0, count: 0 };
      const cost = Object.values(p.costs).reduce((a, b) => a + b, 0);
      acc[p.serviceType].revenue += p.revenue;
      acc[p.serviceType].costs += cost;
      acc[p.serviceType].count += 1;
      return acc;
    }, {} as Record<string, { revenue: number; costs: number; count: number }>)
  ).map(([type, d]) => ({
    type,
    label: SERVICE_TYPE_LABELS[type as keyof typeof SERVICE_TYPE_LABELS] || type,
    revenue: d.revenue,
    profit: d.revenue - d.costs,
    margin: d.revenue > 0 ? (d.revenue - d.costs) / d.revenue * 100 : 0,
    count: d.count,
  })).sort((a, b) => b.profit - a.profit);

  const maxSvcRevenue = Math.max(...servicePerf.map(s => s.revenue));

  // Monthly cashflow (last 6 months)
  const now = new Date();
  const cashflowData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const m = date.getMonth();
    const y = date.getFullYear();
    const income = transactions.filter(t =>
      t.type === 'income' && t.paidAt &&
      new Date(t.paidAt).getMonth() === m &&
      new Date(t.paidAt).getFullYear() === y
    ).reduce((a, t) => a + t.amount, 0);
    const expenses = transactions.filter(t =>
      t.type === 'expense' && t.paidAt &&
      new Date(t.paidAt).getMonth() === m &&
      new Date(t.paidAt).getFullYear() === y
    ).reduce((a, t) => a + t.amount, 0);
    return { month: date.toLocaleDateString('pt-BR', { month: 'short' }), income, expenses, profit: income - expenses };
  });

  const maxCashflow = Math.max(...cashflowData.map(d => Math.max(d.income, d.expenses)));

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-[1600px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#22c55e]" /> Painel da Diretoria
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">Visão estratégica consolidada · Vencer Hub</p>
        </div>
      </div>

      {/* Top Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Receita Total</p>
          <p className="text-2xl font-black text-[#22c55e] mt-1">{fmtFull(fm.monthRevenue)}</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">Mês corrente</p>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Lucro Líquido</p>
          <p className={`text-2xl font-black mt-1 ${fm.netProfit >= 0 ? 'text-[#22c55e]' : 'text-red-400'}`}>{fmtFull(fm.netProfit)}</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">Margem {fm.avgMargin}%</p>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">ARR Projetado</p>
          <p className="text-2xl font-black text-white mt-1">{fmtFull(fm.arr)}</p>
          <p className="text-[10px] text-zinc-600 mt-0.5">Anualização do MRR</p>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl p-5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-wider">Forecast Mês</p>
          <p className="text-2xl font-black text-white mt-1">{fmtFull(fm.projectedProfit)}</p>
          <p className="text-[10px] text-[#22c55e] mt-0.5">+10% projetado</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients by Profit */}
        <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" />
            <h3 className="text-xs font-black uppercase tracking-widest text-white">Top Clientes por Lucro</h3>
          </div>
          <div className="divide-y divide-white/5">
            {clientProfits.map((c, idx) => (
              <div key={c.id} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 font-bold w-5">#{idx + 1}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{c.name}</p>
                      <p className="text-[10px] text-zinc-500">{c.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-black ${c.profit >= 0 ? 'text-[#22c55e]' : 'text-red-400'}`}>{fmt(c.profit)}</p>
                    <p className="text-[10px] text-zinc-600">Margem {c.margin.toFixed(0)}%</p>
                  </div>
                </div>
                <BarMini value={Math.abs(c.profit)} max={maxProfit} color={c.profit >= 0 ? '#22c55e' : '#ef4444'} />
                <div className="flex gap-3 mt-1.5 text-[10px] text-zinc-600">
                  <span>Receita: {fmt(c.revenue)}</span>
                  <span>·</span>
                  <span>NPS: {c.avgNps.toFixed(1)}</span>
                  <span>·</span>
                  <span>Ocorrências: {c.incidents}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Service Performance */}
        <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-[#22c55e]" />
            <h3 className="text-xs font-black uppercase tracking-widest text-white">Receita por Serviço</h3>
          </div>
          <div className="divide-y divide-white/5">
            {servicePerf.length > 0 ? servicePerf.map((s, idx) => (
              <div key={s.type} className="px-5 py-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-zinc-600 font-bold w-5">#{idx + 1}</span>
                    <div>
                      <p className="text-xs font-bold text-white">{s.label}</p>
                      <p className="text-[10px] text-zinc-500">{s.count} projetos concluídos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-white">{fmt(s.revenue)}</p>
                    <p className={`text-[10px] font-bold ${s.margin >= 40 ? 'text-[#22c55e]' : s.margin >= 20 ? 'text-amber-400' : 'text-red-400'}`}>
                      Margem {s.margin.toFixed(0)}%
                    </p>
                  </div>
                </div>
                <BarMini value={s.revenue} max={maxSvcRevenue} color="#22c55e" />
              </div>
            )) : (
              <div className="text-center py-8 text-zinc-600 text-xs">
                Nenhum projeto concluído ainda
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cashflow Chart */}
      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center gap-2">
          <TrendingUp className="w-3.5 h-3.5 text-[#22c55e]" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">Fluxo de Caixa — Últimos 6 Meses</h3>
        </div>
        <div className="p-6">
          <div className="flex items-end gap-4 h-32">
            {cashflowData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-0.5 items-end h-24">
                  <div
                    className="flex-1 bg-[#22c55e]/60 rounded-t-sm transition-all duration-700"
                    style={{ height: maxCashflow > 0 ? `${(d.income / maxCashflow) * 100}%` : '4px', minHeight: '4px' }}
                  />
                  <div
                    className="flex-1 bg-red-500/60 rounded-t-sm transition-all duration-700"
                    style={{ height: maxCashflow > 0 ? `${(d.expenses / maxCashflow) * 100}%` : '4px', minHeight: '4px' }}
                  />
                </div>
                <span className="text-[9px] text-zinc-600 uppercase">{d.month}</span>
              </div>
            ))}
          </div>
          <div className="flex gap-4 mt-3 text-[10px]">
            <span className="flex items-center gap-1.5 text-zinc-500"><span className="w-2 h-2 rounded-sm bg-[#22c55e]/60" /> Receita</span>
            <span className="flex items-center gap-1.5 text-zinc-500"><span className="w-2 h-2 rounded-sm bg-red-500/60" /> Despesas</span>
          </div>
        </div>
      </div>

      {/* Incidents Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total Ocorrências', value: incidents.length, color: 'text-red-400' },
          { label: 'Retrabalhos', value: incidents.filter(i => i.category === 'client').length, color: 'text-orange-400' },
          { label: 'Equipamentos', value: incidents.filter(i => i.category === 'equipment').length, color: 'text-amber-400' },
          { label: 'Tempo perdido', value: `${incidents.reduce((a, i) => a + i.timeLost, 0)}min`, color: 'text-zinc-400' },
        ].map(item => (
          <div key={item.label} className="bg-[#111111] border border-white/5 rounded-xl p-4">
            <p className="text-[10px] text-zinc-500 uppercase tracking-wider">{item.label}</p>
            <p className={`text-2xl font-black mt-1 ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
