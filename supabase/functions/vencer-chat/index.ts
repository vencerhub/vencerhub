import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenAI } from "npm:@google/genai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { message, history, sessionId } = await req.json();

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log("Recebendo mensagem:", message);
    const ai = new GoogleGenAI(apiKey);
    const model = ai.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: `Você é o "Vencedor", o estrategista de inteligência artificial da VencerHub (produtora audiovisual estratégica focada em negócios e escala).
      Pilares: Performance, Estética Cinematic e Autoridade.
      Serviços: Estúdio de Podcast, Cursos Online, Edição, Fotografia, Sites e Design.
      
      SEU PRINCIPAL OBJETIVO É QUALIFICAR O LEAD.
      
      REGRAS DE COMPORTAMENTO ESTritas:
      1. SEJA EXTREMAMENTE CURTO E DIRETO: Máximo 2 a 3 frases.
      2. SEMPRE FAÇA UMA PERGUNTA: Conduza o cliente para o objetivo.
      3. CAPTURE OS DADOS: Tente descobrir: 1º Objetivo, 2º Nome, 3º WhatsApp.
      4. SEM ORÇAMENTOS: Diga que cada projeto é sob medida.
      
      Aja de forma estratégica e ambiciosa.`,
    });

    let contents = [];
    if (history && Array.isArray(history)) {
      contents = history.map((msg: any) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
      }));
    }
    
    contents.push({ role: 'user', parts: [{ text: message }] });

    console.log("Gerando conteúdo...");
    const result = await model.generateContent({ contents });
    const responseText = result.response.text();
    console.log("Resposta gerada:", responseText);

    // Persistir no banco de dados se tivermos uma sessão
    if (sessionId) {
      console.log("Salvando no banco...");
      await supabase.from('chat_messages').insert([
        { session_id: sessionId, role: 'user', content: message },
        { session_id: sessionId, role: 'assistant', content: responseText }
      ]);
    }

    return new Response(JSON.stringify({ reply: responseText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
