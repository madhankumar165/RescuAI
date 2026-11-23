import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Cpu, LifeBuoy, AlertTriangle, LayoutDashboard, ArrowRight, ShieldCheck } from 'lucide-react';
import { slideUp, staggerContainer } from '../../animations/motion';

export const WorkflowSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Message Received',
      desc: 'Social media, SMS, or manual upload enters pipeline.',
      icon: MessageSquare,
      color: 'text-purple-600 dark:text-purple-400 border-purple-500/30 bg-purple-50 dark:bg-purple-950/40',
    },
    {
      num: '02',
      title: 'NLP Preprocessing',
      desc: 'Text cleaned, tokenized, lemmatized & NER location parsed.',
      icon: Cpu,
      color: 'text-indigo-600 dark:text-indigo-400 border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/40',
    },
    {
      num: '03',
      title: 'Resource Detection',
      desc: 'Multi-label ML models predict required aid & medical supplies.',
      icon: LifeBuoy,
      color: 'text-cyan-600 dark:text-cyan-400 border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/40',
    },
    {
      num: '04',
      title: 'Priority Analysis',
      desc: 'Severity score computed (0-100) & duplicates clustered.',
      icon: AlertTriangle,
      color: 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-50 dark:bg-rose-950/40',
    },
    {
      num: '05',
      title: 'Command Dashboard',
      desc: 'Disaster pinned on spatial map & added to triage queue.',
      icon: LayoutDashboard,
      color: 'text-amber-600 dark:text-amber-400 border-amber-500/30 bg-amber-50 dark:bg-amber-950/40',
    },
    {
      num: '06',
      title: 'Rescue Team',
      desc: 'Field teams assigned and status updated to Resolved.',
      icon: ShieldCheck,
      color: 'text-emerald-600 dark:text-emerald-400 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40',
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Automated Pipeline Workflow
        </h2>
        <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          How Raw Emergency Messages Become Saved Lives
        </h3>
        <p className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400">
          End-to-end processing pipeline from incoming raw text string to field unit dispatch in milliseconds.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative"
      >
        {steps.map((s, idx) => (
          <motion.div
            key={idx}
            variants={slideUp}
            className="glass-card p-5 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 flex flex-col justify-between relative group hover:border-purple-500 shadow-md transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold text-slate-400">{s.num}</span>
                <div className={`p-2 rounded-xl border ${s.color}`}>
                  <s.icon className="w-4 h-4" />
                </div>
              </div>

              <h4 className="text-sm font-black text-slate-900 dark:text-white mb-1">{s.title}</h4>
              <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 leading-snug">{s.desc}</p>
            </div>

            {idx < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-400">
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
