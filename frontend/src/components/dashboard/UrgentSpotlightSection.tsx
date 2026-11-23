import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, MapPin, Users, Clock, ShieldCheck, Navigation, Eye } from 'lucide-react';
import { Message } from '../../types';
import { PriorityBadge } from '../PriorityBadge';
import { DisasterBadge } from '../DisasterBadge';
import { ResourceBadge } from '../ResourceBadge';
import BorderGlow from '../common/BorderGlow';
import { RESCUE_TEAMS } from '../../constants/dashboard';
import { useTheme } from '../../context/ThemeContext';

interface UrgentSpotlightSectionProps {
  urgentMessages: Message[];
  onSelectMessage?: (msg: Message) => void;
  onNavigateToMap?: (lat: number, lng: number) => void;
}

export const UrgentSpotlightSection: React.FC<UrgentSpotlightSectionProps> = ({
  urgentMessages,
  onSelectMessage,
  onNavigateToMap,
}) => {
  const { theme } = useTheme();
  const [assignedMap, setAssignedMap] = useState<Record<number, string>>({});

  const handleAssignTeam = (msgId: number, team: string) => {
    setAssignedMap((prev) => ({ ...prev, [msgId]: team }));
  };

  return (
    <section className="space-y-8 text-center">
      {/* Centered Heading with Proper Spacing */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 text-xs font-extrabold uppercase tracking-wider">
          <ShieldAlert className="w-3.5 h-3.5" /> High Urgency Alert Spotlight
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Urgent Cases Requiring Immediate Field Dispatch
        </h3>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Critical and High priority emergency requests with live response ETA and assigned rescue squads
        </p>

        <span className="px-4 py-1.5 text-xs font-black rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 mt-2">
          {urgentMessages.length} Urgent Incidents Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
        {urgentMessages.map((msg, idx) => {
          const assignedTeam = assignedMap[msg.id] || RESCUE_TEAMS[idx % RESCUE_TEAMS.length];
          const etaMinutes = 8 + (msg.id % 15);
          const progressPercent = Math.min(95, Math.max(30, 100 - (msg.severity_score % 40)));

          return (
            <motion.div
              key={msg.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <BorderGlow
                borderRadius={28}
                glowRadius={35}
                edgeSensitivity={35}
                glowIntensity={1.2}
                colors={msg.priority_level === 'Critical' ? ['#ef4444', '#f472b6', '#dc2626'] : ['#f97316', '#fbbf24', '#ea580c']}
                backgroundColor={theme === 'dark' ? '#0f172a' : '#ffffff'}
                className="transition-all hover:shadow-2xl"
              >
                <div className="p-6 space-y-4">
                  {/* Header Row */}
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl">
                        #{msg.id}
                      </span>
                      <PriorityBadge priority={msg.priority_level} size="sm" />
                      <DisasterBadge type={msg.disaster_type} />
                    </div>
                    <span className="font-black text-xs text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-3 py-1 rounded-xl border border-rose-200 dark:border-rose-800">
                      Urgency: {msg.severity_score}/100
                    </span>
                  </div>

                  {/* Main Message */}
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-relaxed">
                    "{msg.original_text}"
                  </p>

                  {/* Location & Victim Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-extrabold">
                    <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                      <MapPin className="w-3.5 h-3.5" /> {msg.location_name || 'Unknown'}
                    </span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Users className="w-3.5 h-3.5" /> {msg.victim_count} Victims
                    </span>
                  </div>

                  {/* Response ETA & Assigned Team */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-bold pt-1">
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 text-[10px] uppercase block flex items-center gap-1">
                        <Clock className="w-3 h-3 text-purple-500" /> Estimated Response
                      </span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">{etaMinutes} mins ETA</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      <span className="text-slate-500 text-[10px] uppercase block flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> Assigned Rescue Team
                      </span>
                      <span className="text-slate-900 dark:text-white font-extrabold text-xs truncate block">{assignedTeam}</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] font-extrabold">
                      <span className="text-slate-500">Rescue Operation Progress</span>
                      <span className="text-purple-600 dark:text-purple-400 font-mono">{progressPercent}%</span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Resources */}
                  {msg.resources && msg.resources.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {msg.resources.map((r, i) => (
                        <ResourceBadge key={i} name={r.resource_name} />
                      ))}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-slate-200 dark:border-slate-800">
                    {onSelectMessage && (
                      <button
                        onClick={() => onSelectMessage(msg)}
                        className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-black flex items-center gap-1.5 hover:bg-slate-200 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Details
                      </button>
                    )}

                    <select
                      value={assignedTeam}
                      onChange={(e) => handleAssignTeam(msg.id, e.target.value)}
                      className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-black focus:outline-none cursor-pointer border border-slate-300 dark:border-slate-700"
                    >
                      {RESCUE_TEAMS.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>

                    {onNavigateToMap && msg.latitude !== undefined && msg.longitude !== undefined && (
                      <button
                        onClick={() => onNavigateToMap(msg.latitude!, msg.longitude!)}
                        className="px-3.5 py-2 rounded-xl bg-purple-600 text-white text-xs font-black flex items-center gap-1.5 hover:bg-purple-500 shadow-md cursor-pointer ml-auto"
                      >
                        <Navigation className="w-3.5 h-3.5" /> Navigate
                      </button>
                    )}
                  </div>
                </div>
              </BorderGlow>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
