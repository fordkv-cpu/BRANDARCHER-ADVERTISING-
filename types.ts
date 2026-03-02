
export interface Project {
  id: string;
  title: string;
  category: string;
  industry: string;
  imageUrl: string;
  description: string;
  objectives: string;
  results: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface CampaignStrategy {
  objective: string;
  creativeHook: string;
  mediaChannels: string[];
  toneOfVoice: string;
}

export interface NewsItem {
  title: string;
  source: string;
  url: string;
  summary: string;
  category: 'Global' | 'Indian';
}
