import React from 'react';
import { motion } from 'framer-motion';
import { Counter } from '../common/Counter';
import { slideUp } from '../../animations/motion';

export const StatsSection: React.FC = () => {
  const stats = [
    { label: 'Emergency Messages Processed', value: 10000, suffix: '+' },
    { label: 'Multi-Label Detection Accuracy', value: 95, suffix: '%' },
    { label: 'Resource Types Identified', value: 200, suffix: '+' },
    { label: 'Real-Time Monitoring', value: 24, suffix: '/7' },
  ];

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-xl"
      >
        {stats.map((st, idx) => (
          <div key={idx} className="space-y-2 border-r last:border-r-0 border-slate-200 dark:border-slate-800 px-2">
            <h3 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
              <Counter end={st.value} suffix={st.suffix} />
            </h3>
            <p className="text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{st.label}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
