import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { motion } from 'motion/react';

interface Country {
  name: string;
  timezone: string;
  colors: string[];
  flag: string;
}

const countries: Country[] = [
  { name: 'India', timezone: 'Asia/Kolkata', colors: ['#FF9933', '#FFFFFF', '#138808'], flag: '🇮🇳' },
  { name: 'USA', timezone: 'America/New_York', colors: ['#B22234', '#FFFFFF', '#3C3B6E'], flag: '🇺🇸' },
  { name: 'UK', timezone: 'Europe/London', colors: ['#012169', '#C8102E', '#FFFFFF'], flag: '🇬🇧' },
  { name: 'Japan', timezone: 'Asia/Tokyo', colors: ['#FFFFFF', '#BC002D'], flag: '🇯🇵' },
  { name: 'France', timezone: 'Europe/Paris', colors: ['#002395', '#FFFFFF', '#ED2939'], flag: '🇫🇷' },
  { name: 'Germany', timezone: 'Europe/Berlin', colors: ['#000000', '#DD0000', '#FFCC00'], flag: '🇩🇪' },
  { name: 'Brazil', timezone: 'America/Sao_Paulo', colors: ['#009739', '#FEDD00', '#012169'], flag: '🇧🇷' },
  { name: 'Australia', timezone: 'Australia/Sydney', colors: ['#012169', '#C8102E', '#FFFFFF'], flag: '🇦🇺' },
  { name: 'Canada', timezone: 'America/Toronto', colors: ['#FF0000', '#FFFFFF'], flag: '🇨🇦' },
  { name: 'Italy', timezone: 'Europe/Rome', colors: ['#009246', '#FFFFFF', '#CE2B37'], flag: '🇮🇹' },
];

const WorldWatch: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getLocalTime = (date: Date, timezone: string) => {
    try {
      return new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    } catch (e) {
      return date;
    }
  };

  const localTime = getLocalTime(time, selectedCountry.timezone);
  const seconds = localTime.getSeconds();
  const minutes = localTime.getMinutes();
  const hours = localTime.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hourDegrees = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

  const getClockBackground = (colors: string[]) => {
    if (colors.length === 3) {
      return `linear-gradient(180deg, ${colors[0]}22 0%, ${colors[1]}22 50%, ${colors[2]}22 100%)`;
    }
    if (colors.length === 2) {
      return `linear-gradient(180deg, ${colors[0]}22 0%, ${colors[1]}22 100%)`;
    }
    return `${colors[0]}22`;
  };

  return (
    <section id="world-watch" className="py-32 bg-[#0A0A0A] text-white overflow-hidden border-t border-zinc-900 font-mono">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* Hardware Widget Clock */}
          <div className="flex-1 flex justify-center items-center relative">
            {/* Ambient Glow */}
            <div className="absolute -z-10 w-[140%] h-[140%] bg-red-600/5 blur-[150px] rounded-full" />
            
            {/* Outer Hardware Ring */}
            <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] rounded-full p-1 bg-[#151619] shadow-[0_40px_100px_rgba(0,0,0,0.8),inset_0_2px_10px_rgba(255,255,255,0.05)] border border-zinc-800">
              
              {/* Technical Markings Ring */}
              <div className="absolute inset-0 rounded-full border border-dashed border-zinc-700/30 m-8" />
              
              {/* Inner Display Area */}
              <div className="w-full h-full rounded-full bg-[#0D0E10] relative overflow-hidden flex items-center justify-center border border-zinc-800/50">
                
                {/* Dynamic Flag Gradient Overlay */}
                <div 
                  className="absolute inset-0 opacity-40 transition-all duration-1000"
                  style={{ background: getClockBackground(selectedCountry.colors) }}
                />

                {/* Technical Grid */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

                {/* Clock Face Markings */}
                {[...Array(60)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`absolute ${i % 5 === 0 ? 'w-[2px] h-4 bg-zinc-400' : 'w-[1px] h-2 bg-zinc-700'}`}
                    style={{
                      left: '50%',
                      top: '4%',
                      transformOrigin: '50% 1150%',
                      transform: `translateX(-50%) rotate(${i * 6}deg)`
                    }}
                  />
                ))}

                {/* Center Hardware Hub */}
                <div className="absolute w-12 h-12 rounded-full bg-[#1A1B1E] border border-zinc-700 shadow-2xl z-40 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_#ef4444]" />
                </div>

                {/* Hands - Technical Style */}
                {/* Hour Hand */}
                <motion.div 
                  className="absolute left-1/2 bottom-1/2 w-1.5 h-[28%] bg-white rounded-t-full origin-bottom z-20"
                  animate={{ rotate: hourDegrees }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  style={{ translateX: '-50%' }}
                />
                {/* Minute Hand */}
                <motion.div 
                  className="absolute left-1/2 bottom-1/2 w-1 h-[38%] bg-zinc-400 rounded-t-full origin-bottom z-20"
                  animate={{ rotate: minuteDegrees }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  style={{ translateX: '-50%' }}
                />
                {/* Second Hand - Needle Style */}
                <motion.div 
                  className="absolute left-1/2 bottom-1/2 w-[1px] h-[45%] bg-red-600 origin-bottom z-30"
                  animate={{ rotate: secondDegrees }}
                  transition={{ type: 'linear', duration: 0 }}
                  style={{ translateX: '-50%' }}
                >
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-600" />
                </motion.div>

                {/* Digital Readout Inside Clock */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1">Local Sync</p>
                  <p className="text-2xl font-black tracking-tighter text-white">
                    {localTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </p>
                </div>
              </div>

              {/* Outer Status Indicators */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 flex gap-2">
                <div className="w-1 h-1 rounded-full bg-red-600 animate-pulse" />
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
              </div>
            </div>
          </div>

          {/* Technical Selection Panel */}
          <div className="flex-1 space-y-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="px-2 py-1 bg-red-600/10 border border-red-600/20 text-red-600 text-[10px] font-bold uppercase tracking-widest">
                  System Active
                </div>
                <div className="h-[1px] flex-1 bg-zinc-800" />
              </div>
              
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                Global <br /> <span className="text-zinc-700">Chronograph</span>
              </h2>
              
              <div className="p-6 bg-[#151619] border border-zinc-800 rounded-lg relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-light">
                  <span className="text-white font-bold">// ARCHER_OS:</span> Real-time synchronization across our global creative hubs. Each node represents a strategic surgical point in our worldwide network.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {countries.map((country) => (
                <button
                  key={country.name}
                  onClick={() => setSelectedCountry(country)}
                  className={`group relative flex items-center gap-4 p-4 transition-all duration-300 border ${
                    selectedCountry.name === country.name 
                      ? 'bg-[#1A1B1E] border-zinc-700 shadow-xl' 
                      : 'bg-transparent border-transparent hover:bg-zinc-900/50'
                  }`}
                >
                  <div className={`w-1 h-8 transition-all duration-300 ${selectedCountry.name === country.name ? 'bg-red-600' : 'bg-zinc-800 group-hover:bg-zinc-700'}`} />
                  
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">{country.name}</span>
                      <span className="text-lg grayscale group-hover:grayscale-0 transition-all">{country.flag}</span>
                    </div>
                    <p className={`text-xl font-black tracking-tighter ${selectedCountry.name === country.name ? 'text-white' : 'text-zinc-600'}`}>
                      {new Date().toLocaleTimeString('en-US', { timeZone: country.timezone, hour: '2-digit', minute: '2-digit', hour12: false })}
                    </p>
                  </div>

                  {selectedCountry.name === country.name && (
                    <motion.div 
                      layoutId="active-indicator"
                      className="absolute right-4 w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#ef4444]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-zinc-900">
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">Latency</p>
                <p className="text-sm font-bold text-zinc-400">0.02ms</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">Status</p>
                <p className="text-sm font-bold text-green-500">Encrypted</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-widest text-zinc-600 mb-1">Nodes</p>
                <p className="text-sm font-bold text-zinc-400">10/10</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WorldWatch;
