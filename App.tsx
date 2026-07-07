
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BrandMetrics from './components/BrandMetrics';
import NewsSection from './components/NewsSection';
import Testimonials from './components/Testimonials';
import BriefGenerator from './components/BriefGenerator';
import ChatWidget from './components/ChatWidget';
import Portfolio from './components/Portfolio';
import CreativeGallery from './components/CreativeGallery';
import CricketMedia from './components/CricketMedia';
import YoutubeLive from './components/YoutubeLive';
import WorldWatch from './components/WorldWatch';
import MediaPlanningInfographic from './components/MediaPlanningInfographic';
import Footer from './components/Footer';
import { SERVICES } from './constants';
import { Target, Zap, Globe, Camera, Quote, Award, Linkedin, UserCheck, ShieldCheck, Trophy } from 'lucide-react';

import { motion, useScroll, useSpring } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  target: <Target size={32} />,
  zap: <Zap size={32} />,
  globe: <Globe size={32} />,
  camera: <Camera size={32} />,
  trophy: <Trophy size={32} />,
};

const App: React.FC = () => { 
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Reliable professional portrait for the founder
  const founderImage = "/images/Dheeraj.jpg";

  return (
    <div className="min-h-screen bg-[#050505] relative selection:bg-red-600 selection:text-white">
      {/* Global Designer Overlays */}
      <div className="noise-overlay" />
      <div className="atmosphere" />
      
      {/* Vertical Grid Lines - The "Architectural" Touch */}
      <div className="fixed inset-0 pointer-events-none z-0 flex justify-between px-6 container mx-auto opacity-[0.03]">
        <div className="w-px h-full bg-white" />
        <div className="w-px h-full bg-white hidden md:block" />
        <div className="w-px h-full bg-white hidden md:block" />
        <div className="w-px h-full bg-white" />
      </div>

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-red-600 origin-left z-[100]"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        {/* About Section (Our DNA) - Premium Founder Spotlight */}
        <motion.section 
          id="about" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="bg-white text-black py-24 md:py-32 overflow-hidden relative"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
              
              {/* Left Column: Visionary Narrative */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="flex items-center gap-4 mb-8"
                >
                  <div className="w-12 h-[2px] bg-red-600"></div>
                  <span className="text-red-600 text-xs font-black tracking-[0.5em] uppercase">The Visionary</span>
                </motion.div>
                
                <motion.h2 
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  className="text-5xl md:text-8xl font-display font-bold uppercase tracking-tighter leading-[0.8] mb-10 relative"
                >
                  Dheeraj <br /> 
                  <span className="text-zinc-200 block md:ml-24">Kumar</span>
                  <span className="absolute -top-16 -left-16 text-[15rem] text-zinc-50 font-display font-bold -z-10 select-none opacity-50">DK</span>
                </motion.h2>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="space-y-8 text-base md:text-xl leading-relaxed text-zinc-600 font-light max-w-3xl relative"
                >
                  <p className="relative z-10">
                    At BrandArcher Advertising, we don't just follow trends—we architect them. Under my leadership, we champion <span className="font-bold text-black underline decoration-red-600 decoration-[6px] underline-offset-[12px]">Targeted Anarchy</span>. 
                  </p>
                  <p className="text-zinc-400 text-lg">
                    It is the calculated intersection of strategic surgical precision and unapologetic creative disruption. We find the bullseye in every market and hit it with impact that resonates across every channel.
                  </p>
                  
                  <div className="pt-10 mt-10 border-t border-zinc-100">
                    <div className="flex flex-col md:flex-row md:items-start gap-12">
                      <div className="flex-1">
                        <Quote className="text-red-600 mb-8 opacity-40" size={40} />
                        <p className="text-xl md:text-2xl font-black italic text-black leading-tight tracking-tight mb-8">
                          "Precision is the foundation of disruption. My mission is to ensure your brand leaves an permanent mark."
                        </p>
                        <div className="flex items-center gap-4">
                           <div className="w-20 h-[1px] bg-zinc-300"></div>
                           <div>
                             <p className="text-sm font-black uppercase tracking-widest text-black">Founder & CEO</p>
                             <p className="text-xs font-bold uppercase tracking-wider text-red-600 mt-1">BrandArcher Advertising</p>
                           </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-8 bg-zinc-50 p-10 border-l-8 border-red-600">
                         <div className="flex items-center gap-4 text-sm font-black uppercase tracking-wider text-zinc-600">
                           <Award size={20} className="text-red-600" /> Executive Leadership
                         </div>
                         <div className="flex items-center gap-4 text-sm font-black uppercase tracking-wider text-zinc-600">
                           <UserCheck size={20} className="text-red-600" /> Brand Strategist
                         </div>
                         <div className="flex items-center gap-4 text-sm font-black uppercase tracking-wider text-zinc-600">
                           <ShieldCheck size={20} className="text-red-600" /> Market Authority
                         </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Column: Original Natural Portrait */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 1 }}
                className="lg:col-span-5 order-1 lg:order-2 relative"
              >
                <div className="relative">
                  {/* Decorative Frame Elements */}
                  <div className="absolute -top-12 -right-12 w-48 h-48 border-t-2 border-r-2 border-zinc-100 -z-10" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 border-b-2 border-l-2 border-zinc-100 -z-10" />
                  
                  {/* The Main Portrait Container */}
                  <div className="relative aspect-[4/5] overflow-hidden shadow-2xl group bg-zinc-100">
                    <img 
                      src={founderImage} 
                      alt="Dheeraj Kumar - Founder of BrandArcher" 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/Dheeraj.jpg";
                      }}
                    />
                    
                    {/* Floating Social Connector */}
                    <a 
                      href="https://www.linkedin.com/in/fordkv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-10 right-10 bg-white text-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 hover:text-white transition-all duration-500 transform hover:rotate-12"
                    >
                      <Linkedin size={24} />
                    </a>
                  </div>
                  
                  {/* Founder Nameplate Overlay */}
                  <div className="absolute -bottom-16 -left-16 bg-black p-8 md:p-10 text-white shadow-[40px_40px_100px_rgba(0,0,0,0.5)] border-l-[16px] border-red-600">
                    <span className="text-red-600 text-xs font-black uppercase tracking-wider mb-4 block">Chief Architect</span>
                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">Dheeraj <br /> Kumar</h3>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </motion.section>

        {/* Services Section */}
        <motion.section 
          id="services" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-black py-32 border-y border-zinc-900/50 relative overflow-hidden"
        >
          <div className="container mx-auto px-6 text-center mb-20">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-red-600 text-xs font-black tracking-[0.5em] uppercase mb-6 block"
            >
              Capabilities
            </motion.span>
            <motion.h2 
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-none"
            >
              360° Expertise
            </motion.h2>
          </div>
          
          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900/30 border border-zinc-900/50"
          >
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id} 
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1]
                    }
                  }
                }}
                className="bg-black p-10 hover:bg-zinc-950 transition-all duration-500 group cursor-default border border-transparent hover:border-zinc-800"
              >
                <div className="text-red-600 mb-12 group-hover:scale-110 transition-transform duration-500">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-lg font-black uppercase tracking-widest mb-8 group-hover:text-red-600 transition-colors">{service.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <MediaPlanningInfographic />

        <WorldWatch />

        <Portfolio />
        <CricketMedia />
        <YoutubeLive />
        <CreativeGallery />

        <BrandMetrics />
        <NewsSection />
        <Testimonials />
        <BriefGenerator />
      </main>

      <Footer />
      <ChatWidget />
    </div>
  );
};

export default App;
