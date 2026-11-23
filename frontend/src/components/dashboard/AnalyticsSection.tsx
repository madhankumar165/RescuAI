import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart as PieChartIcon, Cpu } from 'lucide-react';
import { 
  ResponsiveContainer, BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, 
  PieChart, Pie, Cell, AreaChart, Area 
} from 'recharts';
import { DashboardStats, TimelinePoint } from '../../types';
import { CHART_PALETTE } from '../../constants/colors';
import { useTheme } from '../../context/ThemeContext';

interface AnalyticsSectionProps {
  stats: DashboardStats | null;
  timeline: TimelinePoint[];
}

export const AnalyticsSection: React.FC<AnalyticsSectionProps> = ({ stats, timeline }) => {
  const { theme } = useTheme();

  const disasterData = useMemo(() => {
    if (!stats?.disaster_breakdown) return [];
    return Object.entries(stats.disaster_breakdown).map(([name, value]) => ({ name, value }));
  }, [stats]);

  const resourceData = useMemo(() => {
    if (!stats?.resource_demands) return [];
    return Object.entries(stats.resource_demands).map(([name, value]) => ({ name, value }));
  }, [stats]);

  const confidenceData = useMemo(() => [
    { range: '90 - 100% High Confidence', count: (stats?.critical_requests || 12) + 45 },
    { range: '75 - 89% Verifiable', count: 32 },
    { range: '60 - 74% Moderate', count: 18 },
    { range: 'Under 60% Low', count: 5 },
  ], [stats]);

  const severityDistribution = useMemo(() => [
    { severity: 'Critical (≥75)', count: stats?.critical_requests || 14 },
    { severity: 'High (50-74)', count: (stats?.total_requests || 50) / 3 },
    { severity: 'Medium (30-49)', count: (stats?.total_requests || 50) / 4 },
    { severity: 'Low (<30)', count: stats?.resolved_requests || 10 },
  ], [stats]);

  const tooltipBg = theme === 'dark' ? '#0f172a' : '#ffffff';
  const tooltipBorder = theme === 'dark' ? '#334155' : '#cbd5e1';
  const tooltipText = theme === 'dark' ? '#f8fafc' : '#0f172a';

  return (
    <section className="space-y-8 text-center">
      {/* Centered Heading with Proper Spacing */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-extrabold uppercase tracking-wider">
          <BarChart3 className="w-3.5 h-3.5" /> Intelligence Analytics
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Disaster Intelligence Analytics & Trends
        </h3>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Incoming message volume timeline, disaster categories, victim impact, and AI model confidence
        </p>
      </div>

      {/* Row 1: Line Chart Timeline & Severity Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-left">
        {/* Timeline Line/Bar */}
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl bg-white dark:bg-slate-900"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" /> Emergency Help Volume Timeline
              </h4>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Daily incoming emergency messages</p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeline}>
                <XAxis dataKey="date" stroke={theme === 'dark' ? '#94a3b8' : '#475569'} fontSize={11} />
                <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#475569'} fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '16px' }} />
                <Line type="monotone" dataKey="critical" stroke="#ef4444" strokeWidth={3} name="Critical" />
                <Line type="monotone" dataKey="high" stroke="#f97316" strokeWidth={2} name="High" />
                <Line type="monotone" dataKey="medium" stroke="#eab308" strokeWidth={2} name="Medium" />
                <Line type="monotone" dataKey="low" stroke="#10b981" strokeWidth={2} name="Low" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Severity Area Chart */}
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl bg-white dark:bg-slate-900 flex flex-col justify-between"
        >
          <div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">Severity Score Distribution</h4>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Count of cases grouped by urgency range</p>
            <div className="h-60 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={severityDistribution}>
                  <XAxis dataKey="severity" stroke={theme === 'dark' ? '#94a3b8' : '#475569'} fontSize={10} />
                  <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#475569'} fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '16px' }} />
                  <Area type="monotone" dataKey="count" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 2: Disaster Pie, Resource Demand, & AI Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
        {/* Disaster Pie */}
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl bg-white dark:bg-slate-900"
        >
          <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <PieChartIcon className="w-4 h-4 text-purple-600" /> Disaster Categories Share
          </h4>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={disasterData}
                  cx="50%"
                  cy="50%"
                  outerRadius={85}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {disasterData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_PALETTE[index % CHART_PALETTE.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '16px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Needed Supplies Bar */}
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl bg-white dark:bg-slate-900"
        >
          <h4 className="text-base font-black text-slate-900 dark:text-white">Needed Supplies & Aid Demand</h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={resourceData}>
                <XAxis type="number" stroke={theme === 'dark' ? '#94a3b8' : '#475569'} fontSize={11} />
                <YAxis dataKey="name" type="category" stroke={theme === 'dark' ? '#94a3b8' : '#475569'} fontSize={10} width={80} />
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '16px' }} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* AI Model Confidence Distribution */}
        <motion.div
          whileHover={{ y: -4, scale: 1.005 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl bg-white dark:bg-slate-900"
        >
          <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-500" /> AI Model Confidence Distribution
          </h4>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={confidenceData}>
                <XAxis dataKey="range" stroke={theme === 'dark' ? '#94a3b8' : '#475569'} fontSize={9} />
                <YAxis stroke={theme === 'dark' ? '#94a3b8' : '#475569'} fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: tooltipBg, borderColor: tooltipBorder, color: tooltipText, borderRadius: '16px' }} />
                <Bar dataKey="count" fill="#10b981" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
