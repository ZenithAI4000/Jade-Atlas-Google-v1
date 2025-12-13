export const getConciergeResponse = async (userMessage: string, context: string): Promise<string> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const anonKey = import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !anonKey) {
      return "I am currently offline. Please contact our team directly via the contact page.";
    }

    const apiUrl = `${supabaseUrl}/functions/v1/concierge`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({
        userMessage,
        context,
      }),
    });

    if (!response.ok) {
      console.error("Concierge API error:", response.status);
      return "I am currently experiencing a connection issue. Please try again shortly.";
    }

    const data = await response.json();
    return data.text || "I apologize, but I could not process your request at this moment.";
  } catch (error) {
    console.error("Concierge Error:", error);
    return "I am currently experiencing a connection issue. Please try again shortly.";
  }
};