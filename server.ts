/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route de Chat com IA
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ reply: "Desculpe, a IA temporariamente indisponível. Por favor, chame-nos no WhatsApp!" });
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const systemInstruction = `Você é o "Vencedor", a inteligência artificial da VencerHub, uma produtora audiovisual estratégica de alto impacto focada em estruturar negócios e escalar resultados.
      A VencerHub atende empresários, infoprodutores e negócios. Seus grandes pilares são: Performance, Estética Cinematic, Autoridade e Estratégia.
      Serviços principais: Estúdio de Podcast (PodeVencer e para terceiros), Cursos Online, Vídeos & Edição, Fotografia, Sites, Design, Drone e Transmissão ao Vivo.
      
      Seu principal objetivo é a CAPTURA DE LEAD (para envio a CRM) e atendimento qualificado. Você deve:
      1. Extrair de forma natural o NOME, TELEFONE (WhatsApp) e E-MAIL do usuário, além do ramo de atuação/dor principal e objetivo atual.
      2. Responder às dúvidas com agilidade, de forma profissional, direta e ambiciosa.
      3. Jamais passar orçamentos exatos. Informe que cada projeto é personalizado sob medida.
      4. Quando o usuário já informou nome, whatsapp e o objetivo, seja acolhedor e confirme que essas informações serão encaminhadas aos estrategistas (CRM) e que em breve alguém chamará no WhatsApp.
      5. Lembre-se do horário de atendimento da equipe humana (Segunda a Sexta, das 9h às 21h). Se fora desse horário, afirme que a equipe analisará a situação do negócio em horário comercial.
      6. Você pode orientar também o contato direto via WhatsApp +55 51 99744-1369 ou email contato@vencerhub.com para dúvidas instantâneas.
      Sempre aja como o "Vencedor", seu tom de voz é encorajador, estratégico, seguro e voltado a crescimento financeiro/de imagem.`;

      let contents = [];
      if (history && Array.isArray(history)) {
        contents = history.map((msg: any) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        }));
      }
      
      contents.push({ role: 'user', parts: [{ text: message }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7
        }
      });

      res.json({ reply: response.text });
    } catch (error) {
      console.error("Erro no chat AI:", error);
      res.status(500).json({ reply: "Desculpe, tive um problema técnico. Pode nos chamar no WhatsApp?" });
    }
  });

  // API Route de Simulação de Lead
  app.post("/api/leads", (req, res) => {
    const lead = req.body;
    console.log("-----------------------------------------");
    console.log("NOVO LEAD CAPTURADO NO BACKEND");
    console.log(`Nome: ${lead.nome}`);
    console.log(`Email: ${lead.email}`);
    console.log(`WhatsApp: ${lead.whatsapp}`);
    console.log(`Serviço: ${lead.tipoServico}`);
    console.log("Simulando envio de Email e WhatsApp...");
    console.log("-----------------------------------------");
    res.json({ success: true, message: "Lead processado com sucesso." });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`VencerHub Server running on http://localhost:${PORT}`);
  });
}

startServer();
