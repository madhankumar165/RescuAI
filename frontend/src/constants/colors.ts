export const DISASTER_COLORS: Record<string, string> = {
  Flood: '#3b82f6',
  Earthquake: '#8b5cf6',
  Cyclone: '#06b6d4',
  Fire: '#ef4444',
  Landslide: '#d97706',
  Tsunami: '#0284c7',
  'Building Collapse': '#64748b',
  'Road Accident': '#f97316',
  Default: '#a855f7',
};

export const PRIORITY_COLORS: Record<string, { bg: string; text: string; border: string; glow: string[] }> = {
  Critical: {
    bg: 'bg-red-500/15',
    text: 'text-red-600 dark:text-red-400',
    border: 'border-red-500/30',
    glow: ['#ef4444', '#f472b6', '#dc2626'],
  },
  High: {
    bg: 'bg-orange-500/15',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/30',
    glow: ['#f97316', '#fbbf24', '#ea580c'],
  },
  Medium: {
    bg: 'bg-blue-500/15',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/30',
    glow: ['#3b82f6', '#38bdf8', '#2563eb'],
  },
  Low: {
    bg: 'bg-emerald-500/15',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/30',
    glow: ['#10b981', '#34d399', '#059669'],
  },
};

export const CHART_PALETTE = [
  '#ef4444', '#f97316', '#eab308', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'
];
