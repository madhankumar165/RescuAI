import React, { useState } from 'react';
import { 
  FileText, Database, GitFork, Server, Presentation, Code2, 
  Layers, CheckCircle 
} from 'lucide-react';

export const DocumentationPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'er' | 'api' | 'report' | 'presentation'>('architecture');

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h2 className="text-2xl font-extrabold text-white">System Documentation & Capstone Report</h2>
        <p className="text-xs text-slate-400">Complete architectural diagrams, ER models, API specifications, project report & presentation slides</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('architecture')}
          className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'architecture' ? 'text-red-400 border-b-2 border-red-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" /> System Architecture & Flowchart
        </button>

        <button
          onClick={() => setActiveTab('er')}
          className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'er' ? 'text-red-400 border-b-2 border-red-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" /> Database ER Diagram
        </button>

        <button
          onClick={() => setActiveTab('api')}
          className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'api' ? 'text-red-400 border-b-2 border-red-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" /> REST API Documentation
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'report' ? 'text-red-400 border-b-2 border-red-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-4 h-4" /> Final Project Report
        </button>

        <button
          onClick={() => setActiveTab('presentation')}
          className={`pb-3 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
            activeTab === 'presentation' ? 'text-red-400 border-b-2 border-red-500' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Presentation className="w-4 h-4" /> Presentation Content
        </button>
      </div>

      {/* Tab Content */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-6">
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">System Architecture & Processing Pipeline</h3>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto">
              <pre>{`
  ┌────────────────────────────────────────────────────────────────────────┐
  │                           React 19 Frontend                            │
  │     Vite + TypeScript + Tailwind CSS + Recharts + Leaflet Maps         │
  └───────────────────────────────────┬────────────────────────────────────┘
                                      │ REST API / JSON
                                      ▼
  ┌────────────────────────────────────────────────────────────────────────┐
  │                            FastAPI Backend                             │
  │     JWT Security + Pydantic Validation + SQLAlchemy ORM Layer         │
  └────────┬──────────────────────────┬──────────────────────────┬─────────┘
           │                          │                          │
           ▼                          ▼                          ▼
  ┌─────────────────┐       ┌──────────────────┐       ┌───────────────────┐
  │ Module 1: NLP   │       │ Module 2 & 3: ML │       │ Module 4: Live    │
  │ Preprocessing   │       │ Classifiers &    │       │ Command Dashboard │
  │ • Tokenization  │       │ Priority Engine  │       │ • Leaflet Map     │
  │ • Lemmatization │       │ • TF-IDF + RF    │       │ • Priority Queue  │
  │ • Stopword/Emoji│       │ • Severity 0-100 │       │ • AI Chatbot      │
  └─────────────────┘       └──────────────────┘       └───────────────────┘
              `}</pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-red-400">Module 1</h4>
                <p className="text-xs text-slate-400">Intelligent Data Collection, Text Cleaning, Emoji/URL removal, Lemmatization preview.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-amber-400">Module 2</h4>
                <p className="text-xs text-slate-400">Emergency Intent, Disaster Type (8 categories), Multi-label Resource & Entity Extraction.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-sky-400">Module 3</h4>
                <p className="text-xs text-slate-400">Smart Priority Engine (0-100 Severity), Vulnerable Group detection, Duplicate request clustering.</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-emerald-400">Module 4</h4>
                <p className="text-xs text-slate-400">Disaster Command Dashboard with Leaflet spatial maps, charts, filter bar, CSV/PDF export, and AI assistant.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'er' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-white">Database ER Diagram (SQLAlchemy Models)</h3>
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
              <pre>{`
  USERS
  +-------------+--------------+------------------+
  | id (PK)     | email        | hashed_password  |
  | full_name   | role         | is_active        |
  +-------------+--------------+------------------+

         │ 1:N
         ▼
  MESSAGES
  +-------------------+--------------------+------------------+
  | id (PK)           | original_text      | cleaned_text     |
  | is_emergency      | disaster_type      | priority_level   |
  | severity_score    | location_name      | victim_count     |
  | status            | confidence_score   | is_duplicate     |
  +-------------------+--------------------+------------------+
         │ 1:N                          │ 1:N
         ▼                              ▼
  RESOURCE_NEEDS                 PREDICTION_LOGS
  +-------------------+          +--------------------+
  | id (PK)           |          | id (PK)            |
  | message_id (FK)   |          | message_id (FK)    |
  | resource_name     |          | execution_time_ms  |
  +-------------------+          +--------------------+
              `}</pre>
            </div>
          </div>
        )}

        {activeTab === 'api' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">REST API Specifications</h3>
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">POST</span> /api/v1/predict
                <p className="text-slate-400 font-sans mt-1">Classifies disaster text, extracts entities, calculates severity score, and saves to database.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">POST</span> /api/v1/predict/csv
                <p className="text-slate-400 font-sans mt-1">Batch processes CSV dataset of disaster messages.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 font-bold">GET</span> /api/v1/dashboard/stats
                <p className="text-slate-400 font-sans mt-1">Returns summary statistics, category breakdown, and resource demand charts.</p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 font-bold">POST</span> /api/v1/chat
                <p className="text-slate-400 font-sans mt-1">AI Assistant natural language database query engine.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <h3 className="text-lg font-bold text-white">Capstone Project Report Executive Summary</h3>
            <p>
              <strong>Title:</strong> Real-Time Disaster Help Request and Resource-Need Detection Using NLP<br />
              <strong>Abstract:</strong> During natural disasters, social media and emergency messaging channels are inundated with critical help requests. This system provides a full-stack AI platform combining natural language processing, entity extraction, multi-label machine learning classification, and spatial map visualization to automate real-time triage.
            </p>
            <p>
              <strong>Key Methodology:</strong> Implemented TF-IDF feature extraction combined with Random Forest and Logistic Regression classifiers trained on 10,000 synthetic disaster communications across 8 disaster categories. Severity scoring factors in victim count and vulnerable demographic presence.
            </p>
          </div>
        )}

        {activeTab === 'presentation' && (
          <div className="space-y-4 text-xs text-slate-300">
            <h3 className="text-lg font-bold text-white">Final Defense Presentation Slide Overview</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong>Slide 1:</strong> Project Title & Introduction (Problem Statement in Disaster Communications)</li>
              <li><strong>Slide 2:</strong> System Architecture (React 19 + FastAPI + Scikit-Learn Pipeline)</li>
              <li><strong>Slide 3:</strong> Module 1 & 2 NLP Pipeline & Multi-label Resource Classification</li>
              <li><strong>Slide 4:</strong> Module 3 AI Priority Engine & Duplicate Detection</li>
              <li><strong>Slide 5:</strong> Module 4 Executive Command Dashboard & Spatial Mapping</li>
              <li><strong>Slide 6:</strong> Model Evaluation Benchmark (93.5% F1 Score, Confusion Matrix)</li>
              <li><strong>Slide 7:</strong> Conclusion & Future Scope</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
