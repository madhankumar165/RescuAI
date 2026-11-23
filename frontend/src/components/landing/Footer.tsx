import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Github, Twitter, Linkedin, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/90 pt-16 pb-12 px-6 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200 dark:border-slate-800">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 text-white shadow-md">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-black text-lg text-slate-900 dark:text-white tracking-wider">RescuAI</span>
          </div>
          <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
            Real-Time Disaster Help Request & Resource-Need Detection platform powered by Natural Language Processing and Multi-Label Machine Learning.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <li><Link to="/dashboard" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Command Center Dashboard</Link></li>
            <li><Link to="/dashboard/analyze" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">NLP Preprocessor Sandbox</Link></li>
            <li><Link to="/dashboard/history" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Request Repository</Link></li>
            <li><Link to="/dashboard/evaluation" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Model Metrics & Evaluation</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Account</h4>
          <ul className="space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <li><Link to="/login" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Responder Sign In</Link></li>
            <li><Link to="/signup" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">Create Account</Link></li>
            <li><Link to="/dashboard/chat" className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors">AI Database Assistant</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-4">Connect</h4>
          <div className="flex space-x-3 text-slate-600 dark:text-slate-400">
            <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:text-purple-600 cursor-pointer"><Github className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:text-purple-600 cursor-pointer"><Twitter className="w-4 h-4" /></a>
            <a href="#" className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:text-purple-600 cursor-pointer"><Linkedin className="w-4 h-4" /></a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 flex flex-col md:flex-row items-center justify-between text-xs font-semibold text-slate-500 gap-4">
        <p>© 2026 RescuAI. Final Year Capstone Project. All rights reserved.</p>
        <p className="flex items-center gap-1">
          Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> using React 19, Vite, Tailwind CSS & FastAPI.
        </p>
      </div>
    </footer>
  );
};
