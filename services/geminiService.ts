import { GoogleGenAI } from "@google/genai";
import { MENTOR_SYSTEM_INSTRUCTION } from "../constants";

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    client = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return client;
};

export const sendMessageToGemini = async (
  message: string,
  history: { role: 'user' | 'model'; text: string }[]
): Promise<string> => {
  try {
    const ai = getClient();
    
    // Convert history to format expected by Chat (if we were using chat session), 
    // but for single turn with system instruction, we will use generateContent for simplicity 
    // and statelessness required by the simple UI, or construct a chat.
    // However, to maintain context, we should use `ai.chats.create`.
    
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: MENTOR_SYSTEM_INSTRUCTION,
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const response = await chat.sendMessage({ message });
    return response.text || "Sorry, ik kon geen antwoord genereren.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Er is een fout opgetreden bij het verbinden met de AI-mentor. Controleer je internetverbinding of probeer het later opnieuw.";
  }
};
