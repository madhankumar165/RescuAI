import React, { useState } from 'react';
import { 
  Layers, ChevronLeft, ChevronRight, Download, ArrowUpDown, Eye 
} from 'lucide-react';
import { Message } from '../../types';
import { PriorityBadge } from '../PriorityBadge';
import { DisasterBadge } from '../DisasterBadge';
import { ResourceBadge } from '../ResourceBadge';

interface RequestTableSectionProps {
  messages: Message[];
  page: number;
  setPage: (p: number) => void;
  onStatusChange: (id: number, status: string) => void;
  onInspectMessage: (msg: Message) => void;
}

export const RequestTableSection: React.FC<RequestTableSectionProps> = ({
  messages,
  page,
  setPage,
  onStatusChange,
  onInspectMessage,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [sortField, setSortField] = useState<'id' | 'severity_score' | 'victim_count'>('severity_score');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const toggleSelectAll = () => {
    if (selectedIds.length === messages.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(messages.map((m) => m.id));
    }
  };

  const toggleSelectRow = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSort = (field: 'id' | 'severity_score' | 'victim_count') => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('desc');
    }
  };

  const sortedMessages = [...messages].sort((a, b) => {
    const valA = a[sortField] || 0;
    const valB = b[sortField] || 0;
    return sortDir === 'asc' ? valA - valB : valB - valA;
  });

  const exportSelectedCsv = () => {
    const toExport = messages.filter((m) => selectedIds.includes(m.id));
    if (toExport.length === 0) return;

    const headers = ['ID', 'Message', 'Disaster', 'Priority', 'Urgency Score', 'Location', 'Victims', 'Status'];
    const rows = toExport.map((m) => [
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
    link.setAttribute('download', `emergency_requests_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="space-y-6 text-center">
      {/* Centered Heading with Proper Spacing */}
      <div className="flex flex-col items-center justify-center text-center space-y-2 max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 text-xs font-extrabold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" /> Dispatch Operations
        </div>
        <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Live Help Request Queue & Dispatch Tracker
        </h3>
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          Incoming messages sorted by urgency score, location, and resolution status
        </p>

        {/* Bulk Action Bar */}
        {selectedIds.length > 0 && (
          <div className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 px-4 py-2 rounded-2xl mt-2">
            <span className="text-xs font-black text-purple-700 dark:text-purple-300">
              {selectedIds.length} Selected
            </span>
            <button
              onClick={exportSelectedCsv}
              className="px-3.5 py-1.5 rounded-xl bg-purple-600 text-white text-xs font-black flex items-center gap-1.5 hover:bg-purple-500 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" /> Export Selected CSV
            </button>
          </div>
        )}
      </div>

      <div className="glass-panel rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden space-y-4 p-6 shadow-xl bg-white dark:bg-slate-900 text-left">
        {/* Table Container with Sticky Header */}
        <div className="overflow-x-auto max-h-[560px]">
          <table className="w-full text-left text-xs text-slate-800 dark:text-slate-200 relative">
            <thead className="bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-400 font-extrabold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
              <tr>
                <th className="py-3.5 px-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === messages.length && messages.length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                  />
                </th>
                <th className="py-3.5 px-4 cursor-pointer" onClick={() => handleSort('severity_score')}>
                  <div className="flex items-center gap-1">
                    Priority & Urgency <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Emergency Help Message</th>
                <th className="py-3.5 px-4">Disaster</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4 cursor-pointer" onClick={() => handleSort('victim_count')}>
                  <div className="flex items-center gap-1">
                    People <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3.5 px-4">Needed Supplies</th>
                <th className="py-3.5 px-4">Authenticity</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {sortedMessages.map((msg) => {
                const isSelected = selectedIds.includes(msg.id);
                return (
                  <tr
                    key={msg.id}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-950/50 transition-colors ${
                      isSelected ? 'bg-purple-500/5' : ''
                    }`}
                  >
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelectRow(msg.id)}
                        className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-4 font-mono font-bold">
                      <PriorityBadge priority={msg.priority_level} size="sm" />
                      <span className="block text-[10px] text-slate-500 font-bold mt-1">Score: {msg.severity_score}/100</span>
                    </td>
                    <td className="py-4 px-4 max-w-sm">
                      <p className="font-bold text-slate-900 dark:text-slate-100 line-clamp-2">"{msg.original_text}"</p>
                      {msg.is_duplicate && (
                        <span className="inline-block mt-1 text-[10px] font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                          Duplicate Request
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <DisasterBadge type={msg.disaster_type} />
                    </td>
                    <td className="py-4 px-4 font-extrabold text-slate-900 dark:text-white">
                      {msg.location_name || 'Unknown'}
                    </td>
                    <td className="py-4 px-4 font-black text-slate-900 dark:text-white">
                      {msg.victim_count}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {msg.resources?.map((r, i) => (
                          <ResourceBadge key={i} name={r.resource_name} />
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      {msg.is_real === false ? (
                        <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 text-[10px] font-black border border-rose-500/30">
                          🚨 Suspected Fake
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black border border-emerald-500/30">
                          ✓ Real Request ({msg.authenticity_score ?? 90}%)
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={msg.status}
                        onChange={(e) => onStatusChange(msg.id, e.target.value)}
                        className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 text-xs font-black text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Assigned">Assigned</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => onInspectMessage(msg)}
                        className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-purple-600 cursor-pointer"
                        title="Quick Inspect Drawer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-2 text-xs font-bold text-slate-600 dark:text-slate-400">
          <span>Showing page {page}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 disabled:opacity-50 cursor-pointer shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 cursor-pointer shadow-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
