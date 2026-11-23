import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Send, User, Terminal, Sparkles, Clock, 
  MapPin, RefreshCw, Eye, Cpu, Radio, Command, ShieldCheck, Zap
} from 'lucide-react';
import { disasterApi } from '../services/api';
import { ChatMessage } from '../types';
import { PriorityBadge } from '../components/PriorityBadge';
import { useNavigate } from 'react-router-dom';

export const AiChatAssistantPage: React.FC = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'assistant',
      text: 'Hello Commander! I am your AI Emergency Operations Assistant. Ask me anything in natural language to query emergency help requests, victim density, or field resource demands.',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim()) return;

    const userMsg: ChatMessage = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    if (!promptToSend) setInputPrompt('');
    setLoading(true);

    try {
      const res = await disasterApi.sendChatMessage(text);
      const assistantMsg: ChatMessage = {
        sender: 'assistant',
        text: res.answer,
        sqlIntent: res.sql_intent,
        data: res.data,
        totalMatches: res.total_matches,
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: 'assistant', text: 'Apologies, I encountered an issue querying the database. Please try rephrasing your request.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const HUDPrompts = [
    { label: '🌊 Flood Emergencies', query: 'Show all flood requests' },
    { label: '🚨 Critical Cases', query: 'Show critical cases' },
    { label: '🏥 Medical Aid Needs', query: 'How many people need medical aid?' },
    { label: '🔥 Fire Incidents', query: 'Show fire incidents' },
    { label: '📍 Kerala / Wayanad SOS', query: 'Show requests near Wayanad' },
  ];

  const disasterIconsMap: Record<string, string> = {
    'Flood': '🌊',
    'Tsunami': '🌊',
    'Fire': '🔥',
    'Earthquake': '⚡',
    'Cyclone': '🌪️',
    'Landslide': '⛰️',
    'Building Collapse': '🏢',
    'Road Accident': '🚗',
  };

  return (
    <div className="space-y-8 pb-24 relative overflow-hidden">
      {/* UNIQUE CYBER-INDIGO HOLOGRAPHIC GLOW BACKDROP */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-gradient-to-r from-indigo-600/15 via-purple-600/15 to-cyan-500/15 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* DISTINCT TERMINAL HEADER */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-black uppercase tracking-widest shadow-md backdrop-blur-md">
          <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" /> Cyber-AI Command Terminal
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Holographic AI{' '}
          <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">
            Copilot Terminal
          </span>
        </h1>

        <p className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Natural Language SQL Query Assistant. Speak naturally to query emergency database records and extract real-time spatial insights.
        </p>

        {/* Live HUD System Specs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 text-xs font-black flex items-center gap-2 shadow-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            AI Core: Online (LLM SQL Engine v2.4)
          </span>

          <span className="px-4 py-1.5 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30 text-xs font-black flex items-center gap-2 shadow-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            Latency: ~140ms
          </span>

          <span className="px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-xs font-black flex items-center gap-2 shadow-xs font-mono">
            <Command className="w-3.5 h-3.5 text-purple-400" />
            Intent Translator: Active
          </span>
        </div>
      </div>

      {/* FLOATING HUD PRESET CHIPS BAR */}
      <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto px-2">
        <span className="text-slate-400 text-xs font-bold flex items-center gap-1.5 mr-1">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Quick HUD Queries:
        </span>
        {HUDPrompts.map((p, pIdx) => (
          <motion.button
            key={pIdx}
            whileHover={{ y: -3, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSend(p.query)}
            className="px-3.5 py-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800/80 hover:border-cyan-400 text-slate-800 dark:text-slate-200 text-xs font-black shadow-md cursor-pointer transition-all"
          >
            {p.label}
          </motion.button>
        ))}
      </div>

      {/* MAIN CHAT CONSOLE CONTAINER */}
      <div className="glass-panel rounded-3xl border border-indigo-200 dark:border-indigo-900/60 flex flex-col h-[700px] overflow-hidden shadow-2xl max-w-5xl mx-auto bg-white/90 dark:bg-slate-950/90 relative">
        {/* Terminal Header Bar */}
        <div className="p-4 border-b border-indigo-200 dark:border-indigo-900/60 bg-slate-100/90 dark:bg-slate-900/90 flex items-center justify-between z-10 backdrop-blur-md">
          <div className="flex items-center gap-2.5 text-xs font-black text-slate-900 dark:text-white">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-white flex items-center justify-center shadow-md">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <span className="block font-mono tracking-wider">AI EMERGENCY COPILOT</span>
              <span className="text-[10px] text-slate-500 font-semibold">Natural Language Interface</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-500" />
            LIVE MAP SYNC ENABLED
          </div>
        </div>

        {/* Conversation Log Viewport */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-slate-50/40 dark:bg-slate-950/60 text-left">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex items-start gap-3.5 ${
                m.sender === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              {/* Avatar Icon */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-lg ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
                    : 'bg-slate-900 border border-cyan-500/40 text-cyan-400'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble Container */}
              <div
                className={`max-w-2xl rounded-3xl p-5 space-y-3 text-xs font-semibold leading-relaxed shadow-xl ${
                  m.sender === 'user'
                    ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-indigo-900/60 text-slate-900 dark:text-slate-100'
                }`}
              >
                <div className="whitespace-pre-line font-sans text-sm">{m.text}</div>

                {/* SQL Query / Intent Inspection Terminal */}
                {m.sqlIntent && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-900/80 font-mono text-[11px] text-slate-300 space-y-2 shadow-inner">
                    <div className="flex items-center justify-between text-[10px] uppercase font-black text-cyan-400 border-b border-slate-800 pb-1.5">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" /> SQL Execution Stream
                      </span>
                      <span className="text-emerald-400">Status: 200 OK</span>
                    </div>
                    <code className="text-emerald-400 block leading-relaxed">{m.sqlIntent}</code>
                  </div>
                )}

                {/* Matching Database Result Cards */}
                {m.data && m.data.length > 0 && (
                  <div className="space-y-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-black text-slate-900 dark:text-white">
                      <span className="flex items-center gap-1.5 text-cyan-400">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Matching Database Emergency Records ({m.totalMatches || m.data.length}):
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-64 overflow-y-auto pr-1">
                      {m.data.map((item, dIdx) => (
                        <div
                          key={dIdx}
                          className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-indigo-950 text-xs space-y-2 hover:border-cyan-400 transition-all shadow-md"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                              <span>{disasterIconsMap[item.disaster || 'Emergency'] || '🚨'}</span>
                              #{item.id} - {item.disaster || 'Emergency'}
                            </span>
                            {item.priority && <PriorityBadge priority={item.priority} size="sm" />}
                          </div>

                          <p className="text-slate-700 dark:text-slate-300 font-semibold line-clamp-2 italic">
                            "{item.text}"
                          </p>

                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800/80">
                            <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                              <MapPin className="w-3.5 h-3.5" /> {item.location || 'Mapped Location'}
                            </span>

                            <button
                              onClick={() => navigate('/dashboard/history')}
                              className="px-3 py-1 rounded-xl bg-purple-600 text-white text-[10px] font-black flex items-center gap-1 hover:bg-purple-500 cursor-pointer shadow-sm transition-all"
                            >
                              <Eye className="w-3 h-3" /> View Incident Details
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}

          {/* AI Thinking Animation */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 text-xs font-black text-cyan-400"
            >
              <div className="w-9 h-9 rounded-2xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <span className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-md italic flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                Translating natural query to SQL & querying emergency database...
              </span>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT BAR */}
        <div className="p-4 border-t border-indigo-200 dark:border-indigo-900/60 bg-white/95 dark:bg-slate-900/95">
          <div className="flex items-center gap-2 max-w-4xl mx-auto">
            <input
              type="text"
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask a question in plain English (e.g. 'Show critical flood cases near Wayanad')..."
              className="flex-1 px-5 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-indigo-900/60 text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-cyan-400 shadow-inner"
            />
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSend()}
              disabled={loading || !inputPrompt.trim()}
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white text-xs font-black flex items-center gap-2 shadow-xl disabled:opacity-50 cursor-pointer transition-all"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              Send Query
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
