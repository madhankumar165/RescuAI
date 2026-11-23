# REAL-TIME DISASTER HELP REQUEST AND RESOURCE-NEED DETECTION USING NLP

**A CAPSTONE PROJECT REPORT**

*A Capstone Project Report submitted in partial fulfilment of the requirements for the Course of*  
**CSA0605 - DESIGN AND ANALYSIS OF ALGORITHMS / CAPSTONE PROJECT WORK**  
*to the award of the degree of*  
**BACHELOR OF ENGINEERING / BACHELOR OF TECHNOLOGY IN ARTIFICIAL INTELLIGENCE & MACHINE LEARNING**

---

### Submitted by:
- **T. Bhanu Pavan Varma** (192425380)
- **M. Siva Anjaneyulu** (192424419)
- **N. Hemanth Reddy** (192472215)
- **O. Siddi Rishwanth** (192472148)

### Under the Supervision of:
**Dr T. Devi**  
Professor, Department of CSE / AI&ML  
SIMATS Engineering, Saveetha Institute of Medical and Technical Sciences, Chennai-602105  

**SEPTEMBER 2026**

---

## BONAFIDE CERTIFICATE

This is to certify that the Capstone Project entitled **“Real-Time Disaster Help Request and Resource-Need Detection Using NLP”** has been carried out by **T. Bhanu Pavan Varma (192425380), M. Siva Anjaneyulu (192424419), N. Hemanth Reddy (192472215), and O. Siddi Rishwanth (192472148)** under the supervision of **Dr T. Devi** and is submitted in partial fulfilment of the requirements for the current semester of the B.Tech AI&ML program at Saveetha Institute of Medical and Technical Sciences, Chennai.

| COURSE COORDINATOR | COURSE FACULTY |
| :--- | :--- |
| **Dr. F. Mary Harin Fernandez**<br>Professor & Head<br>Department of CSE<br>SIMATS Engineering, Chennai – 602105 | **Dr T. Devi**<br>Professor<br>Department of CSE<br>SIMATS Engineering, Chennai – 602105 |

---

## DECLARATION

We, **T. Bhanu Pavan Varma (192425380), M. Siva Anjaneyulu (192424419), N. Hemanth Reddy (192472215), and O. Siddi Rishwanth (192472148)** of the Department of B. Tech AI&ML, SIMATS Engineering, Saveetha Institute of Medical and Technical Sciences, Chennai, hereby declare that the Capstone Project Work entitled **“Real-Time Disaster Help Request and Resource-Need Detection Using NLP”** is the result of our own bonafide efforts.

Place: Chennai  
Date: 02-09-2026  

**Signatures:**
1. T. Bhanu Pavan Varma (192425380)
2. M. Siva Anjaneyulu (192424419)
3. N. Hemanth Reddy (192472215)
4. O. Siddi Rishwanth (192472148)

---

## Individual Contribution Statement

| Student Name / Register No. | Specific Responsibilities | Design & Development Contribution | Testing & Analysis Contribution | Report Contribution | Approx. Contrib. (%) |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **T. Bhanu Pavan Varma** (192425380) | ML Architecture, Severity Engine, FastAPI Backend, System Orchestration | Designed TF-IDF vectorizer (5k features); engineered multi-label Random Forest & Logistic Regression classifiers; formulated multi-factor severity scoring equation. | Benchmarked multi-label recall and precision across 10,000 synthetic corpus records; verified sub-50ms inference latency; profiled server memory. | Chapters 1, 3, 5, Mathematical proofs & Appendix A. | **25%** |
| **M. Siva Anjaneyulu** (192424419) | NLP Preprocessor, Custom NER Engine, Database Modeling, API Route Handlers | Constructed text cleaning pipeline (regex, emoji stripping, NLTK lemmatization); engineered rule-based entity extraction for locations, victim counts, and vulnerable groups. | Unit tested preprocessor and NER accuracy; verified SQLite relational persistence; validated Pydantic schema validation tests. | Chapters 2, 4, Data extraction pipelines & Appendix B–C. | **25%** |
| **N. Hemanth Reddy** (192472215) | Frontend UI/UX, React 19 SPA, Interactive Charts, Explainability Lab | Built responsive React 19 + Tailwind CSS dashboard; created Recharts analytics (incident timeline, resource bars); developed step-by-step Preprocessing Preview and Prediction Explainer. | Cross-browser testing (Chrome, Safari, Firefox); end-to-end user experience audits; audited dark/light UI accessibility and responsiveness. | Chapter 4 (UI/UX), Dashboard Schematics, Appendix D & H. | **25%** |
| **O. Siddi Rishwanth** (192472148) | GIS Mapping, Duplicate Engine, Integration QA, Deployment Ops | Integrated Leaflet OpenStreetMap interactive GIS layers with custom urgency pins; built TF-IDF Cosine Similarity duplicate message clustering engine; wrote Docker orchestration. | Executed load testing on concurrent message streams; evaluated duplicate suppression threshold ($\tau=0.70$); validated PDF/CSV export pipelines. | Chapter 3 (Trade-offs), Risk Register, Appendix E & G. | **25%** |
| **Total** | | | | | **100%** |

---

## ABSTRACT

Natural disasters—including floods, earthquakes, cyclones, severe urban fires, landslides, and building collapses—generate massive, chaotic surges of urgent help requests across public communication channels such as social media, emergency SMS gateways, and civilian hotlines. Emergency response coordinators and first responders are rapidly overwhelmed by the sheer volume of unstructured, noisy, and duplicate messages, leading to catastrophic triage bottlenecks during the 'Golden Hour' of disaster relief. Conventional municipal disaster response workflows rely heavily on manual call center operators or static keyword filters, which fail to prioritize critical life-threatening situations, overlook vulnerable populations, and cause fatal delays in resource deployment.

This capstone project presents **RescuAI**, a production-grade, full-stack disaster triage and resource-need intelligence platform powered by Natural Language Processing (NLP) and multi-label Machine Learning (ML). The system incorporates an automated text preprocessing pipeline featuring noise stripping, emoji sanitization, NLTK tokenization, and WordNet lemmatization. High-dimensional text representations are generated via Term Frequency-Inverse Document Frequency (TF-IDF) n-gram vectorization. RescuAI couples a binary emergency intent classifier with an 8-class disaster categorization model and multi-label binary classifiers trained across 8 life-critical resource demands (*Food, Water, Medical Aid, Shelter, Rescue Team, Medicine, Clothes, Blankets*). A custom Named Entity Recognition (NER) engine extracts geocodable locations, numeric victim counts, vulnerable demographics (*children, women, elderly, disabled*), and callback contacts.

A rigorous mathematical Severity Scoring Engine calculates a normalized index ($0 \le S \le 100$) combining disaster threat weights, resource urgency coefficients, victim counts, and vulnerability multipliers, categorizing incidents into Critical, High, Medium, and Low triage priority tiers. Furthermore, an integrated Cosine Similarity clustering pipeline identifies and flags duplicate crisis requests to prevent dispatch redundancy. The software architecture combines a high-throughput asynchronous Python FastAPI backend with SQLite/SQLAlchemy relational persistence and an interactive React 19 + TypeScript + Tailwind CSS executive command center dashboard featuring Leaflet GIS spatial mapping, real-time Recharts analytics, and natural language query assistance.

Extensive empirical benchmarking across a balanced corpus of 10,000 disaster communications demonstrates that RescuAI achieves an overall system F1 score of **93.5%**, an emergency intent binary classification accuracy of **94.2%**, and a multi-label resource recall of **92.8%**, while sustaining an ultra-low single-message inference latency of under **50 milliseconds**.

**Keywords:** *Natural Language Processing (NLP), Disaster Response Management, Multi-Label Text Classification, Named Entity Recognition (NER), Severity Scoring Engine, TF-IDF Vectorization, Intelligent Humanitarian Logistics.*

---

## System Figures & Visuals

- **Figure 1.1**: Impact of Emergency Response Latency on Victim Survival Probability (Golden Hour Analysis)
- **Figure 3.1**: RescuAI High-Level System Architecture and Microservices Flow Diagram
- **Figure 3.2**: NLP Text Normalization, Tokenization, and TF-IDF Vectorization Pipeline
- **Figure 3.3**: RescuAI Multi-Factor Severity Scoring and Priority Level Classification Framework
- **Figure 4.1**: RescuAI Command Center Dashboard & Live Interactive Triage Interface Layout
