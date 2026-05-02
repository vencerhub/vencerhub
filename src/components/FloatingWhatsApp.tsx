import React from 'react';
import { MessageCircle } from 'lucide-react';

export const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/5551997441369" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[100] w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-none transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)] hover:shadow-[0_0_40px_rgba(245,158,11,0.6)] hover:-translate-y-1 hover:scale-105 active:scale-95 bg-[#f59e0b]"
      title="Quero vencer!"
    >
      <MessageCircle className="text-black w-7 h-7 md:w-8 md:h-8" strokeWidth={2.5} />
    </a>
  );
};
