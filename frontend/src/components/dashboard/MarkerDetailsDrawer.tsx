import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, MapPin, Users, AlertCircle, Phone, ShieldCheck, HeartHandshake, Navigation, CheckCircle2 
} from 'lucide-react';
import { MapMarkerItem } from '../../types';
import { PriorityBadge } from '../PriorityBadge';
import { ResourceBadge } from '../ResourceBadge';

interface MarkerDetailsDrawerProps {
  marker: MapMarkerItem | null;
  onClose: () => void;
  onNavigateToLocation?: (lat: number, lng: number) => void;
}

export const MarkerDetailsDrawer: React.FC<MarkerDetailsDrawerProps> = ({
  marker,
  onClose,
  onNavigateToLocation,
}) => {
  if (!marker) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 300 }}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-6 overflow-y-auto space-y-5 text-left"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-xl">
              #{marker.id}
            </span>
            <PriorityBadge priority={marker.priority} size="sm" />
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disaster & Location Title */}
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            {marker.title} Emergency Case
          </h3>
          <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            {marker.location_name} ({marker.latitude}, {marker.longitude})
          </p>
        </div>

        {/* Original Emergency Message Text */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
            Emergency Help Text
          </span>
          <p className="text-xs font-bold text-slate-900 dark:text-slate-100 italic leading-relaxed">
            "{marker.text}"
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3 text-xs font-bold">
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
            <span className="text-slate-500 text-[10px] uppercase block">Urgency Score</span>
            <span className="text-rose-600 dark:text-rose-400 text-lg font-black">{marker.severity_score}/100</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="text-slate-500 text-[10px] uppercase block">Victim Count</span>
            <span className="text-amber-600 dark:text-amber-400 text-lg font-black">{marker.victim_count} People</span>
          </div>
        </div>

        {/* Needed Supplies */}
        {marker.resources && marker.resources.length > 0 && (
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
              Needed Supplies & Help:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {marker.resources.map((r, i) => (
                <ResourceBadge key={i} name={r} />
              ))}
            </div>
          </div>
        )}

        {/* Assigned Field Rescue Team */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
          <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-300 font-extrabold text-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            Assigned Rescue Squad:
          </div>
          <p className="text-xs font-black text-slate-900 dark:text-white">
            NDRF Response Unit 3 (East Division)
          </p>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 pt-1 border-t border-emerald-200 dark:border-emerald-800">
            <span>Estimated Response: <strong className="text-emerald-600 dark:text-emerald-400">12 min</strong></span>
            <span>Status: <strong className="text-purple-600 dark:text-purple-400 uppercase">{marker.status}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col gap-2">
          <button
            onClick={() => {
              if (onNavigateToLocation) {
                onNavigateToLocation(marker.latitude, marker.longitude);
              }
              onClose();
            }}
            className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-md cursor-pointer"
          >
            <Navigation className="w-4 h-4" /> Focus Camera & Draw Shortest Route
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
