import axios from 'axios';
import { Message, DashboardStats, TimelinePoint, MapMarkerItem, PreprocessResult, ChatMessage } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to attach JWT token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('disaster_auth_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const disasterApi = {
  // Auth
  login: async (email: string, password: string) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data;
  },
  register: async (full_name: string, email: string, password: string) => {
    const res = await api.post('/auth/register', { full_name, email, password });
    return res.data;
  },
  getProfile: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  // Preprocess & Prediction
  preprocessText: async (text: string): Promise<PreprocessResult> => {
    const res = await api.post('/nlp/preprocess', { text });
    return res.data;
  },
  predictMessage: async (text: string): Promise<Message> => {
    const res = await api.post('/predict', { text });
    return res.data;
  },
  uploadCsv: async (file: File, retrain: boolean = false): Promise<{ results: Message[]; count: number; retrain_summary?: any }> => {
    const formData = new FormData();
    formData.append('file', file);
    const res = await api.post(`/predict/csv?retrain=${retrain}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (Array.isArray(res.data)) {
      return { results: res.data, count: res.data.length };
    }
    return res.data;
  },

  // Messages & Dashboard
  getMessages: async (params?: Record<string, any>): Promise<Message[]> => {
    const res = await api.get('/messages', { params });
    return res.data;
  },
  updateStatus: async (messageId: number, status: string, assignedTo?: string): Promise<Message> => {
    const res = await api.put(`/messages/${messageId}/status`, { status, assigned_to: assignedTo });
    return res.data;
  },
  getDashboardStats: async (): Promise<DashboardStats> => {
    const res = await api.get('/dashboard/stats');
    return res.data;
  },
  getTimeline: async (): Promise<TimelinePoint[]> => {
    const res = await api.get('/dashboard/timeline');
    return res.data;
  },
  getMapData: async (): Promise<MapMarkerItem[]> => {
    const res = await api.get('/dashboard/map');
    return res.data;
  },

  // AI Assistant & Model Evaluation
  sendChatMessage: async (prompt: string) => {
    const res = await api.post('/chat', { prompt });
    return res.data;
  },
  getEvaluationMetrics: async () => {
    const res = await api.get('/evaluation');
    return res.data;
  },

  // Export URLs
  getCsvExportUrl: () => `${API_BASE_URL}/export/csv`,
  getPdfExportUrl: () => `${API_BASE_URL}/export/pdf`,
};
