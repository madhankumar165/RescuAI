import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, ShieldAlert, X, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';
import { Message } from '../../types';

interface NotificationToastProps {
  isOpen: boolean;
  onClose: () => void;
  urgentMessages: Message[];
  onSelectMessage: (msg: Message) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  isOpen,
  onClose,
  urgentMessages,
  onSelectMessage,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -10 }}
        className="fixed top-20 right-6 z-50 w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl p-5 space-y-4 text-left"
      >
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-black text-sm">
            <ShieldAlert className="w-4 h-4 animate-bounce" />
            <span>Incoming Emergency Notifications ({urgentMessages.length})</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
          {urgentMessages.length === 0 ? (
            <p className="text-xs font-semibold text-slate-500 text-center py-4">No active critical alerts</p>
          ) : (
            urgentMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  onSelectMessage(msg);
                  onClose();
                }}
                className="p-3 rounded-2xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-1 cursor-pointer hover:border-rose-400 transition-all"
              >
                <div className="flex items-center justify-between text-[11px] font-extrabold">
                  <span className="text-rose-700 dark:text-rose-300 font-mono">#{msg.id} {msg.disaster_type}</span>
                  <span className="text-rose-600 font-black">Score: {msg.severity_score}/100</span>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2">
                  "{msg.original_text}"
                </p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-extrabold pt-1">
                  <span>📍 {msg.location_name || 'Unknown Location'}</span>
                  <span className="text-purple-600 dark:text-purple-400 flex items-center gap-0.5">
                    Inspect <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
