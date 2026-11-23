import React from 'react';
import { 
  Utensils, Droplets, Stethoscope, Home, 
  LifeBuoy, Pill, Shirt, FlameKindling 
} from 'lucide-react';

interface ResourceBadgeProps {
  name: string;
}

export const ResourceBadge: React.FC<ResourceBadgeProps> = ({ name }) => {
  const getIcon = () => {
    switch (name?.toLowerCase()) {
      case 'food': return <Utensils className="w-3 h-3 text-amber-400" />;
      case 'water': return <Droplets className="w-3 h-3 text-sky-400" />;
      case 'medical aid': return <Stethoscope className="w-3 h-3 text-emerald-400" />;
      case 'shelter': return <Home className="w-3 h-3 text-indigo-400" />;
      case 'rescue team': return <LifeBuoy className="w-3 h-3 text-rose-400" />;
      case 'medicine': return <Pill className="w-3 h-3 text-pink-400" />;
      case 'clothes': return <Shirt className="w-3 h-3 text-purple-400" />;
      case 'blankets': return <FlameKindling className="w-3 h-3 text-orange-400" />;
      default: return null;
    }
  };

  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded-md bg-slate-800/90 border border-slate-700/80 text-slate-300">
      {getIcon()}
      {name}
    </span>
  );
};
