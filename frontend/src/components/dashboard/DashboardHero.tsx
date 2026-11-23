import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, RefreshCw, Send, Bell, Activity, Radio
} from 'lucide-react';
import { GradientText } from '../common/GradientText';
import { WEATHER_ALERTS } from '../../constants/dashboard';
import { slideUp } from '../../animations/motion';

interface DashboardHeroProps {
  totalToday?: number;
  criticalCount?: number;
  loading: boolean;
  onRefresh: () => void;
  unreadNotifications: number;
  toggleNotifications: () => void;
  latestTickerMessage?: string;
}

export const DashboardHero: React.FC<DashboardHeroProps> = ({
  totalToday = 1294,
  criticalCount = 84,
  loading,
  onRefresh,
  unreadNotifications,
  toggleNotifications,
  latestTickerMessage,
}) => {
  const navigate = useNavigate();
  const [secondsAgo, setSecondsAgo] = useState(2);
  const [alertIdx, setAlertIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => (prev >= 59 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const alertTimer = setInterval(() => {
      setAlertIdx((prev) => (prev + 1) % WEATHER_ALERTS.length);
    }, 6000);
    return () => clearInterval(alertTimer);
  }, []);

  const activeAlert = WEATHER_ALERTS[alertIdx];

  return (
    <section className="relative pt-6 pb-6 flex flex-col items-center text-center space-y-8 max-w-5xl mx-auto">
      {/* Top Banner Row: System Status & Alert Bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-2">
        {/* System Online Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-black shadow-md backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-mono">
            🟢 SYSTEM ONLINE
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-600 dark:text-slate-400 font-semibold">
            Last Sync: <strong className="text-slate-900 dark:text-white font-mono">{secondsAgo}s ago</strong>
          </span>
        </div>

        {/* Live Weather / Disaster Alert Ticker */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeAlert.id}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className={`px-4 py-1.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-sm border max-w-xl truncate ${
              activeAlert.severity === 'RED'
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-300 dark:border-amber-800'
            }`}
          >
            <Radio className="w-3.5 h-3.5 text-rose-600 animate-pulse flex-shrink-0" />
            <span className="truncate">{activeAlert.title}</span>
          </motion.div>
        </AnimatePresence>

        {/* Notification Bell Button */}
        <button
          onClick={toggleNotifications}
          className="relative p-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-purple-500 shadow-md cursor-pointer transition-all flex-shrink-0 hover:scale-105"
        >
          <Bell className="w-4 h-4 text-purple-600" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center animate-bounce shadow-md">
              {unreadNotifications}
            </span>
          )}
        </button>
      </div>

      {/* Centered Hero Headline & Subtitle */}
      <div className="space-y-3 px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Emergency Relief &{' '}
          <GradientText variant="purple-pink">
            Live Disaster Radar
          </GradientText>
        </h1>

        <p className="text-sm md:text-base text-slate-700 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-semibold">
          Real-time AI monitoring, victim count estimation, real vs fake verification, and location-aware rescue operations.
        </p>
      </div>

      {/* Executive Quick Indicator Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-3xl px-2">
        <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Today's Requests</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{totalToday}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Critical Cases</span>
          <p className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">{criticalCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Live Radar</span>
          <p className="text-2xl font-black text-sky-600 dark:text-sky-400 font-mono">24 / 7 Active</p>
        </motion.div>

        <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-1">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Auto Refresh</span>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">{secondsAgo}s ago</p>
        </motion.div>
      </div>

      {/* Continuous Live Request Ticker */}
      <div className="w-full max-w-4xl p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200 flex items-center gap-3 overflow-hidden shadow-xl">
        <span className="px-3 py-1 rounded-xl bg-purple-600 text-white font-black text-[10px] uppercase flex items-center gap-1.5 flex-shrink-0">
          <Activity className="w-3.5 h-3.5 animate-bounce" /> LIVE TICKER
        </span>
        <div className="flex-1 truncate font-semibold text-emerald-400">
          "{latestTickerMessage || 'CRITICAL SOS! Monsoon flooding near Wayanad Kerala. 5 people trapped on roof requiring immediate NDRF boat team.'}"
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/dashboard/analyze')}
          className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-purple-600/25 cursor-pointer transition-all"
        >
          <Send className="w-4 h-4" />
          Send New Help Request
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => {
            setSecondsAgo(0);
            onRefresh();
          }}
          disabled={loading}
          className="px-7 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-extrabold text-xs flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50 transition-all"
        >
          <RefreshCw className={`w-4 h-4 text-purple-600 ${loading ? 'animate-spin' : ''}`} />
          Refresh Live Radar
        </motion.button>
      </div>
    </section>
  );
};
