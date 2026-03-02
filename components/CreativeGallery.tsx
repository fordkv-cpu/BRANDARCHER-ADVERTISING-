
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, ExternalLink, Loader2 } from 'lucide-react';

const galleryItems = [
  {
    url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=100&w=1600", // Replace with stand-front-perspective.jpg
    title: "Primary 360° Perspective",
    detail: "A wide-angle view showing the curved green architectural ribbing meeting the high-gloss yellow facade.",
    size: "large"
  },
  {
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=100&w=1000", // Replace with interior-shelving.jpg
    title: "Modular Display System",
    detail: "Detail of the custom cubic display units used for the 'Hello Organic' product range.",
    size: "small"
  },
  {
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=100&w=1000", // Replace with overhead-detail.jpg
    title: "Canopy & Digital Integration",
    detail: "Overhead detail showcasing the circular grass-textured ceiling and integrated digital UI panels.",
    size: "small"
  },
  {
    url: "https://images.unsplash.com/photo-1582213726892-2761781cd3d2?auto=format&fit=crop&q=100&w=1600", // Replace with stand-isometric.jpg
    title: "Complete Site Architecture",
    detail: "Top-down isometric render visualizing the flow of traffic around the 360-degree stand.",
    size: "large"
  }
];

const GalleryItem: React.FC<{ item: typeof galleryItems[0], idx: number }> = ({ item, idx }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
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
        initial={{ filter: 'blur(5px)', opacity: 0 }}
        animate={isLoaded ? { filter: 'blur(0px)', opacity: 1 } : {}}
        onLoad={() => setIsLoaded(true)}
        src={item.url} 
        alt={item.title} 
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-[1500ms] group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-105 contrast-[1.05]"
      />
      
      {/* Subtle Gradient for Text Legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
      
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
          <button className="flex items-center gap-3 bg-white text-black px-6 py-2.5 text-[9px] font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-colors">
            View Render <Maximize2 size={12} />
          </button>
        </div>
      </div>

      {/* Modern Border Frame */}
      <div className="absolute inset-6 border border-white/5 pointer-events-none group-hover:border-red-600/30 transition-colors duration-500 z-30" />
    </motion.div>
  );
};

const CreativeGallery: React.FC = () => {
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
            <GalleryItem key={idx} item={item} idx={idx} />
          ))}
        </div>

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
