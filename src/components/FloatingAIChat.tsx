import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

export const FloatingAIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: 'Olá! Sou o Vencedor, a inteligência artificial da VencerHub. Como posso te ajudar a escalar seu negócio hoje?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMsg = inputValue.trim();
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('https://pmgzxrsumjhvlxdlmxhx.supabase.co/functions/v1/vencer-chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sb_publishable_UIxjDVI6QIbxcl0JnNph7g_8maGPN8J',
          'apikey': 'sb_publishable_UIxjDVI6QIbxcl0JnNph7g_8maGPN8J'
        },
        body: JSON.stringify({ message: userMsg, history: messages })
      });
      
      const data = await response.json();
      
      if (data.reply) {
         setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else if (data.error) {
         // Mostrar erro real no chat para diagnóstico
         setMessages(prev => [...prev, { role: 'assistant', content: `[DEBUG] ${data.error}` }]);
      } else {
         throw new Error('No reply');
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ops, tivemos um problema ao processar sua mensagem. Mande de novo ou chame a gente no WhatsApp (+55 51 99744-1369)!' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full transition-all shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_40px_rgba(37,211,102,0.6)] hover:-translate-y-1 hover:scale-105 active:scale-95 bg-[#25D366] ${isOpen ? 'hidden' : 'block'}`}
        title="Falar com o Vencedor (IA)"
      >
        <Bot className="text-white w-7 h-7 md:w-8 md:h-8" strokeWidth={2.5} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[110] w-[calc(100vw-3rem)] md:w-[400px] h-[550px] max-h-[80vh] flex flex-col bg-bg-dark border border-green-500/30 rounded-lg shadow-[0_0_50px_rgba(37,211,102,0.15)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-zinc-900 border-b border-zinc-800">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                 </div>
                 <div>
                   <h3 className="text-sm font-black uppercase text-white tracking-widest">Vencedor (IA)</h3>
                   <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">Online</p>
                 </div>
               </div>
               <button onClick={() => setIsOpen(false)} className="text-zinc-400 hover:text-white transition-colors">
                 <X className="w-5 h-5" />
               </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-bg-dark">
               {messages.map((m, i) => (
                 <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                     <div className={`w-6 h-6 flex-shrink-0 flex items-center justify-center rounded-sm ${m.role === 'user' ? 'bg-zinc-800' : 'bg-transparent'}`}>
                        {m.role === 'user' ? <User className="w-4 h-4 text-zinc-400" /> : <Bot className="w-4 h-4 text-[#25D366]" />}
                     </div>
                     <div className={`p-3 rounded-md text-sm font-medium leading-relaxed ${m.role === 'user' ? 'bg-zinc-800 text-white' : 'bg-[#25D366]/10 text-green-400 border border-[#25D366]/20'}`}>
                        {m.role === 'user' ? (
                          m.content
                        ) : (
                          <div className="markdown-body prose-invert prose-sm">
                            <ReactMarkdown>{m.content}</ReactMarkdown>
                          </div>
                        )}
                     </div>
                   </div>
                 </div>
               ))}
               {isLoading && (
                 <div className="flex justify-start">
                   <div className="flex gap-3 max-w-[85%]">
                     <div className="w-6 h-6 flex-shrink-0 flex items-center justify-center bg-transparent">
                        <Bot className="w-4 h-4 text-[#25D366]" />
                     </div>
                     <div className="p-4 rounded-md text-sm font-medium leading-relaxed bg-[#25D366]/10 border border-[#25D366]/20 flex gap-1">
                        <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-bounce"></span>
                     </div>
                   </div>
                 </div>
               )}
               <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-zinc-900 border-t border-zinc-800">
               <div className="relative flex items-center">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Digite sua mensagem..."
                    className="w-full bg-bg-dark border border-zinc-800 text-white text-sm px-4 py-3 pr-12 focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-600 rounded-sm"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-2 text-[#25D366] hover:text-green-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors p-2"
                  >
                     <Send className="w-4 h-4" />
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
