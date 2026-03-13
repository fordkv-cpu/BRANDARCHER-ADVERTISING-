
import { Project, Service } from './types';

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'HELLO BASMATI EXHIBITION',
    category: 'Spatial Design & Architecture',
    industry: 'FMCG',
    imageUrl: 'https://images.unsplash.com/photo-1582213726892-2761781cd3d2?auto=format&fit=crop&q=100&w=1600',
    description: 'A 360-degree brand environment featuring vibrant yellow branding and organic green spatial accents.',
    objectives: 'To create an immersive physical presence at the Global Food Expo that translates the brand\'s heritage into a modern, tactile experience.',
    results: '40% increase in B2B lead generation compared to previous years and "Best in Show" award for spatial design.',
    testimonial: {
      quote: "BrandArcher transformed our vision into a physical reality that spoke volumes without saying a word.",
      author: "Rajesh Mehta",
      role: "Marketing Director, Hello Basmati"
    }
  },
  {
    id: '2',
    title: 'ISOMETRIC BRAND FLOW',
    category: 'Trade Show Strategy',
    industry: 'Technology',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=100&w=1600',
    description: 'Visualizing the 360-degree customer journey through architectural precision.',
    objectives: 'Simplify complex cloud infrastructure concepts into an intuitive, walk-through customer journey.',
    results: 'Average visitor dwell time increased by 12 minutes; 25% higher conversion on post-event follow-ups.',
    testimonial: {
      quote: "They didn't just build a stand; they built a narrative that our customers could actually walk through.",
      author: "Sarah Chen",
      role: "VP of Growth, CloudFlow Tech"
    }
  },
  {
    id: '3',
    title: 'RETAIL INTERIOR DETAIL',
    category: 'Product Display',
    industry: 'Luxury',
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=100&w=1600',
    description: 'Custom modular shelving units integrated into the high-gloss facade.',
    objectives: 'Elevate the in-store experience for a flagship luxury boutique using modular, high-tech display solutions.',
    results: 'Foot traffic increased by 15% in the first quarter; significant boost in social media mentions due to "Instagrammable" design.',
    testimonial: {
      quote: "The attention to detail in the modular units was impeccable. It perfectly mirrored our brand's craftsmanship.",
      author: "Alessandro Rossi",
      role: "Creative Director, Aurelia Luxury"
    }
  },
  {
    id: '4',
    title: 'TOP-LEVEL BRANDING',
    category: 'Digital Signage',
    industry: 'Automotive',
    imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=100&w=1600',
    description: 'Overhead view showcasing the circular grass-textured canopy and integrated screens.',
    objectives: 'Create a landmark digital installation for a major auto show that communicates sustainability and innovation.',
    results: 'Reached over 2 million impressions via integrated digital signage and live social feeds.',
    testimonial: {
      quote: "BrandArcher's ability to blend digital tech with organic elements created a truly unique brand statement.",
      author: "Vikram Singh",
      role: "Head of Brand, Nexa Motors"
    }
  },
  {
    id: '5',
    title: 'STADIUM DOMINATION OOH',
    category: 'On-Ground Media',
    industry: 'Sports & Entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1600',
    description: '360-degree on-ground branding and media planning for major cricket tournaments.',
    objectives: 'Maximize brand recall during high-stakes cricket matches through strategic perimeter and digital screen placements.',
    results: 'Achieved 85% brand recall among stadium spectators and 200M+ TV impressions.',
    testimonial: {
      quote: "Their on-ground execution was flawless. They understood the energy of the game and matched it with their media strategy.",
      author: "Amit Sharma",
      role: "Sponsorship Lead, Premier League"
    }
  }
];

export const SERVICES: Service[] = [
  {
    id: 'strategy',
    title: 'Strategic Planning',
    description: 'Deep-dive market analysis and consumer insight mapping to find your brand’s bullseye.',
    icon: 'target'
  },
  {
    id: 'creative',
    title: 'Disruptive Creative',
    description: 'Breaking through the noise with bold ideas that demand attention and drive action.',
    icon: 'zap'
  },
  {
    id: 'media',
    title: '360 Media Buying',
    description: 'Precision-targeted placement across digital, social, OOH, and traditional channels.',
    icon: 'globe'
  },
  {
    id: 'cricket',
    title: 'Cricket OOH & On-Ground',
    description: 'Surgical media planning for cricket stadiums, on-ground branding, and high-impact sports OOH.',
    icon: 'trophy'
  },
  {
    id: 'production',
    title: 'Content Production',
    description: 'High-end film, photography, and digital assets crafted for a multi-platform world.',
    icon: 'camera'
  }
];
