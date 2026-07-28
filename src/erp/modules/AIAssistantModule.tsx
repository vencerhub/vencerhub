import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, Loader, Sparkles, RotateCcw } from 'lucide-react';
import { useERP } from '../context/ERPContext';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const QUICK_QUESTIONS = [
  'Quais clientes me dão mais lucro?',
  'Qual serviço tem maior margem?',
  'Onde estou perdendo dinheiro?',
  'Qual cliente tem maior risco de churn?',
  'Qual freelancer gera maior custo?',
  'Qual equipamento apresentou mais problemas?',
  'Quanto custa uma hora do estúdio?',
  'Quem tem menor NPS?',
];

export function AIAssistantModule() {
  const { state } = useERP();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      role: 'assistant',
      content: `Olá! Sou o assistente de inteligência do **Vencer ERP**. Tenho acesso aos dados operacionais, financeiros e de clientes da Vencer Hub.\n\nFaça-me perguntas estratégicas como:\n- "Quais clientes me dão mais lucro?"\n- "Onde estou perdendo dinheiro?"\n- "Qual serviço tem maior margem?"\n\nEstou pronto para ajudar! 🎯`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function buildContext() {
    const { clients, projects, transactions, incidents, financialMetrics: fm } = state;

    const completedProjects = projects.filter(p => p.status === 'completed');

    const clientSummaries = clients.map(c => {
      const cProjects = completedProjects.filter(p => p.clientId === c.id);
      const revenue = cProjects.reduce((a, p) => a + p.revenue, 0);
      const costs = cProjects.reduce((a, p) => a + Object.values(p.costs).reduce((x, y) => x + y, 0), 0);
      const profit = revenue - costs;
      const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : '0';
      const avgNps = cProjects.filter(p => p.nps !== undefined).reduce((a, p, _, arr) => a + (p.nps ?? 0) / arr.length, 0);
      const cIncidents = incidents.filter(i => i.clientId === c.id);
      return `- ${c.name} (${c.company}): Score ${c.score} ${c.scorePoints}pts, LTV R$${c.lifetimeValue}, ${cProjects.length} projetos, Receita R$${revenue}, Lucro R$${profit} (${margin}%), NPS ${avgNps.toFixed(1)}, Ocorrências: ${cIncidents.length}`;
    }).join('\n');

    const serviceSummaries = Object.entries(
      completedProjects.reduce((acc, p) => {
        const type = p.serviceType;
        if (!acc[type]) acc[type] = { revenue: 0, costs: 0, count: 0 };
        const cost = Object.values(p.costs).reduce((a, b) => a + b, 0);
        acc[type].revenue += p.revenue;
        acc[type].costs += cost;
        acc[type].count += 1;
        return acc;
      }, {} as Record<string, { revenue: number; costs: number; count: number }>)
    ).map(([type, d]) => {
      const profit = d.revenue - d.costs;
      const margin = d.revenue > 0 ? ((profit / d.revenue) * 100).toFixed(1) : '0';
      return `- ${type}: ${d.count} projetos, Receita R$${d.revenue}, Margem ${margin}%`;
    }).join('\n');

    const incidentsSummary = incidents.map(i =>
      `- ${i.category}: ${i.description} (impacto: ${i.impact}, tempo perdido: ${i.timeLost}min, financeiro: R$${i.financialImpact || 0})`
    ).join('\n');

    return `Você é o assistente de inteligência do Vencer ERP, sistema de gestão para a empresa Vencer Hub (produtora audiovisual de Porto Alegre, RS).

DADOS DOS CLIENTES:
${clientSummaries}

DESEMPENHO POR SERVIÇO:
${serviceSummaries}

OCORRÊNCIAS REGISTRADAS:
${incidentsSummary}

MÉTRICAS FINANCEIRAS DO MÊS:
- Receita: R$${fm.monthRevenue}
- Lucro líquido: R$${fm.netProfit}
- Margem: ${fm.avgMargin}%
- MRR: R$${fm.mrr}
- A receber: R$${fm.receivable}

Responda em português, seja objetivo e direto ao ponto. Cite dados específicos dos clientes/projetos quando relevante. Use emojis estrategicamente.`;
  }

  async function sendMessage(text?: string) {
    const userText = text || input.trim();
    if (!userText || loading) return;

    setInput('');
    const userMsg: Message = { id: `u-${Date.now()}`, role: 'user', content: userText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || import.meta.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('VITE_GEMINI_API_KEY não configurada');
      }

      const ai = new GoogleGenAI({ apiKey });
      const context = buildContext();

      const result = await ai.models.generateContent({
        model: 'gemini-2.0-flash',
        contents: [
          { role: 'user', parts: [{ text: context + '\n\nPergunta: ' + userText }] },
        ],
      });

      const responseText = result.text || 'Não consegui gerar uma resposta.';
      const assistantMsg: Message = { id: `a-${Date.now()}`, role: 'assistant', content: responseText, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Erro desconhecido';
      const errorMsg: Message = {
        id: `e-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Erro ao consultar IA: ${errMsg}\n\n**Dica**: Configure a variável \`VITE_GEMINI_API_KEY\` no arquivo \`.env\` para ativar o assistente.`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/5 bg-[#0d0d0d]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
            <Brain className="w-3.5 h-3.5 text-[#22c55e]" />
          </div>
          <div>
            <span className="text-xs font-bold text-white">Assistente de Inteligência</span>
            <span className="text-[10px] text-zinc-500 ml-2">· Powered by Gemini AI</span>
          </div>
        </div>
        <button
          onClick={() => setMessages([{ id: '0', role: 'assistant', content: 'Conversa reiniciada. Como posso ajudar?', timestamp: new Date() }])}
          className="text-zinc-600 hover:text-zinc-400 transition-colors"
          title="Nova conversa"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center shrink-0 mr-2 mt-1">
                <Sparkles className="w-3 h-3 text-[#22c55e]" />
              </div>
            )}
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
              msg.role === 'user'
                ? 'bg-[#22c55e]/10 border border-[#22c55e]/20 text-white rounded-tr-none'
                : 'bg-[#111111] border border-white/5 text-zinc-300 rounded-tl-none'
            }`}>
              {msg.content.split('\n').map((line, i) => {
                // Simple markdown: **bold**
                const parts = line.split(/(\*\*[^*]+\*\*)/g);
                return (
                  <p key={i} className={i > 0 ? 'mt-1' : ''}>
                    {parts.map((part, j) =>
                      part.startsWith('**') && part.endsWith('**')
                        ? <strong key={j} className="text-white font-bold">{part.slice(2, -2)}</strong>
                        : <span key={j}>{part}</span>
                    )}
                  </p>
                );
              })}
              <p className="text-[9px] text-zinc-600 mt-2">{msg.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="w-6 h-6 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center shrink-0 mr-2 mt-1">
              <Sparkles className="w-3 h-3 text-[#22c55e] animate-pulse" />
            </div>
            <div className="bg-[#111111] border border-white/5 rounded-2xl rounded-tl-none px-4 py-3">
              <div className="flex gap-1.5 items-center">
                <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Quick Questions */}
      <div className="px-4 py-3 border-t border-white/5 flex gap-2 overflow-x-auto scrollbar-none">
        {QUICK_QUESTIONS.map(q => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            disabled={loading}
            className="shrink-0 text-[10px] font-semibold text-zinc-400 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full hover:text-white hover:bg-white/10 hover:border-[#22c55e]/30 transition-all disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-[#0d0d0d]">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Pergunte sobre lucro, clientes, margens, gargalos..."
            disabled={loading}
            className="flex-1 bg-[#111111] border border-white/8 rounded-xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-[#22c55e]/40 disabled:opacity-50"
          />
          <button
            onClick={() => sendMessage()}
            disabled={loading || !input.trim()}
            className="bg-[#22c55e] text-black p-2.5 rounded-xl hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
