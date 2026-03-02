
import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, ExternalLink, RefreshCw, Radio, Calendar, MapPin } from 'lucide-react';
import { fetchIndustryNews } from '../services/newsService';
import { NewsItem } from '../types';

const NewsSection: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const timerRef = useRef<number | null>(null);

  const getNews = async () => {
    setLoading(true);
    try {
      const data = await fetchIndustryNews();
      if (data && data.length > 0) {
        setNews(data);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("Failed to update news feed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNews();
    
    // Setup automatic refresh every 5 minutes (300000ms)
    timerRef.current = window.setInterval(() => {
      getNews();
    }, 300000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section id="news" className="bg-black py-32 border-t border-zinc-900 overflow-hidden">
      {/* Live Exhibition Ticker */}
      <div className="bg-red-600/5 border-y border-red-600/20 py-4 mb-20 overflow-hidden whitespace-nowrap relative">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center"
        >
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center">
              {news.length > 0 ? news.map((item, idx) => (
                <span key={idx} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-300">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-pulse" />
                  {item.title} • <span className="text-red-600 font-black">{item.source}</span>
                </span>
              )) : (
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">Synchronizing live exhibition feed...</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-red-600 px-2 py-0.5 rounded-sm">
                <Radio size={12} className="text-white animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-tighter text-white">Live Feed</span>
              </div>
              <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                Last Sync: {lastUpdated.toLocaleTimeString()}
              </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Exhibition <br /> <span className="text-outline">Intelligence</span>
            </h2>
          </motion.div>
          
          <button 
            onClick={getNews}
            disabled={loading}
            className="group flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
          >
            {loading ? 'Fetching Live Data...' : 'Auto-Sync Active'}
            <RefreshCw size={16} className={`${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode='popLayout'>
            {loading && news.length === 0 ? (
              [...Array(8)].map((_, i) => (
                <div key={i} className="h-72 bg-zinc-900/50 animate-pulse border border-zinc-800" />
              ))
            ) : (
              news.map((item, idx) => (
                <motion.a
                  key={item.url + idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative p-6 bg-zinc-950 border border-zinc-900 hover:border-red-600/30 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={10} className="text-red-600" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
                          {item.category}
                        </span>
                      </div>
                      <Calendar size={12} className="text-zinc-800" />
                    </div>
                    <h3 className="text-base font-black uppercase tracking-tight mb-3 group-hover:text-red-600 transition-colors leading-tight line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-zinc-500 text-xs font-light leading-relaxed line-clamp-3">
                      {item.summary}
                    </p>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-zinc-900 flex justify-between items-center">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">
                      {item.source}
                    </span>
                    <ExternalLink size={12} className="text-zinc-800 group-hover:text-white" />
                  </div>
                </motion.a>
              ))
            )}
          </AnimatePresence>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 flex flex-col items-center text-center gap-4"
        >
          <div className="h-[1px] w-24 bg-zinc-800 mb-4" />
          <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-[0.3em] max-w-2xl leading-relaxed">
            Automatic background sync enabled via Gemini Global Search. Tracking events from Campaign India, Afaqs, PIB, WPP, and International Exhibition Bureaus.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
