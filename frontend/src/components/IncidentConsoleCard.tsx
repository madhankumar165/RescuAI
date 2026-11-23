import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertTriangle, MapPin, Users, Phone, ShieldCheck, ShieldAlert, 
  Clock, Activity, Calendar, Navigation, Eye, Cpu, ChevronDown, Check, Zap, Layers, Flame, Compass, Radio, Terminal
} from 'lucide-react';
import { Message } from '../types';
import { PriorityBadge } from './PriorityBadge';
import { DisasterBadge } from './DisasterBadge';
import BorderGlow from './common/BorderGlow';
import { useTheme } from '../context/ThemeContext';

interface IncidentConsoleCardProps {
  msg: Message;
  idx: number;
  updatingId: number | null;
  onStatusChange: (id: number, status: string) => void;
  onInspectDetails: (msg: Message) => void;
}

export const IncidentConsoleCard: React.FC<IncidentConsoleCardProps> = ({
  msg,
  idx,
  updatingId,
  onStatusChange,
  onInspectDetails,
}) => {
  const { theme } = useTheme();
  const [isExpandedText, setIsExpandedText] = useState(false);

  const severityScore = Math.round(msg.severity_score);
  const isReal = msg.is_real !== false;

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

  const emoji = disasterIconsMap[msg.disaster_type] || '🚨';

  // 6-stage rescue pipeline mapping
  const pipelineStages = ['Pending', 'Assigned', 'Moving', 'Reached', 'Rescue', 'Resolved'];

  const getStageIndex = (status: string) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Assigned': return 1;
      case 'Moving': return 2;
      case 'Reached': return 3;
      case 'Rescue': return 4;
      case 'Resolved': return 5;
      default: return 0;
    }
  };

  const currentStageIdx = getStageIndex(msg.status);

  const getPriorityGlowColors = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'critical':
        return ['#ef4444', '#f472b6', '#dc2626'];
      case 'high':
        return ['#f97316', '#fbbf24', '#ea580c'];
      case 'medium':
        return ['#3b82f6', '#38bdf8', '#2563eb'];
      default:
        return ['#10b981', '#34d399', '#059669'];
    }
  };

  // AI Highlighting for Message Text
  const renderHighlightedMessage = (text: string) => {
    const dangerWords = ['CRITICAL', 'SOS', 'trapped', 'flooding', 'fire', 'earthquake', 'collapsed', 'rubble', 'emergency', 'urgent', 'water levels', 'storm surge'];
    const locationNames = ['Wayanad', 'Kerala', 'Houston', 'San Francisco', 'Los Angeles', 'Miami', 'Chennai', 'Mumbai', 'Delhi', 'Kolkata', 'Bangalore', 'TX', 'CA', 'FL'];
    const resourceNames = ['drinking water', 'water', 'medical aid', 'rescue team', 'insulin', 'shelter', 'burn ointment', 'firefighter', 'evacuation boat', 'food', 'clothes'];

    const words = text.split(/(\s+)/);
    return words.map((word, wIdx) => {
      const cleanWord = word.replace(/[^\w]/g, '');
      const lowerWord = word.toLowerCase();

      if (dangerWords.some((d) => lowerWord.includes(d.toLowerCase()))) {
        return (
          <span key={wIdx} className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 font-black border border-rose-500/30">
            {word}
          </span>
        );
      }
      if (locationNames.some((loc) => cleanWord.toLowerCase() === loc.toLowerCase())) {
        return (
          <span key={wIdx} className="px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-600 dark:text-purple-300 font-extrabold border border-purple-500/30">
            📍 {word}
          </span>
        );
      }
      if (resourceNames.some((r) => lowerWord.includes(r.toLowerCase()))) {
        return (
          <span key={wIdx} className="px-1 py-0.5 rounded bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 font-extrabold border border-emerald-500/30">
            {word}
          </span>
        );
      }
      if (/\d+/.test(word) && (lowerWord.includes('people') || lowerWord.includes('family') || lowerWord.includes('elderly') || lowerWord.includes('victims') || lowerWord.includes('residents'))) {
        return (
          <span key={wIdx} className="px-1 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-300 font-black border border-amber-500/30">
            👥 {word}
          </span>
        );
      }
      if (/\d{3}[-\s]?\d{3}[-\s]?\d{4}/.test(word) || /\d{10}/.test(word)) {
        return (
          <span key={wIdx} className="px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-300 font-mono font-black border border-sky-500/30">
            📞 {word}
          </span>
        );
      }
      return <span key={wIdx}>{word}</span>;
    });
  };

  // Circular Severity SVG Math
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (severityScore / 100) * circumference;

  return (
    <BorderGlow
      borderRadius={28}
      glowRadius={40}
      edgeSensitivity={35}
      glowIntensity={1.2}
      colors={getPriorityGlowColors(msg.priority_level)}
      backgroundColor={theme === 'dark' ? '#0b0f19' : '#ffffff'}
      className="transition-all hover:shadow-2xl text-left"
    >
      <div className="p-6 md:p-8 space-y-6">
        {/* TOP STATUS BAR: ID, Verification Badge, Duplicate Check, Timestamp */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800/80 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-black text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              COMMAND CASE #{msg.id}
            </span>

            <PriorityBadge priority={msg.priority_level} size="sm" />
            <DisasterBadge type={msg.disaster_type} />

            {/* Authenticity Verification Badge */}
            {isReal ? (
              <span className="text-[10px] font-black text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                VERIFIED REAL ({msg.authenticity_score ?? 92}%)
              </span>
            ) : (
              <span className="text-[10px] font-black text-rose-700 dark:text-rose-300 bg-rose-500/15 px-3 py-1 rounded-xl border border-rose-500/30 flex items-center gap-1.5 animate-pulse shadow-xs">
                <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
                SUSPECTED FAKE ({msg.authenticity_score ?? 30}%)
              </span>
            )}

            {msg.is_duplicate && (
              <span className="text-[10px] font-black text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2.5 py-1 rounded-xl border border-amber-500/30 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-amber-500" />
                Duplicate #{msg.duplicate_of_id}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-500 font-mono">
              <Calendar className="w-3.5 h-3.5 text-purple-500" />
              {new Date(msg.created_at).toLocaleDateString()} {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>

            <button
              onClick={() => onInspectDetails(msg)}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer transition-all hover:scale-105"
            >
              <Eye className="w-3.5 h-3.5" /> Inspect Console Details
            </button>
          </div>
        </div>

        {/* THREE PANEL INCIDENT CONSOLE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* LEFT PANEL (35% -> col-span-4): Emergency Summary & Circular Severity Gauge */}
          <div className="lg:col-span-4 p-5 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-5 flex flex-col justify-between shadow-inner">
            {/* Header & Icon */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-600 to-amber-600 border border-rose-400 shadow-lg flex items-center justify-center text-2xl">
                  {emoji}
                </div>
                <div>
                  <h4 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                    {msg.disaster_type} Emergency
                  </h4>
                  <span className="text-[11px] font-mono font-bold text-slate-500">ID: #{msg.id}</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-xl bg-purple-500/20 text-purple-400 text-[10px] font-black uppercase tracking-wider font-mono border border-purple-500/30">
                {msg.status}
              </span>
            </div>

            {/* Circular Severity Gauge */}
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md relative overflow-hidden">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-rose-500 animate-pulse" /> Urgency Index Gauge
              </span>

              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-slate-200 dark:text-slate-800"
                    fill="transparent"
                  />
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    stroke="url(#severityGrad)"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="transition-all duration-1000 ease-out"
                  />
                  <defs>
                    <linearGradient id="severityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </svg>

                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white font-mono leading-none">
                    {severityScore}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">/ 100 Index</span>
                </div>
              </div>

              <span className="text-xs font-black text-rose-600 dark:text-rose-400 mt-2 uppercase tracking-wider">
                {severityScore >= 75 ? 'CRITICAL SEVERITY' : severityScore >= 50 ? 'HIGH SEVERITY' : 'MODERATE SEVERITY'}
              </span>
            </div>

            {/* AI Confidence & Incident Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-1">
              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">AI Confidence</span>
                <span className="text-emerald-600 dark:text-emerald-400 text-sm font-black font-mono">
                  {((msg.confidence_score || 0.95) * 100).toFixed(0)}%
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 text-[10px] uppercase block">Assigned Squad</span>
                <span className="text-purple-600 dark:text-purple-400 text-xs font-extrabold truncate block">
                  NDRF Team 1
                </span>
              </div>
            </div>
          </div>

          {/* CENTER PANEL (40% -> col-span-5): Message Content & Timeline Blocks */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            {/* Highlighted Message Card */}
            <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> AI NLP Entity-Highlighted Message
                </span>
                {msg.original_text.length > 120 && (
                  <button
                    onClick={() => setIsExpandedText(!isExpandedText)}
                    className="text-[11px] font-bold text-slate-500 hover:text-purple-500 cursor-pointer"
                  >
                    {isExpandedText ? 'Show Less ▲' : 'Read Full ▼'}
                  </button>
                )}
              </div>

              <p className={`text-sm md:text-base font-bold text-slate-900 dark:text-slate-100 leading-relaxed font-sans ${!isExpandedText ? 'line-clamp-3' : ''}`}>
                "{renderHighlightedMessage(msg.original_text)}"
              </p>
            </div>

            {/* Timeline Blocks Grid: Location, Victims, Phone & Demographics */}
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-purple-500" /> Target Location
                </span>
                <span className="text-slate-900 dark:text-white font-black truncate block text-sm">
                  {msg.location_name || 'Unknown Site'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 flex items-center gap-1">
                  <Users className="w-3 h-3 text-amber-500" /> Victim Impact Count
                </span>
                <span className="text-amber-600 dark:text-amber-400 font-black text-sm font-mono">
                  {msg.victim_count} People Trapped
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-sky-500" /> Emergency Contact
                </span>
                <span className="text-sky-600 dark:text-sky-400 font-black truncate block font-mono text-xs">
                  {msg.phone_number || 'N/A'}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-0.5">
                <span className="text-[10px] font-extrabold uppercase text-slate-500 flex items-center gap-1">
                  <Clock className="w-3 h-3 text-emerald-500" /> Dispatch Response ETA
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-black text-xs font-mono">
                  ~12 mins ETA
                </span>
              </div>
            </div>

            {/* Demographics & Resource Cards */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {msg.contains_children && (
                  <span className="px-2.5 py-1 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-300 border border-pink-500/30 text-[10px] font-black">
                    👶 Children Present
                  </span>
                )}
                {msg.contains_elderly && (
                  <span className="px-2.5 py-1 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/30 text-[10px] font-black">
                    👴 Elderly Present
                  </span>
                )}
                {msg.contains_disabled && (
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-black">
                    ♿ Special Assistance
                  </span>
                )}
              </div>

              {/* Modern Needed Aid Cards */}
              <div className="grid grid-cols-2 gap-2">
                {msg.resources && msg.resources.length > 0 ? (
                  msg.resources.map((r, rIdx) => (
                    <div key={rIdx} className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-bold">
                      <span className="text-purple-600 dark:text-purple-400 font-black">{r.resource_name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 font-mono">High Priority</span>
                    </div>
                  ))
                ) : (
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 text-xs font-semibold col-span-2">
                    General Rescue Assistance Required
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL (25% -> col-span-3): AI Incident Copilot & Risk Recommendation */}
          <div className="lg:col-span-3 p-5 rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-inner">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                <Cpu className="w-4 h-4 text-purple-600 animate-spin" /> AI Copilot Analysis
              </div>

              <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs font-semibold">
                <p className="text-slate-900 dark:text-slate-100 font-extrabold flex items-start gap-1.5">
                  <span className="text-purple-500">•</span> High risk {msg.disaster_type} emergency at {msg.location_name || 'site'}.
                </p>
                <p className="text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                  <span className="text-amber-500">•</span> {msg.victim_count} victims requiring immediate rescue & assistance.
                </p>
                <p className="text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                  <span className="text-emerald-500">•</span> Dispatch NDRF Team 1 with inflatable boat & medical kit.
                </p>
                <p className="text-slate-700 dark:text-slate-300 flex items-start gap-1.5">
                  <span className="text-rose-500">•</span> Evacuation route clear via West Corridor.
                </p>
              </div>
            </div>

            {/* Environmental & Logistics Risks */}
            <div className="space-y-1.5 text-[11px] font-bold">
              <div className="flex justify-between text-slate-500">
                <span>Weather Risk:</span>
                <span className="text-rose-500 font-black">Monsoon Heavy Rain</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Nearest Hospital:</span>
                <span className="text-slate-800 dark:text-slate-200 font-black">City General (3.2km)</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Traffic Risk:</span>
                <span className="text-emerald-500 font-black">Low Corridor Delay</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Predicted Escalation:</span>
                <span className="text-amber-500 font-black">Moderate</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: HORIZONTAL 6-STAGE RESCUE PIPELINE */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3 text-left">
          <div className="flex items-center justify-between text-xs font-black">
            <span className="text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-purple-600" /> Interactive Field Rescue Pipeline Status:
            </span>
            <span className="text-purple-600 dark:text-purple-400 font-mono uppercase bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/30">
              CURRENT STAGE: {msg.status}
            </span>
          </div>

          {/* Connected 6-Stage Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 relative">
            {pipelineStages.map((stageName, sIdx) => {
              const isActive = sIdx <= currentStageIdx;
              const isCurrent = sIdx === currentStageIdx;

              return (
                <button
                  key={stageName}
                  disabled={updatingId === msg.id || msg.status === stageName}
                  onClick={() => onStatusChange(msg.id, stageName)}
                  className={`p-3 rounded-2xl text-xs font-black flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer disabled:opacity-90 ${
                    isCurrent
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500 shadow-lg scale-105'
                      : isActive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-purple-500'
                  }`}
                >
                  <span className="text-[10px] font-mono opacity-75">STAGE 0{sIdx + 1}</span>
                  <span className="truncate text-xs font-black">{stageName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </BorderGlow>
  );
};
