
import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const { left, top, width, height } = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setMousePos({ x, y });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const springX = useSpring(mousePos.x, { stiffness: 40, damping: 25 });
  const springY = useSpring(mousePos.y, { stiffness: 40, damping: 25 });

  const imageX = useTransform(springX, [-0.5, 0.5], [20, -20]);
  const imageY = useTransform(springY, [-0.5, 0.5], [20, -20]);
  const textX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
  const textY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

  const itemVariants = {
    hidden: { y: "110%", skewY: 5, opacity: 0 },
    visible: (i: number) => ({
      y: "0%",
      skewY: 0,
      opacity: 1,
      transition: {
        duration: 1.4,
        delay: 0.15 * i,
        ease: [0.19, 1, 0.22, 1],
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
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ 
          scale: [1.1, 1.05], 
          opacity: 0.7 
        }}
        transition={{ 
          duration: 10, 
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse" 
        }}
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ x: imageX, y: imageY }}
      >
        <img 
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=90&w=2400" 
          alt="BrandArcher Cinematic Background" 
          className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.2] saturate-[0.8]"
        />
        
        {/* Advanced Multi-layered Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)] opacity-60" />
      </motion.div>

      {/* Grain/Noise Overlay for high-end texture */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="container mx-auto px-6 relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: 1, letterSpacing: "0.6em" }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="inline-block mb-12"
        >
          <span className="text-[10px] md:text-[12px] font-black uppercase text-red-600 border-x border-red-600 px-6 py-1">
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
              className="block text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase text-white"
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
              className="block text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase text-outline opacity-40"
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
              className="block text-[12vw] md:text-[8vw] font-black leading-[0.9] tracking-tighter uppercase text-red-600 drop-shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            >
              Disruption
            </motion.span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="max-w-3xl mx-auto mt-16"
        >
          <h2 className="text-lg md:text-2xl font-light text-zinc-400 mb-10 uppercase tracking-[0.3em] leading-relaxed">
            Leading <span className="text-white font-black italic">360° ADVERTISING COMPANY</span>
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#dc2626", color: "#fff" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-black px-12 py-5 font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
              Explore Portfolio
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, border: "1px solid #fff" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-white/10 text-white px-12 py-5 font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all duration-300 backdrop-blur-md"
            >
              Start a Project
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements / Ambient Particles */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-red-600/10 rounded-full blur-[80px] z-[5]"
      />
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          opacity: [0.1, 0.3, 0.1]
        }}
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
