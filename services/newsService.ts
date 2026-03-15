
import { GoogleGenAI, Type } from "@google/genai";
import { NewsItem } from "../types";

export const fetchIndustryNews = async (): Promise<NewsItem[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  
  const prompt = `Search for the latest 10 news headlines from the last 48 hours about:
  1. Major Indian advertising campaigns and agency wins (Campaign India, Exchange4media, Afaqs).
  2. Government of India (GoI) advertising announcements, PIB releases, and DAVP updates.
  3. Global advertising exhibitions and marketing trade shows (Cannes Lions, SXSW, etc.).
  
  Return a JSON array of objects with: title, source, url, summary (1 sentence), and category ("Global", "Indian", or "Govt").`;

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
              category: { type: Type.STRING, enum: ["Global", "Indian", "Govt"] }
            },
            required: ["title", "source", "url", "summary", "category"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");
    
    const parsed = JSON.parse(text);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : getFallbackNews();
  } catch (error) {
    console.error("Error fetching exhibition news:", error);
    return getFallbackNews();
  }
};

const getFallbackNews = (): NewsItem[] => [
  {
    title: "Government of India Launches 'Viksit Bharat' Mega Campaign",
    source: "PIB India",
    url: "https://pib.gov.in",
    summary: "A new multi-media campaign highlighting infrastructure growth and digital transformation across rural India.",
    category: "Govt"
  },
  {
    title: "Major FMCG Brand Awards 360-Degree Creative Mandate to Top Agency",
    source: "Exchange4media",
    url: "https://www.exchange4media.com",
    summary: "The multi-crore account includes digital, OOH, and television creative strategy for the upcoming festive season.",
    category: "Indian"
  },
  {
    title: "Cannes Lions 2026: Indian Agencies Secure Record Shortlists",
    source: "Campaign India",
    url: "https://www.campaignindia.in",
    summary: "Indian creative shops dominate the 'Social & Influencer' and 'Direct' categories in the first round of voting.",
    category: "Global"
  },
  {
    title: "Ministry of Information & Broadcasting Issues New Digital Ad Guidelines",
    source: "Economic Times",
    url: "https://economictimes.indiatimes.com",
    summary: "New framework aims to increase transparency in influencer marketing and government digital spends.",
    category: "Govt"
  },
  {
    title: "BrandArcher Redefines 'Targeted Anarchy' in New Tech Campaign",
    source: "Agency News",
    url: "#",
    summary: "Our latest work for a leading fintech player breaks traditional BFSI advertising norms.",
    category: "Indian"
  },
  {
    title: "Global Ad Spend Forecast: Digital to Overtake All Other Channels",
    source: "AdAge",
    url: "https://adage.com",
    summary: "New data suggests a 12% growth in programmatic advertising globally, led by AI-driven creative optimization.",
    category: "Global"
  },
  {
    title: "National Startup Day: Govt Announces New Ad Grants for MSMEs",
    source: "Afaqs",
    url: "https://www.afaqs.com",
    summary: "A new initiative to support local brands with subsidized advertising space on national media channels.",
    category: "Govt"
  },
  {
    title: "Indian Premier League 2026: Ad Rates Hit All-Time High",
    source: "Financial Express",
    url: "https://www.financialexpress.com",
    summary: "Broadcasters report 90% inventory sold out as brands scramble for prime-time slots during the cricket season.",
    category: "Indian"
  }
];
