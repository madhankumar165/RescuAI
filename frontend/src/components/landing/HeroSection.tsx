import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Activity, MapPin, Users, Zap, Bot, ShieldAlert, Send, CheckCircle2, X } from 'lucide-react';
import { GradientText } from '../common/GradientText';
import { TypingText } from '../common/TypingText';
import { slideUp, zoomIn } from '../../animations/motion';
import { disasterApi } from '../../services/api';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const [showSosModal, setShowSosModal] = useState(false);
  const [sosText, setSosText] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<any>(null);

  const handleSosSubmit = async () => {
    if (!sosText.trim()) return;
    setLoading(true);
    try {
      const res = await disasterApi.predictMessage(sosText);
      setSubmittedMessage(res);
    } catch (err) {
      console.error('Failed to post emergency SOS', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
      {/* Top Pill Badge */}
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-purple-500/30 text-xs font-black text-purple-600 dark:text-purple-400 mb-8 shadow-md backdrop-blur-md"
      >
        <Sparkles className="w-3.5 h-3.5 text-pink-500 animate-pulse" />
        <span>Smart AI for Emergency Help & Disaster Rescue</span>
        <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] max-w-5xl"
      >
        AI-Powered Emergency Relief for{' '}
        <GradientText variant="purple-pink">
          <TypingText
            words={['Faster Rescue Teams', 'Food & Medical Aid', 'Live Emergency Maps']}
          />
        </GradientText>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="mt-6 text-base md:text-lg text-slate-700 dark:text-slate-300 max-w-2xl leading-relaxed font-semibold"
      >
        Automatically reads emergency messages, finds locations, counts victims, and sends food, water, and medical aid to people in need instantly.
      </motion.p>

      {/* Call to Action Buttons */}
      <motion.div
        variants={slideUp}
        initial="hidden"
        animate="visible"
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        {/* Public SOS Request Button */}
        <button
          onClick={() => setShowSosModal(true)}
          className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl shadow-rose-600/30 hover:scale-[1.02] transition-all cursor-pointer"
        >
          <ShieldAlert className="w-4 h-4 animate-bounce" />
          🚨 Send Emergency SOS Request
        </button>

        <Link
          to="/signup"
          className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-2xl shadow-purple-600/30 hover:scale-[1.02] transition-all cursor-pointer"
        >
          Get Started Free
          <ArrowRight className="w-4 h-4" />
        </Link>

        <Link
          to="/dashboard"
          className="px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-extrabold text-xs flex items-center gap-2 backdrop-blur-md hover:scale-[1.02] transition-all cursor-pointer shadow-md"
        >
          <Activity className="w-4 h-4 text-emerald-500" />
          Live Emergency Map
        </Link>
      </motion.div>

      {/* Floating Mockup Preview Area */}
      <motion.div
        variants={zoomIn}
        initial="hidden"
        animate="visible"
        className="mt-16 w-full max-w-5xl relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 via-pink-600/20 to-indigo-500/20 rounded-3xl blur-3xl -z-10" />

        <div className="glass-panel p-4 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden text-left relative space-y-4 bg-white/90 dark:bg-slate-900/90">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
              </div>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">rescuai.org/live-map</span>
            </div>
            <span className="px-2.5 py-1 text-[11px] font-extrabold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> Live Stream
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Incoming Message Triage
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-red-500/20 text-red-600 dark:text-red-400 rounded-full border border-red-500/30">
                  Urgent Help Needed
                </span>
              </div>

              <p className="text-xs text-slate-900 dark:text-slate-100 font-mono font-semibold leading-relaxed bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                "URGENT! Flood water rising fast near Main St, Houston. 4 elderly people trapped inside bungalow without drinking water or insulin. Call 555-0199!"
              </p>

              <div className="flex flex-wrap items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 gap-2">
                <span className="flex items-center gap-1 text-slate-800 dark:text-slate-200">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" /> Houston, TX
                </span>
                <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
                  <Users className="w-3.5 h-3.5" /> 4 Victims (Elderly)
                </span>
                <span className="text-emerald-600 dark:text-emerald-400">Urgency: 92.5 / 100</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-950 border border-purple-200 dark:border-purple-900/50 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-purple-900 dark:text-white mb-2">
                  <Bot className="w-4 h-4 text-purple-600 dark:text-purple-400" /> AI Assistant
                </div>
                <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 italic">"Show all flood cases needing medical aid..."</p>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold border border-slate-200 dark:border-slate-800">
                ✓ 14 matching help requests found
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Public Emergency SOS Request Modal */}
      {showSosModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-left relative"
          >
            <button
              onClick={() => {
                setShowSosModal(false);
                setSubmittedMessage(null);
                setSosText('');
              }}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black text-lg">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
              Emergency SOS Help Form
            </div>

            {submittedMessage ? (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Help Request Sent Successfully!</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Your help request has been analyzed and pinned on the Live Emergency Map for rescue teams.
                  </p>
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-black shadow-md cursor-pointer hover:bg-purple-500"
                  >
                    View Live Emergency Map 📍
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Type what help you need below. Our AI will instantly find your location, count people, and notify rescue teams.
                </p>

                <textarea
                  rows={4}
                  value={sosText}
                  onChange={(e) => setSosText(e.target.value)}
                  placeholder="e.g. Help! Flood water rising fast in Houston TX. 4 people trapped on roof needing clean water and medical aid. Call 555-0199..."
                  className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-rose-500"
                />

                <button
                  onClick={handleSosSubmit}
                  disabled={loading || !sosText.trim()}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-red-600 to-amber-600 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-rose-600/30 disabled:opacity-50 cursor-pointer"
                >
                  {loading ? <Activity className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Send SOS Request Now
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
};
