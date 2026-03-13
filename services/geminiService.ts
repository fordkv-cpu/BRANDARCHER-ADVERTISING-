
import { GoogleGenAI, Type } from "@google/genai";

export const generateCampaignStrategy = async (industry: string, targetAudience: string, goal: string, imageBase64?: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  const textPart = {
    text: `Act as a senior creative strategist at BrandArcher Advertising, led by Dheeraj Kumar. 
    Our philosophy is "Targeted Anarchy"—the calculated intersection of strategic surgical precision and unapologetic creative disruption.
    
    Create a high-level 360-degree campaign strategy for a client in the ${industry} industry. 
    Target audience: ${targetAudience}. 
    Primary goal: ${goal}.
    ${imageBase64 ? "I have also provided an image for mood boarding and inspiration. Please consider its visual style, mood, and elements when crafting the strategy." : ""}
    
    Provide a JSON response with:
    - objective: A concise strategic objective that reflects surgical precision.
    - creativeHook: A bold, disruptive creative concept name and tagline that embodies "Targeted Anarchy".
    - mediaChannels: A list of 4 key media channels and how to use them in a 360-degree integrated way.
    - toneOfVoice: The suggested brand tone for this campaign (e.g., Bold, Provocative, Authoritative).`
  };

  const contents = imageBase64 
    ? { parts: [
        { inlineData: { mimeType: "image/jpeg", data: imageBase64.split(',')[1] || imageBase64 } },
        textPart
      ]}
    : textPart;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
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
