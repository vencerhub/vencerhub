import React from 'react';
import { ShieldCheck, ArrowLeft, Mail, Lock, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-6 h-6 text-[#22c55e]" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tight">
              Política de Privacidade
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              VENCER HUB & Vencer ERP · Em conformidade com a LGPD (Lei nº 13.709/2018) e Diretrizes do Google OAuth
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
            <span className="text-[#22c55e]">1.</span> Visão Geral e Compromisso
          </h2>
          <p>
            A <strong>VENCER HUB CONEXOES & NEGOCIOS LTDA (CNPJ 47.915.570/0001-75)</strong> ("VENCER HUB", "nós"), operadora do sistema <strong>Vencer ERP</strong>, está profundamente comprometida com a privacidade, segurança e proteção dos dados pessoais de seus clientes, colaboradores e usuários.
          </p>
          <p>
            Esta Política de Privacidade descreve de forma clara e transparente como coletamos, utilizamos, armazenamos, tratamos e protegemos seus dados pessoais ao acessar nosso site (<code className="text-amber-400">vencerhub.com</code>) ou utilizar a aplicação Vencer ERP via autenticação Google OAuth.
          </p>
        </section>

        {/* Section 2 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">2.</span> Dados Coletados e Integração Google OAuth
          </h2>
          <p>
            Ao utilizar o recurso <strong>"Entrar com o Google"</strong> no Vencer ERP, solicitamos acesso estritamente limitado aos dados básicos do seu perfil Google:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-zinc-300">
            <li><strong>Nome completo:</strong> Para identificação do usuário na plataforma.</li>
            <li><strong>Endereço de e-mail:</strong> Para autenticação, controle de acesso e comunicações do sistema.</li>
            <li><strong>Foto de perfil (avatar):</strong> Para personalização da conta no painel do usuário.</li>
            <li><strong>ID de usuário Google:</strong> Identificador único para associação segura da conta.</li>
          </ul>
          <p className="pt-2">
            Também podemos coletar dados operacionais fornecidos voluntariamente durante o uso do ERP (dados cadastrais de projetos, serviços e transações corporativas).
          </p>
        </section>

        {/* Section 3 - Google Limited Use Notice */}
        <section className="bg-[#22c55e]/5 border border-[#22c55e]/20 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#22c55e]" />
            <span className="text-[#22c55e]">3.</span> Política de Uso Limitado de Dados do Google (Limited Use Disclosure)
          </h2>
          <p className="text-zinc-200">
            O uso e a transferência para qualquer outro aplicativo das informações recebidas das APIs do Google por parte do <strong>Vencer ERP</strong> aderem estritamente à <strong><a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noreferrer" className="text-[#22c55e] underline font-bold">Política de Dados do Usuário dos Serviços de API do Google</a></strong>, incluindo os requisitos de Uso Limitado (Limited Use Requirements).
          </p>
          <ul className="list-disc pl-6 space-y-1.5 text-zinc-300">
            <li>Não utilizamos dados do Google para treinar modelos de inteligência artificial generativa de terceiros sem seu consentimento explícito.</li>
            <li>Não utilizamos seus dados do Google para fins de publicidade ou comercialização de dados.</li>
            <li>Os dados do perfil Google são utilizados unicamente para permitir a autenticação do usuário e o acesso às funcionalidades do Vencer ERP.</li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">4.</span> Finalidade do Tratamento dos Dados
          </h2>
          <p>Os dados pessoais coletados são utilizados exclusivamente para:</p>
          <div className="grid sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span className="text-xs">Autenticação e controle de acesso ao sistema Vencer ERP.</span>
            </div>
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span className="text-xs">Gestão de permissões de perfil (Admin, Comercial, Produção, Gestão, Financeiro).</span>
            </div>
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span className="text-xs">Execução de contratos e prestação dos serviços audiovisuais contratados.</span>
            </div>
            <div className="bg-black/30 border border-zinc-800 rounded-xl p-3 flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#22c55e] shrink-0 mt-0.5" />
              <span className="text-xs">Atendimento às obrigações legais, fiscais e tributárias decorrentes das operações.</span>
            </div>
          </div>
        </section>

        {/* Section 5 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">5.</span> Compartilhamento e Não Comercialização de Dados
          </h2>
          <p>
            A VENCER HUB CONEXOES & NEGOCIOS LTDA (CNPJ 47.915.570/0001-75) <strong>NÃO vende, aluga, troca ou comercializa</strong> dados pessoais ou informações obtidas via Google OAuth em nenhuma hipótese.
          </p>
          <p>
            O compartilhamento de dados ocorre unicamente com infraestruturas estritamente necessárias para a operação da plataforma (ex: Supabase para banco de dados e autenticação segura), sempre sob criptografia e contratos que garantem sigilo e conformidade com a LGPD.
          </p>
        </section>

        {/* Section 6 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">6.</span> Armazenamento, Segurança e Retenção
          </h2>
          <p>
            Adotamos medidas técnicas e organizacionais rígidas de segurança da informação, incluindo criptografia SSL/TLS em trânsito, controle estrito de acesso por perfil e monitoramento continuo contra acessos não autorizados.
          </p>
          <p>
            Os dados são retidos apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletados ou conforme exigido por lei.
          </p>
        </section>

        {/* Section 7 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-[#22c55e]">7.</span> Direitos do Titular e Exclusão de Dados
          </h2>
          <p>
            Em conformidade com o Artigo 18 da LGPD, você possui o direito de confirmar a existência de tratamento, acessar seus dados, solicitar correções ou exigir a <strong>eliminação completa dos seus dados pessoais</strong> de nossos sistemas.
          </p>
          <p>
            Você também pode revogar a permissão de acesso do Vencer ERP à sua conta Google a qualquer momento diretamente nas configurações de segurança da sua conta Google em: <a href="https://myaccount.google.com/permissions" target="_blank" rel="noreferrer" className="text-amber-500 underline font-bold">myaccount.google.com/permissions</a>.
          </p>
          <p className="pt-2">
            Para solicitar a exclusão definitiva dos seus dados em nossos servidores, envie um e-mail para: <strong className="text-white bg-zinc-800 px-2 py-1 rounded">vencerhub@gmail.com</strong>.
          </p>
        </section>

        {/* Section 8 */}
        <section className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 space-y-3">
          <h2 className="text-base font-black text-white uppercase tracking-wider flex items-center gap-2">
            <Mail className="w-4 h-4 text-[#22c55e]" />
            <span className="text-[#22c55e]">8.</span> Contato do Encarregado de Dados (DPO)
          </h2>
          <p>Para dúvidas, solicitações ou exercício de direitos referentes à privacidade e proteção de dados:</p>
          <div className="bg-black/40 border border-zinc-800 rounded-xl p-4 text-xs space-y-1">
            <p className="font-bold text-white">VENCER HUB CONEXOES & NEGOCIOS LTDA (CNPJ 47.915.570/0001-75)</p>
            <p className="text-zinc-400">Endereço: Av. Érico Veríssimo, 1140 — Bairro Menino Deus — Porto Alegre/RS</p>
            <p className="text-zinc-400">E-mail: <a href="mailto:vencerhub@gmail.com" className="text-[#22c55e] font-bold">vencerhub@gmail.com</a></p>
            <p className="text-zinc-400">Telefone/WhatsApp: +55 51 99744-1369</p>
          </div>
        </section>
      </div>
    </div>
  );
}
