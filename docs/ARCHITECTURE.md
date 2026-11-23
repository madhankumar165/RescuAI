# System Architecture Documentation

## Real-Time Disaster Help Request & Resource-Need Detection Using NLP

### Overview
This system provides an end-to-end AI-powered disaster management infrastructure designed for first responders, emergency command centers, and humanitarian aid organizations.

```
                          ┌──────────────────────────────────────────────┐
                          │               React 19 Frontend              │
                          │   Vite + TS + Tailwind CSS + Framer Motion   │
                          │  Recharts + Leaflet Maps + Lucide Icons      │
                          └──────────────────────┬───────────────────────┘
                                                 │ REST API / JSON
                                                 ▼
                          ┌──────────────────────────────────────────────┐
                          │               FastAPI Backend                │
                          │        JWT Auth + Pydantic Validation       │
                          └──────┬────────────────┬───────────────┬──────┘
                                 │                │               │
            ┌────────────────────┴──┐   ┌─────────┴─────────┐   ┌─┴───────────────────┐
            │   NLP & ML Engine     │   │  SQLAlchemy ORM   │   │  AI Chat Assistant  │
            │  • Cleaning & NER     │   │  Message, User,   │   │  Database Querying  │
            │  • Multi-label Class  │   │  Resource, Log,   │   │  Intent Router      │
            │  • Priority Engine    │   │  Analytics        │   └─────────────────────┘
            │  • Similarity Cluster │   └─────────┬─────────┘
            └───────────────────────┘             │
                                                  ▼
                                      ┌──────────────────────┐
                                      │ SQLite / PostgreSQL  │
                                      └──────────────────────┘
```

### Module Breakdown

#### Module 1: Intelligent Data Collection & Text Preprocessing
- Text cleaning (Regex stripping of non-alphanumeric noise, URLs, Emojis).
- Tokenization & Lemmatization.
- Stopword removal.
- Language detection heuristics.
- Interactive step-by-step preprocessing preview.

#### Module 2: AI-Powered Emergency Intent & Resource Detection
- Multi-label Scikit-learn Random Forest and Logistic Regression classifiers trained on 10,000 synthetic disaster communications.
- Classification of 8 Disaster Types: Flood, Earthquake, Cyclone, Fire, Landslide, Tsunami, Building Collapse, Road Accident.
- Multi-label Resource Need detection: Food, Water, Medical Aid, Shelter, Rescue Team, Medicine, Clothes, Blankets.
- Named Entity Recognition (NER) for location geocoding, victim counts, and phone numbers.
- Prediction explainer generating human-readable rationale behind classifications.

#### Module 3: Smart Location & Priority Intelligence Engine
- Severity score calculation (0 to 100) based on victim count, vulnerable groups (children, women, elderly, disabled), disaster category weight, and resource urgency.
- Categorization into Critical, High, Medium, and Low priorities.
- Cosine similarity duplicate detection clustering repeated requests.

#### Module 4: Disaster Response Command Dashboard
- Executive KPI stat cards: Total requests, Critical priority count, Impacted victim count, Resolved cases.
- Recharts visualizations: Priority distribution time series, Disaster breakdown pie chart, Resource demand bar chart.
- Leaflet interactive map with custom urgency markers and detail popups.
- Instant CSV and PDF report exporter.
- AI Chat Assistant supporting natural language database queries.
