
import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useScroll, AnimatePresence, useMotionValue } from 'framer-motion';
import { ArrowDown, Play, Loader2, X, Download, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const Hero: React.FC = () => {
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);
  const [showConfig, setShowConfig] = useState(false);
  const [customMessage, setCustomMessage] = useState("");
  const [selectedColor, setSelectedColor] = useState("#dc2626"); // Default BrandArcher Red
  const [authError, setAuthError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const brandColors = [
    { name: "Brand Red", value: "#dc2626" },
    { name: "Electric Blue", value: "#2563eb" },
    { name: "Neon Green", value: "#16a34a" },
    { name: "Cyber Purple", value: "#9333ea" },
    { name: "Gold", value: "#ca8a04" },
  ];

  const loadingMessages = [
    "Analyzing BrandArcher DNA...",
    "Synthesizing Precision & Disruption...",
    "Rendering 360° Cinematic Experience...",
    "Finalizing Targeted Anarchy...",
  ];

  // Use MotionValues for smoother, more performant mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 60, damping: 30, restDelta: 0.001 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
      }
    };
    
    // Only enable mouse parallax on desktop
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (isVideoLoading) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVideoLoading]);

  const handleGenerateVideo = async () => {
    try {
      // Check for API key selection as required for Veo
      const hasKey = await (window as any).aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await (window as any).aistudio.openSelectKey();
        // Proceeding assuming success as per guidelines
      }

      setIsVideoLoading(true);
      setVideoUrl(null);
      setShowConfig(false);
      setAuthError(null);
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      const colorName = brandColors.find(c => c.value === selectedColor)?.name || "custom color";
      const messagePrompt = customMessage ? `Include the message: "${customMessage}".` : 'Text overlays: "PRECISION MEETS DISRUPTION" and "BRANDARCHER 360°".';

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A high-end cinematic promotional video for BrandArcher Advertising. Visuals of sharp architectural lines, surgical precision, and explosive creative disruption. Use a palette of deep black, crisp white, and ${colorName} (${selectedColor}). ${messagePrompt} Atmospheric, high-contrast, professional advertising aesthetic.`,
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Mouse Parallax Transforms
  const imageX = useTransform(smoothX, [-0.5, 0.5], ["2%", "-2%"]);
  const imageY = useTransform(smoothY, [-0.5, 0.5], ["2%", "-2%"]);
  const textX = useTransform(smoothX, [-0.5, 0.5], ["-1.5%", "1.5%"]);
  const textY = useTransform(smoothY, [-0.5, 0.5], ["-1.5%", "1.5%"]);

  // Scroll Parallax Transforms
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);
  const particle1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const particle2Y = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.5,
        delay: 0.6 + (0.2 * i),
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Cinematic Background Layer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ x: imageX, y: imageY, scale: imageScale, translateY: bgY }}
      >
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=90&w=2400" 
          alt="BrandArcher Cinematic Background" 
          className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.2] saturate-[0.8]"
          decoding="async"
          referrerPolicy="no-referrer"
        />
        
        {/* Advanced Multi-layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-60" />
      </motion.div>

      {/* Grain/Noise Overlay */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <motion.div 
        className="container mx-auto px-6 relative z-20 text-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="inline-block mb-6"
        >
          <span className="text-[10px] md:text-[11px] font-black uppercase text-red-600 border-x border-red-600 px-4 py-1">
            BrandArcher Advertising
          </span>
        </motion.div>

        <motion.div 
          style={{ x: textX, y: textY }}
          className="flex flex-col items-center select-none"
        >
          <div className="overflow-hidden mb-1">
            <motion.span 
              custom={0}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="block text-[10vw] md:text-[6vw] font-black leading-[0.9] tracking-tighter uppercase text-white"
            >
              Precision
            </motion.span>
          </div>
          
          <div className="overflow-hidden mb-1">
            <motion.span 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="block text-[10vw] md:text-[6vw] font-black leading-[0.9] tracking-tighter uppercase text-outline opacity-40"
            >
              Meets
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.span 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              className="block text-[10vw] md:text-[6vw] font-black leading-[0.9] tracking-tighter uppercase text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            >
              Disruption
            </motion.span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto mt-8"
        >
          <h2 className="text-base md:text-xl font-light text-zinc-400 mb-6 uppercase tracking-[0.3em] leading-relaxed">
            Leading <span className="text-white font-black italic">360° ADVERTISING COMPANY</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#dc2626", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-10 py-3 font-black uppercase tracking-widest text-[10px] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              Explore Portfolio
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, border: "1px solid #fff" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowConfig(true)}
              disabled={isVideoLoading}
              className="border border-white/10 text-white px-10 py-3 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all duration-300 backdrop-blur-md flex items-center gap-3 disabled:opacity-50"
            >
              {isVideoLoading ? (
                <Loader2 className="animate-spin" size={16} />
              ) : (
                <Play size={16} fill="currentColor" />
              )}
              Generate Promo
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* Video Configuration Modal */}
      <AnimatePresence>
        {showConfig && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-zinc-950 border border-white/10 p-10 max-w-xl w-full relative"
            >
              <button 
                onClick={() => setShowConfig(false)}
                className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              <div className="mb-10">
                <span className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">AI Synthesis</span>
                <h3 className="text-3xl font-black uppercase tracking-tighter text-white">Configure Promo</h3>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">Key Message / Custom Text</label>
                  <input 
                    type="text" 
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g. DISRUPTING THE FUTURE"
                    className="w-full bg-zinc-900 border border-white/10 p-4 text-white font-light focus:border-red-600 outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-zinc-500 text-[10px] font-black uppercase tracking-widest mb-4">Brand Accent Color</label>
                  <div className="flex gap-4">
                    {brandColors.map((color) => (
                      <button
                        key={color.value}
                        onClick={() => setSelectedColor(color.value)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${selectedColor === color.value ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'}`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={handleGenerateVideo}
                    className="w-full bg-red-600 text-white py-5 font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300"
                  >
                    Start Cinematic Synthesis
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Generation Modal */}
      <AnimatePresence>
        {(isVideoLoading || videoUrl || authError) && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-6"
          >
            <div className="max-w-4xl w-full">
              {authError ? (
                <div className="text-center">
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
              ) : isVideoLoading ? (
                <div className="text-center">
                  <div className="relative inline-block mb-12">
                    <Loader2 className="w-24 h-24 text-red-600 animate-spin" strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-red-600/20 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-4">Generating Cinematic Promo</h3>
                  <p className="text-red-600 font-black uppercase tracking-[0.3em] text-xs animate-pulse">
                    {loadingMessages[loadingStep]}
                  </p>
                  <p className="mt-12 text-zinc-500 text-xs uppercase tracking-widest max-w-sm mx-auto leading-relaxed">
                    Our AI is synthesizing a bespoke 360° visual experience. This process takes approximately 60 seconds.
                  </p>
                </div>
              ) : (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="relative"
                >
                  <button 
                    onClick={() => setVideoUrl(null)}
                    className="absolute -top-16 right-0 text-white hover:text-red-600 transition-colors flex items-center gap-2 uppercase font-black text-[10px] tracking-[0.3em]"
                  >
                    Close <X size={20} />
                  </button>
                  
                  <div className="bg-zinc-900 border border-white/10 p-2 shadow-2xl">
                    <video 
                      src={videoUrl!} 
                      controls 
                      autoPlay 
                      className="w-full aspect-video object-cover"
                    />
                  </div>

                  <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                      <h4 className="text-white font-black uppercase tracking-tighter text-2xl">BrandArcher Promo v1.0</h4>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">Generated via Veo 3.1 Fast</p>
                    </div>
                    <div className="flex gap-4">
                      <a 
                        href={videoUrl!} 
                        download="BrandArcher_Promo.mp4"
                        className="bg-red-600 text-white px-8 py-4 font-black uppercase tracking-widest text-[10px] flex items-center gap-2 hover:bg-white hover:text-black transition-all"
                      >
                        Download <Download size={14} />
                      </a>
                      <button 
                        onClick={() => setVideoUrl(null)}
                        className="border border-white/10 text-white px-8 py-4 font-black uppercase tracking-widest text-[10px] hover:bg-white/5 transition-all"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Elements */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        style={{ translateY: particle1Y }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-red-600/10 rounded-full blur-[80px] z-[5]"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
        style={{ translateY: particle2Y }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-zinc-500/10 rounded-full blur-[100px] z-[5]"
      />

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-zinc-500 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <ArrowDown size={32} strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export default Hero;
