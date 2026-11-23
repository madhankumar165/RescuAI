import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { slideUp, staggerContainer } from '../../animations/motion';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      quote: "RescuAI transformed our hurricane response. Being able to extract location entities and multi-label resource needs from thousands of tweets saved critical hours during dispatch.",
      name: "Commander David Miller",
      role: "State Disaster Management Lead",
    },
    {
      quote: "The duplicate request clustering and severity scoring allowed our field team to zero in on high-urgency trapped victims without getting overwhelmed by duplicate posts.",
      name: "Dr. Sarah Chen",
      role: "Humanitarian Logistics Director",
    },
    {
      quote: "The AI Chat Assistant querying capability feels like magic. Asking 'Show all critical flood cases' and getting instant database results with map markers is revolutionary.",
      name: "Marcus Vance",
      role: "Field Search & Rescue Lead",
    },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <h2 className="text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">
          Field Operations Feedback
        </h2>
        <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Trusted by Emergency Responders & Field Teams
        </h3>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            variants={slideUp}
            className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 flex flex-col justify-between shadow-md hover:border-purple-500 transition-all"
          >
            <div className="space-y-3">
              <div className="flex text-amber-500 space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <Quote className="w-6 h-6 text-purple-600 dark:text-purple-400 opacity-60" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 italic leading-relaxed">"{t.quote}"</p>
            </div>

            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h5 className="text-xs font-black text-slate-900 dark:text-white">{t.name}</h5>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
