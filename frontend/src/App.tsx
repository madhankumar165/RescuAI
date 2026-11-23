import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { MessageHistoryPage } from './pages/MessageHistoryPage';
import { ModelEvaluationPage } from './pages/ModelEvaluationPage';
import { AiChatAssistantPage } from './pages/AiChatAssistantPage';

export const AppContent: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="min-h-screen transition-colors">
      <Routes>
        {/* Public SaaS Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Authenticated Command Center Sub-Routes */}
        <Route
          path="/dashboard/*"
          element={
            <div className="min-h-screen flex flex-col transition-colors">
              <Navbar onToggleSidebar={toggleSidebar} isSidebarCollapsed={isSidebarCollapsed} />
              <div className="flex flex-1">
                <Sidebar isCollapsed={isSidebarCollapsed} />
                <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/analyze" element={<AnalyzePage />} />
                    <Route path="/history" element={<MessageHistoryPage />} />
                    <Route path="/evaluation" element={<ModelEvaluationPage />} />
                    <Route path="/chat" element={<AiChatAssistantPage />} />
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                  </Routes>
                </main>
              </div>
            </div>
          }
        />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
