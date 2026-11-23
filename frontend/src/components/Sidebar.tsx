import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, UploadCloud, History, 
  BarChart3, Bot, ShieldCheck, LogOut 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Emergency Map & Stats', icon: LayoutDashboard, path: '/dashboard' },
    { label: 'Send Help Request', icon: UploadCloud, path: '/dashboard/analyze' },
    { label: 'All Help Requests', icon: History, path: '/dashboard/history' },
    { label: 'AI Score & Accuracy', icon: BarChart3, path: '/dashboard/evaluation' },
    { label: 'AI Assistant', icon: Bot, path: '/dashboard/chat' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="border-r transition-colors flex flex-col justify-between p-3 min-h-[calc(100vh-4rem)] z-30 bg-white border-slate-200 dark:bg-black dark:border-slate-800 shadow-sm relative overflow-hidden flex-shrink-0"
    >
      <div className="space-y-5">
        {/* Category Header */}
        {!isCollapsed && (
          <div className="px-3 pt-2">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 whitespace-nowrap"
            >
              MAIN MENU
            </motion.p>
          </div>
        )}

        <nav className="space-y-1.5">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} end={item.path === '/dashboard'}>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ x: isCollapsed ? 0 : 4, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center gap-3 py-2.5 rounded-2xl text-xs font-extrabold transition-all cursor-pointer ${
                    isCollapsed ? 'justify-center px-0' : 'px-3.5'
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-md shadow-purple-500/20 border border-purple-400/30'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-purple-50 dark:hover:bg-slate-900 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                >
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-purple-600'}`} />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="whitespace-nowrap truncate"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="space-y-3">
        {/* Animated Sign Out Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          title={isCollapsed ? "Sign Out" : undefined}
          className={`w-full py-2.5 rounded-2xl text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-900/40 flex items-center justify-center gap-2 border border-rose-200 dark:border-rose-800/50 shadow-sm transition-all cursor-pointer ${
            isCollapsed ? 'px-0' : 'px-3.5'
          }`}
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Sign Out</span>}
        </motion.button>

        {!isCollapsed && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 px-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 flex justify-between items-center">
            <span>Disaster Relief AI</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        )}
      </div>
    </motion.aside>
  );
};
