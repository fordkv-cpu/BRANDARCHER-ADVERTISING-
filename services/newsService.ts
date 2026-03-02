
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem } from "../types";

export const fetchIndustryNews = async (): Promise<NewsItem[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `Search for the latest 8 news headlines specifically about advertising events, marketing exhibitions, and media trade shows from today. 
  Focus on: 
  1. Global events (e.g., Cannes Lions, CES, DMEXCO, SXSW, Advertising Week).
  2. Indian events and exhibitions (e.g., Goafest, AdAsia, Zee Melt, local trade shows, and Indian Advertising Association events).
  3. Government of India announcements regarding exhibitions or industry events.
  
  Return a list of current news stories including the title, the specific source name (e.g. Campaign India, Afaqs, Exchange4media, PIB India), the direct URL to the article, and a 1-sentence summary.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              source: { type: Type.STRING },
              url: { type: Type.STRING },
              summary: { type: Type.STRING },
              category: { type: Type.STRING, enum: ["Global", "Indian"] }
            },
            required: ["title", "source", "url", "summary", "category"]
          }
        }
      }
    });

    const parsed = JSON.parse(response.text);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error fetching exhibition news:", error);
    // Fallback static data in case of API failure
    return [
      {
        title: "Major Exhibition Industry Summit Announced in New Delhi",
        source: "Economic Times",
        url: "https://economictimes.indiatimes.com",
        summary: "Focus on sustainable event architecture and hybrid exhibition models for 2025.",
        category: "Indian"
      }
    ];
  }
};
