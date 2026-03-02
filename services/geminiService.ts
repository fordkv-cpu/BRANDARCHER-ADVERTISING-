
import { GoogleGenAI, Type } from "@google/genai";

export const generateCampaignStrategy = async (industry: string, targetAudience: string, goal: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Act as a senior creative strategist at BrandArcher Advertising. 
  Create a high-level 360-degree campaign strategy for a client in the ${industry} industry. 
  Target audience: ${targetAudience}. 
  Primary goal: ${goal}.
  
  Provide a JSON response with:
  - objective: A concise strategic objective.
  - creativeHook: A bold, disruptive creative concept name and tagline.
  - mediaChannels: A list of 4 key media channels and how to use them.
  - toneOfVoice: The suggested brand tone for this campaign.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            objective: { type: Type.STRING },
            creativeHook: { type: Type.STRING },
            mediaChannels: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            toneOfVoice: { type: Type.STRING }
          },
          required: ["objective", "creativeHook", "mediaChannels", "toneOfVoice"]
        }
      }
    });

    const result = JSON.parse(response.text);
    return result;
  } catch (error) {
    console.error("Error generating campaign:", error);
    throw error;
  }
};
