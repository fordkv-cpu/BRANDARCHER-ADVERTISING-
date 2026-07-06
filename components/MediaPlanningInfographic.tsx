import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Tv, Megaphone, Globe, Trophy, TrendingUp, Coins, 
  Users, Target, Layers, Sparkles, Check, Info,
  Radio, Film, Award, Layout, Zap, ArrowRight, MousePointerClick, Youtube
} from 'lucide-react';

// Define complete types for our 360 marketing strategy
interface ChannelDetail {
  name: string;
  reachWeight: number;
  recallWeight: number;
  description: string;
  metrics: string;
}

interface StrategicCategory {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  description: string;
  channels: ChannelDetail[];
  color: string;
  bgGlow: string;
}

const MediaPlanningInfographic: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const [budget, setBudget] = useState<number>(25); // In Lakhs / Millions INR
  const [campaignIntensity, setCampaignIntensity] = useState<number>(3); // 1 to 5 scale
  const [activeChannels, setActiveChannels] = useState<string[]>([
    'Television Broadcasting', 'Meta & Premium Social', 'Google Search Domination', 'Cricket Stadium OOH'
  ]);

  // Complete 360 degree media planning categories and channels
  const categories: StrategicCategory[] = [
    {
      title: "ATL (Above The Line)",
      subtitle: "Massive Public Dominance",
      icon: <Tv size={24} />,
      color: "#DC2626", // Red accent
      bgGlow: "rgba(220, 38, 38, 0.15)",
      description: "Highest-funnel marketing channel cluster designed for supreme brand awareness, trust building, and sweeping coverage across diverse population segments.",
      channels: [
        { 
          name: "Television Broadcasting", 
          reachWeight: 95, 
          recallWeight: 88, 
          description: "Prime-time slots on premium Indian & global entertainment and news channels.",
          metrics: "60M+ Expected Households"
        },
        { 
          name: "Premium Billboard OOH", 
          reachWeight: 82, 
          recallWeight: 75, 
          description: "Surgical sky-high hoarding placements in high-traffic commercial hubs and airports.",
          metrics: "12M+ Monthly Eyeballs"
        },
        { 
          name: "National Print Media", 
          reachWeight: 65, 
          recallWeight: 78, 
          description: "Full-page visual spreads inside top-tier premium business publications.",
          metrics: "4.5M+ Daily Readership"
        },
        { 
          name: "Multiplex Cinema Ads", 
          reachWeight: 55, 
          recallWeight: 85, 
          description: "Unskippable high-impact pre-show and interval Dolby digital projection.",
          metrics: "2.2M+ Immersive Views"
        }
      ]
    },
    {
      title: "BTL (Below The Line)",
      subtitle: "Targeted Experiential Action",
      icon: <Layers size={24} />,
      color: "#F97316", // Orange accent
      bgGlow: "rgba(249, 115, 22, 0.15)",
      description: "Highly focused, tactile, and targeted interactions centered on converting high-intent leads through physical spatial design, boutique events, and modular visual setups.",
      channels: [
        { 
          name: "Exhibition Spatial Stalls", 
          reachWeight: 45, 
          recallWeight: 92, 
          description: "Bespoke structural booths (like Hello Basmati Rice setups) with high-density walk-ins.",
          metrics: "25k+ High-Intent B2B Leads"
        },
        { 
          name: "Premium Dealer Summits", 
          reachWeight: 30, 
          recallWeight: 95, 
          description: "Elite corporate meets and brand alignment summits with customized presentations.",
          metrics: "94% Dealer Retention Rate"
        },
        { 
          name: "In-Store Experience Zones", 
          reachWeight: 58, 
          recallWeight: 82, 
          description: "Modular high-gloss physical interactive kiosks and digital touch displays.",
          metrics: "3.2x Average Purchase Intent"
        },
        { 
          name: "Bespoke Brand Activations", 
          reachWeight: 50, 
          recallWeight: 89, 
          description: "Surgical pop-up luxury experience centers in premium lifestyle centers.",
          metrics: "40% Direct On-Spot Conversions"
        }
      ]
    },
    {
      title: "TTL (Through The Line)",
      subtitle: "Omni-Channel Digital Funnel",
      icon: <Globe size={24} />,
      color: "#2563EB", // Blue accent
      bgGlow: "rgba(37, 99, 235, 0.15)",
      description: "Seamless blend of high reach and precise targeting via digital ecosystems, smart search capture, custom media funnels, and real-time social loops.",
      channels: [
        { 
          name: "Google Search Domination", 
          reachWeight: 88, 
          recallWeight: 80, 
          description: "Laser-focused commercial intent capture backed by authoritative search rank optimization.",
          metrics: "Top 0.1% Organic Visibility"
        },
        { 
          name: "Meta & Premium Social", 
          reachWeight: 90, 
          recallWeight: 74, 
          description: "Hyper-segmented conversion campaigns, dynamic motion banners, and custom interactive ads.",
          metrics: "4.8x Direct ROAS Potential"
        },
        { 
          name: "Dynamic Promo Video", 
          reachWeight: 75, 
          recallWeight: 86, 
          description: "Gemini-inspired high-fidelity film assets and cinematic storytelling reels.",
          metrics: "72% Higher Scroll Retention"
        },
        { 
          name: "Programmatic Display Ads", 
          reachWeight: 85, 
          recallWeight: 60, 
          description: "AI-targeted real-time bidding ads mapped across millions of authority portals.",
          metrics: "35M+ Automated Impressions"
        }
      ]
    },
    {
      title: "Sports OOH & Live",
      subtitle: "High-Octane Tournament Impact",
      icon: <Trophy size={24} />,
      color: "#10B981", // Emerald accent
      bgGlow: "rgba(16, 185, 129, 0.15)",
      description: "Strategic partnerships, stadium perimeter takeovers, and tournament-wide media buys placing your brand in the heart of high-adrenaline cultural sporting events.",
      channels: [
        { 
          name: "Cricket Stadium OOH", 
          reachWeight: 92, 
          recallWeight: 94, 
          description: "High-impact boundary line digital LED boards, sight screens, and stadium facade takeovers.",
          metrics: "120M+ Live TV Impressions"
        },
        { 
          name: "On-Ground Fan Zones", 
          reachWeight: 48, 
          recallWeight: 90, 
          description: "Tactile experiential activity zones outside the stadium gates during tournament matches.",
          metrics: "85k+ Direct Fan Interactions"
        },
        { 
          name: "Sports Digital Integration", 
          reachWeight: 80, 
          recallWeight: 82, 
          description: "Co-branded scoreboard overlays, live stream widgets, and high-frequency digital callouts.",
          metrics: "45M+ Streaming Viewers"
        },
        { 
          name: "Player Endorsed Collateral", 
          reachWeight: 68, 
          recallWeight: 91, 
          description: "High-recall creative assets utilizing top athlete authority for extreme consumer alignment.",
          metrics: "2.4x Brand Trust Index Peak"
        }
      ]
    }
  ];

  // Helper function to toggle active channels in the planning simulator
  const handleToggleChannel = (channelName: string) => {
    setActiveChannels(prev => 
      prev.includes(channelName)
        ? prev.filter(c => c !== channelName)
        : [...prev, channelName]
    );
  };

  // Dynamic Media Math Calculator
  const [calculations, setCalculations] = useState({
    synergyIndex: 0,
    totalProjectedReach: '0',
    globalScore: 0,
    estimatedConversions: 0
  });

  useEffect(() => {
    // Determine number of categories touched
    const touchedCategories = categories.filter(cat => 
      cat.channels.some(ch => activeChannels.includes(ch.name))
    ).length;

    const baseSynergy = touchedCategories * 25; // Up to 100%
    const intensityMultiplier = 0.8 + (campaignIntensity * 0.1); // 0.9 to 1.3
    const budgetPower = Math.log10(budget + 1) * 1.5; // Scale budget logarithmic

    // Calculated fields
    const totalActiveCount = activeChannels.length;
    const computedSynergy = Math.min(100, Math.round(baseSynergy * (totalActiveCount > 0 ? (1 + (totalActiveCount * 0.04)) : 0)));
    
    const reachNumber = Math.round(totalActiveCount * 1.8 * intensityMultiplier * budgetPower * 1.4);
    const reachText = reachNumber > 99 ? `${(reachNumber / 10).toFixed(1)}M+` : `${reachNumber}M+`;

    const conversionCount = Math.round(totalActiveCount * 1200 * (budget * 0.4) * intensityMultiplier);

    setCalculations({
      synergyIndex: computedSynergy,
      totalProjectedReach: totalActiveCount > 0 ? reachText : '0',
      globalScore: Math.round(Math.min(100, (computedSynergy * 0.6) + (budget * 0.8) + (campaignIntensity * 4))),
      estimatedConversions: totalActiveCount > 0 ? conversionCount : 0
    });
  }, [activeChannels, budget, campaignIntensity]);

  return (
    <section 
      id="planning"
      className="bg-black py-24 border-t border-zinc-900 overflow-hidden relative"
    >
      {/* Decorative Atmosphere lines */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-zinc-900/40 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-zinc-900/40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center mb-16">
          <span className="text-red-600 text-xs font-black tracking-[0.5em] uppercase mb-4 block animate-pulse">
            Interactive Strategy Board
          </span>
          <h2 className="text-4xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-none text-white">
            360° Media <br />
            <span className="text-outline">Campaign Console</span>
          </h2>
          <p className="text-zinc-500 text-sm max-w-xl mx-auto mt-4 font-light">
            Simulate complete Above-The-Line (ATL), Below-The-Line (BTL), and Digital (TTL) funnels. Map your budget to targeted sports OOH and optimize your omni-channel synergy score.
          </p>
        </div>

        {/* Console Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Interactive Strategy Controller & Simulator (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* 360 Quadrant Hub */}
            <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 rounded-sm">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                  Step 1: Explore Quadrant Architecture
                </span>
                <span className="text-[10px] font-bold text-red-600 uppercase flex items-center gap-1.5 bg-red-600/5 px-2.5 py-1">
                  <MousePointerClick size={12} /> Interactive
                </span>
              </div>

              {/* Selector Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
                {categories.map((category, index) => {
                  const isSelected = selectedCategory === index;
                  return (
                    <button
                      key={category.title}
                      onClick={() => setSelectedCategory(index)}
                      className={`flex flex-col items-center justify-center p-4 border text-center transition-all duration-300 rounded-sm relative ${
                        isSelected 
                          ? 'bg-zinc-900 border-zinc-700 shadow-md' 
                          : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800'
                      }`}
                    >
                      <div 
                        className="mb-2 transition-transform duration-300"
                        style={{ color: isSelected ? category.color : '#71717a' }}
                      >
                        {category.icon}
                      </div>
                      <span className={`text-[11px] font-black uppercase tracking-wide block ${isSelected ? 'text-white' : 'text-zinc-500'}`}>
                        {category.title.split(' ')[0]}
                      </span>
                      <span className="text-[8px] text-zinc-600 font-bold uppercase tracking-widest mt-0.5">
                        {category.title.includes('(') ? category.title.split('(')[1].replace(')', '') : 'Live'}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Selected Category Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedCategory}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border-l-4 pl-4" style={{ borderColor: categories[selectedCategory].color }}>
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-widest block mb-1">
                      {categories[selectedCategory].subtitle}
                    </span>
                    <h3 className="text-2xl font-black uppercase text-white tracking-tight">
                      {categories[selectedCategory].title}
                    </h3>
                    <p className="text-zinc-400 text-xs mt-2 leading-relaxed font-light">
                      {categories[selectedCategory].description}
                    </p>
                  </div>

                  {/* Channel Toggles */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block">
                      Toggle Channels to Include in Media Mix:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {categories[selectedCategory].channels.map((channel) => {
                        const isIncluded = activeChannels.includes(channel.name);
                        return (
                          <div
                            key={channel.name}
                            onClick={() => handleToggleChannel(channel.name)}
                            className={`p-4 border cursor-pointer flex justify-between items-start transition-all duration-300 rounded-sm group ${
                              isIncluded 
                                ? 'bg-zinc-900/40 border-zinc-800' 
                                : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 opacity-60 hover:opacity-90'
                            }`}
                          >
                            <div className="space-y-1 pr-4">
                              <div className="flex items-center gap-2">
                                <span className={`text-[11px] font-black uppercase tracking-wider transition-colors duration-300 ${isIncluded ? 'text-white' : 'text-zinc-500'}`}>
                                  {channel.name}
                                </span>
                              </div>
                              <p className="text-[10px] text-zinc-500 leading-tight">
                                {channel.description}
                              </p>
                              <div className="flex items-center gap-1.5 pt-1 text-[9px] font-bold text-red-500 uppercase tracking-widest">
                                <TrendingUp size={10} /> {channel.metrics}
                              </div>
                            </div>
                            <div 
                              className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-all duration-300 ${
                                isIncluded 
                                  ? 'bg-red-600 border-red-500 text-white' 
                                  : 'border-zinc-800 text-transparent group-hover:border-zinc-600'
                              }`}
                            >
                              <Check size={12} strokeWidth={3} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

            </div>

            {/* Campaign Sliders & Intensity */}
            <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Budget Simulator */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Step 2: Campaign Budget Buy
                  </span>
                  <span className="text-xs font-black text-white bg-zinc-900 px-3 py-1 border border-zinc-800 rounded-sm">
                    {budget}M INR / Lakhs
                  </span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-red-600"
                />
                <div className="flex justify-between text-[9px] text-zinc-600 font-bold uppercase tracking-wider">
                  <span>Starter Presence</span>
                  <span>National Domination</span>
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-light">
                  Simulates financial distribution across programmatic algorithms, premium slot bidding, and physical spatial fabrication.
                </p>
              </div>

              {/* Intensity Slider */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Step 3: Campaign Frequency & Intensity
                  </span>
                  <span className="text-xs font-black text-red-600">
                    Level {campaignIntensity}x
                  </span>
                </div>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      onClick={() => setCampaignIntensity(level)}
                      className={`flex-1 py-3 text-xs font-black border transition-all rounded-sm ${
                        campaignIntensity === level
                          ? 'bg-red-600 border-red-500 text-white'
                          : 'bg-zinc-950 border-zinc-900 hover:border-zinc-800 text-zinc-500'
                      }`}
                    >
                      {level === 1 ? 'Low' : level === 3 ? 'Optimum' : level === 5 ? 'Anarchy' : `${level}x`}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-zinc-500 leading-relaxed font-light">
                  Frequency capping multiplier. High-intensity levels push assets to maximum distribution rates across live media channels.
                </p>
              </div>

            </div>

          </div>

          {/* Column 2: 360 Synergy Output Panel (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Live Synergy Console Dashboard */}
            <div className="bg-zinc-950 border border-zinc-900 p-6 md:p-8 rounded-sm h-full flex flex-col justify-between relative overflow-hidden">
              {/* Corner accent glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-full blur-2xl pointer-events-none" />

              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-6">
                  Campaign Diagnostic & Intelligence
                </span>

                {/* Main Synergy Index Ring Representation */}
                <div className="flex flex-col items-center justify-center py-6 relative">
                  
                  {/* Circular visual container */}
                  <div className="w-44 h-44 rounded-full border-4 border-zinc-900 flex flex-col items-center justify-center relative bg-black/50 shadow-inner">
                    {/* Ring glow */}
                    <div 
                      className="absolute inset-0 rounded-full border-4 border-red-600/30 transition-all duration-700 animate-pulse"
                      style={{ transform: `scale(${1 + calculations.synergyIndex * 0.001})` }}
                    />
                    
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                      Synergy Score
                    </span>
                    <span className="text-5xl font-black text-white font-display mt-1">
                      {calculations.synergyIndex}%
                    </span>
                    <span className="text-[9px] text-green-500 uppercase font-black tracking-widest mt-1 flex items-center gap-1">
                      <Zap size={10} /> {calculations.synergyIndex >= 80 ? 'EXCELLENT' : calculations.synergyIndex >= 50 ? 'BALANCED' : 'IMBALANCED'}
                    </span>
                  </div>

                  <p className="text-[11px] text-zinc-500 text-center mt-6 max-w-xs leading-relaxed font-light">
                    The synergy score measures campaign cohesion across Above-The-Line (ATL), Below-The-Line (BTL), and Digital channels.
                  </p>
                </div>

                {/* Interactive Stats Grid */}
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-900">
                  
                  {/* Projected Reach */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 block">
                      Projected reach
                    </span>
                    <div className="text-2xl font-black text-white flex items-baseline gap-1">
                      {calculations.totalProjectedReach}
                      <span className="text-[10px] text-zinc-500 uppercase">Users</span>
                    </div>
                  </div>

                  {/* Estimated Conversions */}
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 block">
                      Est. Conversions
                    </span>
                    <div className="text-2xl font-black text-red-600 flex items-baseline gap-1">
                      {calculations.estimatedConversions.toLocaleString()}
                      <span className="text-[10px] text-zinc-500 uppercase">Actions</span>
                    </div>
                  </div>

                  {/* Domestic Indian Influence */}
                  <div className="space-y-1 pt-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 block">
                      Indian Market Power
                    </span>
                    <div className="text-base font-black text-white">
                      {activeChannels.some(ch => ch.includes('Cricket')) ? 'EXTREME (CRICKET)' : 'MODERATE'}
                    </div>
                  </div>

                  {/* Domination Level */}
                  <div className="space-y-1 pt-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 block">
                      Overall Score
                    </span>
                    <div className="text-base font-black text-white flex items-center gap-1.5">
                      {calculations.globalScore} / 100
                    </div>
                  </div>

                </div>
              </div>

              {/* Current Media Mix List */}
              <div className="mt-8 pt-6 border-t border-zinc-900 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
                    Active Campaign Nodes ({activeChannels.length})
                  </span>
                  {activeChannels.length > 0 && (
                    <button 
                      onClick={() => setActiveChannels([])}
                      className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:underline"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5 max-h-[140px] overflow-y-auto custom-scrollbar pr-2">
                  {activeChannels.length === 0 ? (
                    <span className="text-[10px] text-zinc-600 italic">No channels selected. Please select channels inside the quadrant selectors above.</span>
                  ) : (
                    activeChannels.map((channel) => (
                      <span 
                        key={channel}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-zinc-900 text-white border border-zinc-800 text-[10px] font-black uppercase tracking-wider rounded-sm group hover:border-red-600/30 transition-colors"
                      >
                        {channel}
                        <button 
                          onClick={() => handleToggleChannel(channel)}
                          className="text-zinc-600 hover:text-red-500 transition-colors"
                        >
                          ×
                        </button>
                      </span>
                    ))
                  )}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* BrandArcher Live Social Media Planning & Video Production Hub */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 bg-gradient-to-r from-zinc-950 via-red-950/10 to-zinc-950 border border-zinc-900 hover:border-red-600/30 transition-all duration-500 p-8 rounded-sm relative overflow-hidden group"
        >
          {/* Accent light/glow */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none" />
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-red-600/10 rounded-full border border-red-500/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <Youtube size={28} />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500 block mb-1">
                  Active Video Planning & Creative Showcase
                </span>
                <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-white">
                  BrandArcher YouTube Strategy Channel
                </h4>
                <p className="text-zinc-500 text-xs mt-1 max-w-xl font-light leading-relaxed">
                  Deep-dive into our premium video advertisements, 360-degree brand campaign launches, and live creative media showreels. See how we drive high-impact visual recall.
                </p>
              </div>
            </div>
            
            <a 
              href="https://youtube.com/@brandarcher?si=TNUFYCWyaJhXuq70" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full md:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest transition-colors duration-300 rounded-sm flex items-center justify-center gap-2.5 shadow-lg shadow-red-600/20 whitespace-nowrap"
            >
              Explore YouTube Strategy <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default MediaPlanningInfographic;
