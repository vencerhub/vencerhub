import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle, XCircle, AlertCircle, Star, Clock } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import type { PostProductionChecklist, Project } from '../types/erpTypes';

function Rating({ label, value, onChange }: { label: string; value: number; onChange: (v: 1|2|3|4|5) => void }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-zinc-400">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(n => (
          <button
            key={n}
            onClick={() => onChange(n as 1|2|3|4|5)}
            className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
              n <= value
                ? 'bg-[#22c55e] text-black'
                : 'bg-white/5 text-zinc-500 hover:bg-white/10'
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, value, onChange, inverted }: { label: string; value: boolean; onChange: (v: boolean) => void; inverted?: boolean }) {
  const isPositive = inverted ? !value : value;
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-zinc-400">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all border ${
          isPositive
            ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20'
            : 'bg-red-500/10 text-red-400 border-red-500/20'
        }`}
      >
        {isPositive ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
        {value ? 'Sim' : 'Não'}
      </button>
    </div>
  );
}

function NumberInput({ label, value, onChange, unit }: { label: string; value: number; onChange: (v: number) => void; unit?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-zinc-400">{label}</span>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="w-16 bg-[#111111] border border-white/10 rounded-lg px-2 py-1 text-xs text-white text-right focus:outline-none focus:border-[#22c55e]/40"
          min={0}
        />
        {unit && <span className="text-[10px] text-zinc-500">{unit}</span>}
      </div>
    </div>
  );
}

type ChecklistDraft = Omit<PostProductionChecklist, 'id' | 'projectId' | 'completedAt' | 'completedBy'>;

const defaultChecklist: ChecklistDraft = {
  equipmentWorked: true, equipmentProblem: '', timeLost: 0, issueDescription: '',
  clientLate: false, clientChangedBrief: false, clientRequestedChanges: false,
  clientApprovedQuickly: true, clientPunctuality: 4,
  coffee: true, water: true, internet: true, bathroom: true, ac: true, cleanliness: 5, organization: 5,
  teamPunctuality: true, freelancerMissed: false, substitution: false, overtime: 0, teamRating: 5,
  rework: false, newRecording: false, productionTimeLost: 0, corruptedFiles: false, technicalFailures: false,
  npsScore: 9, clientNote: 5, wouldRecommend: true, wouldReturn: true, clientComments: '',
};

export function PostProductionChecklistModule() {
  const { state, dispatch, completeProject } = useERP();
  const [selectedProjectId, setSelectedProjectId] = useState<string>('');
  const [form, setForm] = useState<ChecklistDraft>(defaultChecklist);
  const [submitted, setSubmitted] = useState(false);

  const pendingProjects = state.projects.filter(p => p.status === 'checklist_pending' || p.status === 'in_progress');

  const set = (key: keyof ChecklistDraft, value: unknown) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!selectedProjectId) return;
    const checklist: PostProductionChecklist = {
      id: `chk-${Date.now()}`,
      projectId: selectedProjectId,
      completedAt: new Date().toISOString(),
      completedBy: state.user?.name || 'Sistema',
      ...form,
    };
    dispatch({
      type: 'UPDATE_PROJECT',
      payload: {
        ...state.projects.find(p => p.id === selectedProjectId)!,
        checklist,
        nps: form.npsScore,
        status: 'checklist_pending',
      },
    });
    completeProject(selectedProjectId);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-6">
        <div className="w-16 h-16 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-[#22c55e]" />
        </div>
        <div className="text-center">
          <h3 className="text-xl font-black text-white">Checklist Concluído!</h3>
          <p className="text-zinc-500 text-sm mt-1">Projeto finalizado. Todos os módulos foram atualizados automaticamente.</p>
        </div>
        <div className="bg-[#111111] border border-white/5 rounded-xl p-4 text-xs text-zinc-400 space-y-1 max-w-xs text-center">
          <p>✅ Financeiro atualizado</p>
          <p>✅ CRM atualizado</p>
          <p>✅ Score do cliente recalculado</p>
          <p>✅ Dashboard atualizado</p>
          <p>✅ Histórico registrado</p>
        </div>
        <button
          onClick={() => { setSubmitted(false); setSelectedProjectId(''); setForm(defaultChecklist); }}
          className="bg-[#22c55e] text-black text-xs font-bold px-6 py-2.5 rounded-lg hover:brightness-110 transition-all"
        >
          Novo Checklist
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/5 bg-[#0d0d0d] flex items-center gap-3">
        <ClipboardCheck className="w-4 h-4 text-[#22c55e]" />
        <span className="text-xs font-bold text-white">Checklist Pós-Produção</span>
        <span className="text-[10px] text-zinc-500 ml-1">— Obrigatório para encerrar projetos</span>
        <div className="ml-auto">
          <select
            value={selectedProjectId}
            onChange={e => setSelectedProjectId(e.target.value)}
            className="bg-[#111111] border border-white/8 rounded-lg px-3 py-1.5 text-xs text-zinc-300 focus:outline-none min-w-[220px]"
          >
            <option value="">Selecionar projeto...</option>
            {pendingProjects.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      {!selectedProjectId ? (
        <div className="flex flex-col items-center justify-center flex-1 text-zinc-600 gap-3">
          <ClipboardCheck className="w-10 h-10 opacity-30" />
          <p className="text-sm">Selecione um projeto para iniciar o checklist</p>
          {pendingProjects.length === 0 && (
            <p className="text-xs text-zinc-700">Nenhum projeto aguardando checklist</p>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-2xl mx-auto p-6 space-y-6">

            {/* Section: Operação */}
            <section className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Operação</h3>
              </div>
              <div className="p-5 space-y-3">
                <Toggle label="Equipamentos funcionaram?" value={form.equipmentWorked} onChange={v => set('equipmentWorked', v)} />
                {!form.equipmentWorked && (
                  <input
                    placeholder="Qual problema ocorreu?"
                    value={form.equipmentProblem || ''}
                    onChange={e => set('equipmentProblem', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none"
                  />
                )}
                <NumberInput label="Tempo perdido" value={form.timeLost} onChange={v => set('timeLost', v)} unit="min" />
              </div>
            </section>

            {/* Section: Cliente */}
            <section className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <Star className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Cliente</h3>
              </div>
              <div className="p-5 space-y-3">
                <Toggle label="Cliente chegou atrasado?" value={form.clientLate} onChange={v => set('clientLate', v)} inverted />
                <Toggle label="Mudou o briefing?" value={form.clientChangedBrief} onChange={v => set('clientChangedBrief', v)} inverted />
                <Toggle label="Solicitou alterações?" value={form.clientRequestedChanges} onChange={v => set('clientRequestedChanges', v)} inverted />
                <Toggle label="Aprovou rapidamente?" value={form.clientApprovedQuickly} onChange={v => set('clientApprovedQuickly', v)} />
                <Rating label="Pontualidade do cliente" value={form.clientPunctuality} onChange={v => set('clientPunctuality', v)} />
              </div>
            </section>

            {/* Section: Estrutura */}
            <section className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#22c55e]" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Estrutura</h3>
              </div>
              <div className="p-5 space-y-3">
                <Toggle label="Café disponível?" value={form.coffee} onChange={v => set('coffee', v)} />
                <Toggle label="Água disponível?" value={form.water} onChange={v => set('water', v)} />
                <Toggle label="Internet estável?" value={form.internet} onChange={v => set('internet', v)} />
                <Toggle label="Banheiro ok?" value={form.bathroom} onChange={v => set('bathroom', v)} />
                <Toggle label="Ar condicionado?" value={form.ac} onChange={v => set('ac', v)} />
                <Rating label="Limpeza" value={form.cleanliness} onChange={v => set('cleanliness', v)} />
                <Rating label="Organização" value={form.organization} onChange={v => set('organization', v)} />
              </div>
            </section>

            {/* Section: Equipe */}
            <section className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Equipe</h3>
              </div>
              <div className="p-5 space-y-3">
                <Toggle label="Equipe pontual?" value={form.teamPunctuality} onChange={v => set('teamPunctuality', v)} />
                <Toggle label="Freelancer faltou?" value={form.freelancerMissed} onChange={v => set('freelancerMissed', v)} inverted />
                <Toggle label="Houve substituição?" value={form.substitution} onChange={v => set('substitution', v)} inverted />
                <NumberInput label="Horas extras" value={form.overtime} onChange={v => set('overtime', v)} unit="h" />
                <Rating label="Avaliação da equipe" value={form.teamRating} onChange={v => set('teamRating', v)} />
              </div>
            </section>

            {/* Section: Produção */}
            <section className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Produção</h3>
              </div>
              <div className="p-5 space-y-3">
                <Toggle label="Houve retrabalho?" value={form.rework} onChange={v => set('rework', v)} inverted />
                <Toggle label="Nova gravação necessária?" value={form.newRecording} onChange={v => set('newRecording', v)} inverted />
                <NumberInput label="Tempo perdido em produção" value={form.productionTimeLost} onChange={v => set('productionTimeLost', v)} unit="min" />
                <Toggle label="Arquivos corrompidos?" value={form.corruptedFiles} onChange={v => set('corruptedFiles', v)} inverted />
                <Toggle label="Falhas técnicas?" value={form.technicalFailures} onChange={v => set('technicalFailures', v)} inverted />
              </div>
            </section>

            {/* Section: NPS */}
            <section className="bg-[#111111] border border-white/5 rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <Star className="w-4 h-4 text-[#22c55e]" />
                <h3 className="text-xs font-black uppercase tracking-widest text-white">Feedback do Cliente</h3>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-zinc-400">NPS (0-10)</span>
                    <span className={`text-sm font-black ${form.npsScore >= 9 ? 'text-[#22c55e]' : form.npsScore >= 7 ? 'text-amber-400' : 'text-red-400'}`}>
                      {form.npsScore}
                    </span>
                  </div>
                  <input
                    type="range" min={0} max={10} value={form.npsScore}
                    onChange={e => set('npsScore', Number(e.target.value))}
                    className="w-full accent-[#22c55e]"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-600 mt-1">
                    <span>Detrator</span><span>Neutro</span><span>Promotor</span>
                  </div>
                </div>
                <Rating label="Nota geral" value={form.clientNote} onChange={v => set('clientNote', v)} />
                <Toggle label="Indicaria a Vencer Hub?" value={form.wouldRecommend} onChange={v => set('wouldRecommend', v)} />
                <Toggle label="Voltaria a contratar?" value={form.wouldReturn} onChange={v => set('wouldReturn', v)} />
                <textarea
                  placeholder="Comentários do cliente..."
                  value={form.clientComments || ''}
                  onChange={e => set('clientComments', e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-600 focus:outline-none resize-none"
                />
              </div>
            </section>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#22c55e] text-black font-black text-sm py-3.5 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Concluir Projeto e Finalizar Checklist
            </button>
            <p className="text-[10px] text-zinc-600 text-center pb-4">
              Ao concluir, todos os módulos serão atualizados automaticamente.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
