import React from 'react';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import { HeroSection } from '../components/landing/HeroSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { WorkflowSection } from '../components/landing/WorkflowSection';
import { StatsSection } from '../components/landing/StatsSection';
import { WhyChooseUsSection } from '../components/landing/WhyChooseUsSection';
import { TestimonialsSection } from '../components/landing/TestimonialsSection';
import { Footer } from '../components/landing/Footer';
import { Shield, ArrowRight, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

export const LandingPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen relative text-slate-900 dark:text-slate-100 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors">
      <AnimatedBackground />

      {/* Floating Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 backdrop-blur-xl bg-white/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-black text-lg text-slate-900 dark:text-white tracking-wider">RescuAI</span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Light & Dark Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-600 transition-colors cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
            </button>

            <Link
              to="/login"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-purple-600 transition-colors px-2 py-1"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg shadow-purple-500/20 transition-all cursor-pointer"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Sections */}
      <main className="relative z-10 space-y-12">
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
        <StatsSection />
        <WhyChooseUsSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
};
