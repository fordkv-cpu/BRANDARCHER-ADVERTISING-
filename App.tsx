
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
import WorldWatch from './components/WorldWatch';
import Footer from './components/Footer';
import { SERVICES } from './constants';
import { Target, Zap, Globe, Camera, Quote, Award, Linkedin, UserCheck, ShieldCheck, Trophy } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  target: <Target size={32} />,
  zap: <Zap size={32} />,
  globe: <Globe size={32} />,
  camera: <Camera size={32} />,
  trophy: <Trophy size={32} />,
};

const App: React.FC = () => { 
  // Reliable professional portrait for the founder
  const founderImage ="/images/dheeraj.jpg";

  return (
    <div className="min-h-screen bg-black relative">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* About Section (Our DNA) - Premium Founder Spotlight */}
        <section id="about" className="bg-white text-black py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-center">
              
              {/* Left Column: Visionary Narrative */}
              <div className="lg:col-span-7 order-2 lg:order-1">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-[2px] bg-red-600"></div>
                  <span className="text-red-600 text-xs font-black tracking-[0.5em] uppercase">The Visionary</span>
                </div>
                
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.8] mb-6 relative">
                  Dheeraj <br /> 
                  <span className="text-zinc-200 block md:ml-20">Kumar</span>
                  <span className="absolute -top-10 -left-10 text-[12rem] text-zinc-50 font-black -z-10 select-none opacity-50">DK</span>
                </h2>
                
                <div className="space-y-4 text-sm md:text-base leading-relaxed text-zinc-700 font-light max-w-2xl relative">
                  <p className="relative z-10">
                    At BrandArcher Advertising, we don't just follow trends—we architect them. Under my leadership, we champion <span className="font-black text-black underline decoration-red-600 decoration-4 underline-offset-8">Targeted Anarchy</span>. 
                  </p>
                  <p className="text-sm text-zinc-500">
                    It is the calculated intersection of strategic surgical precision and unapologetic creative disruption. We find the bullseye in every market and hit it with impact that resonates across every channel.
                  </p>
                  
                  <div className="pt-6 mt-6 border-t border-zinc-100">
                    <div className="flex flex-col md:flex-row md:items-start gap-10">
                      <div className="flex-1">
                        <Quote className="text-red-600 mb-6 opacity-40" size={32} />
                        <p className="text-lg md:text-xl font-black italic text-black leading-tight tracking-tight mb-6">
                          "Precision is the foundation of disruption. My mission is to ensure your brand leaves an permanent mark."
                        </p>
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-[1px] bg-zinc-300"></div>
                           <div>
                             <p className="text-sm font-black uppercase tracking-widest text-black">Founder & CEO</p>
                             <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-600 mt-1">BrandArcher Advertising</p>
                           </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-6 bg-zinc-50 p-8 border-l-4 border-red-600">
                         <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-500">
                           <Award size={16} className="text-red-600" /> Executive Leadership
                         </div>
                         <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-500">
                           <UserCheck size={16} className="text-red-600" /> Brand Strategist
                         </div>
                         <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-zinc-500">
                           <ShieldCheck size={16} className="text-red-600" /> Market Authority
                         </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Original Natural Portrait */}
              <div className="lg:col-span-5 order-1 lg:order-2 relative">
                <div className="relative">
                  {/* Decorative Frame Elements */}
                  <div className="absolute -top-10 -right-10 w-40 h-40 border-t-2 border-r-2 border-zinc-100 -z-10" />
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 border-b-2 border-l-2 border-zinc-100 -z-10" />
                  
                  {/* The Main Portrait Container */}
                  <div className="relative aspect-[4/5] overflow-hidden shadow-2xl group bg-zinc-100">
                    {/* Natural original photo - No filters or changes applied to preserve the face exactly as requested */}
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
                  <div className="absolute -bottom-12 -left-12 bg-black p-6 md:p-8 text-white shadow-[40px_40px_100px_rgba(0,0,0,0.5)] border-l-[12px] border-red-600">
                    <span className="text-red-600 text-[11px] font-black uppercase tracking-[0.6em] mb-3 block">Chief Architect</span>
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">Dheeraj <br /> Kumar</h3>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="bg-black py-16 border-y border-zinc-900">
          <div className="container mx-auto px-6 text-center mb-12">
            <span className="text-red-600 text-xs font-black tracking-widest uppercase mb-4 block">Capabilities</span>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">360° Expertise</h2>
          </div>
          
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-900 border border-zinc-900">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-black p-6 hover:bg-zinc-950 transition-colors group cursor-default">
                <div className="text-red-600 mb-10 group-hover:scale-110 transition-transform">
                  {iconMap[service.icon]}
                </div>
                <h3 className="text-base font-black uppercase tracking-widest mb-6">{service.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <WorldWatch />

        <Portfolio />
        <CricketMedia />
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
