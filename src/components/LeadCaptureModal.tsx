import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, User, Phone, Mail, Building, Target } from 'lucide-react';

export const LeadCaptureModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    empresa: '',
    objetivo: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('https://pmgzxrsumjhvlxdlmxhx.supabase.co/functions/v1/vencer-leads', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': 'Bearer sb_publishable_UIxjDVI6QIbxcl0JnNph7g_8maGPN8J',
          'apikey': 'sb_publishable_UIxjDVI6QIbxcl0JnNph7g_8maGPN8J'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStep(2);
      } else {
        console.error("Erro ao enviar lead");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="w-full max-w-lg bg-bg-dark border border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.15)] rounded-2xl overflow-hidden relative z-10 font-sans"
          >
            {/* Header */}
            <div className="relative p-8 bg-zinc-900 border-b border-zinc-800 text-center overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[50px] -z-10" />
               <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
               </button>
               <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter mb-2">
                 Quero <span className="gradient-text-premium not-italic">Vencer</span>
               </h3>
               <p className="text-amber-500 text-xs font-bold uppercase tracking-widest">
                 Dê o primeiro passo rumo à estátosqueira digital.
               </p>
            </div>

            {/* Content */}
            <div className="p-8">
               {step === 1 ? (
                 <form onSubmit={handleSubmit} className="space-y-5">
                   <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                       <User className="w-3 h-3 text-amber-500" /> Nome Completo
                     </label>
                     <input 
                       required
                       type="text" 
                       name="nome"
                       value={formData.nome}
                       onChange={handleChange}
                       className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors"
                     />
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                         <Phone className="w-3 h-3 text-amber-500" /> WhatsApp
                       </label>
                       <input 
                         required
                         type="tel" 
                         name="whatsapp"
                         value={formData.whatsapp}
                         onChange={handleChange}
                         placeholder="(  )"
                         className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors"
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                         <Mail className="w-3 h-3 text-amber-500" /> E-mail
                       </label>
                       <input 
                         required
                         type="email" 
                         name="email"
                         value={formData.email}
                         onChange={handleChange}
                         className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors"
                       />
                     </div>
                   </div>

                   <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                       <Building className="w-3 h-3 text-amber-500" /> Nome da Empresa (ou Instagram)
                     </label>
                     <input 
                       required
                       type="text" 
                       name="empresa"
                       value={formData.empresa}
                       onChange={handleChange}
                       className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded text-sm focus:outline-none focus:border-amber-500 transition-colors"
                     />
                   </div>

                   <div className="space-y-1">
                     <label className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                       <Target className="w-3 h-3 text-amber-500" /> Qual seu principal objetivo?
                     </label>
                     <textarea 
                       required
                       name="objetivo"
                       value={formData.objetivo}
                       onChange={handleChange}
                       rows={3}
                       placeholder="Ex: Quero estruturar um podcast, lançar um infoproduto..."
                       className="w-full bg-zinc-900 border border-zinc-800 text-white p-3 rounded text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                     />
                   </div>

                   <button 
                     type="submit"
                     disabled={isLoading}
                     className="w-full pt-4"
                   >
                     <div className="glow-btn w-full flex items-center justify-center gap-2">
                       {isLoading ? (
                         <span className="animate-pulse">Enviando dados...</span>
                       ) : (
                         <>Enviar Aplicação <Send className="w-4 h-4" /></>
                       )}
                     </div>
                   </button>
                 </form>
               ) : (
                 <div className="text-center py-8 space-y-6">
                   <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                     <Send className="w-10 h-10 text-black translate-x-1" />
                   </div>
                   <h4 className="text-2xl font-black uppercase italic text-white tracking-tighter">
                     Aplicação Recebida!
                   </h4>
                   <p className="text-zinc-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
                     Nossa equipe analisará seu perfil e entraremos em contato via WhatsApp muito em breve.
                   </p>
                   <button 
                     onClick={onClose}
                     className="mt-4 px-8 py-3 bg-zinc-900 text-white text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors rounded"
                   >
                     Fechar
                   </button>
                 </div>
               )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
