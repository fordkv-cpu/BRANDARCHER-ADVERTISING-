
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { X, ArrowRight, Quote, Share2, Twitter, Linkedin, Facebook, Copy, Check } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [activeClientIndex, setActiveClientIndex] = useState(0);
  const [clientCategory, setClientCategory] = useState<'corporate' | 'public'>('corporate');

  const clients = [
    {
      id: 'jaypee',
      name: 'JAYPEE GROUP',
      shortName: 'JAYPEE',
      category: 'corporate',
      industry: 'Cement & Infrastructure',
      color: '#1E3A8A',
      tagline: 'No limits to growth. Building national infrastructure and cement excellence.',
      campaignType: '360° Corporate Repositioning & High-Impact OOH',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 20h30c10 0 15 5 15 12.5S70 45 60 45H30v35" />
          <path d="M30 45c-5 0-10 4-10 10s5 10 10 10" />
        </svg>
      )
    },
    {
      id: 'callhealth',
      name: 'CALLHEALTH SERVICES',
      shortName: 'CALLHEALTH',
      category: 'corporate',
      industry: 'Digital Healthcare & MedTech',
      color: '#06B6D4',
      tagline: 'Empowering millions with integrated healthcare delivery at their doorstep.',
      campaignType: 'Pan-India Digital Launch & Mobile Acquisition',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 30c0-5 5-10 10-10h40c5 0 10 5 10 10v40c0 5-5 10-10 10H30c-5 0-10-5-10-10V30z" />
          <path d="M30 50h10l5-15 8 30 5-15h12" />
        </svg>
      )
    },
    {
      id: 'masonite',
      name: 'MASONITE DOORS',
      shortName: 'MASONITE',
      category: 'corporate',
      industry: 'Premium Building Materials',
      color: '#D4AF37',
      tagline: 'The open door to premium global architectural and woodcraft design.',
      campaignType: '360° Identity Rebrand & High-End Print Catalogues',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="25" y="15" width="50" height="70" rx="4" />
          <line x1="50" y1="15" x2="50" y2="85" />
          <rect x="32" y="23" width="12" height="24" />
          <rect x="56" y="23" width="12" height="24" />
          <rect x="32" y="53" width="12" height="24" />
          <rect x="56" y="53" width="12" height="24" />
          <circle cx="45" cy="50" r="2" fill="currentColor" />
          <circle cx="55" cy="50" r="2" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'moserbaer',
      name: 'MOSER BAER INDIA',
      shortName: 'MOSER BAER',
      category: 'corporate',
      industry: 'Tech & Optical Manufacturing',
      color: '#3B82F6',
      tagline: 'A pioneer in global tech storage, optical media, and clean energy.',
      campaignType: 'Consumer Brand Trust Campaign & Retail Expansion',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="12" />
          <path d="M50 15v10M50 75v10M15 50h10M75 50h10" />
        </svg>
      )
    },
    {
      id: 'pioneer',
      name: 'PIONEER ELECTRONICS',
      shortName: 'PIONEER',
      category: 'corporate',
      industry: 'Automotive Sound & Consumer Electronics',
      color: '#EF4444',
      tagline: 'Sensing the future of sound, automotive infotainment, and audio design.',
      campaignType: 'Interactive Vehicle Experience Centers & Retail OOH',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="25" cy="50" r="6" fill="currentColor" />
          <path d="M45 30c8 10 8 30 0 40M60 20c15 15 15 45 0 60M75 10c22 22 22 58 0 80" />
        </svg>
      )
    },
    {
      id: 'beltek',
      name: 'BELTEK INDIA',
      shortName: 'BELTEK',
      category: 'corporate',
      industry: 'Consumer Durables & Electronics',
      color: '#F97316',
      tagline: 'A household name in trusted televisions and consumer home appliances.',
      campaignType: 'Legacy Recall & Tier-2 India Market Domination',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="15" y="25" width="70" height="50" rx="6" />
          <rect x="23" y="32" width="42" height="36" rx="2" />
          <circle cx="75" cy="38" r="3" fill="currentColor" />
          <circle cx="75" cy="50" r="3" fill="currentColor" />
          <line x1="71" y1="62" x2="79" y2="62" />
          <path d="M35 25L20 12M65 25L80 12" />
        </svg>
      )
    },
    {
      id: 'astaberry',
      name: 'ASTABERRY COSMETICS',
      shortName: 'ASTABERRY',
      category: 'corporate',
      industry: 'Cosmetics & Skincare',
      color: '#10B981',
      tagline: 'Harnessing ancient Ayurvedic wisdom with advanced natural cosmetic sciences.',
      campaignType: 'Influencer-Led Digital Storytelling & Lifestyle Retail',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 15C30 35 30 65 50 85c20-20 20-50 0-70z" />
          <path d="M50 85V15M50 35c8 6 12 14 12 14M50 50c-8 6-12 14-12 14" />
        </svg>
      )
    },
    {
      id: 'nhai',
      name: 'NHAI',
      shortName: 'NHAI',
      category: 'public',
      industry: 'Government Infrastructure',
      color: '#2563EB',
      tagline: 'National Highways Authority of India. Connecting the Nation, Building the Future.',
      campaignType: 'Pradhan Mantri National Expressway Media Highlights',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 80L42 20M85 80L58 20" />
          <path d="M50 20v60M50 35H40M50 55H60" strokeDasharray="6 6" />
          <path d="M10 80h80" />
        </svg>
      )
    },
    {
      id: 'bhel',
      name: 'BHEL',
      shortName: 'BHEL',
      category: 'public',
      industry: 'Power & Heavy Engineering',
      color: '#DC2626',
      tagline: 'Bharat Heavy Electricals Limited. Powering India\'s self-reliance in heavy industry.',
      campaignType: 'Corporate Capabilities Showcase & National PSUs Exhibition',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="38" />
          <path d="M50 12v38M50 50l27 27M50 50L23 77M50 50l34-18M50 50L16 68" />
          <circle cx="50" cy="50" r="10" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'ntpc',
      name: 'NTPC LIMITED',
      shortName: 'NTPC',
      category: 'public',
      industry: 'Power Generation & Clean Energy',
      color: '#F59E0B',
      tagline: 'NTPC Limited. Leading the power sector transition with clean, sustainable energy.',
      campaignType: 'Green Energy Portfolio & Carbon-Neutral Public Awareness',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 15L25 50h20L35 85l40-45H55z" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'delhigovt',
      name: 'DELHI GOVERNMENT',
      shortName: 'DELHI GOVT.',
      category: 'public',
      industry: 'Public Services & Governance',
      color: '#15803D',
      tagline: 'Serving the citizens of the national capital with modern infrastructure.',
      campaignType: 'Public Welfare Schemes & Swachh Delhi OOH Domination',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 85V45c0-15 13-27 30-27s30 12 30 27v40" />
          <path d="M35 85V55c0-8 6-15 15-15s15 7 15 15v30" />
          <line x1="10" y1="85" x2="90" y2="85" />
        </svg>
      )
    },
    {
      id: 'health',
      name: 'MINISTRY OF HEALTH',
      shortName: 'MINISTRY OF HEALTH',
      category: 'public',
      industry: 'Government Healthcare',
      color: '#0D9488',
      tagline: 'Advancing public health, family welfare, and immunization reach across India.',
      campaignType: 'National Health Mission & Pulse Polio 360° Awareness',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 15c15 0 25 10 25 25C75 65 50 85 50 85S25 65 25 40c0-15 10-25 25-25z" />
          <path d="M50 30v20M40 40h20" />
        </svg>
      )
    },
    {
      id: 'foodproc',
      name: 'MINISTRY OF FOOD PROCESSING',
      shortName: 'MINISTRY OF FOOD',
      category: 'public',
      industry: 'Agro-Industrial Governance',
      color: '#EA580C',
      tagline: 'Promoting agricultural value-add and cold-chain infrastructure across the sub-continent.',
      campaignType: 'World Food India Mega Expo & PMKSY Scheme Highlights',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="30" strokeDasharray="5 5" />
          <path d="M50 15c5 15-5 35-25 45M50 15c-5 15 5 35 25 45" />
          <path d="M30 65l40-40" />
        </svg>
      )
    },
    {
      id: 'gail',
      name: 'GAIL INDIA LIMITED',
      shortName: 'GAIL',
      category: 'public',
      industry: 'Natural Gas & Energy PSUs',
      color: '#0284C7',
      tagline: 'GAIL (India) Limited. Energizing quality of life with natural gas transmission.',
      campaignType: 'Clean Fuel Green City Campaign & Corporate ESG Reporting',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 60c10-20 20-30 30-30s20 10 30 30" />
          <path d="M30 70c10-20 15-25 20-25s10 5 20 25" />
          <path d="M50 20c-3 10-3 15 0 20 3-5 3-10 0-20z" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'eil',
      name: 'ENGINEERS INDIA LIMITED (EIL)',
      shortName: 'EIL',
      category: 'public',
      industry: 'Engineering & Technical Consulting',
      color: '#4F46E5',
      tagline: 'Engineers India Limited. High-end design engineering & consulting for hydrocarbons.',
      campaignType: 'Global Hydrocarbon Expo & Technical Capability Media',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 15L25 75h50z" />
          <line x1="33" y1="55" x2="67" y2="55" />
          <circle cx="50" cy="15" r="4" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'oilindia',
      name: 'OIL INDIA LIMITED',
      shortName: 'OIL INDIA',
      category: 'public',
      industry: 'Oil & Petroleum Exploration',
      color: '#0F766E',
      tagline: 'Oil India Limited. Conquering new horizons in petroleum exploration and production.',
      campaignType: 'North-East Community Development & Energy Security Public Relations',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 15L25 80h50z" />
          <path d="M35 50h30M30 65h40" />
          <path d="M50 40c-4 10-4 15 0 20 4-5 4-10 0-20z" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'obc',
      name: 'ORIENTAL BANK OF COMMERCE',
      shortName: 'OBC BANK',
      category: 'public',
      industry: 'Nationalized Banking',
      color: '#9F1239',
      tagline: 'Oriental Bank of Commerce. Where every individual is committed to progress.',
      campaignType: 'Financial Inclusion & Modern Retail Banking Services OOH',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M25 25h50v25c0 15-10 25-25 25S25 65 25 50V25z" />
          <path d="M50 35v20M40 45h20" />
        </svg>
      )
    },
    {
      id: 'canara',
      name: 'CANARA BANK',
      shortName: 'CANARA BANK',
      category: 'public',
      industry: 'Public Sector Banking',
      color: '#1D4ED8',
      tagline: 'Together We Can. Serving generations of Indian citizens with absolute trust.',
      campaignType: 'Digital Banking Wave & Rural Financial Literacy Camp Campaigns',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 15L85 75H15z" />
          <path d="M50 85L15 25h70z" opacity="0.7" />
        </svg>
      )
    },
    {
      id: 'powergrid',
      name: 'POWER GRID CORPORATION',
      shortName: 'POWER GRID',
      category: 'public',
      industry: 'Electricity Grid Infrastructure',
      color: '#0E7490',
      tagline: 'Power Grid Corporation of India. Transmitting power with reliability and safety.',
      campaignType: 'National Grid Integration & Unified Transmission Achievements',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M50 12L35 88h30z" />
          <path d="M15 38h70M25 58h50" />
          <path d="M35 12l15 26 15-26" />
        </svg>
      )
    },
    {
      id: 'dda',
      name: 'DELHI DEVELOPMENT AUTHORITY',
      shortName: 'DDA',
      category: 'public',
      industry: 'Urban Development & Housing',
      color: '#854D0E',
      tagline: 'DDA. Master-planning Delhi into a world-class, clean, green metropolis.',
      campaignType: 'Affordable Housing Schemes & DDA Parks Beautification Awareness',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <rect x="20" y="20" width="25" height="25" rx="2" />
          <rect x="55" y="20" width="25" height="25" rx="2" />
          <rect x="20" y="55" width="25" height="25" rx="2" />
          <rect x="55" y="55" width="25" height="25" rx="2" />
          <line x1="50" y1="15" x2="50" y2="85" strokeDasharray="4 4" />
          <line x1="15" y1="50" x2="85" y2="50" strokeDasharray="4 4" />
        </svg>
      )
    },
    {
      id: 'dvvnl',
      name: 'DVVNL AGRA',
      shortName: 'DVVNL AGRA',
      category: 'public',
      industry: 'Power Distribution Utility',
      color: '#6D28D9',
      tagline: 'Dakshinanchal Vidyut Vitran Nigam Limited. Illuminating Agra and South UP.',
      campaignType: 'Saubhagya Electricity Connection Scheme & Consumer Bill Payment Digital Awareness',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M30 25c5-10 15-15 20-15s15 5 20 15v35c0 15-10 25-20 25s-20-10-20-25V25z" />
          <path d="M52 30L40 50h15L45 72" stroke="currentColor" strokeWidth="4" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveClientIndex((prev) => (prev + 1) % clients.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [clients.length]);

  useEffect(() => {
    if (clients[activeClientIndex]) {
      setClientCategory(clients[activeClientIndex].category as 'corporate' | 'public');
    }
  }, [activeClientIndex]);

  useEffect(() => {
    setShowShareMenu(false);
  }, [selectedProject]);

  const handleCopy = () => {
    if (!selectedProject) return;
    const shareUrl = `${window.location.origin}${window.location.pathname}#project-${selectedProject.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    { 
      name: 'Twitter', 
      icon: <Twitter size={16} />, 
      url: (url: string, title: string) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}` 
    },
    { 
      name: 'LinkedIn', 
      icon: <Linkedin size={16} />, 
      url: (url: string, title: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` 
    },
    { 
      name: 'Facebook', 
      icon: <Facebook size={16} />, 
      url: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}` 
    }
  ];

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#project-')) {
      const id = hash.replace('#project-', '');
      const project = PROJECTS.find(p => p.id === id);
      if (project) {
        setSelectedProject(project);
      }
    }
  }, []);

  useEffect(() => {
    if (selectedProject) {
      window.location.hash = `project-${selectedProject.id}`;
    } else {
      if (window.location.hash.startsWith('#project-')) {
        window.history.pushState("", document.title, window.location.pathname + window.location.search);
      }
    }
  }, [selectedProject]);

  // Dynamic Meta Tags Implementation for SEO & Social Sharing
  useEffect(() => {
    if (selectedProject) {
      // Store original values to restore them later
      const prevTitle = document.title;
      const metaTags = [
        { name: 'description', content: selectedProject.description },
        { property: 'og:title', content: `${selectedProject.title} | ${selectedProject.industry} Case Study` },
        { property: 'og:description', content: selectedProject.description },
        { property: 'og:image', content: selectedProject.imageUrl },
        { property: 'og:type', content: 'article' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: selectedProject.title },
        { name: 'twitter:description', content: selectedProject.description },
        { name: 'twitter:image', content: selectedProject.imageUrl }
      ];

      const originalTags: { element: HTMLMetaElement, attr: string, value: string | null }[] = [];

      // Update Title
      document.title = `${selectedProject.title} | ${selectedProject.industry} Case Study | BrandArcher`;

      // Update or Create Meta Tags
      metaTags.forEach(tag => {
        const selector = tag.name ? `meta[name="${tag.name}"]` : `meta[property="${tag.property}"]`;
        let element = document.querySelector(selector) as HTMLMetaElement;
        
        if (element) {
          originalTags.push({ element, attr: 'content', value: element.getAttribute('content') });
          element.setAttribute('content', tag.content);
        } else {
          element = document.createElement('meta');
          if (tag.name) element.setAttribute('name', tag.name);
          if (tag.property) element.setAttribute('property', tag.property);
          element.setAttribute('content', tag.content);
          document.head.appendChild(element);
          originalTags.push({ element, attr: 'remove', value: null });
        }
      });

      // Cleanup on close
      return () => {
        document.title = prevTitle;
        originalTags.forEach(({ element, attr, value }) => {
          if (attr === 'remove') {
            document.head.removeChild(element);
          } else if (value !== null) {
            element.setAttribute('content', value);
          }
        });
      };
    }
  }, [selectedProject]);

  const industries = ['All', ...Array.from(new Set(PROJECTS.map(p => p.industry)))];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.industry === filter);

  return (
    <section id="portfolio" className="bg-zinc-950 py-16 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zinc-800/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-10">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 text-xs font-black tracking-[0.5em] uppercase mb-4 block"
          >
            The Archive
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none mb-10"
          >
            360° <br /> <span className="text-outline">Campaigns</span>
          </motion.h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 border-b border-zinc-800 pb-4">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setFilter(industry)}
                className={`text-xs font-bold uppercase tracking-widest px-6 py-2 transition-all duration-300 ${
                  filter === industry 
                    ? 'bg-red-600 text-white' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.8, 
                  delay: idx * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 mb-8">
                  <motion.img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    loading="lazy"
                    decoding="async"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                  
                  <div className="absolute bottom-10 left-10">
                    <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      className="text-red-600 text-xs font-black uppercase tracking-wider mb-4 block"
                    >
                      {project.industry}
                    </motion.span>
                    <motion.h3 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="text-2xl md:text-4xl font-display font-bold uppercase tracking-tighter text-white group-hover:text-red-600 transition-colors"
                    >
                      {project.title}
                    </motion.h3>
                  </div>
                  
                  <div className="absolute top-10 right-10 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-black shadow-2xl">
                      <ArrowRight size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Brand Showcase Section */}
        <div className="mt-32 pt-20 border-t border-zinc-900">
          <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="text-red-600 text-xs font-black tracking-[0.5em] uppercase mb-4 block animate-pulse">
                Corporate Trust & Brand Legacy
              </span>
              <h3 className="text-3xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-none text-white">
                Trusted Partners <br />
                <span className="text-outline">& Industry Leaders</span>
              </h3>
              <p className="text-zinc-500 text-sm max-w-xl mt-4 font-light">
                We engineer custom strategic campaigns, interactive brand identity ecosystems, and high-impact digital solutions for elite global brands and prominent Indian institutions.
              </p>
            </div>

            {/* Premium Category Filter Tabs */}
            <div className="flex bg-zinc-950 border border-zinc-900 p-1.5 rounded-sm self-start md:self-end">
              <button
                onClick={() => setClientCategory('corporate')}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-sm ${
                  clientCategory === 'corporate'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/15'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Corporate Brands
              </button>
              <button
                onClick={() => setClientCategory('public')}
                className={`px-5 py-2.5 text-xs font-black uppercase tracking-wider transition-all duration-300 rounded-sm ${
                  clientCategory === 'public'
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/15'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                Govt & PSUs
              </button>
            </div>
          </div>

          {/* Active Highlight Card - Auto-Updating & Clickable */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-20">
            
            {/* Left: Interactive Brand List Selector */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-600 mb-2 block">
                Select Partner Portfolio
              </span>
              <div className="grid grid-cols-2 gap-2 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                {clients
                  .filter((c) => c.category === clientCategory)
                  .map((client) => {
                    const globalIdx = clients.findIndex((c) => c.id === client.id);
                    const isActive = globalIdx === activeClientIndex;
                    return (
                      <button
                        key={client.id}
                        onClick={() => setActiveClientIndex(globalIdx)}
                        className={`flex flex-col items-start p-4 border text-left transition-all duration-300 relative overflow-hidden group rounded-sm ${
                          isActive 
                            ? 'bg-zinc-900/50 border-red-600/50 shadow-[0_0_20px_rgba(220,38,38,0.05)]' 
                            : 'bg-zinc-950/20 border-zinc-900 hover:border-zinc-800'
                        }`}
                      >
                        {/* Active Indicator Line */}
                        {isActive && (
                          <motion.div 
                            layoutId="clientActiveLine"
                            className="absolute left-0 top-0 bottom-0 w-[3px] bg-red-600"
                          />
                        )}
                        
                        <div className="flex items-center gap-3 mb-2 w-full">
                          <div 
                            className="w-8 h-8 rounded-sm flex items-center justify-center transition-colors duration-300 shrink-0"
                            style={{ 
                              color: isActive ? client.color : '#71717a',
                              backgroundColor: isActive ? `${client.color}15` : 'transparent' 
                            }}
                          >
                            {client.icon}
                          </div>
                          <span 
                            className={`text-[10px] font-black uppercase tracking-wider transition-colors truncate ${
                              isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
                            }`}
                          >
                            {client.shortName}
                          </span>
                        </div>
                        
                        <span className="text-xs font-black uppercase tracking-tight text-zinc-400 line-clamp-1 w-full">
                          {client.name}
                        </span>
                        <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-wider mt-1 truncate w-full">
                          {client.industry}
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Right: Premium Active Spotlight Card (Autoplay & Manual) */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeClientIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden group rounded-sm"
                >
                  {/* Subtle Background Accent */}
                  <div 
                    className="absolute -right-20 -bottom-20 w-64 h-64 blur-[100px] opacity-10 rounded-full transition-colors duration-500"
                    style={{ backgroundColor: clients[activeClientIndex].color }}
                  />

                  <div>
                    <div className="flex items-center justify-between mb-8 gap-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-16 h-16 rounded-sm flex items-center justify-center p-3 shadow-inner shrink-0"
                          style={{ 
                            color: clients[activeClientIndex].color, 
                            backgroundColor: `${clients[activeClientIndex].color}10`,
                            border: `1px solid ${clients[activeClientIndex].color}25`
                          }}
                        >
                          {clients[activeClientIndex].icon}
                        </div>
                        <div>
                          <span className="text-red-500 text-xs font-black uppercase tracking-wider mb-1 block">
                            {clients[activeClientIndex].category === 'corporate' ? 'Corporate Legacy Partner' : 'Government & Public Sector Authority'}
                          </span>
                          <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white leading-tight">
                            {clients[activeClientIndex].name}
                          </h4>
                        </div>
                      </div>
                      <div className="hidden sm:block text-right">
                        <span className="text-xs font-black uppercase tracking-wider text-zinc-600 block">
                          Industry Sector
                        </span>
                        <span className="text-xs font-bold text-zinc-400">
                          {clients[activeClientIndex].industry}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6 my-8">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-zinc-600 mb-2 block">
                          Mission & Strategic Mandate
                        </span>
                        <p className="text-white text-lg md:text-2xl font-black tracking-tight leading-tight italic">
                          "{clients[activeClientIndex].tagline}"
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-zinc-600 mb-1 block">
                            Dominant Media Focus
                          </span>
                          <span className="text-xs font-black uppercase tracking-wider text-white">
                            {clients[activeClientIndex].campaignType}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs font-black uppercase tracking-wider text-zinc-600 mb-1 block">
                            Campaign Velocity
                          </span>
                          <span className="text-xs font-bold text-green-500 flex items-center gap-1.5 uppercase">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Live Media Operations
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center text-zinc-500">
                    <span className="text-xs font-black uppercase tracking-wider">
                      Step {activeClientIndex + 1} of {clients.length} • Auto-Rotating
                    </span>
                    <div className="flex gap-1.5">
                      {clients.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveClientIndex(i)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            i === activeClientIndex ? 'bg-red-600 w-6' : 'bg-zinc-800 w-1.5 hover:bg-zinc-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

          {/* Sequential Infinite Scrolling Logo Ticker System (Dual Track) */}
          <div className="space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600 text-center block mb-6">
              Continuous Live Partnership Ticker
            </span>

            {/* Row 1: Corporate Brands Ticker - Scrolls Left */}
            <div className="relative border-y border-zinc-900 bg-black/40 py-6 overflow-hidden w-full">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
              
              <motion.div 
                className="flex gap-16 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 35, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* Double mapping of Corporate Clients to guarantee perfect loop */}
                {[...clients.filter(c => c.category === 'corporate'), ...clients.filter(c => c.category === 'corporate')].map((client, i) => {
                  const globalIdx = clients.findIndex(c => c.id === client.id);
                  return (
                    <div 
                      key={`${client.id}-row1-${i}`} 
                      className="inline-flex items-center gap-4 group/ticker cursor-pointer"
                      onClick={() => {
                        setClientCategory('corporate');
                        setActiveClientIndex(globalIdx);
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-sm flex items-center justify-center p-2 bg-zinc-950 border border-zinc-900 transition-all duration-300 group-hover/ticker:border-red-600/30"
                        style={{ color: client.color }}
                      >
                        {client.icon}
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-hover/ticker:text-white transition-colors">
                        {client.name}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Row 2: Govt & PSU Brands Ticker - Scrolls Right */}
            <div className="relative border-y border-zinc-900 bg-black/40 py-6 overflow-hidden w-full">
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
              
              <motion.div 
                className="flex gap-16 whitespace-nowrap"
                animate={{ x: ["-50%", "0%"] }}
                transition={{ 
                  duration: 50, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
              >
                {/* Double mapping of Govt & PSU Clients to guarantee perfect loop */}
                {[...clients.filter(c => c.category === 'public'), ...clients.filter(c => c.category === 'public')].map((client, i) => {
                  const globalIdx = clients.findIndex(c => c.id === client.id);
                  return (
                    <div 
                      key={`${client.id}-row2-${i}`} 
                      className="inline-flex items-center gap-4 group/ticker cursor-pointer"
                      onClick={() => {
                        setClientCategory('public');
                        setActiveClientIndex(globalIdx);
                      }}
                    >
                      <div 
                        className="w-10 h-10 rounded-sm flex items-center justify-center p-2 bg-zinc-950 border border-zinc-900 transition-all duration-300 group-hover/ticker:border-red-600/30"
                        style={{ color: client.color }}
                      >
                        {client.icon}
                      </div>
                      <span className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 group-hover/ticker:text-white transition-colors">
                        {client.name}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                className="relative w-full max-w-6xl bg-zinc-900 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Modal Left: Image */}
                <div className="w-full md:w-1/2 relative">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                {/* Modal Right: Content */}
                <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto custom-scrollbar">
                  <span className="text-red-600 text-xs font-black tracking-[0.4em] uppercase mb-4 block">
                    Case Study: {selectedProject.industry}
                  </span>
                  <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none mb-6">
                    {selectedProject.title}
                  </h3>

                  {/* Share Section */}
                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    <button 
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-red-600 text-white text-[10px] font-black uppercase tracking-widest transition-all rounded-sm"
                    >
                      <Share2 size={14} />
                      Share Project
                    </button>

                    <AnimatePresence>
                      {showShareMenu && (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 p-1 rounded-sm"
                        >
                          {shareLinks.map((link) => (
                            <a
                              key={link.name}
                              href={link.url(`${window.location.origin}${window.location.pathname}#project-${selectedProject.id}`, selectedProject.title)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all rounded-sm"
                              title={`Share on ${link.name}`}
                            >
                              {link.icon}
                            </a>
                          ))}
                          <div className="w-[1px] h-6 bg-zinc-800 mx-1" />
                          <button
                            onClick={handleCopy}
                            className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all rounded-sm"
                            title="Copy Link"
                          >
                            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="space-y-8">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 border-l-2 border-red-600 pl-4">The Objective</h4>
                      <p className="text-zinc-300 text-sm leading-relaxed font-light">
                        {selectedProject.objectives}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 border-l-2 border-red-600 pl-4">The Impact</h4>
                      <p className="text-zinc-300 text-sm leading-relaxed font-light">
                        {selectedProject.results}
                      </p>
                    </div>

                    {selectedProject.testimonial && (
                      <div className="bg-zinc-800/50 p-6 border-t border-zinc-800">
                        <Quote className="text-red-600 mb-4 opacity-40" size={24} />
                        <p className="text-lg font-black italic text-white leading-tight mb-4">
                          "{selectedProject.testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-[1px] bg-zinc-600"></div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-white">
                              {selectedProject.testimonial.author}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">
                              {selectedProject.testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
