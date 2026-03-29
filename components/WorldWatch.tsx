import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Activity, Shield, Zap, ChevronRight, ChevronLeft, Wifi, Terminal, Sun, Moon, Sunrise, Sunset } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Night';

const getTimeOfDay = (hours: number): TimeOfDay => {
  if (hours >= 6 && hours < 12) return 'Morning';
  if (hours >= 12 && hours < 17) return 'Afternoon';
  if (hours >= 17 && hours < 20) return 'Evening';
  return 'Night';
};

const timeOfDayConfig: Record<TimeOfDay, { color: string, glow: string, label: string, icon: React.ReactNode }> = {
  Morning: { color: '#00f3ff', glow: 'shadow-[0_0_20px_rgba(0,243,255,0.5)]', label: 'MORNING / DAY', icon: <Sunrise size={16} /> },
  Afternoon: { color: '#ffea00', glow: 'shadow-[0_0_20px_rgba(255,234,0,0.5)]', label: 'AFTERNOON', icon: <Sun size={16} /> },
  Evening: { color: '#ff00ff', glow: 'shadow-[0_0_20px_rgba(255,0,255,0.5)]', label: 'EVENING', icon: <Sunset size={16} /> },
  Night: { color: '#ff003c', glow: 'shadow-[0_0_20px_rgba(255,0,60,0.5)]', label: 'NIGHT', icon: <Moon size={16} /> }
};

const WorldWatch: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [time, setTime] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

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
  const hours = localTime.getHours();
  const timeOfDay = getTimeOfDay(hours);
  const config = timeOfDayConfig[timeOfDay];

  return (
    <section id="world-watch" className="py-12 bg-black text-white overflow-hidden border-t border-zinc-900 font-mono relative">
      {/* Cyberpunk Grid Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* HUD Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-600 animate-pulse" />
              <span className="text-red-600 text-[8px] font-black uppercase tracking-[0.4em]">System_Archer_v4.0</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none italic">
              Global <span className="text-zinc-800">HUD</span>
            </h2>
          </div>
          
          <div className="flex gap-2">
            <div className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-sm flex items-center gap-2">
              <Activity size={12} className="text-cyan-400" />
              <div className="flex flex-col">
                <span className="text-[7px] text-zinc-500 uppercase">Latency</span>
                <span className="text-[10px] font-bold text-cyan-400">0.003ms</span>
              </div>
            </div>
            <div className="px-3 py-1 bg-zinc-900/50 border border-zinc-800 rounded-sm flex items-center gap-2">
              <Shield size={12} className="text-green-500" />
              <div className="flex flex-col">
                <span className="text-[7px] text-zinc-500 uppercase">Security</span>
                <span className="text-[10px] font-bold text-green-500">Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main HUD Display */}
          <div className="lg:col-span-8 relative">
            <div className="relative bg-zinc-950/80 border-2 border-zinc-800 p-6 md:p-8 rounded-lg overflow-hidden group">
              {/* Corner Brackets */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-600" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-600" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-600" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-600" />

              {/* Scanning Line Animation */}
              <motion.div 
                className="absolute left-0 w-full h-[2px] bg-red-600/20 z-10 pointer-events-none"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />

              <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                {/* Digital Clock Readout */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-lg">
                      {selectedCountry.flag}
                    </div>
                    <div>
                      <p className="text-[8px] text-zinc-500 uppercase tracking-widest">Selected_Node</p>
                      <h3 className="text-xl font-black uppercase tracking-tighter text-white">{selectedCountry.name}</h3>
                    </div>
                  </div>

                  <div className="relative">
                    <motion.p 
                      key={localTime.getSeconds()}
                      initial={{ opacity: 0.8 }}
                      animate={{ opacity: 1 }}
                      className="text-6xl md:text-8xl font-black tracking-tighter leading-none select-none"
                      style={{ color: config.color, textShadow: `0 0 20px ${config.color}44` }}
                    >
                      {localTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
                      <span className="text-xl md:text-2xl ml-2 opacity-50">
                        {localTime.getSeconds().toString().padStart(2, '0')}
                      </span>
                    </motion.p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-900">
                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900/30 border border-zinc-800 rounded-sm">
                      <div className={`w-2 h-2 rounded-full ${config.glow} animate-pulse`} style={{ backgroundColor: config.color }} />
                      <div className="flex flex-col">
                        <span className="text-[7px] text-zinc-500 uppercase tracking-widest">Time_Phase</span>
                        <span className="text-[10px] font-black tracking-widest flex items-center gap-1" style={{ color: config.color }}>
                          {config.icon}
                          {config.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Terminal size={14} className="text-zinc-600" />
                      <span className="text-[10px] text-zinc-600 uppercase tracking-widest">Sync_Status: Active</span>
                    </div>
                  </div>
                </div>

                {/* Technical Data Sidebar */}
                <div className="w-full md:w-40 space-y-4">
                  <div className="space-y-1">
                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest">Data_Stream</p>
                    <div className="h-16 w-full bg-zinc-900/50 border border-zinc-800 p-1 overflow-hidden">
                      <div className="flex flex-col gap-0.5">
                        {[...Array(6)].map((_, i) => (
                          <motion.div 
                            key={i}
                            className="h-0.5 bg-cyan-400/30"
                            animate={{ width: [`${Math.random() * 100}%`, `${Math.random() * 100}%`] }}
                            transition={{ duration: 0.5, repeat: Infinity }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[8px] text-zinc-500 uppercase tracking-widest">Flag_Signature</p>
                    <div className="flex h-8 border border-zinc-800">
                      {selectedCountry.colors.map((c, i) => (
                        <div key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-red-600/5 border border-red-600/20 rounded-sm">
                    <p className="text-[8px] text-red-600 uppercase font-black mb-1 tracking-widest">Warning</p>
                    <p className="text-[9px] text-zinc-500 leading-tight">Creative output exceeding safety thresholds.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Node Selection Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center justify-between px-2">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Available_Nodes</span>
              <div className="flex gap-2">
                <div className="w-1 h-1 bg-cyan-400" />
                <div className="w-1 h-1 bg-cyan-400" />
                <div className="w-1 h-1 bg-zinc-800" />
              </div>
            </div>

            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {countries.map((country) => {
                const cTime = getLocalTime(time, country.timezone);
                const isActive = selectedCountry.name === country.name;

                return (
                  <button
                    key={country.name}
                    onClick={() => setSelectedCountry(country)}
                    className={`w-full group relative flex items-center justify-between p-3 border transition-all duration-300 ${
                      isActive 
                        ? 'bg-zinc-900 border-red-600/50 shadow-[0_0_15px_rgba(220,38,38,0.1)]' 
                        : 'bg-zinc-950/50 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`text-lg transition-all ${isActive ? 'scale-110 grayscale-0' : 'grayscale opacity-50'}`}>{country.flag}</span>
                      <div className="text-left">
                        <p className={`text-[8px] font-black uppercase tracking-widest ${isActive ? 'text-red-600' : 'text-zinc-500'}`}>{country.name}</p>
                        <p className={`text-lg font-black tracking-tighter ${isActive ? 'text-white' : 'text-zinc-700'}`}>
                          {cTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </p>
                      </div>
                    </div>
                    
                    {isActive && (
                      <motion.div 
                        layoutId="node-active"
                        className="w-1 h-8 bg-red-600"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </section>
  );
};

export default WorldWatch;
