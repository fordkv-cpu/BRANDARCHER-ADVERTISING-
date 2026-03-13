
import React from 'react';
import { ArrowUpRight, Instagram, Twitter, Linkedin, Facebook, Phone, MapPin } from 'lucide-react';
import VisitorCounter from './VisitorCounter';

const Footer: React.FC = () => {
  const googleMapsUrl = "https://maps.app.goo.gl/iFhwBvofDKaBWnjr9";
  const linkedinUrl = "https://www.linkedin.com/in/fordkv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";
  const facebookUrl = "https://www.facebook.com/share/14X47UQYAGb/";
  const instagramUrl = "https://www.instagram.com/fordkv0508?igsh=N2pxcHJmYm02ZDFw";

  return (
    <footer id="contact" className="bg-black text-white pt-32 pb-12 border-t border-zinc-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-[10vw] lg:text-[7vw] font-black uppercase leading-[0.85] tracking-tighter mb-12">
              Let's <br />
              <span className="text-outline">Build</span> <br />
              Future
            </h2>
            <div className="flex flex-col gap-6">
              <a href="mailto:ceo@brandarcher.in" className="text-2xl md:text-4xl font-light hover:text-red-600 transition-colors flex items-center gap-4 group break-all">
                ceo@brandarcher.in
                <ArrowUpRight size={32} className="text-zinc-700 group-hover:text-red-600 transition-colors flex-shrink-0" />
              </a>
              <a href="tel:+919871700508" className="text-2xl md:text-4xl font-light hover:text-red-600 transition-colors flex items-center gap-4 group">
                +91-98-717-00-508
                <Phone size={32} className="text-zinc-700 group-hover:text-red-600 transition-colors flex-shrink-0" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-6">Headquarters</h4>
              <ul className="space-y-6 text-sm">
                <li>
                  <p className="font-bold uppercase tracking-widest mb-1">Banda, India</p>
                  <p className="text-zinc-500 mb-4">
                    H 59, Tindwari,<br />
                    Banda, Uttar Pradesh 210128
                  </p>
                  <a 
                    href={googleMapsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-red-600 hover:text-white transition-colors group"
                  >
                    View on Google Maps <MapPin size={12} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 mb-8">Social Ecosystem</h4>
              <div className="grid grid-cols-2 gap-4">
                <a 
                  href={instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow BrandArcher on Instagram"
                  className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:bg-red-600 hover:border-red-600 transition-all group"
                >
                  <Instagram size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest group-hover:text-white">Instagram</span>
                </a>
                <a 
                  href="https://twitter.com/brandarcher" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow BrandArcher on Twitter"
                  className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:bg-red-600 hover:border-red-600 transition-all group"
                >
                  <Twitter size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest group-hover:text-white">Twitter</span>
                </a>
                <a 
                  href={linkedinUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Connect with BrandArcher on LinkedIn"
                  className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:bg-red-600 hover:border-red-600 transition-all group"
                >
                  <Linkedin size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest group-hover:text-white">LinkedIn</span>
                </a>
                <a 
                  href={facebookUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Follow BrandArcher on Facebook"
                  className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm hover:bg-red-600 hover:border-red-600 transition-all group"
                >
                  <Facebook size={18} className="text-zinc-500 group-hover:text-white transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest group-hover:text-white">Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[10px] uppercase font-bold tracking-widest text-zinc-600">
              © 2025 BRANDARCHER ADVERTISING. ALL RIGHTS RESERVED.
            </p>
            <VisitorCounter />
          </div>
          <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest text-zinc-600">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
