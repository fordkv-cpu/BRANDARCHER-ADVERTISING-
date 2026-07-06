
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

  const clients = [
    {
      id: 'masonite',
      name: 'MASONITE FURNITURE',
      industry: 'Premium Woodwork & Design',
      color: '#D4AF37',
      tagline: 'Crafting timeless luxury spaces with engineered wood elegance.',
      campaignType: '360° Identity Rebrand & Premium Print',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
          <path d="M20 20h10v60H20zM70 20h10v60H70zM30 30l20 20 20-20v12L50 62 30 42z" />
        </svg>
      )
    },
    {
      id: 'basmati',
      name: 'HELLO BASMATI RICE',
      industry: 'Premium FMCG Agriculture',
      color: '#10B981',
      tagline: 'Bringing pure organic heritage rice grains to millions worldwide.',
      campaignType: 'Live Stadium Domination & High-Impact OOH',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
          <path d="M50 15c-15 25-5 50 0 70 5-20 15-45 0-70zm-6 40c-3-5-3-10 0-15 3 5 3 10 0 15zm12 10c-2-5-2-10 0-15 2 5 2 10 0 15z" />
        </svg>
      )
    },
    {
      id: 'calcutta',
      name: 'CALCUTTA EMPORIUM',
      industry: 'Luxury Handloom & Artifacts',
      color: '#E11D48',
      tagline: 'Reviving rich Indian cultural heritage & premium handicraft retail.',
      campaignType: 'Immersive Experiential Launch & PR Strategy',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
          <path d="M50 15L20 40h60zM25 45h10v35H25zm15 0h10v35H40zm15 0h10v35H55zm15 0h10v35H70zM15 85h70v5H15z" />
        </svg>
      )
    },
    {
      id: 'dr_bishvash',
      name: 'DR BISHVASH INTERNATIONAL',
      industry: 'Global Pharma & Healthcare',
      color: '#0D9488',
      tagline: 'Pioneering wellness and advanced pharmaceutical formulations globally.',
      campaignType: 'Omni-Channel Lead Gen & Brand Awareness',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
          <path d="M50 15L15 35v30l35 20 35-20V35L50 15zm20 38H56v14H44V53H30V41h14V27h12v14h14v12z" />
        </svg>
      )
    },
    {
      id: 'perfekte',
      name: 'PERFEKTE KÜCHEN',
      industry: 'Precision Smart Kitchens',
      color: '#F97316',
      tagline: 'German craftsmanship meets custom modular architectural engineering.',
      campaignType: 'Premium Digital Campaign & Showroom Footfall',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
          <path d="M15 15h30v30H15zm40 0h30v30H55zM15 55h30v30H15zm40 0h30v15H55zm0 20h30v10H55z" />
        </svg>
      )
    },
    {
      id: 'iis',
      name: 'IIS INFOTECH',
      industry: 'Enterprise IT & Software Solutions',
      color: '#6366F1',
      tagline: 'Architecting dynamic digital transformations for high-growth firms.',
      campaignType: 'B2B Digital Domination & Tech Positioning',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
          <path d="M15 25h15v50H15zm25 0h15v50H40zm25 0h15v50H65zm-45 10h50v5H20zm0 30h50v5H20z" />
        </svg>
      )
    },
    {
      id: 'itl',
      name: 'ITL EDUCATION',
      industry: 'Global Academic & Technology Training',
      color: '#9F1239',
      tagline: 'Empowering future technology leaders through premier educational systems.',
      campaignType: 'Integrated Student Acquisition & Digital Funnel',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
          <path d="M50 15L10 38l40 23 30-17v26h10V44L50 15zm-25 38v15c0 10 11 17 25 17s25-7 25-17V53L50 67 25 53z" />
        </svg>
      )
    },
    {
      id: 'jp_cement',
      name: 'JP CEMENT',
      industry: 'Industrial Cement & Concrete Infrastructure',
      color: '#4B5563',
      tagline: 'Supplying the unbreakable foundation for landmark civil engineering.',
      campaignType: 'High-Impact Outdoor & Heavy-Industry B2B Strategy',
      icon: (
        <svg viewBox="0 0 100 100" className="w-12 h-12" fill="currentColor">
          <path d="M15 15h70v20H15zm0 25h32v45H15zm38 0h32v45H53zm5 10h22v5H58zm0 15h22v5H58zm-38 0h22v5H20z" />
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
          <div className="mb-12">
            <span className="text-red-600 text-xs font-black tracking-[0.5em] uppercase mb-4 block animate-pulse">
              Corporate Trust & Brand Legacy
            </span>
            <h3 className="text-3xl md:text-6xl font-display font-bold uppercase tracking-tighter leading-none text-white">
              Trusted Partners <br />
              <span className="text-outline">& Industry Leaders</span>
            </h3>
            <p className="text-zinc-500 text-sm max-w-xl mt-4 font-light">
              We engineer custom strategic campaigns, interactive brand identity ecosystems, and high-impact digital solutions for elite companies.
            </p>
          </div>

          {/* Active Highlight Card - Auto-Updating & Clickable */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
            
            {/* Left: Interactive Brand List Selector */}
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-zinc-600 mb-2 block">
                Select Client Ecosystem
              </span>
              <div className="grid grid-cols-2 gap-2">
                {clients.map((client, idx) => {
                  const isActive = idx === activeClientIndex;
                  return (
                    <button
                      key={client.id}
                      onClick={() => setActiveClientIndex(idx)}
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
                      
                      <div className="flex items-center gap-3 mb-2">
                        <div 
                          className="w-8 h-8 rounded-sm flex items-center justify-center transition-colors duration-300"
                          style={{ 
                            color: isActive ? client.color : '#71717a',
                            backgroundColor: isActive ? `${client.color}15` : 'transparent' 
                          }}
                        >
                          {client.icon}
                        </div>
                        <span 
                          className={`text-xs font-black uppercase tracking-wider transition-colors ${
                            isActive ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
                          }`}
                        >
                          {client.id === 'dr_bishvash' ? 'DR BISHVASH' : client.id === 'jp_cement' ? 'JP CEMENT' : client.id.toUpperCase()}
                        </span>
                      </div>
                      
                      <span className="text-xs font-black uppercase tracking-tight text-zinc-400 line-clamp-1">
                        {client.name.replace(' FURNITURE', '').replace(' RICE', '').replace(' EMPORIUM', '').replace(' INTERNATIONAL', '').replace(' KÜCHEN', '').replace(' INFOTECH', '').replace(' EDUCATION', '').replace(' CEMENT', '')}
                      </span>
                      <span className="text-xs text-zinc-600 uppercase font-bold tracking-wider mt-1">
                        {client.industry.split(' & ')[0]}
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
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-16 h-16 rounded-sm flex items-center justify-center p-3 shadow-inner"
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
                            Featured Legacy Partner
                          </span>
                          <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                            {clients[activeClientIndex].name}
                          </h4>
                        </div>
                      </div>
                      <div className="hidden sm:block text-right">
                        <span className="text-xs font-black uppercase tracking-wider text-zinc-600 block">
                          Industry Cluster
                        </span>
                        <span className="text-xs font-bold text-zinc-400">
                          {clients[activeClientIndex].industry}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-6 my-8">
                      <div>
                        <span className="text-xs font-black uppercase tracking-wider text-zinc-600 mb-2 block">
                          Brand Creed & Position
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
                            Ecosystem Velocity
                          </span>
                          <span className="text-xs font-bold text-green-500 flex items-center gap-1.5 uppercase">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            Active Campaign
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-between items-center text-zinc-500">
                    <span className="text-xs font-black uppercase tracking-wider">
                      Step {activeClientIndex + 1} of {clients.length} • Updating Automatically
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

          {/* Continuous Infinite Scrolling Logo Ticker */}
          <div className="relative border-y border-zinc-900 bg-black/40 py-10 overflow-hidden w-full">
            {/* Left/Right Gradients for soft blending edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex gap-20 whitespace-nowrap min-w-full"
              animate={{ x: [0, -1800] }}
              transition={{ 
                duration: 45, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {/* Duplicate list to guarantee smooth infinite scroll loop without breaks */}
              {[...clients, ...clients, ...clients].map((client, i) => (
                <div 
                  key={`${client.id}-${i}`} 
                  className="inline-flex items-center gap-4 group/ticker cursor-pointer"
                  onClick={() => setActiveClientIndex(i % clients.length)}
                >
                  <div 
                    className="w-10 h-10 rounded-sm flex items-center justify-center p-2 bg-zinc-950 border border-zinc-900 transition-all duration-300 group-hover/ticker:border-red-600/30"
                    style={{ color: client.color }}
                  >
                    {client.icon}
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-zinc-500 group-hover/ticker:text-white transition-colors">
                    {client.name}
                  </span>
                </div>
              ))}
            </motion.div>
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
