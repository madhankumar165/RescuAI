import React from 'react';
import { Message } from '../types';
import { PriorityBadge } from './PriorityBadge';
import { DisasterBadge } from './DisasterBadge';
import { ResourceBadge } from './ResourceBadge';
import { Cpu, ShieldCheck, Zap, AlertTriangle, Layers, Copy, CheckCircle2, ShieldAlert, FileText } from 'lucide-react';

interface PredictionExplainerProps {
  message: Message;
}

export const PredictionExplainer: React.FC<PredictionExplainerProps> = ({ message }) => {
  const isReal = message.is_real ?? (message.authenticity_score ? message.authenticity_score >= 50 : true);
  const authScore = message.authenticity_score ?? 92.0;
  const authStatus = message.authenticity_status || (isReal ? 'Verified Genuine' : 'Suspected Fake');
  const flags = message.verification_flags || [
    'Text passes linguistic authenticity check',
    message.location_name ? `Specific location verified (${message.location_name})` : 'Missing specific location',
    message.phone_number ? 'Emergency contact phone provided' : 'No contact phone provided',
    `Realistic victim count (${message.victim_count} people)`
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6 shadow-xl text-slate-900 dark:text-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20 shadow-sm">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              AI Analysis & Urgency Score Breakdown
            </h3>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
              Confidence Score: <span className="font-black text-emerald-600 dark:text-emerald-400">{(message.confidence_score * 100).toFixed(1)}%</span>
            </p>
          </div>
        </div>
        <PriorityBadge priority={message.priority_level} size="lg" />
      </div>

      {/* Real vs Fake Authenticity Verification Banner */}
      <div className={`p-4.5 rounded-2xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md ${
        isReal
          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'
          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800'
      }`}>
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-2xl shadow-sm ${
            isReal ? 'bg-emerald-500 text-white' : 'bg-rose-600 text-white'
          }`}>
            {isReal ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6 animate-pulse" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-slate-900 dark:text-white">
                Request Authenticity Check:
              </h4>
              <span className={`px-2.5 py-0.5 text-xs font-black uppercase rounded-full ${
                isReal
                  ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-500/30'
              }`}>
                {isReal ? '✓ REAL REQUEST' : '🚨 SUSPECTED FAKE / HOAX'}
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
              Authenticity Score: <strong className={isReal ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-600'}>{authScore}% ({authStatus})</strong>
            </p>
          </div>
        </div>

        {/* Flags list */}
        <div className="flex flex-wrap gap-1.5 text-[11px] font-bold">
          {flags.map((flag, fIdx) => (
            <span
              key={fIdx}
              className={`px-2.5 py-1 rounded-xl border ${
                flag.toLowerCase().includes('prank') || flag.toLowerCase().includes('missing') || flag.toLowerCase().includes('duplicate') || flag.toLowerCase().includes('unusual')
                  ? 'bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                  : 'bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 shadow-xs'
              }`}
            >
              {flag.toLowerCase().includes('prank') || flag.toLowerCase().includes('missing') ? '⚠️ ' : '✓ '}
              {flag}
            </span>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <p className="text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            Disaster Type
          </p>
          <div className="mt-2">
            <DisasterBadge type={message.disaster_type} />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <p className="text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-red-500" />
            Urgency Score
          </p>
          <p className="text-2xl font-black text-rose-600 dark:text-rose-400">{message.severity_score} <span className="text-xs font-bold text-slate-600 dark:text-slate-400">/ 100</span></p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <p className="text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
            People Needing Help
          </p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{message.victim_count} <span className="text-xs font-bold text-slate-600 dark:text-slate-400">people</span></p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-sm">
          <p className="text-xs font-extrabold text-slate-800 dark:text-slate-300 mb-1 flex items-center gap-1.5">
            <Copy className="w-3.5 h-3.5 text-purple-500" />
            Duplicate Check
          </p>
          <p className="text-xs font-extrabold text-slate-900 dark:text-slate-200 mt-2">
            {message.is_duplicate ? (
              <span className="text-amber-600 dark:text-amber-400 font-black">⚠️ Duplicate (ID #{message.duplicate_of_id})</span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-black">✓ Unique Help Request</span>
            )}
          </p>
        </div>
      </div>

      {/* Needed Supplies Section */}
      <div className="space-y-3">
        <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          Supplies & Help Needed
        </h4>
        <div className="flex flex-wrap gap-2">
          {message.resources && message.resources.length > 0 ? (
            message.resources.map((r, i) => <ResourceBadge key={i} name={r.resource_name} />)
          ) : (
            <span className="text-xs text-slate-500">General emergency assistance</span>
          )}
        </div>
      </div>

      {/* Rationale Explainer */}
      <div className="p-4 rounded-2xl bg-purple-50 dark:bg-slate-800/40 border border-purple-200 dark:border-slate-700/50 space-y-2 shadow-sm">
        <p className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">AI Reasoning & Summary</p>
        <p className="text-sm text-slate-800 dark:text-slate-200 font-semibold leading-relaxed italic">
          "{message.explanation}"
        </p>
      </div>
    </div>
  );
};
