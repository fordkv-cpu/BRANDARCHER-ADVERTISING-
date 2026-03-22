
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, Phone, ExternalLink, Linkedin } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to BrandArcher. I'm Archer, your 360° strategy assistant. You can also chat directly with our lead strategist, Dheeraj Kumar, on WhatsApp.",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const linkedinUrl = "https://www.linkedin.com/in/fordkv?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: `That's an interesting point about your campaign. Would you like to discuss this directly with Dheeraj Kumar on WhatsApp?`,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const openWhatsApp = (text?: string) => {
    const baseUrl = "https://wa.me/919871700508";
    const message = text ? `?text=${encodeURIComponent(text)}` : "?text=Hello Dheeraj, I'm interested in BrandArcher's advertising services.";
    window.open(`${baseUrl}${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[400px] h-[580px] bg-zinc-950 border border-zinc-800 shadow-2xl flex flex-col overflow-hidden rounded-sm"
          >
            {/* Header */}
            <div className="bg-red-600 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-black flex items-center justify-center rounded-sm">
                  <Bot className="text-red-600" size={20} />
                </div>
                <div>
                  <h3 className="text-white text-sm font-black uppercase tracking-widest">Archer AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/70 font-bold uppercase">Strategic Support</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Strategist Profile Card */}
            <div className="bg-zinc-900/50 border-b border-zinc-800 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-800 bg-zinc-800">
                  <img 
                    src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=200" 
                    alt="Dheeraj Kumar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase tracking-widest text-white">Dheeraj Kumar</p>
                  <p className="text-[9px] text-zinc-500 font-bold uppercase">Lead Strategist</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a 
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white w-8 h-8 rounded-full transition-colors shadow-lg shadow-blue-600/20"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={14} />
                </a>
                <button 
                  onClick={() => openWhatsApp()}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-colors shadow-lg shadow-green-600/20"
                >
                  <Phone size={10} /> WhatsApp
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat opacity-95"
            >
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 text-sm ${
                    msg.sender === 'user' 
                    ? 'bg-red-600 text-white rounded-l-md rounded-tr-md shadow-lg shadow-red-600/10' 
                    : 'bg-zinc-900 text-zinc-300 border border-zinc-800 rounded-r-md rounded-tl-md'
                  }`}>
                    {msg.text}
                    {msg.sender === 'bot' && msg.id !== '1' && (
                       <button 
                        onClick={() => openWhatsApp(`Re: ${msg.text}`)}
                        className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase text-green-500 hover:text-green-400 transition-colors"
                       >
                         Discuss on WhatsApp <ExternalLink size={10} />
                       </button>
                    )}
                    <div className={`text-[9px] mt-1 opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 p-3 rounded-r-md rounded-tl-md">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-zinc-800 bg-black">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-zinc-900 border border-zinc-800 px-4 py-2 text-sm text-white focus:outline-none focus:border-red-600 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  className="bg-red-600 text-white p-2 hover:bg-white hover:text-black transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-3 flex flex-col items-center gap-2">
                <button 
                  onClick={() => openWhatsApp(inputValue)}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-300 hover:text-green-500 transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={12} className="text-green-500" /> Send via WhatsApp
                </button>
                <p className="text-[8px] font-bold uppercase tracking-widest text-zinc-600">
                  Direct Line to Dheeraj Kumar: +91-9871700508
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-3 bg-red-600 hover:bg-white text-white hover:text-black px-6 py-4 rounded-full shadow-[0_10px_40px_rgba(220,38,38,0.4)] transition-all duration-500 transform hover:scale-105 active:scale-95 overflow-hidden"
      >
        <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        <span className="relative z-10">
          {isOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </span>
        <div className="relative z-10 flex flex-col items-start leading-none">
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">
            {isOpen ? 'Close' : 'WhatsApp Chat with us'}
          </span>
          {!isOpen && (
            <span className="text-[8px] font-bold uppercase tracking-widest opacity-70 mt-0.5">
              Strategist Online
            </span>
          )}
        </div>
        
        {/* Notification Dot */}
        {!isOpen && (
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-red-600 animate-ping" />
        )}
      </button>
    </div>
  );
};

export default ChatWidget;
