import React from 'react';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export function LegalModal({ isOpen, type, onClose }: LegalModalProps) {
  if (!isOpen || !type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111111] border border-zinc-800 rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-bg-dark">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
              {isPrivacy ? (
                <ShieldCheck className="w-5 h-5 text-[#22c55e]" />
              ) : (
                <FileText className="w-5 h-5 text-[#22c55e]" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-black text-white uppercase italic">
                {isPrivacy ? 'Política de Privacidade (LGPD)' : 'Termos de Uso'}
              </h2>
              <p className="text-xs text-zinc-500">VENCER HUB · Conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-300 leading-relaxed font-sans scrollbar-thin">
          {isPrivacy ? (
            <>
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">1. Introdução e Compromisso</h3>
                <p>
                  A <strong>VENCER HUB CONEXOES & NEGOCIOS LTDA (CNPJ 47.915.570/0001-75)</strong> está comprometida com a proteção dos dados pessoais de seus clientes, colaboradores e visitantes, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018). Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">2. Dados Pessoais Coletados</h3>
                <p>Coletamos apenas os dados estritamente necessários para a prestação de nossos serviços de produção audiovisual, tais como:</p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li><strong>Dados de identificação:</strong> Nome completo, CPF, CNPJ, e-mail e telefone.</li>
                  <li><strong>Dados profissionais:</strong> Empresa, segmento de atuação e cargo.</li>
                  <li><strong>Dados de navegação:</strong> Endereço IP, cookies e registros de acesso para melhoria da experiência.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">3. Finalidade do Tratamento</h3>
                <p>Seus dados pessoais são utilizados para:</p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li>Execução de contratos de produção audiovisual, podcasts e eventos.</li>
                  <li>Emissão de notas fiscais e controle financeiro.</li>
                  <li>Envio de comunicações operacionais e relatórios de projeto.</li>
                  <li>Autenticação de acesso seguro à nossa plataforma Vencer ERP.</li>
                </ul>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">4. Compartilhamento de Dados</h3>
                <p>
                  A VENCER HUB não vende ou aluga dados pessoais a terceiros. O compartilhamento ocorre exclusivamente com prestadores de serviços essenciais (provedores de infraestrutura em nuvem, processadores de pagamento e órgãos fiscais), mediante estritas obrigações de confidencialidade.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">5. Seus Direitos (Titular dos Dados)</h3>
                <p>Nos termos do art. 18 da LGPD, você tem o direito de:</p>
                <ul className="list-disc pl-5 space-y-1 text-zinc-400">
                  <li>Confirmar a existência de tratamento de seus dados.</li>
                  <li>Acessar seus dados pessoais mantidos por nós.</li>
                  <li>Solicitar a correção de dados incompletos, inexatos ou desatualizados.</li>
                  <li>Solicitar a eliminação de dados pessoais desnecessários ou excessivos.</li>
                </ul>
                <p className="pt-2">
                  Para exercer qualquer um dos seus direitos, entre em contato através do e-mail: <strong className="text-[#22c55e]">vencerhub@gmail.com</strong>.
                </p>
              </section>
            </>
          ) : (
            <>
              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">1. Aceite dos Termos</h3>
                <p>
                  Ao acessar o site da <strong>VENCER HUB</strong> ou utilizar a plataforma <strong>Vencer ERP</strong>, você concorda expressamente com os presentes Termos de Uso. Caso não concorde com qualquer disposição, solicitamos que não utilize nossos serviços.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">2. Uso da Plataforma e do ERP</h3>
                <p>
                  O Vencer ERP é um sistema de gestão de propriedade exclusiva da VENCER HUB. O acesso à plataforma é restrito a usuários previamente cadastrados e autorizados. É proibido compartilhar credenciais ou tentar burlar os controles de acesso.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">3. Propriedade Intelectual</h3>
                <p>
                  Todo o conteúdo disponibilizado pela VENCER HUB (marcas, logotipos, layouts, código-fonte, metodologias de produção e materiais audiovisuais) é protegido pelas leis de propriedade intelectual. É vedada a reprodução não autorizada.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">4. Responsabilidades</h3>
                <p>
                  A VENCER HUB empenha seus melhores esforços para garantir a disponibilidade contínua da plataforma, mas não se responsabiliza por interrupções causadas por indisponibilidade de terceiros, falhas de conexão à internet ou uso inadequado por parte do usuário.
                </p>
              </section>

              <section className="space-y-2">
                <h3 className="text-sm font-bold text-white uppercase">5. Foro e Legislação Aplicável</h3>
                <p>
                  Estes termos são regidos pela legislação da República Federativa do Brasil. Fica eleito o Foro da Comarca de Porto Alegre - RS para dirimir quaisquer controvérsias oriundas destes termos.
                </p>
              </section>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-800 bg-bg-dark flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#22c55e] text-black font-black text-xs px-6 py-2.5 rounded-xl hover:brightness-110 transition-all"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
}
