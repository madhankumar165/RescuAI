import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { 
  Shield, Mail, Lock, ArrowRight, CheckCircle2, 
  AlertCircle, RefreshCw, Globe 
} from 'lucide-react';
import { AnimatedBackground } from '../components/common/AnimatedBackground';
import { disasterApi } from '../services/api';
import { useAuth } from '../context/AuthContext';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'admin@disasterhelp.gov',
      password: 'admin123',
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setServerError('');
    try {
      const res = await disasterApi.login(data.email, data.password);
      loginUser(res.user, res.access_token);
      setSuccess(true);
      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (err: any) {
      setServerError(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex relative overflow-hidden">
      <AnimatedBackground />

      {/* Split Screen Layout */}
      <div className="relative z-10 w-full flex flex-col md:flex-row min-h-screen">
        
        {/* Left Side - Animated AI Illustration & Headline */}
        <div className="hidden md:flex flex-1 flex-col justify-between p-12 lg:p-16 border-r border-white/5 bg-gradient-to-br from-slate-950/80 via-slate-900/40 to-slate-950/90 backdrop-blur-xl relative">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20">
              <Shield className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-wider">RescuAI</span>
          </Link>

          <div className="space-y-8 my-auto max-w-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="w-full h-64 rounded-3xl glass-panel p-6 border border-blue-500/30 relative overflow-hidden flex flex-col justify-between shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-400 flex items-center gap-1.5">
                    <Globe className="w-4 h-4 animate-spin text-cyan-400" /> Live Disaster Map Mesh
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                    High Alert
                  </span>
                </div>

                {/* Animated Map Pin Pulse Nodes */}
                <div className="relative h-32 w-full bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex items-center justify-around">
                  <div className="flex flex-col items-center space-y-1">
                    <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                    <span className="text-[10px] font-mono text-slate-400">Houston TX</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <span className="w-3 h-3 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-[10px] font-mono text-slate-400">Miami FL</span>
                  </div>
                  <div className="flex flex-col items-center space-y-1">
                    <span className="w-3 h-3 rounded-full bg-cyan-400" />
                    <span className="text-[10px] font-mono text-slate-400">San Francisco</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Processed: <strong className="text-white">10,000+ Requests</strong></span>
                  <span className="text-emerald-400 font-bold">Accuracy: 95.0%</span>
                </div>
              </div>
            </motion.div>

            <div className="space-y-3">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">
                Empowering Emergency Command Centers Worldwide
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Connect directly to NLP multi-label classifiers, severity scoring engines, and live spatial maps.
              </p>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            © 2026 RescuAI System. Authorized Command Personnel Only.
          </div>
        </div>

        {/* Right Side - Glass Login Card */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md space-y-6"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white">Sign In</h2>
              <p className="text-xs text-slate-400">Access the Real-Time Disaster Response Dashboard</p>
            </div>

            {/* Glass Card Container */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
              
              {serverError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{serverError}</span>
                </div>
              )}

              {success && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>Authentication Successful! Redirecting to Dashboard...</span>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      {...register('email')}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                      placeholder="admin@disasterhelp.gov"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      {...register('password')}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl glass-input text-xs text-white placeholder-slate-500"
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-red-400 mt-1">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register('rememberMe')}
                      className="rounded bg-slate-900 border-slate-700 text-blue-600 focus:ring-blue-500"
                    />
                    Remember Me
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); alert("Use default password: admin123"); }} className="hover:text-blue-400 transition-colors">
                    Forgot Password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Authenticating...
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="relative flex py-1 items-center">
                <div className="flex-grow border-t border-slate-800"></div>
                <span className="flex-shrink mx-4 text-[10px] uppercase font-bold text-slate-500">OR</span>
                <div className="flex-grow border-t border-slate-800"></div>
              </div>

              {/* Google Login Button UI */}
              <button
                type="button"
                onClick={async () => {
                  try {
                    const res = await disasterApi.login("admin@disasterhelp.gov", "admin123");
                    loginUser(res.user, res.access_token);
                    setSuccess(true);
                    setTimeout(() => navigate('/dashboard'), 800);
                  } catch (e) {
                    navigate('/dashboard');
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 hover:bg-slate-800 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.5 8.9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
                  <path fill="#FBBC05" d="M5.3 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.5-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z" />
                </svg>
                Continue with Google Single Sign-On
              </button>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 text-center space-y-1">
                <p><strong>Demo Command Credentials:</strong></p>
                <p>Email: <code className="text-slate-200">admin@disasterhelp.gov</code></p>
                <p>Password: <code className="text-slate-200">admin123</code></p>
              </div>

              <div className="text-center text-xs text-slate-400">
                Don't have a responder account?{' '}
                <Link to="/signup" className="text-blue-400 font-bold hover:underline">
                  Create Account
                </Link>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </div>
  );
};
