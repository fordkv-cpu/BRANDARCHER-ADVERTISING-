
import React from 'react';
import { Quote, Star, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "BrandArcher transformed our brand presence overnight. Their 360 approach isn't just a buzzword; it's a surgical blueprint for success in a crowded market.",
    name: "Sarah Chen",
    company: "Luna Bloom",
  },
  {
    quote: "Precision is their religion. They found our market bullseye when everyone else was shooting in the dark. The ROI was immediate and undeniable.",
    name: "Marcus Vane",
    company: "Nexus Fintech",
  },
  {
    quote: "Disruptive in the best way possible. They don't just follow trends; they architect the future. Their team is truly world-class and unapologetic.",
    name: "Elena Rodriguez",
    company: "Aura Wearables",
  }
];

const Testimonials: React.FC = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/iFhwBvofDKaBWnjr9";

  return (
    <section id="testimonials" className="bg-zinc-950 py-32 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-24">
          <span className="text-red-600 text-xs font-black tracking-widest uppercase mb-4 block">Endorsements</span>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-8">Client Love</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-red-600 text-red-600" />
              ))}
            </div>
            <span className="text-white font-bold text-sm tracking-widest">5.0 RATING</span>
          </div>
          <a 
            href={googleMapsUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group"
          >
            Review us on Google <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {testimonials.map((t, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="relative group p-8 bg-black border border-zinc-900 hover:border-red-600/50 transition-all duration-500"
            >
              <Quote className="text-red-600 mb-8 opacity-50 group-hover:opacity-100 transition-opacity" size={40} />
              <p className="text-xl text-zinc-300 leading-relaxed mb-10 font-light italic">
                "{t.quote}"
              </p>
              <div className="mt-auto">
                <p className="text-white font-black uppercase tracking-widest text-sm mb-1">{t.name}</p>
                <p className="text-red-600 text-[10px] font-bold uppercase tracking-[0.2em]">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
