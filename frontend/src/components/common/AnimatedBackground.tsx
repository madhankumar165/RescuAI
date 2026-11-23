import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 dark:bg-slate-950 bg-slate-50 transition-colors">
      {/* Dot Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 dark:opacity-60" />

      {/* Moving Pastel Aurora Mesh Blob 1 - Mint Green */}
      <motion.div
        animate={{
          x: ['-20%', '20%', '-20%'],
          y: ['-10%', '30%', '-10%'],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full dark:bg-emerald-600/20 bg-emerald-300/40 blur-[130px]"
      />

      {/* Moving Pastel Aurora Mesh Blob 2 - Soft Lavender / Rose */}
      <motion.div
        animate={{
          x: ['30%', '-20%', '30%'],
          y: ['40%', '-10%', '40%'],
          scale: [1.2, 0.9, 1.2],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/4 -right-40 w-[650px] h-[650px] rounded-full dark:bg-purple-600/18 bg-purple-200/50 blur-[150px]"
      />

      {/* Moving Pastel Aurora Mesh Blob 3 - Ice Blue */}
      <motion.div
        animate={{
          x: ['-10%', '30%', '-10%'],
          y: ['60%', '20%', '60%'],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] rounded-full dark:bg-cyan-500/15 bg-blue-200/50 blur-[140px]"
      />

      {/* Moving Pastel Aurora Mesh Blob 4 - Rose Pink Accent */}
      <motion.div
        animate={{
          x: ['20%', '-10%', '20%'],
          y: ['-20%', '40%', '-20%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-1/2 w-[400px] h-[400px] rounded-full dark:bg-rose-600/10 bg-pink-200/40 blur-[120px]"
      />

      {/* Ambient Radial Gradient Overlay */}
      <div className="absolute inset-0 bg-radial dark:from-transparent dark:via-slate-950/70 dark:to-slate-950 from-transparent via-white/40 to-white/70" />
    </div>
  );
};
