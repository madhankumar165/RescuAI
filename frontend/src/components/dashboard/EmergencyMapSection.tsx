import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { MapMarkerItem } from '../../types';
import { DisasterMap } from '../DisasterMap';

interface EmergencyMapSectionProps {
  mapMarkers: MapMarkerItem[];
  focusCenter?: [number, number];
  onSelectMarker: (marker: MapMarkerItem) => void;
}

export const EmergencyMapSection: React.FC<EmergencyMapSectionProps> = ({
  mapMarkers,
  focusCenter,
  onSelectMarker,
}) => {
  return (
    <section className="space-y-6 text-center">
      {/* Centered Heading with Proper Spacing */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-extrabold uppercase tracking-wider">
          <MapPin className="w-3.5 h-3.5" /> Spatial Radar Intelligence
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Live Emergency Radar & Victim Map
        </h3>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Interactive map tracking incoming requests, locations, and victim counts around the world
        </p>

        <div className="pt-2">
          <span className="px-4 py-2 text-xs font-black rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            {mapMarkers.length} Locations Mapped
          </span>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.005 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="glass-panel p-4 md:p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4 bg-white dark:bg-slate-900"
      >
        <DisasterMap markers={mapMarkers} focusCenter={focusCenter} focusZoom={10} />
      </motion.div>
    </section>
  );
};
