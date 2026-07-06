
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => { 
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Metrics', href: '#metrics' },
    { name: 'Pulse', href: '#news' },
    { name: 'Services', href: '#services' },
    { name: 'Planning', href: '#planning' },
    { name: 'Cricket', href: '#cricket' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'About', href: '#about' },
    { name: 'Strategist', href: '#strategist' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/80 backdrop-blur-xl py-3 border-b border-white/5' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-2xl font-display font-bold tracking-tighter flex items-center gap-1 group">
          <span className="text-white">BRAND</span>
          <span className="text-red-600">ARCHER</span>
          <div className="w-1.5 h-1.5 bg-red-600 rounded-full ml-1 animate-pulse" />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full"></span>
            </a>
          ))}
          <a 
            key="profile"
            href="/company-profile.pdf"
            download
            className="text-xs font-bold uppercase tracking-wider text-red-600 hover:text-white transition-all duration-300 relative group"
          >
            Profile
            <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-red-600 transition-all duration-500 group-hover:w-full"></span>
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="ml-4 border border-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center gap-3 hover:bg-red-600 hover:border-red-600 transition-all duration-500 group"
          >
            Inquiry <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white p-2 relative z-[60]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <div className="absolute top-8 left-6">
              <span className="text-2xl font-display font-bold tracking-tighter">BRAND<span className="text-red-600">ARCHER</span></span>
            </div>
            
            {navLinks.map((link, idx) => (
              <motion.a 
                key={link.name} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 + idx * 0.05 }}
                className="text-4xl font-display font-bold uppercase tracking-tighter hover:text-red-600 transition-all duration-300"
              >
                {link.name}
              </motion.a>
            ))}
            <motion.a 
              href="/company-profile.pdf"
              download
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 + navLinks.length * 0.05 }}
              className="text-4xl font-display font-bold uppercase tracking-tighter text-red-600"
            >
              Profile
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
