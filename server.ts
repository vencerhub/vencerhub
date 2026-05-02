/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
