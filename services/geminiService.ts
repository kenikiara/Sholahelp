
import { GoogleGenAI, Type, Chat } from "@google/genai";
import { GeneratedTopic } from '../types';

if (!process.env.API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this context, we assume it's set in the environment.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const SYSTEM_INSTRUCTION = "You are a friendly and helpful customer support agent for Scholar paperhelp, a service that provides human-written academic papers. Your role is to answer user questions about the service, pricing, how it works, and our policies. Be concise and encouraging. Do not mention that you are an AI model.";

export const createChatSession = (): Chat => {
    if (!process.env.API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }
    return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: SYSTEM_INSTRUCTION,
        },
    });
};

export const sendMessageToChat = async (chat: Chat, message: string): Promise<string> => {
     if (!process.env.API_KEY) {
        throw new Error("Gemini API key is not configured.");
    }
    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to chat:", error);
        return "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.";
    }
};


export const generateTopicIdeas = async (subject: string): Promise<GeneratedTopic[]> => {
  if (!subject.trim()) {
    throw new Error("Subject cannot be empty.");
  }
  if (!process.env.API_KEY) {
    throw new Error("Gemini API key is not configured.");
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Generate 5 compelling essay topic ideas about "${subject}". For each topic, provide a brief 3-point outline.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              recipeName: {
                type: Type.STRING,
                description: 'The essay topic idea.',
              },
              ingredients: {
                type: Type.ARRAY,
                items: {
                  type: Type.STRING,
                },
                description: 'A 3-point outline for the essay topic.',
              },
            },
            required: ["recipeName", "ingredients"],
          },
        },
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);
    
    // Validate that we have the expected structure
    if (Array.isArray(parsedData) && parsedData.every(item => 'recipeName' in item && 'ingredients' in item)) {
        return parsedData as GeneratedTopic[];
    } else {
        throw new Error("Received malformed data from API.");
    }
  } catch (error) {
    console.error("Error generating topic ideas:", error);
    throw new Error("Failed to generate ideas. Please check your subject or try again later.");
  }
};