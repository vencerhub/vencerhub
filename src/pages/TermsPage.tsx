import React from 'react';
import { FileText, ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function TermsPage() {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="py-24 px-6 max-w-4xl mx-auto text-zinc-300 font-sans leading-relaxed">
      {/* Header */}
      <div className="mb-12 border-b border-zinc-800 pb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-400 uppercase tracking-widest mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar ao início
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/30 flex items-center justify-center">
            <FileText className="w-6 h-6 text-[#22c55e]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight">
              Termos de Serviço
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              VENCER HUB & Vencer ERP · Condições de Uso da Plataforma e Aplicações
            </p>
          </div>
        </div>
        <p className="text-xs text-zinc-400">Última atualização: 28 de Julho de 2026</p>
      </div>

      {/* Content */}
      <div className="space-y-8 text-sm">
        {/* Section 1 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">1.</span> Aceitação dos Termos
          </h2>
          <p>
            Ao acessar o site da <strong>VENCER HUB</strong> (<code className="text-amber-400">vencerhub.com</code>) ou utilizar o sistema de gestão <strong>Vencer ERP</strong>, você concorda expressamente em cumprir e estar vinculado a estes Termos de Serviço, bem como à nossa <Link to="/politica-de-privacidade" className="text-[#22c55e] underline font-bold">Política de Privacidade</Link>.
          </p>
          <p>
            Se você não concordar com qualquer disposição destes termos, não deverá acessar nem utilizar nossos serviços ou aplicações.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">2.</span> Descrição do Serviço e do Vencer ERP
          </h2>
          <p>
            A VENCER HUB CONEXOES & NEGOCIOS LTDA (CNPJ 47.915.570/0001-75) oferece serviços de produção audiovisual premium, estúdio de podcasts, criação de conteúdo e a plataforma integrada de gestão empresarial <strong>Vencer ERP</strong>.
          </p>
          <p>
            O <strong>Vencer ERP</strong> é um software como serviço (SaaS) restrito e especializado para controle de CRM, projetos, finanças, ocorrencias, checklists operacionais e inteligência de dados corporativos.
          </p>
        </section>

        {/* Section 3 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">3.</span> Autenticação via Google OAuth e Cadastro
          </h2>
          <p>
            O acesso à plataforma Vencer ERP utiliza autenticação segura via <strong>Google OAuth</strong>.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li><strong>Fila de Aprovação:</strong> Novos usuários que efetuarem login via Google entram em uma fila de espera para análise e aprovação pelo Administrador Master (<code className="text-amber-400">vencerhub@gmail.com</code>).</li>
            <li><strong>Atribuição de Perfis:</strong> O acesso às funcionalidades do sistema depende do perfil concedido (Admin, Comercial, Produção, Gestão ou Financeiro).</li>
            <li><strong>Responsabilidade das Credenciais:</strong> O usuário é inteiramente responsável por manter a confidencialidade e segurança de sua conta Google.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">4.</span> Uso Aceitável e Vedações
          </h2>
          <p>Ao utilizar o site e a aplicação Vencer ERP, é expressamente proibido:</p>
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="text-xs">Tentar burlar mecanismos de autenticação, permissões de perfis ou segurança.</span>
            </div>
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="text-xs">Compartilhar credenciais de acesso corporativas com terceiros não autorizados.</span>
            </div>
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="text-xs">Inserir dados falsos, maliciosos ou vírus nos formulários da plataforma.</span>
            </div>
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span className="text-xs">Realizar engenharia reversa ou extração não autorizada de código e dados.</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">5.</span> Propriedade Intelectual
          </h2>
          <p>
            Todos os direitos de propriedade intelectual referentes ao software Vencer ERP, logotipos, layouts, marcas registradas, metodologias de produção audiovisual e conteúdos institucionais pertencem exclusivamente à <strong>VENCER HUB CONEXOES & NEGOCIOS LTDA (CNPJ 47.915.570/0001-75)</strong>
          </p>
          <p>
            Nada nestes termos concede ao usuário qualquer direito de propriedade sobre as marcas ou sistemas da VENCER HUB CONEXOES & NEGOCIOS LTDA (CNPJ 47.915.570/0001-75).
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">6.</span> Limitação de Responsabilidade
          </h2>
          <p>
            Empreendemos os melhores esforços para garantir a alta disponibilidade, estabilidade e segurança da aplicação. Contudo, não nos responsabilizamos por indisponibilidades temporárias causadas por instabilidades na infraestrutura de terceiros (como provedores de internet ou instabilidades globais do Google/Supabase).
          </p>
        </section>

        {/* Section 7 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">7.</span> Modificações dos Termos
          </h2>
          <p>
            Reservamo-nos o direito de alterar estes Termos de Serviço a qualquer momento. Quaisquer alterações entrarão em vigor imediatamente após a publicação no site. Recomenda-se a revisão periódica desta página.
          </p>
        </section>

        {/* Section 8 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#22c55e]" />
            <span className="text-[#22c55e]">8.</span> Foro e Legislação Aplicável
          </h2>
          <p>
            Estes termos são regidos e interpretados segundo as leis da República Federativa do Brasil. Fica eleito o Foro da Comarca de Porto Alegre, Estado do Rio Grande do Sul, para dirimir quaisquer questões decorrentes destes termos.
          </p>
          <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 text-xs mt-3">
            <p className="font-bold text-white">Dúvidas sobre os Termos?</p>
            <p className="text-zinc-400">Entre em contato: <a href="mailto:vencerhub@gmail.com" className="text-[#22c55e] font-bold">vencerhub@gmail.com</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
