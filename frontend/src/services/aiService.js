const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

if (!GROQ_API_KEY) {
  console.error("VITE_GROQ_API_KEY is not set. Check your .env file.");
}

// 🔹 Send chat messages
export async function sendChatMessage(messages) {
  try {
    console.log("Sending chat message to Groq API...");

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // ✅ FIXED MODEL
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AI Chat Error:", error);
    throw error;
  }
}

// 🔹 Generate ideas
export async function generateIdea(type) {
  const prompts = {
    random:
      "Generate a creative and innovative software project idea. Include the project name, a brief description, and key features. Keep it concise and modern.",
    feature:
      "Suggest 3 creative features for a web application. Make them innovative, user-friendly, and technically interesting. Keep each suggestion brief.",
  };

  try {
    console.log("Generating idea with Groq API...");

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", // ✅ FIXED MODEL
        messages: [
          {
            role: "system",
            content:
              "You are a creative product manager and software architect. Generate innovative and practical ideas.",
          },
          {
            role: "user",
            content: prompts[type],
          },
        ],
        temperature: 0.8,
        max_tokens: 512,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error:", errorData);
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("AI Ideas Error:", error);
    throw error;
  }
}