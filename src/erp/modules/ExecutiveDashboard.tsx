import React from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, Users, Briefcase, AlertCircle,
  Star, Target, Activity, Clock, CheckCircle, XCircle, ArrowRight,
} from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { CLIENT_SCORE_LABELS, PROJECT_STATUS_LABELS, SERVICE_TYPE_LABELS } from '../types/erpTypes';

function MetricCard({
  label, value, subtitle, trend, trendUp, icon: Icon, color = 'green', size = 'normal',
}: {
  label: string; value: string | number; subtitle?: string; trend?: string; trendUp?: boolean;
  icon?: React.FC<{ className?: string }>; color?: 'green' | 'blue' | 'purple' | 'amber' | 'red'; size?: 'normal' | 'large';
}) {
  const colorMap = {
    green: 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20',
    blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    purple: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    red: 'text-red-400 bg-red-500/10 border-red-500/20',
  };
  return (
    <div className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-col gap-3 hover:border-white/10 transition-all group">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{label}</p>
        {Icon && (
          <div className={`p-2 rounded-lg border ${colorMap[color]}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>
      <div>
        <p className={`font-black text-white ${size === 'large' ? 'text-3xl' : 'text-2xl'} tracking-tight`}>{value}</p>
        {subtitle && <p className="text-xs text-zinc-500 mt-0.5">{subtitle}</p>}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendUp ? 'text-[#22c55e]' : 'text-red-400'}`}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </div>
      )}
    </div>
  );
}

function fmt(n: number) {
  if (n >= 1000) return `R$ ${(n / 1000).toFixed(1)}k`;
  return `R$ ${n.toFixed(0)}`;
}

function pct(n: number) { return `${n.toFixed(1)}%`; }

export function ExecutiveDashboard() {
  const { state, dispatch } = useERP();
  const { financialMetrics: fm, productionMetrics: pm, commercialMetrics: cm, qualityMetrics: qm, projects, clients, incidents } = state;

  const recentProjects = projects.slice(0, 5);
  const topClients = [...clients].sort((a, b) => b.lifetimeValue - a.lifetimeValue).slice(0, 4);

  const scoreColors: Record<string, string> = {
    premium: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
    gold: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
    silver: 'text-zinc-300 bg-zinc-500/10 border-zinc-500/30',
    bronze: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
    risk: 'text-red-400 bg-red-500/10 border-red-500/30',
  };

  const statusColors: Record<string, string> = {
    completed: 'text-[#22c55e] bg-[#22c55e]/10',
    in_progress: 'text-blue-400 bg-blue-500/10',
    checklist_pending: 'text-amber-400 bg-amber-500/10',
    approved: 'text-purple-400 bg-purple-500/10',
    cancelled: 'text-red-400 bg-red-500/10',
    draft: 'text-zinc-400 bg-zinc-500/10',
    negotiation: 'text-cyan-400 bg-cyan-500/10',
  };

  return (
    <div className="p-6 space-y-6 max-w-[1600px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white">Dashboard Executivo</h2>
          <p className="text-xs text-zinc-500 mt-0.5">Visão em tempo real · {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs text-[#22c55e] font-semibold bg-[#22c55e]/10 border border-[#22c55e]/20 px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            Ao vivo
          </span>
        </div>
      </div>

      {/* ── Financeiro ── */}
      <section>
        <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
          <DollarSign className="w-3 h-3 text-[#22c55e]" /> Financeiro
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard label="Receita do Mês" value={fmt(fm.monthRevenue)} icon={DollarSign} color="green" trend="+12% vs mês ant." trendUp />
          <MetricCard label="Lucro Líquido" value={fmt(fm.netProfit)} icon={TrendingUp} color="green" subtitle={`Margem ${pct(fm.avgMargin)}`} />
          <MetricCard label="Custos" value={fmt(fm.totalCosts)} icon={TrendingDown} color="red" subtitle="Mês corrente" />
          <MetricCard label="A Receber" value={fmt(fm.receivable)} icon={Target} color="amber" />
          <MetricCard label="MRR" value={fmt(fm.mrr)} icon={Activity} color="blue" subtitle="Receita mensal recorrente" />
          <MetricCard label="Ticket Médio" value={fmt(fm.avgTicket)} icon={Star} color="purple" />
        </div>
      </section>

      {/* ── Produção ── */}
      <section>
        <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
          <Briefcase className="w-3 h-3 text-[#22c55e]" /> Produção
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard label="Em Andamento" value={pm.projectsInProgress} icon={Activity} color="blue" />
          <MetricCard label="Concluídos" value={pm.projectsCompleted} icon={CheckCircle} color="green" />
          <MetricCard label="Atrasados" value={pm.projectsLate} icon={XCircle} color="red" />
          <MetricCard label="Horas Vendidas" value={pm.hoursSold} icon={Clock} color="purple" />
          <MetricCard label="Ocupação Estúdio" value={`${pm.studioOccupancyRate}%`} icon={Target} color="amber" />
          <MetricCard label="Produtividade" value={`${pm.teamProductivity}%`} icon={TrendingUp} color="green" />
        </div>
      </section>

      {/* ── Comercial + Qualidade ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
            <Users className="w-3 h-3 text-[#22c55e]" /> Comercial
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <MetricCard label="Leads" value={cm.leads} icon={Users} color="blue" />
            <MetricCard label="Pipeline" value={cm.pipeline} icon={Activity} color="purple" />
            <MetricCard label="Conversão" value={`${cm.conversionRate}%`} icon={Target} color="green" />
            <MetricCard label="Recorrentes" value={cm.recurringClients} icon={CheckCircle} color="amber" />
            <MetricCard label="Clientes Ativos" value={fm.activeClients} icon={Users} color="green" />
            <MetricCard label="Fech. Médio" value={`${cm.avgClosingDays}d`} icon={Clock} color="purple" />
          </div>
        </section>

        <section>
          <h3 className="text-[11px] font-black uppercase tracking-widest text-zinc-500 mb-3 flex items-center gap-2">
            <Star className="w-3 h-3 text-[#22c55e]" /> Qualidade
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <MetricCard label="NPS" value={qm.nps} icon={Star} color="green" size="large" />
            <MetricCard label="Nota Média" value={qm.avgRating} icon={Star} color="amber" />
            <MetricCard label="Ocorrências" value={qm.incidents} icon={AlertCircle} color="red" />
            <MetricCard label="Retrabalhos" value={qm.reworks} icon={XCircle} color="red" />
            <MetricCard label="Satisfação" value={`${qm.satisfactionIndex}%`} icon={TrendingUp} color="green" />
            <MetricCard label="Resolução" value={`${qm.avgResolutionTime}d`} icon={Clock} color="blue" />
          </div>
        </section>
      </div>

      {/* ── Recent Projects + Top Clients ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projects */}
        <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Projetos Recentes</h3>
            <button onClick={() => dispatch({ type: 'SET_MODULE', payload: 'services' })} className="text-[11px] text-[#22c55e] font-semibold flex items-center gap-1 hover:underline">
              Ver todos <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {recentProjects.map(proj => {
              const client = clients.find(c => c.id === proj.clientId);
              const totalCosts = Object.values(proj.costs).reduce((a, b) => a + b, 0);
              const margin = proj.revenue > 0 ? ((proj.revenue - totalCosts) / proj.revenue * 100).toFixed(0) : '0';
              return (
                <div key={proj.id} className="flex items-center gap-4 px-4 py-3 hover:bg-white/2 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{proj.title}</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">{client?.company || '—'} · {SERVICE_TYPE_LABELS[proj.serviceType]}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-white">{fmt(proj.revenue)}</p>
                    <p className="text-[10px] text-zinc-500">Margem {margin}%</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${statusColors[proj.status] || 'text-zinc-400 bg-zinc-500/10'}`}>
                    {PROJECT_STATUS_LABELS[proj.status]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Clients */}
        <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Top Clientes por LTV</h3>
            <button onClick={() => dispatch({ type: 'SET_MODULE', payload: 'crm' })} className="text-[11px] text-[#22c55e] font-semibold flex items-center gap-1 hover:underline">
              Ver todos <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {topClients.map((client, idx) => (
              <div key={client.id} className="flex items-center gap-4 px-4 py-3.5 hover:bg-white/2 transition-colors">
                <span className="text-xs font-black text-zinc-600 w-4 shrink-0">#{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-white truncate">{client.name}</p>
                  <p className="text-[10px] text-zinc-500 truncate">{client.company} · {client.segment}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-white">{fmt(client.lifetimeValue)}</p>
                  <p className="text-[10px] text-zinc-500">LTV</p>
                </div>
                {client.score && (
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${scoreColors[client.score]}`}>
                    {CLIENT_SCORE_LABELS[client.score]}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Incidents */}
      {incidents.length > 0 && (
        <div className="bg-[#111111] border border-red-500/10 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-red-400" /> Ocorrências Recentes
            </h3>
            <button onClick={() => dispatch({ type: 'SET_MODULE', payload: 'incidents' })} className="text-[11px] text-[#22c55e] font-semibold flex items-center gap-1 hover:underline">
              Ver todas <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {incidents.slice(0, 3).map(inc => {
              const impactColors = { low: 'text-zinc-400 bg-zinc-500/10', medium: 'text-amber-400 bg-amber-500/10', high: 'text-orange-400 bg-orange-500/10', critical: 'text-red-400 bg-red-500/10' };
              return (
                <div key={inc.id} className="flex items-center gap-4 px-4 py-3 hover:bg-white/2 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{inc.description}</p>
                    <p className="text-[10px] text-zinc-500">{inc.date} · {inc.responsible}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${impactColors[inc.impact]}`}>
                    {inc.impact === 'critical' ? 'Crítico' : inc.impact === 'high' ? 'Alto' : inc.impact === 'medium' ? 'Médio' : 'Baixo'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
