
import React from 'react';
import { motion } from 'framer-motion';
import { PROJECTS } from '../constants';

const WorkGrid: React.FC = () => {
  return (
    <section id="work" className="bg-black py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-red-600 text-xs font-black tracking-widest uppercase mb-2 block">Selected Work</span>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">Case Studies</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-md"
          >
            <p className="text-zinc-400 text-sm leading-relaxed">
              Our work spans industries, cultures, and platforms. From digital transformation to global brand architecture, we deliver precision at scale.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROJECTS.map((project, idx) => (
            <motion.div 
              key={project.id} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: idx % 2 === 0 ? 0.1 : 0.3,
                ease: [0.215, 0.61, 0.355, 1] 
              }}
              className={`group cursor-pointer ${idx % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="relative overflow-hidden aspect-[4/3] bg-zinc-900">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110 filter brightness-[0.85] group-hover:brightness-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-2xl">View Project</span>
                </div>
              </div>
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter mb-1 text-white">{project.title}</h3>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest">{project.category}</p>
                </div>
                <div className="text-zinc-800 text-4xl font-black italic">
                  0{idx + 1}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex justify-center"
        >
          <button className="border border-white/20 px-12 py-4 uppercase tracking-[0.3em] text-xs font-bold hover:bg-white hover:text-black transition-all">
            Explore All Work
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WorkGrid;
