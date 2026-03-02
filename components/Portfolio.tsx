
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import { X, ArrowRight, Quote } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Dynamic Meta Tags Implementation
  useEffect(() => {
    if (selectedProject) {
      // Store original values
      const prevTitle = document.title;
      const prevDescription = document.querySelector('meta[name="description"]')?.getAttribute('content');

      // Update Title
      document.title = `${selectedProject.title} | ${selectedProject.industry} Case Study | BrandArcher`;

      // Update Description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', selectedProject.description);

      // Cleanup on close
      return () => {
        document.title = prevTitle;
        if (prevDescription) {
          metaDescription?.setAttribute('content', prevDescription);
        }
      };
    }
  }, [selectedProject]);

  const industries = ['All', ...Array.from(new Set(PROJECTS.map(p => p.industry)))];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.industry === filter);

  return (
    <section id="portfolio" className="bg-zinc-950 py-32 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-zinc-800/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-red-600 text-xs font-black tracking-[0.5em] uppercase mb-4 block"
          >
            The Archive
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12"
          >
            360° <br /> <span className="text-outline">Campaigns</span>
          </motion.h2>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-4 border-b border-zinc-800 pb-8">
            {industries.map((industry) => (
              <button
                key={industry}
                onClick={() => setFilter(industry)}
                className={`text-xs font-bold uppercase tracking-widest px-6 py-2 transition-all duration-300 ${
                  filter === industry 
                    ? 'bg-red-600 text-white' 
                    : 'text-zinc-500 hover:text-white'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 mb-6">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8">
                    <span className="text-red-600 text-[10px] font-black uppercase tracking-widest mb-2 block">
                      {project.industry}
                    </span>
                    <h3 className="text-3xl font-black uppercase tracking-tighter text-white group-hover:text-red-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black">
                      <ArrowRight size={20} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Case Study Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
              />
              
              <motion.div 
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                className="relative w-full max-w-6xl bg-zinc-900 overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
              >
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 z-10 w-12 h-12 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  <X size={24} />
                </button>

                {/* Modal Left: Image */}
                <div className="w-full md:w-1/2 relative">
                  <img 
                    src={selectedProject.imageUrl} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                </div>

                {/* Modal Right: Content */}
                <div className="w-full md:w-1/2 p-8 md:p-16 overflow-y-auto custom-scrollbar">
                  <span className="text-red-600 text-xs font-black tracking-[0.4em] uppercase mb-4 block">
                    Case Study: {selectedProject.industry}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-8">
                    {selectedProject.title}
                  </h3>
                  
                  <div className="space-y-12">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 border-l-2 border-red-600 pl-4">The Objective</h4>
                      <p className="text-zinc-300 text-lg leading-relaxed font-light">
                        {selectedProject.objectives}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 border-l-2 border-red-600 pl-4">The Impact</h4>
                      <p className="text-zinc-300 text-lg leading-relaxed font-light">
                        {selectedProject.results}
                      </p>
                    </div>

                    {selectedProject.testimonial && (
                      <div className="bg-zinc-800/50 p-8 border-t border-zinc-800">
                        <Quote className="text-red-600 mb-6 opacity-40" size={32} />
                        <p className="text-xl font-black italic text-white leading-tight mb-6">
                          "{selectedProject.testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-[1px] bg-zinc-600"></div>
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-white">
                              {selectedProject.testimonial.author}
                            </p>
                            <p className="text-[10px] font-bold uppercase tracking-widest text-red-600">
                              {selectedProject.testimonial.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Portfolio;
