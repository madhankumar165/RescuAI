import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { 
  Search, Phone, Users, Calendar, ChevronLeft, ChevronRight, 
  MapPin, CheckCircle2, AlertTriangle, Filter, RefreshCw, ShieldCheck, ShieldAlert,
  Activity, X, Eye, Navigation, Clock, Layers, Sparkles, Terminal, Code2, Copy, Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { disasterApi } from '../services/api';
import { Message } from '../types';
import { PriorityBadge } from '../components/PriorityBadge';
import { DisasterBadge } from '../components/DisasterBadge';
import { IncidentConsoleCard } from '../components/IncidentConsoleCard';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';

export const MessageHistoryPage: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [disasterFilter, setDisasterFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [refreshNotification, setRefreshNotification] = useState<string | null>(null);

  // Drawer & JSON Tab State
  const [selectedDrawerMessage, setSelectedDrawerMessage] = useState<Message | null>(null);
  const [showRawJson, setShowRawJson] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  const [secondsAgo, setSecondsAgo] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsAgo((prev) => (prev >= 59 ? 1 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchMessages = useCallback(async (resetFilters: boolean = false) => {
    setLoading(true);
    setRefreshNotification(null);
    try {
      const activeSearch = resetFilters ? '' : search;
      const activePriority = resetFilters ? '' : priorityFilter;
      const activeDisaster = resetFilters ? '' : disasterFilter;
      const activeStatus = resetFilters ? '' : statusFilter;
      const activePage = resetFilters ? 1 : page;

      if (resetFilters) {
        setSearch('');
        setPriorityFilter('');
        setDisasterFilter('');
        setStatusFilter('');
        setPage(1);
      }

      const data = await disasterApi.getMessages({
        search: activeSearch || undefined,
        priority: activePriority || undefined,
        disaster_type: activeDisaster || undefined,
        status: activeStatus || undefined,
        page: activePage,
        limit: 15,
      });
      setMessages(data);
      setSecondsAgo(0);
      setRefreshNotification(`Refreshed! Synced ${data.length} emergency incident records.`);
      setTimeout(() => setRefreshNotification(null), 3000);
    } catch (err) {
      console.error('Failed to load message history', err);
    } finally {
      setLoading(false);
    }
  }, [search, priorityFilter, disasterFilter, statusFilter, page]);

  useEffect(() => {
    fetchMessages(false);
  }, [fetchMessages]);

  const handleStatusChange = async (messageId: number, newStatus: string) => {
    setUpdatingId(messageId);
    try {
      const updated = await disasterApi.updateStatus(messageId, newStatus);
      setMessages((prev) => prev.map((m) => (m.id === messageId ? updated : m)));
    } catch (err) {
      console.error('Failed to update status', err);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopyJson = () => {
    if (!selectedDrawerMessage) return;
    navigator.clipboard.writeText(JSON.stringify(selectedDrawerMessage, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  // KPI Calculations
  const criticalCount = useMemo(
    () => messages.filter((m) => m.priority_level === 'Critical').length,
    [messages]
  );

  const resolvedCount = useMemo(
    () => messages.filter((m) => m.status === 'Resolved').length,
    [messages]
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (search) count++;
    if (priorityFilter) count++;
    if (disasterFilter) count++;
    if (statusFilter) count++;
    return count;
  }, [search, priorityFilter, disasterFilter, statusFilter]);

  return (
    <div className="space-y-12 pb-24 relative">
      {/* Background Aurora Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 blur-3xl pointer-events-none -z-10 rounded-full" />

      {/* Header Section - Centered with Proper Spacing */}
      <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-4xl mx-auto px-4">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 text-xs font-black uppercase tracking-wider shadow-sm">
          <Activity className="w-4 h-4 text-purple-600 animate-bounce" /> Emergency Incident Console Log
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          AI Emergency Incident{' '}
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
            Console Log
          </span>
        </h1>

        <p className="text-sm md:text-base font-semibold text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          Futuristic command console tracking disaster triage, real vs fake authenticity checks, victim density, and interactive 6-stage field rescue dispatching.
        </p>

        {/* Action Controls & Sync Status Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-black flex items-center gap-2 shadow-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            Live Sync Active ({secondsAgo}s ago)
          </span>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => fetchMessages(true)}
            disabled={loading}
            className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black flex items-center gap-2 shadow-lg shadow-purple-600/25 cursor-pointer disabled:opacity-50 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh Request Database
          </motion.button>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-4xl mx-auto px-2">
        <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-1 text-center">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Total Loaded</span>
          <p className="text-2xl font-black text-slate-900 dark:text-white font-mono">{messages.length}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-1 text-center">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Critical Priority</span>
          <p className="text-2xl font-black text-rose-600 dark:text-rose-400 font-mono">{criticalCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-1 text-center">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Resolved Cases</span>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono">{resolvedCount}</p>
        </motion.div>

        <motion.div whileHover={{ y: -4, scale: 1.02 }} className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-1 text-center">
          <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">Active Page</span>
          <p className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono">Page {page}</p>
        </motion.div>
      </div>

      {/* Refresh Confirmation Notification Toast */}
      {refreshNotification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 text-xs font-black flex items-center justify-between max-w-5xl mx-auto shadow-md"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>{refreshNotification}</span>
          </div>
          <button onClick={() => setRefreshNotification(null)} className="text-emerald-700 hover:underline text-xs">
            Dismiss
          </button>
        </motion.div>
      )}

      {/* Filter Toolbar Container */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-xl max-w-5xl mx-auto bg-white dark:bg-slate-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 min-w-[280px]">
            <Search className="w-4 h-4 text-purple-500 absolute left-4 top-3.5" />
            <input
              type="text"
              placeholder="Search emergency text, cities, victims, or phone numbers..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:border-purple-600 shadow-inner"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={priorityFilter}
              onChange={(e) => {
                setPriorityFilter(e.target.value);
                setPage(1);
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select
              value={disasterFilter}
              onChange={(e) => {
                setDisasterFilter(e.target.value);
                setPage(1);
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="">All Disasters</option>
              <option value="Flood">Flood</option>
              <option value="Earthquake">Earthquake</option>
              <option value="Cyclone">Cyclone</option>
              <option value="Fire">Fire</option>
              <option value="Landslide">Landslide</option>
              <option value="Tsunami">Tsunami</option>
              <option value="Building Collapse">Building Collapse</option>
              <option value="Road Accident">Road Accident</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-extrabold text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Assigned">Assigned</option>
              <option value="Moving">Moving</option>
              <option value="Reached">Reached</option>
              <option value="Rescue">Rescue</option>
              <option value="Resolved">Resolved</option>
            </select>

            {activeFilterCount > 0 && (
              <button
                onClick={() => fetchMessages(true)}
                className="px-3.5 py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 text-xs font-bold hover:bg-rose-100 cursor-pointer"
              >
                Clear ({activeFilterCount})
              </button>
            )}
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs font-bold">
            <span className="text-slate-400 text-[11px] flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-purple-500" /> Active Filters:
            </span>
            {search && (
              <span className="px-3 py-1 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300 flex items-center gap-1">
                Search: "{search}" <X className="w-3 h-3 cursor-pointer" onClick={() => setSearch('')} />
              </span>
            )}
            {priorityFilter && (
              <span className="px-3 py-1 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 flex items-center gap-1">
                Priority: {priorityFilter} <X className="w-3 h-3 cursor-pointer" onClick={() => setPriorityFilter('')} />
              </span>
            )}
            {disasterFilter && (
              <span className="px-3 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 flex items-center gap-1">
                Disaster: {disasterFilter} <X className="w-3 h-3 cursor-pointer" onClick={() => setDisasterFilter('')} />
              </span>
            )}
            {statusFilter && (
              <span className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 flex items-center gap-1">
                Status: {statusFilter} <X className="w-3 h-3 cursor-pointer" onClick={() => setStatusFilter('')} />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Loading Skeleton */}
      {loading && messages.length === 0 && (
        <div className="space-y-6 max-w-5xl mx-auto">
          {[1, 2].map((i) => (
            <div key={i} className="p-8 rounded-3xl bg-slate-200 dark:bg-slate-900 animate-pulse space-y-4 h-64 border border-slate-300 dark:border-slate-800" />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && messages.length === 0 && (
        <div className="glass-panel p-12 rounded-3xl border border-slate-200 dark:border-slate-800 text-center space-y-4 max-w-xl mx-auto bg-white dark:bg-slate-900 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">No Incident Records Found</h3>
          <p className="text-xs font-semibold text-slate-500">
            No emergency requests match your active search filter. Try resetting search parameters.
          </p>
          <button
            onClick={() => fetchMessages(true)}
            className="px-5 py-2.5 rounded-2xl bg-purple-600 text-white text-xs font-black hover:bg-purple-500 cursor-pointer shadow-md"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* INCIDENT CONSOLE CARDS LIST */}
      <AnimatePresence>
        <div className="space-y-8 max-w-5xl mx-auto">
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
            >
              <IncidentConsoleCard
                msg={msg}
                idx={idx}
                updatingId={updatingId}
                onStatusChange={handleStatusChange}
                onInspectDetails={setSelectedDrawerMessage}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* PAGINATION CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-600 dark:text-slate-400 pt-6 border-t border-slate-200 dark:border-slate-800 max-w-5xl mx-auto px-2">
        <span>Showing page {page}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 disabled:opacity-50 cursor-pointer shadow-sm font-black flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <span className="px-4 py-2 rounded-2xl bg-purple-600 text-white font-mono font-black shadow-md">
            {page}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 cursor-pointer shadow-sm font-black flex items-center gap-1"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* PREVIEWS & SLIDE-OVER INCIDENT INSPECTOR DRAWER */}
      <AnimatePresence>
        {selectedDrawerMessage && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl z-50 p-6 overflow-y-auto space-y-6 text-left"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black text-purple-600 dark:text-purple-400 bg-purple-500/10 px-3 py-1 rounded-xl border border-purple-500/30">
                  INCIDENT CONSOLE #{selectedDrawerMessage.id}
                </span>
                <PriorityBadge priority={selectedDrawerMessage.priority_level} size="sm" />
              </div>
              <button
                onClick={() => setSelectedDrawerMessage(null)}
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-rose-500 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Incident Title */}
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                {selectedDrawerMessage.disaster_type} Emergency Details
              </h3>
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {selectedDrawerMessage.location_name || 'Mapped Location'} ({selectedDrawerMessage.latitude ?? 21.0}, {selectedDrawerMessage.longitude ?? 82.0})
              </p>
            </div>

            {/* Original Text */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Original Input Help Text
              </span>
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 italic leading-relaxed">
                "{selectedDrawerMessage.original_text}"
              </p>
            </div>

            {/* Extracted NLP Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="text-slate-500 text-[10px] uppercase block">Urgency Score</span>
                <span className="text-rose-600 dark:text-rose-400 text-lg font-black">{selectedDrawerMessage.severity_score}/100</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <span className="text-slate-500 text-[10px] uppercase block">Victims Trapped</span>
                <span className="text-amber-600 dark:text-amber-400 text-lg font-black">{selectedDrawerMessage.victim_count} People</span>
              </div>
            </div>

            {/* Toggle Raw JSON View */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
                  Raw JSON Payload
                </span>
                <button
                  onClick={() => setShowRawJson(!showRawJson)}
                  className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer"
                >
                  {showRawJson ? 'Hide Raw JSON' : 'Inspect Raw JSON'}
                </button>
              </div>

              {showRawJson && (
                <div className="relative">
                  <pre className="p-4 rounded-2xl bg-slate-950 text-xs font-mono text-emerald-400 max-h-60 overflow-y-auto border border-slate-800">
                    {JSON.stringify(selectedDrawerMessage, null, 2)}
                  </pre>
                  <button
                    onClick={handleCopyJson}
                    className="absolute top-2 right-2 px-2.5 py-1 rounded bg-slate-800 text-white text-[10px] font-mono flex items-center gap-1 cursor-pointer hover:bg-slate-700"
                  >
                    {copiedJson ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copiedJson ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              )}
            </div>

            {/* Action CTA Button */}
            <button
              onClick={() => {
                navigate('/dashboard', {
                  state: {
                    focusLat: selectedDrawerMessage.latitude ?? 21.0,
                    focusLng: selectedDrawerMessage.longitude ?? 82.0,
                    focusLocation: selectedDrawerMessage.location_name || 'Emergency Site'
                  }
                });
                setSelectedDrawerMessage(null);
              }}
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all hover:scale-105"
            >
              <Navigation className="w-4 h-4" /> Focus Camera & Draw Shortest Rescue Route
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
