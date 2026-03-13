
import React, { useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import { TrendingUp, Users, Globe, Award, Search, ExternalLink } from 'lucide-react';

const Counter = ({ value, suffix = "" }: { value: number, suffix?: string }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
    });
    return () => controls.stop();
  }, [value]);

  return <span>{displayValue.toLocaleString()}{suffix}</span>;
};

const BrandMetrics: React.FC = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/iFhwBvofDKaBWnjr9";

  return (
    <section id="metrics" className="bg-black py-24 border-b border-zinc-900 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-red-600 text-xs font-black tracking-widest uppercase mb-4 block">Performance Ledger</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                Digital <br /> <span className="text-outline">Footprint</span>
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
                We track our global authority in real-time. From organic search dominance in India to worldwide engagement peaks, our metrics define our disruptive reach.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-900 border border-zinc-900">
            {/* Global Visitors Card */}
            <motion.div 
              whileHover={{ scale: 1.03, backgroundColor: "rgba(18, 18, 21, 1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-zinc-950 p-10 flex flex-col justify-between group cursor-default"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-red-600/10 text-red-600 rounded-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <Users size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Growth</span>
                  <span className="text-xs font-bold text-green-500">+24.8%</span>
                </div>
              </div>
              <div>
                <h4 className="text-5xl font-black tracking-tighter text-white mb-2 group-hover:text-red-600 transition-colors duration-300">
                  <Counter value={842903} />
                </h4>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Total Global Visitors</p>
              </div>
            </motion.div>

            {/* Brand Authority */}
            <motion.div 
              whileHover={{ scale: 1.03, backgroundColor: "rgba(18, 18, 21, 1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-zinc-950 p-10 flex flex-col justify-between group cursor-default"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-red-600/10 text-red-600 rounded-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <Award size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">DA Score</span>
                  <span className="text-xs font-bold text-white">82 / 100</span>
                </div>
              </div>
              <div>
                <h4 className="text-5xl font-black tracking-tighter text-white mb-2 group-hover:text-red-600 transition-colors duration-300">
                  98.2<span className="text-2xl text-red-600">%</span>
                </h4>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Search Visibility Index</p>
              </div>
            </motion.div>

            {/* India Market Dominance */}
            <motion.div 
              whileHover={{ scale: 1.03, backgroundColor: "rgba(18, 18, 21, 1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-zinc-950 p-10 flex flex-col justify-between group cursor-default"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-red-600/10 text-red-600 rounded-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <Globe size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Region</span>
                  <span className="text-xs font-bold text-white">India-Centric</span>
                </div>
              </div>
              <div>
                <h4 className="text-5xl font-black tracking-tighter text-white mb-2 group-hover:text-red-600 transition-colors duration-300">
                  <Counter value={512} suffix="k" />
                </h4>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Domestic Indian Reach</p>
              </div>
            </motion.div>

            {/* Traffic Efficiency */}
            <motion.div 
              whileHover={{ scale: 1.03, backgroundColor: "rgba(18, 18, 21, 1)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-zinc-950 p-10 flex flex-col justify-between group cursor-default"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-red-600/10 text-red-600 rounded-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                  <TrendingUp size={24} />
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Conversion</span>
                  <span className="text-xs font-bold text-green-500">12.4%</span>
                </div>
              </div>
              <div>
                <h4 className="text-5xl font-black tracking-tighter text-white mb-2 group-hover:text-red-600 transition-colors duration-300">
                  <Counter value={92} suffix="%" />
                </h4>
                <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">Organic Traffic Retention</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* New Global Google Ranking Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-zinc-950 border border-zinc-900 p-8 md:p-12 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-red-600/5 to-transparent pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-red-600 text-white rounded-sm shadow-[0_0_30px_rgba(220,38,38,0.2)]">
                <Search size={32} />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-red-600 mb-1">Global Google Ranking</h3>
                <p className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-white">Top 0.1% Worldwide</p>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light mb-6">
                Dominating search engine results pages through strategic content architecture and technical SEO precision. Our digital ecosystem is engineered to maintain peak visibility across six continents, ensuring <span className="text-white font-bold italic">BrandArcher</span> remains at the forefront of the global advertising landscape.
              </p>
              <a 
                href={googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-white hover:text-red-600 transition-colors group"
              >
                Verify on Google Business <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          {/* Subtle Decorative Line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
        </motion.div>
      </div>

      {/* Real-time Ticker for Traffic sources */}
      <div className="mt-20 border-t border-zinc-900 pt-8 overflow-hidden whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex gap-16 items-center"
        >
          {[...Array(20)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-800">New visitor from <span className="text-zinc-400">{['Mumbai', 'London', 'Dubai', 'New Delhi', 'New York', 'Sydney'][i % 6]}</span></span>
              <div className="w-1 h-1 bg-red-600 rounded-full" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BrandMetrics;
