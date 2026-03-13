
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Target, Users, TrendingUp, MapPin } from 'lucide-react';

const stadiumImages = [
  "https://images.unsplash.com/photo-1593766788306-28561086694e?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1540749303346-5b0fa216d26e?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1512715576344-3e29a94b9981?auto=format&fit=crop&q=80&w=1600"
];

const CricketMedia: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % stadiumImages.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Stadiums Covered', value: '25+', icon: <MapPin size={20} /> },
    { label: 'Total Impressions', value: '500M+', icon: <Users size={20} /> },
    { label: 'Brand Recall', value: '85%', icon: <Target size={20} /> },
    { label: 'Growth YoY', value: '120%', icon: <TrendingUp size={20} /> },
  ];

  return (
    <section id="cricket" className="bg-white text-black py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Left Column: Visual Impact */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[16/9] overflow-hidden shadow-2xl rounded-sm bg-zinc-900">
              <AnimatePresence initial={false}>
                <motion.img 
                  key={currentImageIndex}
                  src={stadiumImages[currentImageIndex]} 
                  alt="Indian Cricket Stadium Branding" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
              
              {/* Subtle Overlay for better text contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-8 left-8 text-white z-10">
                <div className="flex items-center gap-2 mb-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Trophy size={24} className="text-red-600" />
                  </motion.div>
                  <span className="text-xs font-black uppercase tracking-widest">Live Action Branding</span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter">Stadium Domination</h3>
              </div>

              {/* Progress Indicators */}
              <div className="absolute top-6 right-6 flex gap-2 z-10">
                {stadiumImages.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1 w-8 rounded-full transition-all duration-500 ${
                      i === currentImageIndex ? 'bg-red-600 w-12' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-zinc-50 p-6 border-l-4 border-red-600"
                >
                  <div className="text-red-600 mb-2">{stat.icon}</div>
                  <div className="text-2xl font-black uppercase tracking-tighter">{stat.value}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 text-xs font-black tracking-[0.5em] uppercase">Sports Media</span>
            </div>
            
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-12">
              On-Ground <br /> 
              <span className="text-zinc-200">Cricket</span> <br />
              <span className="text-red-600">OOH</span>
            </h2>
            
            <div className="space-y-8 text-lg md:text-xl leading-relaxed text-zinc-700 font-light">
              <p>
                Cricket isn't just a sport in India; it's a religion. At BrandArcher, we treat on-ground media planning with the same reverence and <span className="font-black text-black">surgical precision</span> as a championship final.
              </p>
              <p className="text-zinc-500">
                From perimeter boards and sight screens to digital scoreboard integrations and stadium facade takeovers—we ensure your brand is part of every boundary, every wicket, and every roar of the crowd.
              </p>
              
              <ul className="space-y-4 pt-8">
                {[
                  'Strategic Perimeter Branding',
                  'Digital Scoreboard Integration',
                  'High-Impact Stadium Facades',
                  'Player Interaction Zones',
                  '360° Media Planning & Buying'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-black">
                    <div className="w-2 h-2 bg-red-600 rotate-45"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CricketMedia;
