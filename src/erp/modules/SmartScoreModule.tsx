import React from 'react';
import { Star, TrendingUp, TrendingDown, AlertTriangle, Users } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { ClientScore } from '../types/erpTypes';
import { CLIENT_SCORE_LABELS, CLIENT_STATUS_LABELS } from '../types/erpTypes';

const SCORE_CONFIG: Record<ClientScore, { bg: string; border: string; text: string; bar: string; desc: string }> = {
  premium: { bg: 'bg-purple-500/5', border: 'border-purple-500/30', text: 'text-purple-400', bar: 'bg-purple-500', desc: 'Clientes premium: alta receita, recorrência e NPS excelente.' },
  gold: { bg: 'bg-amber-500/5', border: 'border-amber-500/30', text: 'text-amber-400', bar: 'bg-amber-500', desc: 'Clientes ouro: bom relacionamento e boa margem.' },
  silver: { bg: 'bg-zinc-500/5', border: 'border-zinc-500/30', text: 'text-zinc-300', bar: 'bg-zinc-400', desc: 'Clientes prata: estáveis com espaço para crescer.' },
  bronze: { bg: 'bg-orange-500/5', border: 'border-orange-500/30', text: 'text-orange-400', bar: 'bg-orange-500', desc: 'Clientes bronze: atenção redobrada ao relacionamento.' },
  risk: { bg: 'bg-red-500/5', border: 'border-red-500/30', text: 'text-red-400', bar: 'bg-red-500', desc: 'Clientes em risco: alta probabilidade de churn. Ação imediata.' },
};

function fmt(n: number) {
  if (n >= 1000) return `R$ ${(n / 1000).toFixed(1)}k`;
  return `R$ ${n.toFixed(0)}`;
}

const SCORE_ORDER: ClientScore[] = ['premium', 'gold', 'silver', 'bronze', 'risk'];
const SCORE_CRITERIA = [
  { key: 'Receita', desc: 'LTV total gerado pelo cliente.' },
  { key: 'Lucratividade', desc: 'Margem média dos projetos.' },
  { key: 'Pontualidade', desc: 'Histórico de pagamentos em dia.' },
  { key: 'Comunicação', desc: 'Facilidade de interação e retorno.' },
  { key: 'Retrabalho', desc: 'Frequência de pedidos de alteração.' },
  { key: 'Reclamações', desc: 'Ocorrências registradas.' },
  { key: 'NPS', desc: 'Nota de satisfação e recomendação.' },
  { key: 'Indicações', desc: 'Novos clientes referenciados.' },
  { key: 'Recorrência', desc: 'Contratos renovados / múltiplos projetos.' },
  { key: 'Tempo', desc: 'Duração do relacionamento comercial.' },
];

export function SmartScoreModule() {
  const { state, dispatch } = useERP();

  const clientsByScore: Record<ClientScore, typeof state.clients> = {
    premium: [], gold: [], silver: [], bronze: [], risk: [],
  };

  state.clients.forEach(c => {
    if (c.score) clientsByScore[c.score].push(c);
  });

  const ranked = [...state.clients]
    .sort((a, b) => (b.scorePoints || 0) - (a.scorePoints || 0));

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-[1400px]">
      <div>
        <h2 className="text-xl font-black text-white">Score Inteligente</h2>
        <p className="text-xs text-zinc-500 mt-0.5">Classificação automatizada de clientes baseada em 10 critérios</p>
      </div>

      {/* Score Groups */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {SCORE_ORDER.map(score => {
          const cfg = SCORE_CONFIG[score];
          const clients = clientsByScore[score];
          return (
            <div key={score} className={`${cfg.bg} border ${cfg.border} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                <span className={`text-sm font-black ${cfg.text}`}>{CLIENT_SCORE_LABELS[score]}</span>
                <span className={`text-2xl font-black ${cfg.text}`}>{clients.length}</span>
              </div>
              <p className="text-[10px] text-zinc-600 mb-3">{cfg.desc}</p>
              <div className="space-y-2">
                {clients.map(c => (
                  <div
                    key={c.id}
                    onClick={() => dispatch({ type: 'SET_MODULE', payload: 'client-dashboard' })}
                    className="flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg px-2 py-1.5 transition-all"
                  >
                    <div>
                      <p className="text-xs font-semibold text-white truncate max-w-[100px]">{c.name.split(' ')[0]}</p>
                      <p className="text-[10px] text-zinc-600 truncate max-w-[100px]">{c.company}</p>
                    </div>
                    <span className={`text-xs font-black ${cfg.text}`}>{c.scorePoints}pts</span>
                  </div>
                ))}
                {clients.length === 0 && (
                  <p className="text-[10px] text-zinc-700 text-center py-2">Nenhum</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ranking Full */}
      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500">Ranking Completo</h3>
        </div>
        <div className="divide-y divide-white/5">
          {ranked.map((client, idx) => {
            const cfg = client.score ? SCORE_CONFIG[client.score] : SCORE_CONFIG.bronze;
            const pts = client.scorePoints || 0;
            return (
              <div key={client.id} className="flex items-center gap-4 px-5 py-4 hover:bg-white/2 transition-colors">
                <span className="text-xs font-black text-zinc-700 w-6 shrink-0">#{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-white">{client.name}</p>
                    {client.score && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.text} ${cfg.bg} ${cfg.border}`}>
                        {CLIENT_SCORE_LABELS[client.score]}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-500">{client.company} · {client.segment}</p>
                </div>

                {/* Score bar */}
                <div className="flex items-center gap-3 w-36 hidden sm:flex">
                  <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${cfg.bar}`} style={{ width: `${pts}%` }} />
                  </div>
                  <span className={`text-xs font-black w-8 text-right ${cfg.text}`}>{pts}</span>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-white">{fmt(client.lifetimeValue)}</p>
                  <p className="text-[10px] text-zinc-600">LTV</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Algorithm Criteria */}
      <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
            <Star className="w-3.5 h-3.5 text-[#22c55e]" /> Critérios do Algoritmo
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 divide-x divide-y divide-white/5">
          {SCORE_CRITERIA.map((c, i) => (
            <div key={c.key} className="p-4">
              <p className="text-xs font-bold text-white mb-1">{c.key}</p>
              <p className="text-[10px] text-zinc-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
