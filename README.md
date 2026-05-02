# Vencer Hub - Website

Este repositório contém a aplicação web do **Vencer Hub**, um ecossistema focado em negócios e produção audiovisual estratégica. O projeto foi estruturado para ser performático, contar com um design premium e facilitar atualizações tanto localmente quanto via Antigravity.

## Stack Tecnológica

O projeto foi construído utilizando as seguintes tecnologias:
- **Frontend**: React 19 com Vite
- **Estilização**: Tailwind CSS v4
- **Animações**: Motion (framer-motion)
- **Ícones**: Lucide React
- **Backend/Servidor**: Express (com Vite atuando como middleware em desenvolvimento)
- **Linguagem**: TypeScript

## Estrutura do Projeto

- `/src/components` - Todos os componentes visuais do site (Hero, Serviços, Soluções, FAQ, etc).
- `/src/App.tsx` - Componente principal de roteamento e navegação global.
- `/src/index.css` - Contém os estilos globais, variáveis de CSS e regras do Tailwind.
- `/server.ts` - Servidor Node/Express que provê a API (ex: rotas para captura de lead) e o Frontend.
- `package.json` - Dependências e scripts de execução.

## Como rodar localmente

1. **Instalar dependências**:
   No diretório do projeto, execute:
   ```bash
   npm install
   ```

2. **Rodar em modo Desenvolvimento**:
   ```bash
   npm run dev
   ```
   Isso iniciará o servidor localmente (geralmente em `http://localhost:3000`).

3. **Build para Produção**:
   Para gerar a versão de produção otimizada:
   ```bash
   npm run build
   ```

## Configurando Variáveis de Ambiente

Não versione chaves, tokens ou dados reais no GitHub. 
Se precisar adicionar variáveis de ambiente para a aplicação, utilize o arquivo `.env`. Um arquivo `.env.example` já está disponível com os formatos necessários. Se for editar o código localmente, basta copiar o `.env.example` para um novo arquivo `.env` e preencher os valores.

## Editando via Antigravity (Google AI Studio)

Você pode sempre retornar ao AI Studio ou usar ferramentas como o Antigravity para expandir o app.
**Dicas para continuidade**:
- Não modifique a porta padrão `3000` em `server.ts`. O AI Studio injeta rotas diretamente nela.
- Se você adicionar novos arquivos, bibliotecas ou integrações usando git local/repositório, lembre-se de empacotar o `package.json` atualizado.
- O arquivo `vite.config.ts` não deve ser alterado draticamente em seu núcleo de roteamento, a não ser que você queira refatorar o servidor Express.
- Utilize as diretrizes de design já definidas em `index.css` e preserve as classes unificadas (como `.glow-btn` e classes de tailwind) para manter o padrão *Premium*.
