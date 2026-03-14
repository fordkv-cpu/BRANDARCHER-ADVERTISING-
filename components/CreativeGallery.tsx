
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useSpring, useTransform, useScroll } from 'framer-motion';
import { Maximize2, ExternalLink, Loader2, ChevronLeft, ChevronRight, X, Share2, Check, Play, Download } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const galleryItems = [
  {
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600",
    title: "Primary 360° Perspective",
    detail: "A wide-angle view showing the curved green architectural ribbing meeting the high-gloss yellow facade.",
    size: "large"
  },
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000",
    title: "Modular Display System",
    detail: "Detail of the custom cubic display units used for the 'Hello Organic' product range.",
    size: "small"
  },
  {
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000",
    title: "Canopy & Digital Integration",
    detail: "Overhead detail showcasing the circular grass-textured ceiling and integrated digital UI panels.",
    size: "small"
  },
  {
    url: "https://images.unsplash.com/photo-1582213726892-2761781cd3d2?auto=format&fit=crop&q=80&w=1600",
    title: "Complete Site Architecture",
    detail: "Top-down isometric render visualizing the flow of traffic around the 360-degree stand.",
    size: "large"
  }
];

const GalleryItem: React.FC<{ 
  item: typeof galleryItems[0], 
  idx: number,
  onOpen: (index: number) => void,
  onGenerate: (index: number) => void
}> = ({ item: initialItem, idx, onOpen, onGenerate }) => {
  const [currentIndex, setCurrentIndex] = useState(idx);
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  const item = galleryItems[currentIndex];

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoaded(false);
    setCurrentIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoaded(false);
    setCurrentIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const springConfig = { stiffness: 40, damping: 40 };
  const x = useSpring(useTransform(useSpring(mousePos.x, springConfig), [-0.5, 0.5], [-10, 10]), springConfig);
  const y = useSpring(useTransform(useSpring(mousePos.y, springConfig), [-0.5, 0.5], [-10, 10]), springConfig);

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.8 }}
      className={`relative group overflow-hidden cursor-none bg-zinc-900 ${
        item.size === 'large' ? 'md:col-span-8' : 'md:col-span-4'
      } h-[400px] md:h-[600px]`}
    >
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-zinc-950 z-10"
          >
            <div className="relative">
               <Loader2 className="w-8 h-8 text-zinc-800 animate-spin" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img 
        style={{ x, y, scale: 1.15, translateY: scrollY }}
        initial={{ filter: 'blur(20px) brightness(0.5) contrast(0.8)', opacity: 0 }}
        animate={isLoaded ? { 
          filter: 'blur(0px) brightness(0.7) contrast(1.1)', 
          opacity: 1 
        } : {}}
        whileHover={{ 
          scale: 1.25,
          filter: 'blur(0px) brightness(1.2) contrast(1.1) saturate(1.1)',
          transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] }
        }}
        onLoad={() => setIsLoaded(true)}
        src={item.url} 
        alt={item.title} 
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover transition-all duration-1000 ease-out"
      />
      
      {/* Refined Gradient Overlay for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20">
        <div className="overflow-hidden mb-2">
          <motion.p 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            className="text-red-600 text-[10px] font-black uppercase tracking-[0.3em]"
          >
            Project Detail
          </motion.p>
        </div>
        <div className="overflow-hidden mb-4">
          <motion.h3 
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-white"
          >
            {item.title}
          </motion.h3>
        </div>
        <p className="text-zinc-300 text-xs max-w-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-6 leading-relaxed">
          {item.detail}
        </p>
        
        <div className="flex gap-4 transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
          <button 
            onClick={handlePrev}
            className="flex items-center justify-center bg-white/10 backdrop-blur-md text-white w-10 h-10 hover:bg-red-600 transition-colors"
            title="Previous Item"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => onOpen(currentIndex)}
            className="flex items-center gap-3 bg-white text-black px-6 py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors"
          >
            View Render <Maximize2 size={12} />
          </button>
          <button 
            onClick={(e) => { e.stopPropagation(); onGenerate(currentIndex); }}
            className="flex items-center justify-center bg-red-600 text-white w-10 h-10 hover:bg-white hover:text-black transition-colors"
            title="Generate AI Promo"
          >
            <Play size={16} fill="currentColor" />
          </button>
          <button 
            onClick={handleNext}
            className="flex items-center justify-center bg-white/10 backdrop-blur-md text-white w-10 h-10 hover:bg-red-600 transition-colors"
            title="Next Item"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Modern Border Frame */}
      <div className="absolute inset-6 border border-white/5 pointer-events-none group-hover:border-red-600/30 transition-colors duration-500 z-30" />
    </motion.div>
  );
};

const CreativeGallery: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isShared, setIsShared] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [authError, setAuthError] = useState<string | null>(null);

  const loadingMessages = [
    "Analyzing Spatial DNA...",
    "Synthesizing Architectural Flow...",
    "Rendering 360° Perspective...",
    "Finalizing Brand Integration...",
  ];

  const handleNext = () => {
    setSelectedIdx((prev) => (prev !== null ? (prev + 1) % galleryItems.length : null));
    setIsShared(false);
    setVideoUrl(null);
  };

  const handlePrev = () => {
    setSelectedIdx((prev) => (prev !== null ? (prev - 1 + galleryItems.length) % galleryItems.length : null));
    setIsShared(false);
    setVideoUrl(null);
  };

  useEffect(() => {
    if (isVideoLoading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVideoLoading]);

  const handleGenerateVideo = async (targetIdx?: number) => {
    const idx = targetIdx !== undefined ? targetIdx : selectedIdx;
    if (idx === null) return;
    
    try {
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
      }

      setSelectedIdx(idx);
      setIsVideoLoading(true);
      setVideoUrl(null);
      setAuthError(null);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const item = galleryItems[idx];
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A high-end cinematic promotional video for the architectural project: "${item.title}". ${item.detail}. Visuals of sharp architectural lines, surgical precision, and explosive creative disruption. Use a palette of deep black, crisp white, and vibrant traffic red. Atmospheric, high-contrast, professional advertising aesthetic.`,
        config: {
          numberOfVideos: 1,
          resolution: '1080p',
          aspectRatio: '16:9'
        }
      });

      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.API_KEY || '',
          },
        });
        const blob = await response.blob();
        setVideoUrl(URL.createObjectURL(blob));
      }
    } catch (error: any) {
      console.error("Video generation failed:", error);
      if (error.message?.includes("Requested entity was not found") || error.message?.includes("API key")) {
        setAuthError("API Key issue detected. Please ensure you have selected a valid paid project API key.");
        await (window as any).aistudio.openSelectKey();
      } else {
        setAuthError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsVideoLoading(false);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx === null) return;
    
    const item = galleryItems[selectedIdx];
    const shareData = {
      title: `BrandArcher - ${item.title}`,
      text: item.detail,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdx(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIdx]);

  return (
    <section id="gallery" className="bg-black py-32 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-[1px] bg-red-600"></div>
            <span className="text-red-600 text-xs font-black tracking-widest uppercase">Exhibition Architecture</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6"
          >
            Spatial <br /> <span className="text-outline text-white/10">Innovations</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-zinc-500 text-lg max-w-2xl font-light leading-relaxed"
          >
            A definitive showcase of the <span className="text-white font-bold">Hello Basmati Rice</span> trade pavilion. 
            Engineered for high-visibility and maximum brand flow in international exhibition halls.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {galleryItems.map((item, idx) => (
            <GalleryItem 
              key={idx} 
              item={item} 
              idx={idx} 
              onOpen={setSelectedIdx} 
              onGenerate={handleGenerateVideo} 
            />
          ))}
        </div>

        <AnimatePresence>
          {selectedIdx !== null && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-20"
              onClick={() => setSelectedIdx(null)}
            >
              <div className="absolute top-10 right-10 flex gap-4 z-[110]">
                <button 
                  onClick={handleGenerateVideo}
                  disabled={isVideoLoading}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full transition-colors border border-white/10 disabled:opacity-50"
                  title="Generate Promo Video"
                >
                  {isVideoLoading ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor" />}
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                    {isVideoLoading ? 'Generating...' : 'Generate Promo'}
                  </span>
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-full transition-colors border border-white/10"
                  title="Share Project"
                >
                  {isShared ? <Check size={18} className="text-green-500" /> : <Share2 size={18} />}
                  <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                    {isShared ? 'Copied' : 'Share'}
                  </span>
                </button>
                <button 
                  onClick={() => setSelectedIdx(null)}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X size={40} strokeWidth={1} />
                </button>
              </div>

              {/* Navigation Arrows - Appear on hover of the container */}
              <div className="absolute inset-0 flex items-center justify-between px-4 md:px-10 pointer-events-none group/nav">
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                  className="pointer-events-auto w-20 h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-white/5 hover:bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors">
                    <ChevronLeft size={32} />
                  </div>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="pointer-events-auto w-20 h-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="bg-white/5 hover:bg-red-600 w-16 h-16 rounded-full flex items-center justify-center text-white transition-colors">
                    <ChevronRight size={32} />
                  </div>
                </button>
              </div>

              <div 
                className="relative max-w-6xl w-full flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  key={selectedIdx}
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="w-full flex flex-col items-center"
                >
                  {authError ? (
                    <div className="text-center py-20">
                      <div className="mb-8 flex justify-center">
                        <div className="w-20 h-20 bg-red-600/10 rounded-full flex items-center justify-center border border-red-600/20">
                          <X size={40} className="text-red-600" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">Configuration Required</h3>
                      <p className="text-zinc-400 text-sm uppercase tracking-widest max-w-sm mx-auto leading-relaxed mb-12">
                        {authError}
                      </p>
                      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <button 
                          onClick={() => (window as any).aistudio.openSelectKey()}
                          className="bg-red-600 text-white px-10 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all"
                        >
                          Manage API Key
                        </button>
                        <button 
                          onClick={() => setAuthError(null)}
                          className="border border-white/10 text-white px-10 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                        >
                          Dismiss
                        </button>
                      </div>
                      <p className="mt-8 text-[9px] text-zinc-600 uppercase tracking-[0.3em]">
                        Note: Veo requires a paid Google Cloud project API key.
                      </p>
                    </div>
                  ) : videoUrl ? (
                    <div className="w-full flex flex-col items-center">
                      <video 
                        src={videoUrl} 
                        controls 
                        autoPlay 
                        className="max-h-[60vh] w-auto shadow-2xl border border-white/10"
                      />
                      <div className="mt-6 flex gap-4">
                        <a 
                          href={videoUrl} 
                          download={`${galleryItems[selectedIdx].title}_Promo.mp4`}
                          className="bg-red-600 text-white px-8 py-3 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white hover:text-black transition-all"
                        >
                          Download Promo <Download size={14} />
                        </a>
                        <button 
                          onClick={() => setVideoUrl(null)}
                          className="border border-white/10 text-white px-8 py-3 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                        >
                          Back to Render
                        </button>
                      </div>
                    </div>
                  ) : isVideoLoading ? (
                    <div className="text-center py-20">
                      <Loader2 className="w-20 h-20 text-red-600 animate-spin mx-auto mb-8" strokeWidth={1} />
                      <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Generating Promo</h3>
                      <p className="text-red-600 font-black uppercase tracking-[0.3em] text-[10px] animate-pulse">
                        {loadingMessages[loadingStep]}
                      </p>
                    </div>
                  ) : (
                    <img 
                      src={galleryItems[selectedIdx].url} 
                      alt={galleryItems[selectedIdx].title}
                      loading="lazy"
                      decoding="async"
                      className="max-h-[70vh] w-auto object-contain shadow-2xl border border-white/10"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  
                  {!isVideoLoading && !videoUrl && (
                    <div className="mt-10 text-center max-w-2xl">
                      <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-4">Project Spotlight</p>
                      <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-6">
                        {galleryItems[selectedIdx].title}
                      </h3>
                      <p className="text-zinc-400 text-lg font-light leading-relaxed">
                        {galleryItems[selectedIdx].detail}
                      </p>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-12 bg-zinc-950 border border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-12"
        >
          <div className="max-w-xl">
            <h4 className="text-2xl font-black uppercase tracking-tighter mb-4 text-white">Visual Specifications</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              The project utilizes a high-contrast palette of <span className="text-white font-bold">RAL 1023 Traffic Yellow</span> and <span className="text-red-600 font-bold">BrandArcher Green</span> accents. The architecture incorporates 3D backlit pillars, organic grass-canopy textures, and recessed modular product displays.
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Client / Partner</span>
            <div className="text-4xl font-black tracking-tighter text-white uppercase italic">
              SUNSTAR <span className="text-red-600">GROUPS</span>
            </div>
            <button className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-red-600 hover:text-white transition-colors group">
              View Blueprint <ExternalLink size={12} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeGallery;
