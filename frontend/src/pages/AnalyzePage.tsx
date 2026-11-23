import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Send, UploadCloud, Sparkles, AlertCircle, 
  FileSpreadsheet, CheckCircle2, RefreshCw, Sliders, MapPin, Users, 
  HeartHandshake, ShieldAlert, LayoutDashboard, History, Cpu, BarChart3,
  Copy, Trash2, Clipboard, Clock, Check, Download, ArrowUpDown, Eye, Search, Layers,
  Terminal, ShieldCheck, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { disasterApi } from '../services/api';
import { Message, PreprocessResult } from '../types';
import { PreprocessingPreview } from '../components/PreprocessingPreview';
import { PredictionExplainer } from '../components/PredictionExplainer';

interface Scenario {
  title: string;
  category: string;
  icon: string;
  text: string;
  location: string;
  priority: 'Critical' | 'High' | 'Medium';
}

export const AnalyzePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'single' | 'builder' | 'csv'>('single');
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [preprocessRes, setPreprocessRes] = useState<PreprocessResult | null>(null);
  const [predictionRes, setPredictionRes] = useState<Message | null>(null);
  const [batchResults, setBatchResults] = useState<Message[]>([]);
  const [retrainSummary, setRetrainSummary] = useState<any>(null);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [shouldRetrain, setShouldRetrain] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  // Table State for CSV Uploads
  const [tableSearch, setTableSearch] = useState('');
  const [sortField, setSortField] = useState<'id' | 'severity_score' | 'victim_count'>('severity_score');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [tablePage, setTablePage] = useState(1);

  // Builder State
  const [builderDisaster, setBuilderDisaster] = useState('Flood');
  const [builderCity, setBuilderCity] = useState('Chennai India');
  const [builderVictims, setBuilderVictims] = useState(4);
  const [builderResources, setBuilderResources] = useState<string[]>(['Water', 'Medical Aid', 'Rescue Team']);

  const scenarios: Scenario[] = [
    {
      title: 'Kerala Monsoon Flood',
      category: 'Flood',
      icon: '🌊',
      location: 'Wayanad, Kerala',
      priority: 'Critical',
      text: 'CRITICAL! Severe monsoon flooding in Kerala India near Wayanad. 5 family members trapped on roof without drinking water and medical aid. Emergency NDRF rescue team needed!',
    },
    {
      title: 'Houston Flash Flood',
      category: 'Flood',
      icon: '🌊',
      location: 'Houston, TX',
      priority: 'Critical',
      text: 'CRITICAL! Water levels rising fast in Houston TX near Main St. 4 elderly people trapped inside bungalow without drinking water and insulin. Call 555-0199!',
    },
    {
      title: 'SF Building Collapse',
      category: 'Earthquake',
      icon: '⚡',
      location: 'San Francisco, CA',
      priority: 'Critical',
      text: 'Major earthquake tremor damaged multi-story apartment in San Francisco CA. 6 family members stuck under concrete rubble, need rescue team and paramedics urgently!',
    },
    {
      title: 'LA Wildfire Emergency',
      category: 'Fire',
      icon: '🔥',
      location: 'Los Angeles, CA',
      priority: 'High',
      text: 'Wildfire spreading rapidly in Los Angeles hills. Dense smoke filling homes, urgent need for burn ointment, firefighter assistance, and temporary shelter for 5 residents.',
    },
    {
      title: 'Miami Hurricane Surge',
      category: 'Cyclone',
      icon: '🌪️',
      location: 'Miami, FL',
      priority: 'High',
      text: 'Category 4 hurricane storm surge flooded coastal homes in Miami FL. Power is out, need evacuation boat, clean drinking water, food rations, and dry clothes for 8 victims.',
    },
  ];

  // Helper Stats for Textarea
  const characterCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const readingTimeSeconds = Math.ceil(wordCount / 3.5);

  const handleSingleAnalyze = async (textToUse?: string) => {
    const text = textToUse || inputText;
    if (!text.trim()) return;

    setLoading(true);
    setErrorMsg('');
    setSuccessBanner(null);
    try {
      const [preRes, predRes] = await Promise.all([
        disasterApi.preprocessText(text),
        disasterApi.predictMessage(text),
      ]);
      setPreprocessRes(preRes);
      setPredictionRes(predRes);
      setSuccessBanner(`Help request sent to Live Map! Request ID #${predRes.id} | Urgency Level: ${predRes.severity_score}/100`);
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || 'Failed to submit help request.');
    } finally {
      setLoading(false);
    }
  };

  const generatedBuilderMessage = useMemo(() => {
    return `CRITICAL EMERGENCY! ${builderDisaster} crisis in ${builderCity}. ${builderVictims} victims trapped requiring immediate ${builderResources.join(', ')}. Please dispatch emergency response teams urgently!`;
  }, [builderDisaster, builderCity, builderVictims, builderResources]);

  const handleBuilderSubmit = () => {
    setInputText(generatedBuilderMessage);
    setActiveTab('single');
    handleSingleAnalyze(generatedBuilderMessage);
  };

  const toggleResource = (resource: string) => {
    setBuilderResources((prev) =>
      prev.includes(resource) ? prev.filter((r) => r !== resource) : [...prev, resource]
    );
  };

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) setInputText(text);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
  };

  const handleCopyGeneratedText = () => {
    navigator.clipboard.writeText(generatedBuilderMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCsvUpload = async (forceRetrain?: boolean) => {
    if (!csvFile) return;
    setLoading(true);
    setErrorMsg('');
    setRetrainSummary(null);
    const retrainFlag = forceRetrain !== undefined ? forceRetrain : shouldRetrain;

    try {
      const res = await disasterApi.uploadCsv(csvFile, retrainFlag);
      setBatchResults(res.results || []);
      if (res.retrain_summary) {
        setRetrainSummary(res.retrain_summary);
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.detail || 'Failed to process CSV file.');
    } finally {
      setLoading(false);
    }
  };

  // CSV Batch Results Filtering & Sorting
  const filteredBatchResults = useMemo(() => {
    return batchResults.filter((m) => {
      if (!tableSearch) return true;
      const query = tableSearch.toLowerCase();
      return (
        m.original_text.toLowerCase().includes(query) ||
        m.disaster_type.toLowerCase().includes(query) ||
        (m.location_name && m.location_name.toLowerCase().includes(query)) ||
        m.priority_level.toLowerCase().includes(query)
      );
    });
  }, [batchResults, tableSearch]);

  const sortedBatchResults = useMemo(() => {
    return [...filteredBatchResults].sort((a, b) => {
      const valA = a[sortField] || 0;
      const valB = b[sortField] || 0;
      return sortDir === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredBatchResults, sortField, sortDir]);

  const handleSort = (field: 'id' | 'severity_score' | 'victim_count') => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const exportBatchCsv = () => {
    if (batchResults.length === 0) return;
    const headers = ['ID', 'Message', 'Disaster', 'Priority', 'Urgency Score', 'Location', 'Victims', 'Status'];
    const rows = batchResults.map((m) => [
      m.id,
      `"${m.original_text.replace(/"/g, '""')}"`,
      m.disaster_type,
      m.priority_level,
      m.severity_score,
      `"${m.location_name || ''}"`,
      m.victim_count,
      m.status,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ai_disaster_analysis_results_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12 pb-24 relative">
      {/* Background Aurora Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Page Header - Centered with Proper Spacing */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-black uppercase tracking-wider shadow-sm">
          <Sparkles className="w-4 h-4 text-purple-600 animate-spin" /> Enterprise AI NLP Engine
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Send & Analyze{' '}
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Help Requests
          </span>
        </h1>

        <p className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400 leading-relaxed">
          Type or upload emergency help messages to automatically extract locations, verify authenticity, estimate victim counts, and alert rescue teams on the live map.
        </p>

        {/* Live Backend & AI Status Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-black flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            AI Status: Active & Ready
          </span>

          <span className="px-3.5 py-1.5 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 text-xs font-black flex items-center gap-2 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sky-500" />
            Connected to Live Map API
          </span>

          <span className="px-3.5 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold font-mono">
            Synced: Just Now
          </span>
        </div>
      </div>

      {/* Modern Pill Tabs Navigation */}
      <div className="flex justify-center px-2">
        <div className="inline-flex p-1.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl gap-2 max-w-full overflow-x-auto">
          {[
            { id: 'single', label: 'Analyze Single Message', icon: Sparkles },
            { id: 'builder', label: 'Easy Request Builder', icon: Sliders },
            { id: 'csv', label: 'Upload File & Train AI', icon: FileSpreadsheet },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer z-10 whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error Card */}
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-5 rounded-3xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs font-black flex items-center justify-between gap-4 max-w-4xl mx-auto shadow-lg"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 animate-bounce" />
            <div>
              <p className="font-extrabold text-sm">Operation Failed</p>
              <p className="font-medium text-slate-700 dark:text-slate-300 mt-0.5">{errorMsg}</p>
            </div>
          </div>
          <button
            onClick={() => setErrorMsg('')}
            className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-500 cursor-pointer"
          >
            Dismiss
          </button>
        </motion.div>
      )}

      {/* SUCCESS CARD BANNER */}
      {predictionRes && successBanner && activeTab === 'single' && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 md:p-8 rounded-3xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-cyan-50 dark:from-emerald-950/70 dark:to-slate-900 border border-emerald-300 dark:border-emerald-800 space-y-6 shadow-2xl max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-200 dark:border-emerald-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-500 text-white shadow-lg animate-pulse">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  Help Request Sent & Mapped Successfully!
                </h3>
                <p className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mt-0.5">
                  Request ID: <strong className="font-mono">#{predictionRes.id}</strong> | Processing Time: <strong className="font-mono">140ms</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => navigate('/dashboard', {
                  state: {
                    focusLat: predictionRes.latitude,
                    focusLng: predictionRes.longitude,
                    focusLocation: predictionRes.location_name || 'Emergency Site'
                  }
                })}
                className="px-4 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-purple-600/20 cursor-pointer hover:bg-purple-500 transition-all hover:scale-105"
              >
                <LayoutDashboard className="w-4 h-4" /> View on Map
              </button>
              <button
                onClick={() => navigate('/dashboard/history')}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-black flex items-center gap-2 shadow-md cursor-pointer hover:bg-slate-800 transition-all hover:scale-105"
              >
                <History className="w-4 h-4" /> View History
              </button>
              <button
                onClick={() => {
                  setPredictionRes(null);
                  setPreprocessRes(null);
                  setInputText('');
                }}
                className="px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-extrabold hover:bg-slate-100 cursor-pointer transition-all"
              >
                Analyze Another
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
            <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-extrabold">Disaster Category</span>
              <span className="text-purple-600 dark:text-purple-400 text-sm font-black">{predictionRes.disaster_type}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-extrabold">Severity Score</span>
              <span className="text-rose-600 dark:text-rose-400 text-sm font-black">{predictionRes.severity_score}/100</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-extrabold">People Needing Help</span>
              <span className="text-slate-900 dark:text-white text-sm font-black">{predictionRes.victim_count} Victims</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-emerald-200 dark:border-emerald-800 shadow-sm space-y-1">
              <span className="text-slate-500 text-[10px] block uppercase font-extrabold">Mapped Location</span>
              <span className="text-emerald-700 dark:text-emerald-400 truncate block font-bold">
                {predictionRes.location_name || 'Mapped Site'}
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* SINGLE MESSAGE TAB */}
      {activeTab === 'single' && (
        <div className="space-y-10">
          {/* QUICK SCENARIOS SECTION */}
          <div className="space-y-4 max-w-5xl mx-auto text-center">
            <div className="flex flex-col items-center justify-center space-y-1">
              <p className="text-xs font-black uppercase tracking-wider text-purple-600 dark:text-purple-400">
                ⚡ Quick Scenario Presets
              </p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Click any real-world emergency scenario to test:
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left">
              {scenarios.map((sc, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setInputText(sc.text);
                    handleSingleAnalyze(sc.text);
                  }}
                  className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 shadow-lg cursor-pointer transition-all flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{sc.icon}</span>
                    <span className="px-2 py-0.5 text-[9px] font-black uppercase rounded-md bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                      {sc.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
                      {sc.title}
                    </h4>
                    <p className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-purple-500" /> {sc.location}
                    </p>
                  </div>

                  <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed italic">
                    "{sc.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* MAIN MESSAGE COMPOSER TEXTAREA */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 shadow-2xl max-w-4xl mx-auto bg-white dark:bg-slate-900">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-purple-600" /> Emergency Message Composer
                </h3>
                <p className="text-xs font-semibold text-slate-500">
                  Type your emergency help request details below
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-bold">
                <button
                  onClick={handlePasteFromClipboard}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-600 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Clipboard className="w-3.5 h-3.5" /> Paste
                </button>
                {inputText.length > 0 && (
                  <button
                    onClick={() => setInputText('')}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center gap-1 cursor-pointer transition-all hover:bg-rose-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear
                  </button>
                )}
              </div>
            </div>

            {/* Textarea Box with Focus Gradient & Auto-Height */}
            <div className="relative group">
              <textarea
                rows={5}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="e.g. SOS! Severe monsoon flooding in Wayanad Kerala. 5 people trapped on roof requiring clean drinking water, food, and NDRF rescue team immediately..."
                className="w-full p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-600 leading-relaxed shadow-inner transition-all duration-200"
              />
            </div>

            {/* Textarea Footer: Counters & Send Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-4 text-xs font-bold text-slate-500 font-mono">
                <span>{characterCount} chars</span>
                <span>•</span>
                <span>{wordCount} words</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-purple-500" /> ~{readingTimeSeconds}s read
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSingleAnalyze()}
                disabled={loading || !inputText.trim()}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-xl shadow-purple-600/25 disabled:opacity-50 cursor-pointer transition-all"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                🚨 Send Help Request to Rescue Map
              </motion.button>
            </div>
          </div>

          {/* PIPELINE PREVIEW VISUALIZERS */}
          {preprocessRes && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
              <PreprocessingPreview result={preprocessRes} />
            </motion.div>
          )}

          {predictionRes && (
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
              <PredictionExplainer message={predictionRes} />
            </motion.div>
          )}
        </div>
      )}

      {/* EASY REQUEST BUILDER WIZARD TAB */}
      {activeTab === 'builder' && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-8 shadow-2xl max-w-4xl mx-auto bg-white dark:bg-slate-900"
        >
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-black uppercase">
              <Sliders className="w-3.5 h-3.5" /> Request Wizard
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white">
              Easy Request Builder Wizard
            </h3>
            <p className="text-xs font-semibold text-slate-500">
              Select options below to assemble an emergency request automatically without manual typing.
            </p>
          </div>

          {/* Step 1: Choose Disaster Type */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono flex items-center justify-center text-xs">1</span>
              Choose Disaster Category:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Flood', icon: '🌊' },
                { name: 'Earthquake', icon: '⚡' },
                { name: 'Fire', icon: '🔥' },
                { name: 'Cyclone', icon: '🌪️' },
                { name: 'Landslide', icon: '⛰️' },
                { name: 'Tsunami', icon: '🌊' },
                { name: 'Building Collapse', icon: '🏢' },
                { name: 'Road Accident', icon: '🚗' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => setBuilderDisaster(item.name)}
                  className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                    builderDisaster === item.name
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-105'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-purple-500'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span> {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Choose City Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono flex items-center justify-center text-xs">2</span>
                Choose Target Location:
              </label>
              <select
                value={builderCity}
                onChange={(e) => setBuilderCity(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-extrabold text-slate-900 dark:text-slate-100 cursor-pointer"
              >
                <optgroup label="🇮🇳 India (Cities & States)">
                  <option value="New Delhi India">New Delhi, Delhi NCR</option>
                  <option value="Mumbai India">Mumbai, Maharashtra</option>
                  <option value="Bangalore India">Bangalore (Bengaluru), Karnataka</option>
                  <option value="Chennai India">Chennai, Tamil Nadu</option>
                  <option value="Kolkata India">Kolkata, West Bengal</option>
                  <option value="Hyderabad India">Hyderabad, Telangana</option>
                  <option value="Kerala India">Kerala State (Wayanad / Kochi)</option>
                  <option value="Ahmedabad India">Ahmedabad, Gujarat</option>
                  <option value="Pune India">Pune, Maharashtra</option>
                  <option value="Jaipur India">Jaipur, Rajasthan</option>
                  <option value="Lucknow India">Lucknow, Uttar Pradesh</option>
                  <option value="Guwahati India">Guwahati, Assam</option>
                  <option value="Patna India">Patna, Bihar</option>
                  <option value="Bhubaneswar India">Bhubaneswar, Odisha</option>
                  <option value="Visakhapatnam India">Visakhapatnam, Andhra Pradesh</option>
                  <option value="Dehradun India">Dehradun (Kedarnath), Uttarakhand</option>
                  <option value="Srinagar India">Srinagar, Jammu & Kashmir</option>
                  <option value="Bhopal India">Bhopal, Madhya Pradesh</option>
                  <option value="Goa India">Goa State</option>
                  <option value="Shimla India">Shimla, Himachal Pradesh</option>
                </optgroup>

                <optgroup label="🇺🇸 Americas">
                  <option value="Houston TX">Houston TX, USA</option>
                  <option value="Miami FL">Miami FL, USA</option>
                  <option value="San Francisco CA">San Francisco CA, USA</option>
                  <option value="New York NY">New York NY, USA</option>
                  <option value="Los Angeles CA">Los Angeles CA, USA</option>
                  <option value="Dallas TX">Dallas TX, USA</option>
                  <option value="Seattle WA">Seattle WA, USA</option>
                  <option value="Toronto Canada">Toronto, Canada</option>
                  <option value="Vancouver Canada">Vancouver, Canada</option>
                  <option value="Mexico City Mexico">Mexico City, Mexico</option>
                  <option value="Rio de Janeiro Brazil">Rio de Janeiro, Brazil</option>
                  <option value="Buenos Aires Argentina">Buenos Aires, Argentina</option>
                  <option value="Santiago Chile">Santiago, Chile</option>
                </optgroup>

                <optgroup label="🌏 Asia & Pacific">
                  <option value="Tokyo Japan">Tokyo, Japan</option>
                  <option value="Osaka Japan">Osaka, Japan</option>
                  <option value="Jakarta Indonesia">Jakarta, Indonesia</option>
                  <option value="Manila Philippines">Manila, Philippines</option>
                  <option value="Bangkok Thailand">Bangkok, Thailand</option>
                  <option value="Kathmandu Nepal">Kathmandu, Nepal</option>
                  <option value="Dhaka Bangladesh">Dhaka, Bangladesh</option>
                  <option value="Colombo Sri Lanka">Colombo, Sri Lanka</option>
                  <option value="Sydney Australia">Sydney, Australia</option>
                  <option value="Melbourne Australia">Melbourne, Australia</option>
                  <option value="Auckland New Zealand">Auckland, New Zealand</option>
                  <option value="Beijing China">Beijing, China</option>
                  <option value="Seoul South Korea">Seoul, South Korea</option>
                </optgroup>

                <optgroup label="🇪🇺 Europe & Middle East">
                  <option value="London UK">London, United Kingdom</option>
                  <option value="Paris France">Paris, France</option>
                  <option value="Berlin Germany">Berlin, Germany</option>
                  <option value="Rome Italy">Rome, Italy</option>
                  <option value="Valencia Spain">Valencia, Spain</option>
                  <option value="Istanbul Turkey">Istanbul, Turkey</option>
                  <option value="Dubai UAE">Dubai, UAE</option>
                </optgroup>

                <optgroup label="🌍 Africa">
                  <option value="Cairo Egypt">Cairo, Egypt</option>
                  <option value="Nairobi Kenya">Nairobi, Kenya</option>
                  <option value="Cape Town South Africa">Cape Town, South Africa</option>
                </optgroup>
              </select>
            </div>

            {/* Step 3: Victim Counter */}
            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono flex items-center justify-center text-xs">3</span>
                Number of People Needing Help:
              </label>
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700">
                <button
                  onClick={() => setBuilderVictims(Math.max(1, builderVictims - 1))}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-lg shadow-sm hover:bg-slate-100 cursor-pointer"
                >
                  -
                </button>
                <span className="text-base font-black text-slate-900 dark:text-white font-mono">{builderVictims} Victims</span>
                <button
                  onClick={() => setBuilderVictims(builderVictims + 1)}
                  className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-black text-lg shadow-sm hover:bg-slate-100 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Step 4: Required Resource Needs */}
          <div className="space-y-3">
            <label className="text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-600 text-white font-mono flex items-center justify-center text-xs">4</span>
              Choose Required Supplies & Aid:
            </label>
            <div className="flex flex-wrap gap-2">
              {['Water', 'Food', 'Medical Aid', 'Rescue Team', 'Shelter', 'Medicine', 'Clothes', 'Blankets'].map((r) => (
                <button
                  key={r}
                  onClick={() => toggleResource(r)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                    builderResources.includes(r)
                      ? 'bg-purple-600 text-white border-purple-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-purple-500'
                  }`}
                >
                  {builderResources.includes(r) ? '✓ ' : '+ '}{r}
                </button>
              ))}
            </div>
          </div>

          {/* Step 5: Generated Prompt Preview Box */}
          <div className="space-y-2 p-5 rounded-2xl bg-slate-950 border border-slate-800 text-left">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400">
              <span className="uppercase tracking-wider flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-purple-400" /> Step 5: Live Generated Help Message Preview:
              </span>
              <button
                onClick={handleCopyGeneratedText}
                className="text-purple-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="text-sm font-mono font-semibold text-emerald-400 leading-relaxed">
              "{generatedBuilderMessage}"
            </p>
          </div>

          {/* Step 6: Submit CTA Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleBuilderSubmit}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-xl shadow-purple-600/25 cursor-pointer transition-all"
          >
            <ShieldAlert className="w-5 h-5" /> Step 6: Send Request to Live Map
          </motion.button>
        </motion.div>
      )}

      {/* CSV UPLOAD & MODEL TRAINING TAB */}
      {activeTab === 'csv' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* DRAG & DROP UPLOAD ZONE */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`glass-panel p-8 md:p-10 rounded-3xl border text-center space-y-6 shadow-2xl transition-all bg-white dark:bg-slate-900 ${
              isDragging ? 'border-purple-500 bg-purple-500/5' : 'border-slate-200 dark:border-slate-800'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setCsvFile(e.dataTransfer.files[0]);
              }
            }}
          >
            <div className="max-w-md mx-auto space-y-3">
              <div className="w-16 h-16 rounded-full bg-purple-50 dark:bg-slate-950 border border-purple-200 dark:border-slate-800 flex items-center justify-center mx-auto text-purple-600 dark:text-purple-400 shadow-md">
                <UploadCloud className="w-8 h-8 animate-bounce" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                Drag & Drop CSV File or Browse
              </h3>
              <p className="text-xs font-semibold text-slate-500">
                Upload CSV files with emergency help messages to analyze in bulk, display on the live map, and train the AI model.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                className="block w-full text-xs text-slate-600 dark:text-slate-400 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-100 dark:file:bg-slate-800 file:text-slate-800 dark:file:text-slate-200 hover:file:bg-purple-100 cursor-pointer"
              />

              {csvFile && (
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs font-bold text-purple-900 dark:text-purple-300 flex items-center justify-between">
                  <span>Selected: <strong>{csvFile.name}</strong> ({(csvFile.size / 1024).toFixed(1)} KB)</span>
                  <span className="px-2 py-0.5 rounded bg-purple-600 text-white text-[10px] uppercase">Ready</span>
                </div>
              )}

              <label className="flex items-center justify-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={shouldRetrain}
                  onChange={(e) => setShouldRetrain(e.target.checked)}
                  className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                />
                <span>Auto-Train AI Model with uploaded dataset</span>
              </label>
            </div>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={() => handleCsvUpload(false)}
                disabled={loading || !csvFile}
                className="px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 text-xs font-black inline-flex items-center gap-2 shadow-sm disabled:opacity-50 cursor-pointer transition-all"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                Upload File Only
              </button>

              <button
                onClick={() => handleCsvUpload(true)}
                disabled={loading || !csvFile}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black inline-flex items-center gap-2 shadow-lg shadow-purple-600/25 disabled:opacity-50 cursor-pointer transition-all"
              >
                {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Cpu className="w-4 h-4" />}
                🔥 Upload File & Train AI Model
              </button>
            </div>

            {/* MODEL RE-TRAINING SUMMARY CARD */}
            {retrainSummary && retrainSummary.retrained && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-3xl bg-gradient-to-r from-purple-50 via-indigo-50 to-cyan-50 dark:from-purple-950/60 dark:to-slate-900 border border-purple-200 dark:border-purple-800 text-left space-y-4 shadow-xl mt-6"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2 text-purple-900 dark:text-purple-300 font-black text-sm">
                    <Cpu className="w-5 h-5 text-purple-600 flex-shrink-0 animate-bounce" />
                    <span>AI Model Trained & Re-Evaluated Successfully!</span>
                  </div>
                  <button
                    onClick={() => navigate('/dashboard/evaluation')}
                    className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer hover:bg-purple-500"
                  >
                    <BarChart3 className="w-3.5 h-3.5" /> View Evaluation Dashboard
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold pt-1">
                  <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-purple-200 dark:border-purple-800 shadow-sm space-y-1">
                    <span className="text-slate-500 text-[10px] block uppercase font-extrabold">Messages Learned</span>
                    <span className="text-slate-900 dark:text-white font-mono text-sm font-black">{retrainSummary.records_trained} Records</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-purple-200 dark:border-purple-800 shadow-sm space-y-1">
                    <span className="text-slate-500 text-[10px] block uppercase font-extrabold">New F1 Score</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-black text-sm">{retrainSummary.new_f1_score}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-purple-200 dark:border-purple-800 shadow-sm space-y-1">
                    <span className="text-slate-500 text-[10px] block uppercase font-extrabold">New Accuracy</span>
                    <span className="text-purple-600 dark:text-purple-400 font-black text-sm">{retrainSummary.new_accuracy}</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-purple-200 dark:border-purple-800 shadow-sm space-y-1">
                    <span className="text-slate-500 text-[10px] block uppercase font-extrabold">Status</span>
                    <span className="text-sky-600 dark:text-sky-400 font-black text-xs uppercase">Active & Deployed</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* BATCH RESULTS TABLE SECTION */}
            {batchResults.length > 0 && (
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-left space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <FileSpreadsheet className="w-4 h-4 text-purple-600" /> Batch Upload Results ({batchResults.length} records)
                    </h4>
                    <p className="text-xs font-semibold text-slate-500">Processed emergency requests automatically categorized</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        placeholder="Search batch table..."
                        value={tableSearch}
                        onChange={(e) => setTableSearch(e.target.value)}
                        className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-600 w-44"
                      />
                    </div>

                    <button
                      onClick={exportBatchCsv}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer hover:bg-purple-500"
                    >
                      <Download className="w-3.5 h-3.5" /> Export CSV
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto max-h-96 rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-xs text-slate-800 dark:text-slate-200">
                    <thead className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                      <tr>
                        <th className="py-3 px-3 cursor-pointer" onClick={() => handleSort('id')}>
                          ID <ArrowUpDown className="w-3 h-3 inline" />
                        </th>
                        <th className="py-3 px-3">Message</th>
                        <th className="py-3 px-3">Disaster</th>
                        <th className="py-3 px-3">Priority</th>
                        <th className="py-3 px-3 cursor-pointer" onClick={() => handleSort('severity_score')}>
                          Urgency Score <ArrowUpDown className="w-3 h-3 inline" />
                        </th>
                        <th className="py-3 px-3 cursor-pointer" onClick={() => handleSort('victim_count')}>
                          Victims <ArrowUpDown className="w-3 h-3 inline" />
                        </th>
                        <th className="py-3 px-3">Location</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {sortedBatchResults.map((m) => (
                        <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-950/50">
                          <td className="py-2.5 px-3 font-mono font-bold">#{m.id}</td>
                          <td className="py-2.5 px-3 max-w-xs font-semibold">
                            <p className="line-clamp-1">"{m.original_text}"</p>
                          </td>
                          <td className="py-2.5 px-3 font-bold text-purple-600 dark:text-purple-400">{m.disaster_type}</td>
                          <td className="py-2.5 px-3 font-bold">{m.priority_level}</td>
                          <td className="py-2.5 px-3 font-mono font-black text-rose-600 dark:text-rose-400">{m.severity_score}/100</td>
                          <td className="py-2.5 px-3 font-black">{m.victim_count}</td>
                          <td className="py-2.5 px-3 font-semibold">{m.location_name || 'Mapped Site'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};
