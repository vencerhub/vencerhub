import React, { useState } from 'react';
import {
  DollarSign, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  Plus, Filter, Receipt, BookOpen,
} from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { Transaction } from '../types/erpTypes';
import { COST_LABELS, SERVICE_TYPE_LABELS } from '../types/erpTypes';
import { SERVICE_CATALOG } from '../data/seedData';

function fmt(n: number) {
  return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fmtShort(n: number) {
  if (n >= 1000) return `R$ ${(n / 1000).toFixed(1)}k`;
  return `R$ ${n.toFixed(0)}`;
}

function DRESummary() {
  const { state } = useERP();
  const completedProjects = state.projects.filter(p => p.status === 'completed');

  const totalRevenue = completedProjects.reduce((a, p) => a + p.revenue, 0);
  const costBreakdown = completedProjects.reduce((acc, p) => {
    (Object.keys(p.costs) as (keyof typeof p.costs)[]).forEach(k => {
      acc[k] = (acc[k] || 0) + p.costs[k];
    });
    return acc;
  }, {} as Record<string, number>);

  const totalCosts = Object.values(costBreakdown).reduce((a, b) => a + b, 0);
  const grossProfit = totalRevenue - totalCosts;
  const margin = totalRevenue > 0 ? (grossProfit / totalRevenue * 100) : 0;

  return (
    <div className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center gap-2">
        <Receipt className="w-4 h-4 text-[#22c55e]" />
        <h3 className="text-xs font-black uppercase tracking-widest text-white">DRE Consolidado (Projetos Concluídos)</h3>
      </div>
      <div className="p-5">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-bold">
            <span className="text-white">Receita Total</span>
            <span className="text-[#22c55e]">{fmt(totalRevenue)}</span>
          </div>
          <div className="h-px bg-white/5" />
          {(Object.entries(costBreakdown) as [string, number][])
            .filter(([, v]) => v > 0)
            .sort(([, a], [, b]) => b - a)
            .map(([key, value]) => (
              <div key={key} className="flex justify-between text-xs">
                <span className="text-zinc-500">(-) {COST_LABELS[key as keyof typeof COST_LABELS] || key}</span>
                <span className="text-zinc-300">({fmt(value)})</span>
              </div>
            ))}
          <div className="h-px bg-white/5" />
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400">Total de Custos</span>
            <span className="text-red-400 font-bold">({fmt(totalCosts)})</span>
          </div>
          <div className="flex justify-between text-base font-black pt-1">
            <span className="text-white">Lucro Líquido</span>
            <div className="text-right">
              <span className={grossProfit >= 0 ? 'text-[#22c55e]' : 'text-red-400'}>{fmt(grossProfit)}</span>
              <span className="text-[10px] text-zinc-500 ml-2">Margem {margin.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogTab() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 flex items-center gap-2">
          <BookOpen className="w-3.5 h-3.5 text-[#22c55e]" /> Catálogo de Serviços Vencer Hub
        </h3>
        <button className="flex items-center gap-1.5 bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-bold px-3 py-1.5 rounded-lg">
          <Plus className="w-3 h-3" /> Novo Serviço
        </button>
      </div>
      <div className="space-y-3">
        {SERVICE_CATALOG.map(svc => (
          <div key={svc.id} className="bg-[#111111] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">{svc.name}</h4>
                <p className="text-[11px] text-zinc-500 mt-0.5">{svc.description}</p>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${svc.active ? 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20' : 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20'}`}>
                {svc.active ? 'Ativo' : 'Inativo'}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-3">
              {svc.packages.map(pkg => (
                <div key={pkg.id} className="bg-black/20 border border-white/5 rounded-lg p-3">
                  <p className="text-xs font-bold text-white">{pkg.name}</p>
                  <p className="text-sm font-black text-[#22c55e] mt-0.5">{fmtShort(pkg.price)}</p>
                  <p className="text-[10px] text-zinc-600">{pkg.hoursIncluded}h incluídas</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FinancialModule() {
  const { state, dispatch } = useERP();
  const [activeTab, setActiveTab] = useState<'transactions' | 'dre' | 'catalog'>('transactions');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    type: 'income' as 'income' | 'expense',
    category: '', description: '', amount: 0,
    date: new Date().toISOString().split('T')[0],
    status: 'pending' as Transaction['status'],
    method: 'pix' as Transaction['method'],
  });

  const filtered = state.transactions.filter(t =>
    typeFilter === 'all' || t.type === typeFilter
  );

  const totalIncome = filtered.filter(t => t.type === 'income' && t.status === 'paid').reduce((a, t) => a + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === 'expense' && t.status === 'paid').reduce((a, t) => a + t.amount, 0);
  const pending = filtered.filter(t => t.status === 'pending').reduce((a, t) => a + t.amount, 0);

  const handleAdd = () => {
    if (!form.description || !form.amount) return;
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: { id: `txn-${Date.now()}`, ...form, clientId: undefined, projectId: undefined },
    });
    setShowForm(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex items-center gap-1 p-3 border-b border-white/5 bg-[#0d0d0d]">
        {[
          { id: 'transactions', label: 'Transações' },
          { id: 'dre', label: 'DRE' },
          { id: 'catalog', label: 'Catálogo' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === tab.id
                ? 'bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20'
                : 'text-zinc-500 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          {activeTab === 'transactions' && (
            <>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value as typeof typeFilter)}
                className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none">
                <option value="all">Todas</option>
                <option value="income">Receitas</option>
                <option value="expense">Despesas</option>
              </select>
              <button onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-1.5 bg-[#22c55e] text-black text-xs font-bold px-3 py-1.5 rounded-lg hover:brightness-110">
                <Plus className="w-3.5 h-3.5" /> Lançamento
              </button>
            </>
          )}
        </div>
      </div>

      {activeTab === 'transactions' && (
        <div className="flex flex-col h-full overflow-hidden">
          {/* Summary */}
          <div className="flex gap-4 px-4 py-3 border-b border-white/5 text-xs flex-wrap">
            <span className="flex items-center gap-1.5 text-[#22c55e]">
              <ArrowUpRight className="w-3.5 h-3.5" />
              Recebido: <strong>{fmtShort(totalIncome)}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <ArrowDownRight className="w-3.5 h-3.5" />
              Pago: <strong>{fmtShort(totalExpense)}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              Pendente: <strong>{fmtShort(pending)}</strong>
            </span>
            <span className="flex items-center gap-1.5 text-white ml-auto">
              Saldo: <strong className={totalIncome - totalExpense >= 0 ? 'text-[#22c55e]' : 'text-red-400'}>{fmtShort(totalIncome - totalExpense)}</strong>
            </span>
          </div>

          {/* Form */}
          {showForm && (
            <div className="border-b border-white/5 bg-[#111111]/50 p-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl">
                <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value as 'income' | 'expense' }))}
                  className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-zinc-300 focus:outline-none">
                  <option value="income">Receita</option>
                  <option value="expense">Despesa</option>
                </select>
                <input placeholder="Categoria" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none" />
                <input placeholder="Descrição" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none col-span-2" />
                <input type="number" placeholder="Valor R$" value={form.amount || ''}
                  onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))}
                  className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white placeholder-zinc-600 focus:outline-none" />
                <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                  className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-white focus:outline-none" />
                <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as Transaction['status'] }))}
                  className="bg-[#111111] border border-white/10 rounded-lg px-2 py-1.5 text-xs text-zinc-300 focus:outline-none">
                  <option value="pending">Pendente</option>
                  <option value="paid">Pago</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={() => setShowForm(false)} className="flex-1 text-xs text-zinc-500 hover:text-white px-2 py-1.5 rounded-lg border border-white/5 transition-colors">✕</button>
                  <button onClick={handleAdd} className="flex-1 bg-[#22c55e] text-black text-xs font-bold px-2 py-1.5 rounded-lg hover:brightness-110">Salvar</button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-xs">
              <thead className="sticky top-0 bg-[#0d0d0d] border-b border-white/5">
                <tr>
                  <th className="text-left px-4 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Descrição</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider hidden sm:table-cell">Categoria</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Data</th>
                  <th className="text-left px-3 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider hidden md:table-cell">Status</th>
                  <th className="text-right px-4 py-2.5 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(txn => {
                  const client = state.clients.find(c => c.id === txn.clientId);
                  return (
                    <tr key={txn.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-white">{txn.description}</p>
                        {client && <p className="text-[10px] text-zinc-500">{client.name}</p>}
                      </td>
                      <td className="px-3 py-3 text-zinc-500 hidden sm:table-cell">{txn.category}</td>
                      <td className="px-3 py-3 text-zinc-400">{new Date(txn.date).toLocaleDateString('pt-BR')}</td>
                      <td className="px-3 py-3 hidden md:table-cell">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          txn.status === 'paid' ? 'text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/20'
                          : txn.status === 'pending' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                          : txn.status === 'overdue' ? 'text-red-400 bg-red-500/10 border-red-500/20'
                          : 'text-zinc-400 bg-zinc-500/10 border-zinc-500/20'
                        }`}>
                          {txn.status === 'paid' ? 'Pago' : txn.status === 'pending' ? 'Pendente' : txn.status === 'overdue' ? 'Vencido' : 'Cancelado'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`font-black ${txn.type === 'income' ? 'text-[#22c55e]' : 'text-red-400'}`}>
                          {txn.type === 'income' ? '+' : '-'}{fmtShort(txn.amount)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'dre' && (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-lg mx-auto">
            <DRESummary />
          </div>
        </div>
      )}

      {activeTab === 'catalog' && (
        <div className="flex-1 overflow-y-auto p-6">
          <CatalogTab />
        </div>
      )}
    </div>
  );
}
