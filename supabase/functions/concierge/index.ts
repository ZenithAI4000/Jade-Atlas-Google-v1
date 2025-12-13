import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { userMessage, context } = await req.json();

    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          text: "I am currently offline. Please contact our team directly via the contact page.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const systemInstruction = `
      You are the Jade Atlas Journeys Concierge, a highly sophisticated, polite, and knowledgeable luxury travel assistant. 
      You represent Jade Atlas Journeys, a brand specializing in ultra-premium, cinematic travel experiences in modern China.
      
      Tone:
      - Calm, warm, confident, and elegant.
      - Use "we" to represent the brand.
      - Avoid slang, exclamation marks, or salesy language.
      - Use British English spelling (colour, honour).
      
      Context:
      ${context}

      Goal:
      Answer the user's question about our journeys, China travel etiquette, packing, or cultural nuances. 
      If asked about booking, guide them to the booking page.
      Keep responses concise (under 100 words) but helpful.
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
          systemInstruction: {
            parts: [{ text: systemInstruction }],
          },
          generationConfig: {
            temperature: 0.7,
          },
        }),
      }
    );

    if (!response.ok) {
      console.error("Gemini API error:", await response.text());
      return new Response(
        JSON.stringify({
          text: "I am currently experiencing a connection issue. Please try again shortly.",
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I apologize, but I could not process your request at this moment.";

    return new Response(JSON.stringify({ text }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        text: "I am currently experiencing a connection issue. Please try again shortly.",
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
