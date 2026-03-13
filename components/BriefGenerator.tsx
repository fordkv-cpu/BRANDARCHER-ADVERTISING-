
import React, { useState, useRef } from 'react';
import { Sparkles, Loader2, Send, CheckCircle2, Image as ImageIcon, X } from 'lucide-react';
import { generateCampaignStrategy } from '../services/geminiService';
import { CampaignStrategy } from '../types';

const BriefGenerator: React.FC = () => {
  const [industry, setIndustry] = useState('');
  const [audience, setAudience] = useState('');
  const [goal, setGoal] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [strategy, setStrategy] = useState<CampaignStrategy | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageError(null);

    if (file) {
      // Limit to 5MB
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setImageError("File is too large. Maximum size is 5MB.");
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      if (!file.type.startsWith('image/')) {
        setImageError("Please upload a valid image file.");
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onloadstart = () => setIsLoading(true);
      reader.onloadend = () => {
        setImage(reader.result as string);
        setIsLoading(false);
      };
      reader.onerror = () => {
        setImageError("Failed to read image. Please try again.");
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!industry || !audience || !goal) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await generateCampaignStrategy(industry, audience, goal, image || undefined);
      setStrategy(result);
    } catch (err) {
      console.error(err);
      setError("Failed to generate strategy. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="strategist" className="bg-zinc-900 py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-600/20 text-red-500 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> AI Campaign Strategist
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">Test our Thinking</h2>
            <p className="text-zinc-400 text-lg">Input your challenge below, and our Gemini-powered engine will outline a disruptive BrandArcher 360° approach in seconds.</p>
          </div>

          {!strategy ? (
            <form onSubmit={handleSubmit} className="space-y-6 bg-black p-8 md:p-12 border border-zinc-800">
              {error && (
                <div className="bg-red-600/10 border border-red-600/20 text-red-500 p-4 text-xs font-bold uppercase tracking-widest mb-6">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Your Industry</label>
                  <input 
                    type="text" 
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="e.g. Fintech, Sustainable Fashion"
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Target Audience</label>
                  <input 
                    type="text" 
                    value={audience}
                    onChange={(e) => setAudience(e.target.value)}
                    placeholder="e.g. Gen Z Urbanites"
                    className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Primary Objective</label>
                <textarea 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  rows={3}
                  placeholder="e.g. Increase brand awareness by 50% in 6 months"
                  className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white focus:outline-none focus:border-red-600 transition-colors"
                ></textarea>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500 block">Inspiration Image (Optional)</label>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-6">
                    {!image ? (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-3 bg-zinc-900 border border-dashed border-zinc-700 p-6 text-zinc-500 hover:text-white hover:border-red-600 transition-all group w-full md:w-auto"
                      >
                        <ImageIcon size={24} className="group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Upload Moodboard</span>
                      </button>
                    ) : (
                      <div className="relative w-32 h-32 group">
                        <img src={image} alt="Inspiration" className="w-full h-full object-cover border border-zinc-800" />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute -top-2 -right-2 bg-red-600 text-white p-1.5 rounded-full shadow-lg hover:bg-white hover:text-black transition-all z-10"
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                          <span className="text-[8px] font-black uppercase text-white tracking-widest">Preview</span>
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
                    {image && (
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Image uploaded for AI inspiration</p>
                        <button 
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[8px] text-red-500 uppercase font-black tracking-widest hover:underline text-left"
                        >
                          Change Image
                        </button>
                      </div>
                    )}
                  </div>
                  {imageError && (
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest animate-pulse">
                      {imageError}
                    </p>
                  )}
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-red-600 py-5 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-black transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> Thinking...
                  </>
                ) : (
                  <>
                    Generate Strategy <Send size={18} />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="bg-white text-black p-8 md:p-12 border-l-8 border-red-600 animate-slide-up">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-2">The Concept</h3>
                  <p className="text-4xl font-black uppercase leading-none tracking-tighter">{strategy.creativeHook}</p>
                </div>
                <button 
                  onClick={() => setStrategy(null)}
                  className="text-[10px] font-black uppercase tracking-widest underline decoration-2 hover:text-red-600"
                >
                  Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-black uppercase text-xs tracking-widest border-b border-black/10 pb-2 mb-3">Objective</h4>
                    <p className="text-sm italic leading-relaxed">{strategy.objective}</p>
                  </div>
                  <div>
                    <h4 className="font-black uppercase text-xs tracking-widest border-b border-black/10 pb-2 mb-3">Tone of Voice</h4>
                    <p className="text-sm font-medium">{strategy.toneOfVoice}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-black uppercase text-xs tracking-widest border-b border-black/10 pb-2 mb-3">360° Media Mix</h4>
                  <ul className="space-y-3">
                    {strategy.mediaChannels.map((channel, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm">
                        <CheckCircle2 size={16} className="text-red-600 flex-shrink-0" />
                        <span>{channel}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Ready to take this further? Our team is waiting.</p>
                <a href="#contact" className="bg-black text-white px-10 py-4 font-black uppercase tracking-widest text-xs hover:bg-red-600 transition-colors">
                  Contact the Agency
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Decorative element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-red-600/5 -skew-x-12 translate-x-1/2 pointer-events-none"></div>
    </section>
  );
};

export default BriefGenerator;
