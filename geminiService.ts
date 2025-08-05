import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

const apiKey = process.env.API_KEY;

if (!apiKey) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll log an error. The app will show a message
  // if the API key is missing.
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "" });

let chat: Chat | null = null;

export function createChatSession() {
  if (!apiKey) return null;
  
  if (!chat) {
    chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chat;
}

export async function sendMessage(message: string) {
  const currentChat = createChatSession();
  if (!currentChat) {
    throw new Error("Gemini API key not configured. Cannot send message.");
  }

  return currentChat.sendMessageStream({ message });
}