import React from 'react';
import { PreprocessResult } from '../types';
import { Sparkles, Terminal, Code2, Globe, Tag } from 'lucide-react';

interface PreprocessingPreviewProps {
  result: PreprocessResult;
}

export const PreprocessingPreview: React.FC<PreprocessingPreviewProps> = ({ result }) => {
  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 shadow-xl text-slate-900 dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">Text Preprocessing Breakdown</h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">Tokenization, Lemmatization, Emoji & Stopword Removal</p>
          </div>
        </div>
        <span className="px-3 py-1 text-xs font-black rounded-full bg-slate-100 dark:bg-slate-800 text-sky-700 dark:text-sky-400 border border-sky-500/30 flex items-center gap-1.5 shadow-sm">
          <Globe className="w-3.5 h-3.5" /> Language: {result.language.toUpperCase()}
        </span>
      </div>

      {/* Raw & Cleaned Code Terminals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-500" /> Raw Input Text
          </label>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-slate-100 font-mono leading-relaxed min-h-[90px] shadow-inner">
            {result.original_text}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5 text-emerald-500" /> Cleaned & Standardized Text
          </label>
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-sm text-emerald-400 font-mono leading-relaxed min-h-[90px] shadow-inner">
            {result.cleaned_text}
          </div>
        </div>
      </div>

      {/* Tokens, Lemmatized Roots, Removed Items Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Tokens Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 shadow-sm">
          <p className="text-xs font-black text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" /> Tokens ({result.tokens.length})
          </p>
          <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
            {result.tokens.map((t, idx) => (
              <span key={idx} className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-slate-200 shadow-xs">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Lemmatized Roots Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 shadow-sm">
          <p className="text-xs font-black text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" /> Lemmatized Roots ({result.lemmas.length})
          </p>
          <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto">
            {result.lemmas.map((l, idx) => (
              <span key={idx} className="px-2 py-0.5 text-xs font-mono font-bold rounded bg-purple-100 dark:bg-purple-950/60 border border-purple-300 dark:border-purple-800/50 text-purple-900 dark:text-purple-300 shadow-xs">
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Removed Stopwords Card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-2 shadow-sm">
          <p className="text-xs font-black text-slate-900 dark:text-slate-200">Removed Stopwords & Emojis</p>
          <div className="space-y-1 text-xs text-slate-800 dark:text-slate-300 max-h-28 overflow-y-auto font-semibold">
            <p><strong className="text-slate-900 dark:text-white">Stopwords:</strong> {result.removed_stopwords.join(', ') || 'None'}</p>
            <p><strong className="text-slate-900 dark:text-white">Emojis:</strong> {result.removed_emojis.join(' ') || 'None'}</p>
            <p><strong className="text-slate-900 dark:text-white">URLs:</strong> {result.removed_urls.join(', ') || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
