import React from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, LifeBuoy, AlertTriangle, LayoutDashboard, 
  Search, BarChart3, ShieldCheck 
} from 'lucide-react';
import { slideUp, staggerContainer } from '../../animations/motion';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      title: 'Real-Time Disaster Detection',
      description: 'Automatically detects genuine emergency requests vs noise from social media & SMS communications using NLP classifiers.',
      icon: Zap,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Multi-Label Resource Need Identification',
      description: 'Identifies specific resource requirements (Food, Water, Medical Aid, Shelter, Rescue Team, Medicine, Clothes, Blankets) simultaneously.',
      icon: LifeBuoy,
      color: 'text-cyan-600 dark:text-cyan-400',
    },
    {
      title: 'Smart Priority & Severity Intelligence',
      description: 'Generates a 0–100 Severity Score based on victim count, vulnerable demographics (children, elderly, disabled), and urgency level.',
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400',
    },
    {
      title: 'Interactive Spatial Command Dashboard',
      description: 'Visualize disaster locations on interactive Leaflet maps with urgency markers, live status updates, and spatial filtering.',
      icon: LayoutDashboard,
      color: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      title: 'Semantic Search & AI Assistant',
      description: 'Ask natural language queries like "Show critical flood cases needing medical aid" to instantly search the database.',
      icon: Search,
      color: 'text-purple-600 dark:text-purple-400',
    },
    {
      title: 'Live Analytics & Export Engine',
      description: 'Track disaster category breakdowns, resource demand charts, timeline trends, and export complete CSV/PDF reports.',
      icon: BarChart3,
      color: 'text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Core Capabilities
        </h2>
        <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Engineered for Modern Emergency Command & Triage
        </h3>
        <p className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400">
          Combining natural language processing, entity parsing, multi-label ML models, and real-time spatial mapping into a single unified platform.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {features.map((feat, idx) => (
          <motion.div
            key={idx}
            variants={slideUp}
            className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 flex flex-col justify-between shadow-md hover:border-purple-500 transition-all"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <feat.icon className={`w-6 h-6 ${feat.color}`} />
              </div>
              <h4 className="text-lg font-black text-slate-900 dark:text-white">{feat.title}</h4>
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">{feat.description}</p>
            </div>
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center text-[11px] font-bold text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Operational Readiness
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
