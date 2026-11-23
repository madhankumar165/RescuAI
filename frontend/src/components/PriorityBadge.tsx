import React from 'react';

interface PriorityBadgeProps {
  priority: string;
  size?: 'sm' | 'md' | 'lg';
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'md' }) => {
  const p = priority?.toLowerCase() || 'medium';
  
  let colors = 'bg-amber-500/10 text-amber-400 border-amber-500/30';
  if (p === 'critical') {
    colors = 'bg-red-500/15 text-red-400 border-red-500/40 animate-pulse';
  } else if (p === 'high') {
    colors = 'bg-orange-500/15 text-orange-400 border-orange-500/30';
  } else if (p === 'low') {
    colors = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : size === 'lg' ? 'px-3.5 py-1.5 text-sm' : 'px-2.5 py-1 text-xs';

  return (
    <span className={`inline-flex items-center font-semibold rounded-full border ${colors} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${p === 'critical' ? 'bg-red-400' : p === 'high' ? 'bg-orange-400' : p === 'low' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
      {priority}
    </span>
  );
};
