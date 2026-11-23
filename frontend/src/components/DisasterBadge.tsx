import React from 'react';
import { 
  Waves, Flame, CloudRain, ShieldAlert, Mountain, 
  Building2, Car, AlertTriangle 
} from 'lucide-react';

interface DisasterBadgeProps {
  type: string;
}

export const DisasterBadge: React.FC<DisasterBadgeProps> = ({ type }) => {
  const getIcon = () => {
    switch (type?.toLowerCase()) {
      case 'flood': return <Waves className="w-3.5 h-3.5 text-blue-400" />;
      case 'fire': return <Flame className="w-3.5 h-3.5 text-rose-400" />;
      case 'cyclone': return <CloudRain className="w-3.5 h-3.5 text-cyan-400" />;
      case 'earthquake': return <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />;
      case 'landslide': return <Mountain className="w-3.5 h-3.5 text-emerald-400" />;
      case 'tsunami': return <Waves className="w-3.5 h-3.5 text-teal-400" />;
      case 'building collapse': return <Building2 className="w-3.5 h-3.5 text-purple-400" />;
      case 'road accident': return <Car className="w-3.5 h-3.5 text-yellow-400" />;
      default: return <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200">
      {getIcon()}
      {type}
    </span>
  );
};
