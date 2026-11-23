import React from 'react';
import { LucideIcon, CheckCircle2, AlertTriangle, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  color: 'emerald' | 'rose' | 'teal' | 'blue' | 'amber' | 'red';
  percentage?: number;
  unit?: string;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  color,
  percentage = 75,
  unit,
  trend,
}) => {
  const themeStyles = {
    emerald: {
      cardLight: 'bg-emerald-50/90 border-emerald-300 shadow-md shadow-emerald-500/5',
      cardDark: 'dark:bg-emerald-950/30 dark:border-emerald-800/50',
      title: 'text-emerald-900 dark:text-emerald-300',
      val: 'text-slate-950 dark:text-white',
      ring: '#10b981',
      badgeBg: 'bg-emerald-500 text-white',
      icon: CheckCircle2,
    },
    rose: {
      cardLight: 'bg-rose-50/90 border-rose-300 shadow-md shadow-rose-500/5',
      cardDark: 'dark:bg-rose-950/30 dark:border-rose-800/50',
      title: 'text-rose-900 dark:text-rose-300',
      val: 'text-slate-950 dark:text-white',
      ring: '#ec4899',
      badgeBg: 'bg-rose-500 text-white',
      icon: AlertTriangle,
    },
    teal: {
      cardLight: 'bg-teal-50/90 border-teal-300 shadow-md shadow-teal-500/5',
      cardDark: 'dark:bg-teal-950/30 dark:border-teal-800/50',
      title: 'text-teal-900 dark:text-teal-300',
      val: 'text-slate-950 dark:text-white',
      ring: '#14b8a6',
      badgeBg: 'bg-teal-500 text-white',
      icon: Clock,
    },
    blue: {
      cardLight: 'bg-blue-50/90 border-blue-300 shadow-md shadow-blue-500/5',
      cardDark: 'dark:bg-blue-950/30 dark:border-blue-800/50',
      title: 'text-blue-900 dark:text-blue-300',
      val: 'text-slate-950 dark:text-white',
      ring: '#3b82f6',
      badgeBg: 'bg-blue-500 text-white',
      icon: ArrowUpRight,
    },
    amber: {
      cardLight: 'bg-amber-50/90 border-amber-300 shadow-md shadow-amber-500/5',
      cardDark: 'dark:bg-amber-950/30 dark:border-amber-800/50',
      title: 'text-amber-900 dark:text-amber-300',
      val: 'text-slate-950 dark:text-white',
      ring: '#f59e0b',
      badgeBg: 'bg-amber-500 text-white',
      icon: AlertTriangle,
    },
    red: {
      cardLight: 'bg-red-50/90 border-red-300 shadow-md shadow-red-500/5',
      cardDark: 'dark:bg-red-950/30 dark:border-red-800/50',
      title: 'text-red-900 dark:text-red-300',
      val: 'text-slate-950 dark:text-white',
      ring: '#ef4444',
      badgeBg: 'bg-red-500 text-white',
      icon: AlertTriangle,
    },
  };

  const current = themeStyles[color] || themeStyles.emerald;
  const BadgeIcon = current.icon;
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className={`p-6 rounded-3xl border backdrop-blur-xl transition-all ${current.cardLight} ${current.cardDark} flex flex-col justify-between relative overflow-hidden`}
    >
      {/* Header Row */}
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-black uppercase tracking-wider ${current.title}`}>
          {title}
        </span>
        <div className={`w-6 h-6 rounded-full ${current.badgeBg} flex items-center justify-center shadow-md`}>
          <BadgeIcon className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
      </div>

      {/* Main Metric Row with Ring Graphic */}
      <div className="flex items-center gap-4 my-1">
        {/* SVG Circular Ring Graphic */}
        <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 60 60">
            <circle
              cx="30"
              cy="30"
              r={radius}
              className="stroke-slate-300 dark:stroke-slate-800 fill-none"
              strokeWidth="5"
            />
            <circle
              cx="30"
              cy="30"
              r={radius}
              fill="none"
              stroke={current.ring}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>
        </div>

        <div>
          <div className="flex items-baseline gap-1">
            <h3 className={`text-4xl font-black tracking-tight ${current.val}`}>
              {value}
            </h3>
            {unit && (
              <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                {unit}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-xs font-bold text-slate-700 dark:text-slate-400 leading-tight mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {trend && (
        <div className="mt-3 pt-2.5 border-t border-slate-300 dark:border-slate-800/80 flex items-center text-xs font-black text-slate-800 dark:text-slate-200">
          <span className="text-emerald-700 dark:text-emerald-400 font-black mr-1.5">↑ {trend}</span> vs previous period
        </div>
      )}
    </motion.div>
  );
};
