import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Settings, 
  Check, 
  Loader2, 
  Tv, 
  ExternalLink, 
  Lock, 
  RefreshCw, 
  Play, 
  Radio, 
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth } from '../firebase';
import { GoogleGenAI } from '@google/genai';

// Compliance Error Handling
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface YoutubeSettings {
  channelId?: string;
  manualVideoId?: string;
  mode: 'auto' | 'manual';
  updatedAt: string;
  updatedBy: string;
}

// Robust YouTube Video ID extractor
const extractVideoId = (url: string): string => {
  if (!url) return '';
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|shorts\/)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : url.trim();
};

const YoutubeLive: React.FC = () => {
  const [settings, setSettings] = useState<YoutubeSettings>({
    mode: 'auto',
    manualVideoId: 'w5XVwMqpKnY', // Latest BrandArcher video fallback
    channelId: 'UCyCNYuDMWA4YllYn88V-TXQ', // BrandArcher YouTube Channel ID
    updatedAt: new Date().toISOString(),
    updatedBy: 'System Default'
  });

  const [activeVideoId, setActiveVideoId] = useState<string>('w5XVwMqpKnY');
  const [videoTitle, setVideoTitle] = useState<string>('Daily Creative Showcase');
  const [videoUrl, setVideoUrl] = useState<string>('');
  
  // UI States
  const [loading, setLoading] = useState<boolean>(true);
  const [rssLoading, setRssLoading] = useState<boolean>(false);
  const [rssError, setRssError] = useState<string | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState<boolean>(false);
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [writeError, setWriteError] = useState<string | null>(null);
  
  // Settings Forms state
  const [formMode, setFormMode] = useState<'auto' | 'manual'>('auto');
  const [formChannelId, setFormChannelId] = useState<string>('UCyCNYuDMWA4YllYn88V-TXQ');
  const [formVideoUrl, setFormVideoUrl] = useState<string>('');

  // 1. Listen to Admin Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAdminUser(user);
    });
    return () => unsubscribe();
  }, []);

  // 2. Real-time Sync of YoutubeSettings from Firestore
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'settings', 'youtube'), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as YoutubeSettings;
        setSettings(data);
        setFormMode(data.mode);
        setFormChannelId(data.channelId || '');
        setFormVideoUrl(data.manualVideoId ? `https://www.youtube.com/watch?v=${data.manualVideoId}` : '');
      }
      setLoading(false);
    }, (error) => {
      console.warn('YouTube settings document not found or access denied, using local defaults:', error);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // 3. Resolve Active Video ID based on settings and Mode
  useEffect(() => {
    if (loading) return;

    if (settings.mode === 'manual' && settings.manualVideoId) {
      setActiveVideoId(settings.manualVideoId);
      setVideoTitle('Featured Campaign Stream');
      setRssError(null);
    } else if (settings.mode === 'auto' && settings.channelId) {
      // Fetch latest video of this channel automatically via RSS
      setRssLoading(true);
      setRssError(null);
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${settings.channelId}`;

      // XML Parser for YouTube RSS feed
      const parseYoutubeRssXml = (xmlText: string) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
          
          const parserError = xmlDoc.getElementsByTagName('parsererror');
          if (parserError.length > 0) {
            console.warn('XML parsing warning inside DOMParser:', parserError[0].textContent);
          }

          const entries = xmlDoc.getElementsByTagName('entry');
          if (!entries || entries.length === 0) {
            return null;
          }

          const firstEntry = entries[0];
          
          // Helper to get text content matching localName (immune to namespace prefixes)
          const getChildTextByLocalName = (parent: Element, localName: string): string => {
            const children = parent.childNodes;
            for (let i = 0; i < children.length; i++) {
              const child = children[i] as Element;
              if (child.localName === localName || child.nodeName === localName || child.nodeName === `yt:${localName}`) {
                return child.textContent || '';
              }
            }
            return '';
          };

          let videoId = getChildTextByLocalName(firstEntry, 'videoId');
          const title = getChildTextByLocalName(firstEntry, 'title');

          if (!videoId) {
            const linkNode = firstEntry.getElementsByTagName('link')[0];
            const href = linkNode ? linkNode.getAttribute('href') : '';
            if (href) {
              videoId = extractVideoId(href);
            }
          }

          if (videoId) {
            return { id: videoId, title: title || 'Latest Daily Upload' };
          }
        } catch (e) {
          console.error('Error parsing YouTube RSS XML:', e);
        }
        return null;
      };

      interface ParsedVideo {
        id: string;
        title: string;
      }

      const fetchFeed = async () => {
        const strategies = [
          // Strategy 1: corsproxy.io
          async (): Promise<ParsedVideo> => {
            const res = await fetch(`https://corsproxy.io/?${encodeURIComponent(rssUrl)}`);
            if (!res.ok) throw new Error('corsproxy.io status ' + res.status);
            const xmlText = await res.text();
            const parsed = parseYoutubeRssXml(xmlText);
            if (!parsed) throw new Error('No valid video parsed from corsproxy.io XML');
            return parsed;
          },
          // Strategy 2: api.codetabs.com proxy
          async (): Promise<ParsedVideo> => {
            const res = await fetch(`https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`);
            if (!res.ok) throw new Error('api.codetabs.com status ' + res.status);
            const xmlText = await res.text();
            const parsed = parseYoutubeRssXml(xmlText);
            if (!parsed) throw new Error('No valid video parsed from codetabs XML');
            return parsed;
          },
          // Strategy 3: api.allorigins.win
          async (): Promise<ParsedVideo> => {
            const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
            if (!res.ok) throw new Error('AllOrigins status ' + res.status);
            const data = await res.json();
            if (!data.contents) throw new Error('AllOrigins returned empty contents');
            const parsed = parseYoutubeRssXml(data.contents);
            if (!parsed) throw new Error('No valid video parsed from AllOrigins XML');
            return parsed;
          },
          // Strategy 4: rss2json.com API
          async (): Promise<ParsedVideo> => {
            const jsonConverterUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
            const res = await fetch(jsonConverterUrl);
            if (!res.ok) throw new Error('rss2json status ' + res.status);
            const data = await res.json();
            if (data.status === 'ok' && data.items && data.items.length > 0) {
              const latestVideo = data.items[0];
              const parsedId = extractVideoId(latestVideo.link);
              if (parsedId) {
                return { id: parsedId, title: latestVideo.title || 'Latest Daily Upload' };
              }
            }
            throw new Error('rss2json parsing failed or empty list');
          },
          // Strategy 5: thingproxy
          async (): Promise<ParsedVideo> => {
            const res = await fetch(`https://thingproxy.freeboard.io/fetch/${encodeURIComponent(rssUrl)}`);
            if (!res.ok) throw new Error('thingproxy status ' + res.status);
            const xmlText = await res.text();
            const parsed = parseYoutubeRssXml(xmlText);
            if (!parsed) throw new Error('No valid video parsed from thingproxy XML');
            return parsed;
          },
          // Strategy 6: Gemini smart search grounding as a 100% resilient backend proxy bypass
          async (): Promise<ParsedVideo> => {
            const apiKey = process.env.GEMINI_API_KEY || '';
            if (!apiKey) throw new Error('No Gemini API key available for live search');
            const ai = new GoogleGenAI({ apiKey });
            const prompt = `Find the single latest YouTube video upload for the channel "@brandarcher" (channel ID "${settings.channelId}").
            Return ONLY a valid JSON object in the exact format:
            {"id": "VIDEO_ID", "title": "VIDEO_TITLE"}
            where VIDEO_ID is the 11-character YouTube video ID (e.g. "w5XVwMqpKnY") and VIDEO_TITLE is the video's title. Do not include any markdown format blocks or other text.`;
            
            const response = await ai.models.generateContent({
              model: "gemini-3.5-flash",
              contents: prompt,
              config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json"
              }
            });
            const text = response.text || '';
            const parsed = JSON.parse(text);
            if (parsed && parsed.id) {
              return { id: parsed.id, title: parsed.title || 'Latest BrandArcher Upload' };
            }
            throw new Error('Gemini live search returned invalid video format');
          }
        ];

        let lastError: Error | null = null;
        for (const strategy of strategies) {
          try {
            const video = await strategy();
            setActiveVideoId(video.id);
            setVideoTitle(video.title);
            setRssLoading(false);
            return; // Successful retrieval - exit early!
          } catch (err: any) {
            console.warn('YouTube live sync strategy failed:', err);
            lastError = err;
          }
        }

        // If we reach here, all dynamic fetch strategies failed
        console.error('All YouTube RSS fetch attempts failed:', lastError);
        setRssError('Auto-sync failed. Displaying latest featured stream.');
        setActiveVideoId(settings.manualVideoId || 'w5XVwMqpKnY');
        setRssLoading(false);
      };

      fetchFeed();
    }
  }, [settings, loading]);

  // Admin Actions
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error('Google Sign In Failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error('Sign Out Failed:', err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser || adminUser.email !== 'fordkv@gmail.com') return;

    setSaving(true);
    setSuccessMsg(null);
    setWriteError(null);

    try {
      const videoId = formVideoUrl ? extractVideoId(formVideoUrl) : '';
      const updatedSettings: YoutubeSettings = {
        mode: formMode,
        channelId: formChannelId.trim(),
        manualVideoId: videoId,
        updatedAt: new Date().toISOString(),
        updatedBy: adminUser.email || 'Anonymous Admin'
      };

      await setDoc(doc(db, 'settings', 'youtube'), updatedSettings);
      setSuccessMsg('Settings updated and synced successfully!');
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (error) {
      console.error('Save Settings Failed:', error);
      setWriteError(error instanceof Error ? error.message : 'Missing or insufficient permissions.');
    } finally {
      setSaving(false);
    }
  };

  const isAdminAuthenticated = adminUser?.email === 'fordkv@gmail.com';

  return (
    <section id="youtube-stream" className="bg-[#050505] py-24 md:py-32 border-y border-zinc-900 relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      <div className="absolute -left-48 top-1/4 w-96 h-96 bg-red-600/5 rounded-full filter blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-red-600"></span>
              <span className="text-red-600 text-xs font-black uppercase tracking-[0.5em]">Global Social Feed</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tighter leading-none text-white">
              YOUTUBE <span className="italic text-zinc-400">LIVE</span>
            </h2>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-600">Daily Broadcast Center</span>
            <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-900 px-4 py-2 rounded-sm">
              <span className={`w-2.5 h-2.5 rounded-full ${rssLoading ? 'bg-amber-500 animate-pulse' : 'bg-green-500 animate-pulse'}`} />
              <span className="text-xs font-black uppercase text-white tracking-widest">
                {rssLoading ? 'Syncing...' : 'Live Stream Online'}
              </span>
            </div>
          </div>
        </div>

        {/* Main Stream Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Cinematic Iframe Player (lg:col-span-8) */}
          <div className="lg:col-span-8 flex flex-col justify-between">
            <div className="relative aspect-video bg-zinc-950 border border-zinc-900 shadow-2xl p-2 group">
              
              {/* Corner brackets for cinematic framing */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-600" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-600" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-600" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-600" />
              
              {loading ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 gap-4">
                  <Loader2 className="animate-spin text-red-600" size={40} />
                  <span className="text-xs font-black uppercase tracking-widest">Tuning Broadcast...</span>
                </div>
              ) : (
                <iframe
                  className="w-full h-full object-cover relative z-10"
                  src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=0&mute=0&rel=0`}
                  title="Daily Live Stream Broadcast"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>

            {/* Video Status bar */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-950 border border-zinc-900/80 p-4 rounded-sm">
              <div className="flex items-center gap-3">
                <Youtube className="text-red-600 shrink-0" size={24} />
                <div>
                  <h4 className="text-white text-sm font-black uppercase tracking-wide line-clamp-1">
                    {videoTitle}
                  </h4>
                  <p className="text-zinc-600 text-[10px] uppercase font-bold tracking-wider mt-0.5">
                    Sync Mode: <span className="text-red-500 font-black">{settings.mode === 'auto' ? 'AUTO SYNC' : 'MANUAL OVERRIDE'}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <a 
                  href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-red-600 hover:bg-white hover:text-black text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest transition-all rounded-sm"
                >
                  Watch on YouTube <ExternalLink size={10} />
                </a>
              </div>
            </div>
          </div>

          {/* Context, Automation info, and Admin controls (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-zinc-950/40 border border-zinc-900 p-8 rounded-sm">
            <div>
              <div className="flex items-center gap-2 text-red-600 mb-6">
                <Radio size={16} className="animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest">Ecosystem Broadcast Narrative</span>
              </div>
              
              <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">
                Targeted Video Strategy
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                Our social ecosystem coordinates daily uploads, client campaigns, and behind-the-scenes masterclasses to align directly with live viewer feeds. 
              </p>

              <div className="space-y-4 border-t border-zinc-900 pt-6">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 font-bold uppercase tracking-wider">Sync Integrity</span>
                  <span className="text-green-500 font-black flex items-center gap-1 uppercase tracking-wider">
                    <CheckCircle size={12} /> SECURED
                  </span>
                </div>
                
                <div className="flex justify-between items-center text-xs">
                  <span className="text-zinc-600 font-bold uppercase tracking-wider">Last Feed Query</span>
                  <span className="text-zinc-400 font-bold uppercase tracking-wider">
                    {new Date(settings.updatedAt).toLocaleTimeString()}
                  </span>
                </div>

                {rssError && (
                  <div className="flex items-start gap-2 bg-red-950/10 border border-red-900/30 p-3 rounded-sm">
                    <AlertTriangle size={14} className="text-red-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-red-400 font-medium leading-normal uppercase">
                      {rssError}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Controls Trigger / Toggle */}
            <div className="mt-10 pt-6 border-t border-zinc-900">
              {showAdminPanel ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black uppercase tracking-wider text-red-600">Admin Live Control</span>
                    <button 
                      onClick={() => setShowAdminPanel(false)}
                      className="text-[10px] text-zinc-500 hover:text-white uppercase font-black tracking-widest"
                    >
                      Hide Settings
                    </button>
                  </div>

                  {!isAdminAuthenticated ? (
                    <div className="bg-zinc-950 border border-zinc-900 p-5 text-center">
                      <Lock className="mx-auto text-zinc-700 mb-3" size={24} />
                      <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-4">
                        Access restricted to Dheeraj Kumar (fordkv@gmail.com)
                      </p>
                      
                      {adminUser ? (
                        <div className="space-y-3">
                          <p className="text-[10px] text-red-400 font-bold uppercase">
                            Logged in as {adminUser.email} (Unauthorized)
                          </p>
                          <button 
                            onClick={handleLogout}
                            className="bg-zinc-900 border border-zinc-800 text-white text-[10px] px-4 py-2 font-black uppercase tracking-widest hover:bg-red-600 transition-colors w-full"
                          >
                            Sign Out
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={handleGoogleLogin}
                          className="bg-red-600 text-white text-[10px] px-6 py-2.5 font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors w-full"
                        >
                          Verify Google Credentials
                        </button>
                      )}
                    </div>
                  ) : (
                    // Authenticated Admin Settings Form
                    <form onSubmit={handleSaveSettings} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-green-500 font-black uppercase tracking-widest">
                          Authorized Agent Mode
                        </span>
                        <button 
                          type="button"
                          onClick={handleLogout}
                          className="text-[9px] text-zinc-500 hover:text-red-500 uppercase font-black tracking-widest"
                        >
                          Sign Out
                        </button>
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block mb-2">
                          Sync Strategy
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setFormMode('auto')}
                            className={`py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                              formMode === 'auto' 
                                ? 'bg-red-600 border-red-600 text-white' 
                                : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white'
                            }`}
                          >
                            Auto Sync Feed
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormMode('manual')}
                            className={`py-2 text-[10px] font-black uppercase tracking-widest border transition-all ${
                              formMode === 'manual' 
                                ? 'bg-red-600 border-red-600 text-white' 
                                : 'bg-zinc-950 border-zinc-900 text-zinc-500 hover:text-white'
                            }`}
                          >
                            Manual Override
                          </button>
                        </div>
                      </div>

                      {formMode === 'auto' ? (
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block mb-1.5">
                            YouTube Channel ID
                          </label>
                          <input 
                            type="text" 
                            value={formChannelId}
                            onChange={(e) => setFormChannelId(e.target.value)}
                            placeholder="e.g. UC_x5XG1OV2P6uZZ5FSM9Ttw"
                            className="w-full bg-zinc-950 border border-zinc-900 p-2.5 text-xs text-white focus:outline-none focus:border-red-600 font-mono"
                            required
                          />
                          <p className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest mt-1">
                            Find yours in your YouTube Advanced Settings or URL.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block mb-1.5">
                            Direct Video URL / ID
                          </label>
                          <input 
                            type="text" 
                            value={formVideoUrl}
                            onChange={(e) => setFormVideoUrl(e.target.value)}
                            placeholder="e.g. https://www.youtube.com/watch?v=..."
                            className="w-full bg-zinc-950 border border-zinc-900 p-2.5 text-xs text-white focus:outline-none focus:border-red-600 font-mono"
                            required
                          />
                          <p className="text-[8px] text-zinc-600 uppercase font-bold tracking-widest mt-1">
                            Supports full links, shorts, or raw 11-char IDs.
                          </p>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={saving}
                        className="w-full bg-white hover:bg-red-600 text-black hover:text-white font-black uppercase tracking-widest text-[10px] py-3 transition-colors flex items-center justify-center gap-2"
                      >
                        {saving ? (
                          <>
                            <Loader2 size={12} className="animate-spin" /> Updating Feed...
                          </>
                        ) : (
                          <>
                            <RefreshCw size={12} /> Sync & Broadcast
                          </>
                        )}
                      </button>

                      {successMsg && (
                        <div className="flex items-center gap-1.5 justify-center text-[10px] text-green-500 font-black uppercase animate-pulse">
                          <Check size={12} /> {successMsg}
                        </div>
                      )}

                      {writeError && (
                        <div className="flex items-start gap-1.5 justify-center text-[10px] text-red-500 font-bold uppercase p-2 border border-red-900/30 bg-red-950/10 rounded-sm">
                          <AlertTriangle size={12} className="shrink-0 mt-0.5" /> {writeError}
                        </div>
                      )}
                    </form>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="w-full bg-zinc-950 border border-zinc-900/60 hover:border-red-600 text-zinc-500 hover:text-white py-3 text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                >
                  <Settings size={12} /> Configure Broadcast Node
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default YoutubeLive;
