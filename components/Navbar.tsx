
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-black/95 backdrop-blur-md py-2 shadow-2xl border-b border-white/5' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="text-xl font-black tracking-tighter flex items-center gap-1 group">
          <span className="bg-red-600 text-white px-1">BRAND</span>
          <span className="group-hover:text-red-600 transition-colors">ARCHER</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-red-600 transition-all group-hover:w-full"></span>
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="bg-white text-black px-6 py-2 text-[9px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-red-600 hover:text-white transition-all transform hover:-translate-y-1"
          >
            Get in Touch <ArrowUpRight size={12} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-12 md:hidden animate-slide-up">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-4xl font-black uppercase tracking-tighter hover:text-red-600 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
