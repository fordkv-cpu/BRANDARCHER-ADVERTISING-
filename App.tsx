
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
import { Target, Zap, Globe, Camera, Quote, Award, Linkedin, UserCheck, ShieldCheck, Trophy, Newspaper, ExternalLink, Sparkles, Upload, Check, X } from 'lucide-react';

import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';

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

  const [founderImage, setFounderImage] = React.useState<string>(
    localStorage.getItem('founderImage') || "/images/dheeraj.jpg"
  );
  const [uploading, setUploading] = React.useState(false);
  const [showNotification, setShowNotification] = React.useState(false);
  const [showPressModal, setShowPressModal] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const handleUpdate = () => {
      const fresh = localStorage.getItem('founderImage');
      if (fresh) setFounderImage(fresh);
    };
    window.addEventListener('founderImageUpdated', handleUpdate);
    return () => window.removeEventListener('founderImageUpdated', handleUpdate);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        localStorage.setItem('founderImage', reader.result);
        setFounderImage(reader.result);
        window.dispatchEvent(new Event('founderImageUpdated'));
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000);
      }
      setUploading(false);
    };
    reader.onerror = () => {
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

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

                    {/* Official CMD Bio & Press Announcement Release */}
                    <div className="mt-12 p-6 bg-red-600/5 border border-red-600/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-red-600 flex items-center justify-center rounded-sm text-white shrink-0 mt-1">
                          <Newspaper size={22} />
                        </div>
                        <div>
                          <p className="text-xs font-black uppercase tracking-widest text-red-600 font-mono">Latest Announcement</p>
                          <h4 className="text-lg font-black uppercase tracking-tight text-black mt-1 leading-tight">
                            Dheeraj Kumar Appointed Chairman & Managing Director (CMD)
                          </h4>
                          <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
                            Published in Construction Opportunities • Official board announcement & CMD Bio
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPressModal(true)}
                        className="w-full md:w-auto shrink-0 bg-black hover:bg-red-600 text-white hover:text-white px-6 py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2"
                      >
                        Read Official PR <ExternalLink size={14} />
                      </button>
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
                        target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200";
                      }}
                    />

                    {/* Interactive upload trigger overlay */}
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center cursor-pointer text-white p-4 text-center z-20"
                      title="Click to upload your original Dheeraj.jpg portrait"
                    >
                      <Upload size={32} className="text-red-600 mb-2" />
                      <span className="text-xs font-black uppercase tracking-widest text-white">Upload My Original Face</span>
                      <p className="text-[9px] text-zinc-400 mt-1 max-w-[200px] leading-snug font-mono">
                        Select Dheeraj.jpg to replace the placeholder face permanently in this browser.
                      </p>
                    </div>

                    {uploading && (
                      <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-30">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Processing Portrait...</span>
                        </div>
                      </div>
                    )}

                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleImageUpload} 
                      accept="image/*" 
                      className="hidden" 
                    />
                    
                    {/* Floating Social Connector */}
                    <a 
                      href="https://www.linkedin.com/in/fordkv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute bottom-10 right-10 bg-white text-black w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:bg-red-600 hover:text-white transition-all duration-500 transform hover:rotate-12 z-20"
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

      {/* Official CMD Bio & Press Release Modal */}
      <AnimatePresence>
        {showPressModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[200] flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-zinc-950 border border-zinc-800 w-full max-w-4xl p-6 md:p-12 relative shadow-2xl rounded-sm my-8 text-white max-h-[90vh] overflow-y-auto"
            >
              {/* Header Close Button */}
              <button 
                onClick={() => setShowPressModal(false)}
                className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors p-2 bg-zinc-900 border border-zinc-800 hover:border-red-600 rounded-sm"
              >
                <X size={18} />
              </button>

              {/* Press Release Meta Data */}
              <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-8 border-b border-zinc-900 pb-6">
                <span className="bg-red-600 px-2 py-0.5 text-white font-black text-[9px] rounded-sm">Official Release</span>
                <span>• Published: July 8, 2026</span>
                <span>• Ref ID: BA-PR-2026-04</span>
                <span>• Channel: Construction Opportunities</span>
              </div>

              {/* Publication Header */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-red-600 font-bold font-mono text-sm tracking-widest uppercase">CONSTRUCTION OPPORTUNITIES PORTAL</span>
                <div className="h-[1px] flex-1 bg-zinc-800" />
              </div>

              {/* Press Title */}
              <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tighter leading-tight mb-8 text-zinc-100">
                BrandArcher Appoints Dheeraj Kumar as Chairman & Managing Director (CMD); Outlines Strategic Growth Roadmap in Infrastructure & Sports Media
              </h2>

              {/* Quote Block */}
              <div className="border-l-4 border-red-600 pl-6 my-8 py-2 bg-red-600/5">
                <p className="text-lg md:text-xl font-black italic text-zinc-200 leading-snug">
                  "Our mission is to bring high-efficiency, disruptive brand strategy to the industrial backbone of India, matching physical infrastructure with monumental creative mindshare."
                </p>
                <p className="text-xs font-bold font-mono text-red-500 uppercase mt-3 tracking-widest">
                  — Dheeraj Kumar, CMD, BrandArcher Advertising
                </p>
              </div>

              {/* Press Body */}
              <div className="space-y-6 text-sm leading-relaxed text-zinc-400 font-light">
                <p>
                  <strong className="text-white font-black uppercase tracking-wider font-mono mr-2">[NEW DELHI, INDIA]</strong> — BrandArcher, India's leading 360-degree creative advertising and media planning agency, has officially announced the appointment of its founder, <strong className="text-white">Dheeraj Kumar</strong>, as <strong className="text-white">Chairman and Managing Director (CMD)</strong>. In this expanded executive leadership role, Dheeraj will oversee the agency's strategic board and spearhead a newly launched division dedicated to high-growth sectors, including **Infrastructure, Heavy Construction, Real Estate, Cement, Steel, and B2B Industrial portfolios**.
                </p>
                
                <p>
                  Under Dheeraj's vision, BrandArcher has successfully disrupted traditional advertising models by championing the proprietary **"Targeted Anarchy"** framework. This methodology serves as the calculated intersection of deep, big-data media planning precision and bold, unapologetic creative disruption. The latest appointment aligns this framework with the physical and commercial scale of India's growing infrastructure sector, establishing BrandArcher as a leading strategic partner for industrial giants.
                </p>

                <p>
                  "Infrastructure, manufacturing, and real estate are the foundational pillars of our nation's expansion," said Dheeraj Kumar in his CMD address. "For decades, industrial B2B brands have relied on static, low-impact advertising portfolios. At BrandArcher, we believe these high-value segments deserve a monumental, highly targeted brand identity. Our specialized team is equipped to deliver surgical digital strategies, immersive spatial designs, and high-ROI media-buying that translate industrial expertise into undeniable market authority."
                </p>

                <p>
                  Beyond manufacturing and real estate, the announcement outlines an aggressive expansion of BrandArcher's high-performance **Cricket OOH & On-Ground Media Planning** packages. Known as the "Stadium Domination" model, this system utilizes strategic coordinate planning and audience dwell-time analysis to acquire high-visibility perimeter boards, circular digital boundaries, and screen placements at premier cricket venues, guaranteeing massive brand recall during national and international fixtures.
                </p>

                <p className="pt-6 border-t border-zinc-900 text-xs text-zinc-500 italic">
                  To view the original publication on Construction Opportunities, visit the authorized journal link: <a href="https://constructionopportunities.in/brandarcher-latest-announcement/" target="_blank" rel="noopener noreferrer" className="text-red-500 underline hover:text-white transition-colors ml-1 font-mono">constructionopportunities.in/brandarcher-latest-announcement/ <ExternalLink size={10} className="inline ml-0.5" /></a>
                </p>
              </div>

              {/* Footer Close Button */}
              <div className="mt-12 pt-8 border-t border-zinc-900 flex justify-end">
                <button 
                  onClick={() => setShowPressModal(false)}
                  className="bg-red-600 hover:bg-white text-white hover:text-black px-8 py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300"
                >
                  Close Document
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification for Profile Photo Update */}
      <AnimatePresence>
        {showNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 left-10 bg-black text-white border-l-4 border-red-600 px-6 py-4 shadow-2xl z-[250] flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
              <Check size={16} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-widest text-white leading-none">Portrait Synchronized</p>
              <p className="text-[9px] text-zinc-500 uppercase mt-1 font-mono leading-none">Real photo successfully loaded and persisted!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
