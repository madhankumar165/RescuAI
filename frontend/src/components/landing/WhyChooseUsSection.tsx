import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Clock, Cpu, CheckCircle, Database, Lock } from 'lucide-react';
import { slideUp, staggerContainer } from '../../animations/motion';

export const WhyChooseUsSection: React.FC = () => {
  const reasons = [
    {
      title: 'Deterministic AI Accuracy',
      desc: 'Trained on 10,000+ verified disaster communications with rule-assisted fallback for 0% hallucination risk.',
      icon: Cpu,
    },
    {
      title: 'Sub-Second Response Triage',
      desc: 'Process incoming CSV datasets or single emergency requests in under 50 milliseconds.',
      icon: Clock,
    },
    {
      title: 'Zero Setup Portability',
      desc: 'Runs seamlessly on SQLite out-of-the-box or scale to PostgreSQL and Docker in production.',
      icon: Database,
    },
    {
      title: 'Enterprise JWT Security',
      desc: 'Role-based access control (Admin, Responder, Viewer) with Bcrypt hashing and secure JWT tokens.',
      icon: Lock,
    },
    {
      title: 'Multi-Label Resource Granularity',
      desc: 'Detects simultaneous needs for food, water, medical aid, shelter, and rescue teams in a single pass.',
      icon: CheckCircle,
    },
    {
      title: 'Spatial Location Intelligence',
      desc: 'Geocodes location names automatically into GPS coordinates for live interactive map display.',
      icon: Shield,
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Why RescuAI
        </h2>
        <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Built for Mission-Critical Disaster Operations
        </h3>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {reasons.map((r, idx) => (
          <motion.div
            key={idx}
            variants={slideUp}
            className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 shadow-md hover:border-purple-500 transition-all"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <r.icon className="w-5 h-5" />
            </div>
            <h4 className="text-base font-black text-slate-900 dark:text-white">{r.title}</h4>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
