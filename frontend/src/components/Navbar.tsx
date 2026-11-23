import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Moon, Sun, Download, Bot, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { disasterApi } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarCollapsed?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarCollapsed }) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name?: string) => {
    if (!name) return 'HQ';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <header className="h-16 border-b transition-colors sticky top-0 z-40 px-6 flex items-center justify-between backdrop-blur-md dark:border-slate-800 dark:bg-black border-slate-200 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        {/* Toggle Sidebar Button */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-600 transition-all cursor-pointer"
          >
            {isSidebarCollapsed ? (
              <PanelLeftOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            ) : (
              <PanelLeftClose className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            )}
          </button>
        )}

        <Link to="/" className="p-2 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-indigo-600 text-white shadow-md flex items-center justify-center">
          <Shield className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-black text-lg text-slate-900 dark:text-white tracking-wider flex items-center gap-2">
            RescuAI
          </h1>
          <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hidden sm:block">NLP Disaster Emergency Request & Resource Intelligence</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/dashboard/chat"
          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-purple-500/20 transition-all cursor-pointer"
        >
          <Bot className="w-4 h-4" />
          <span className="hidden sm:inline">AI Assistant</span>
        </Link>

        <a
          href={disasterApi.getCsvExportUrl()}
          download
          className="hidden md:flex px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          Export CSV
        </a>

        <a
          href={disasterApi.getPdfExportUrl()}
          download
          className="hidden md:flex px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold items-center gap-1.5 transition-colors"
        >
          <Download className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
          Export PDF
        </a>

        {/* Light & Dark Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-purple-600 transition-colors cursor-pointer"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
        </button>

        <div className="h-6 w-px bg-slate-300 dark:bg-slate-800 mx-1" />

        {/* Logged In User Profile & Logout Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer text-left"
          >
            <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-black text-xs flex items-center justify-center shadow-md">
              {getInitials(user?.full_name)}
            </div>
            <div className="hidden md:block">
              <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">
                {user?.full_name || 'Chief Officer'}
              </p>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 leading-tight">
                {user?.email || 'admin@disasterhelp.gov'}
              </p>
            </div>
          </button>

          {/* User Profile Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 shadow-2xl z-50 animate-in fade-in zoom-in duration-150">
              <div className="px-3 py-2 border-b border-slate-200 dark:border-slate-800 mb-1">
                <p className="text-xs font-black text-slate-900 dark:text-white">{user?.full_name}</p>
                <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 truncate">{user?.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold uppercase rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                  Role: {user?.role || 'Responder'}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="w-full px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out / Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
