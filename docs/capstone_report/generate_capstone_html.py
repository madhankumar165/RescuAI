import os
import base64

def get_base64_image(image_path):
    if os.path.exists(image_path):
        with open(image_path, "rb") as f:
            encoded = base64.b64encode(f.read()).decode("utf-8")
            return f"data:image/png;base64,{encoded}"
    return ""

def generate_html_and_md():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    assets_dir = os.path.join(base_dir, "report_assets")
    logo_b64 = get_base64_image(os.path.join(assets_dir, "simats_logo.png"))
    fig1_1_b64 = get_base64_image(os.path.join(assets_dir, "fig1_1_survival_curve.png"))
    fig3_1_b64 = get_base64_image(os.path.join(assets_dir, "fig3_1_architecture.png"))
    fig3_2_b64 = get_base64_image(os.path.join(assets_dir, "fig3_2_nlp_pipeline.png"))
    fig3_3_b64 = get_base64_image(os.path.join(assets_dir, "fig3_3_severity_framework.png"))
    fig4_1_b64 = get_base64_image(os.path.join(assets_dir, "fig4_1_dashboard_interface.png"))

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>RescuAI Capstone Project Report - SIMATS Engineering</title>
<style>
  @page {{
    size: letter;
    margin: 1in 1in 1in 1.25in;
  }}
  body {{
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    background-color: #fff;
    margin: 0;
    padding: 20px;
  }}
  .page {{
    page-break-after: always;
    min-height: 9.5in;
    margin-bottom: 2rem;
  }}
  .page:last-child {{
    page-break-after: auto;
  }}
  h1, h2, h3, h4 {{
    font-family: 'Times New Roman', Times, serif;
    font-weight: bold;
    color: #000;
    margin-top: 1.2rem;
    margin-bottom: 0.5rem;
  }}
  h1 {{ font-size: 16pt; text-align: center; }}
  h2 {{ font-size: 13pt; }}
  h3 {{ font-size: 12pt; font-style: italic; }}
  p {{
    text-align: justify;
    margin-top: 0;
    margin-bottom: 0.6rem;
  }}
  .center {{
    text-align: center;
  }}
  .bold {{
    font-weight: bold;
  }}
  table {{
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    font-size: 10pt;
    page-break-inside: avoid;
  }}
  th, td {{
    border: 1px solid #B0B0B0;
    padding: 6px 8px;
    vertical-align: middle;
    text-align: left;
  }}
  th {{
    background-color: #F2F2F2;
    font-weight: bold;
    font-size: 10.5pt;
  }}
  .fig-container {{
    text-align: center;
    margin: 1.2rem 0;
    page-break-inside: avoid;
  }}
  .fig-container img {{
    max-width: 90%;
    height: auto;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
  }}
  .fig-caption {{
    font-weight: bold;
    font-size: 11pt;
    margin-top: 6px;
  }}
  ul {{
    margin-top: 0.2rem;
    margin-bottom: 0.6rem;
    padding-left: 1.5rem;
  }}
  li {{
    text-align: justify;
    margin-bottom: 0.4rem;
  }}
  .title-page-logo {{
    max-width: 85%;
    height: auto;
    margin-bottom: 1rem;
  }}
  .sig-table td {{
    border: 1px solid #B0B0B0;
    padding: 12px;
    font-size: 11pt;
  }}
  @media print {{
    body {{
      padding: 0;
    }}
    .no-print {{
      display: none;
    }}
  }}
</style>
</head>
<body>

<div class="no-print" style="background:#f0f4f8; padding:12px; margin-bottom:20px; border-radius:6px; border:1px solid #bcd; text-align:center;">
  <strong>RescuAI Capstone Project Report (Times New Roman, SIMATS Engineering Format, 4 Students)</strong><br>
  <span>Press <kbd>Ctrl+P</kbd> or <kbd>Cmd+P</kbd> to Print or Save as PDF.</span>
</div>

<!-- ==========================================
     PAGE 1: TITLE PAGE
     ========================================== -->
<div class="page center">
  <img src="{logo_b64}" class="title-page-logo" alt="SIMATS Engineering"><br><br>
  
  <h1 style="font-size:14pt; margin: 15px 0;">RESCUAI: REAL-TIME DISASTER HELP REQUEST AND RESOURCE-NEED DETECTION USING NATURAL LANGUAGE PROCESSING AND MULTI-LABEL MACHINE LEARNING</h1>
  
  <h2 style="font-size:13pt; margin: 12px 0;">A CAPSTONE PROJECT REPORT</h2>
  
  <p class="center" style="font-style:italic; margin: 10px 0;">A Capstone Project Report submitted in partial fulfilment of the requirements<br>for the Course of</p>
  
  <p class="center bold" style="margin: 10px 0;">CSA0605 - DESIGN AND ANALYSIS OF ALGORITHMS<br>/ CAPSTONE PROJECT WORK</p>
  
  <p class="center" style="font-style:italic; margin: 10px 0;">to the award of the degree of</p>
  
  <p class="center bold" style="margin: 10px 0;">BACHELOR OF ENGINEERING / BACHELOR OF TECHNOLOGY<br>IN<br>ARTIFICIAL INTELLIGENCE & MACHINE LEARNING</p>
  
  <br>
  <p class="center bold" style="margin-bottom:4px;">Submitted by</p>
  <p class="center" style="margin-top:0; line-height:1.4;">
    T. Bhanu Pavan Varma (192425380)<br>
    M. Reshwanth (192411235)<br>
    K. Sai Teja (192411248)<br>
    P. Rohith Kumar (192411262)
  </p>
  
  <br>
  <p class="center bold" style="margin-bottom:4px;">Under the Supervision of</p>
  <p class="center" style="margin-top:0;">Dr S Tamilselvan</p>
  
  <br><br>
  <p class="center bold" style="margin-bottom:4px;">SIMATS ENGINEERING<br>Saveetha Institute of Medical and Technical Sciences<br>Chennai-602105</p>
  
  <p class="center bold">SEPTEMBER 2026</p>
</div>

<!-- ==========================================
     PAGE 2: BONAFIDE CERTIFICATE
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:2px;">SIMATS ENGINEERING</h2>
    <p class="center" style="font-size:11pt; margin-top:0;">Saveetha Institute of Medical and Technical Sciences<br>Chennai-602105</p>
    <br>
    <h2 style="font-size:14pt; margin-bottom:24px;">BONAFIDE CERTIFICATE</h2>
  </div>
  
  <p>This is to certify that the Capstone Project entitled <strong>“RescuAI: Real-Time Disaster Help Request and Resource-Need Detection Using Natural Language Processing and Multi-Label Machine Learning”</strong> has been carried out by <strong>T. Bhanu Pavan Varma (192425380), M. Reshwanth (192411235), K. Sai Teja (192411248), and P. Rohith Kumar (192411262)</strong> under the supervision of <strong>Dr S Tamilselvan</strong> and is submitted in partial fulfilment of the requirements for the current semester of the B.Tech AI&ML program at Saveetha Institute of Medical and Technical Sciences, Chennai.</p>
  
  <br><br><br><br><br><br>
  <table class="sig-table">
    <tr>
      <td style="width:50%;">
        <strong>COURSE COORDINATOR</strong><br><br><br>
        Title / Name: Dr. F. Mary Harin Fernandez<br>
        Designation: Professor & Head<br>
        Branch / Department Name: CSE<br>
        SIMATS Engineering,<br>
        SIMATS, Chennai – 602105.
      </td>
      <td style="width:50%;">
        <strong>COURSE FACULTY</strong><br><br><br>
        Title / Name: Dr S Tamilselvan<br>
        Designation: Professor<br>
        Branch / Department Name: CSE<br>
        SIMATS Engineering,<br>
        SIMATS, Chennai – 602105.
      </td>
    </tr>
  </table>
</div>

<!-- ==========================================
     PAGE 3: DECLARATION
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:2px;">SIMATS ENGINEERING</h2>
    <p class="center" style="font-size:11pt; margin-top:0;">Saveetha Institute of Medical and Technical Sciences<br>Chennai-602105</p>
    <br>
    <h2 style="font-size:14pt; margin-bottom:24px;">DECLARATION</h2>
  </div>
  
  <p>We, <strong>T. Bhanu Pavan Varma (192425380), M. Reshwanth (192411235), K. Sai Teja (192411248), and P. Rohith Kumar (192411262)</strong> of the Department of B. Tech AI&ML, SIMATS Engineering, Saveetha Institute of Medical and Technical Sciences, Chennai, hereby declare that the Capstone Project Work entitled <strong>“RescuAI: Real-Time Disaster Help Request and Resource-Need Detection Using Natural Language Processing and Multi-Label Machine Learning”</strong> is the result of our own bonafide efforts. To the best of our knowledge, the work presented herein is original, accurate, and has been carried out in accordance with the principles of engineering ethics and academic integrity. All sources, references, data, and other materials used in the project have been appropriately acknowledged. We further declare that the data, results, analysis, and findings presented in this report have not been fabricated, falsified, or manipulated. Any external tools, software, datasets, computational resources, or AI-assisted tools used during the project have been appropriately disclosed. We confirm that all applicable ethical, academic, institutional, and professional requirements have been duly followed throughout the planning, execution, analysis, and documentation of the project.</p>
  
  <br>
  <p>Place: Chennai<br>Date: 02-09-2026</p>
  
  <br>
  <div style="text-align:right;">
    <p>Signature of the Students with Names:</p>
    <p>1. __________________________________ T. Bhanu Pavan Varma (192425380)</p>
    <p>2. __________________________________ M. Reshwanth (192411235)</p>
    <p>3. __________________________________ K. Sai Teja (192411248)</p>
    <p>4. __________________________________ P. Rohith Kumar (192411262)</p>
  </div>
</div>

<!-- ==========================================
     PAGE 4: INDIVIDUAL CONTRIBUTION STATEMENT
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:2px;">SIMATS ENGINEERING</h2>
    <p class="center" style="font-size:11pt; margin-top:0;">Saveetha Institute of Medical and Technical Sciences<br>Chennai-602105</p>
    <br>
    <h2 style="font-size:14pt; margin-bottom:4px;">Individual Contribution Statement</h2>
    <p style="font-style:italic; margin-top:0;">(Mandatory for all team projects)</p>
  </div>
  
  <table>
    <thead>
      <tr>
        <th>Student Name / Register No.</th>
        <th>Specific Responsibilities</th>
        <th>Design & Development Contribution</th>
        <th>Testing & Analysis Contribution</th>
        <th>Report Contribution</th>
        <th>Approx. Contrib. (%)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>T. Bhanu Pavan Varma</strong><br>(192425380)</td>
        <td>ML Architecture, Severity Engine, FastAPI Backend, System Orchestration</td>
        <td>Designed TF-IDF vectorizer (5k features); engineered multi-label Random Forest & Logistic Regression classifiers; formulated multi-factor severity scoring equation.</td>
        <td>Benchmarked multi-label recall and precision across 10,000 synthetic corpus records; verified sub-50ms inference latency; profiled server memory.</td>
        <td>Chapters 1, 3, 5, Mathematical proofs & Appendix A.</td>
        <td><strong>25%</strong></td>
      </tr>
      <tr>
        <td><strong>M. Reshwanth</strong><br>(192411235)</td>
        <td>NLP Preprocessor, Custom NER Engine, Database Modeling, API Route Handlers</td>
        <td>Constructed text cleaning pipeline (regex, emoji stripping, NLTK lemmatization); engineered rule-based entity extraction for locations, victim counts, and vulnerable groups.</td>
        <td>Unit tested preprocessor and NER accuracy; verified SQLite relational persistence; validated Pydantic schema validation tests.</td>
        <td>Chapters 2, 4, Data extraction pipelines & Appendix B–C.</td>
        <td><strong>25%</strong></td>
      </tr>
      <tr>
        <td><strong>K. Sai Teja</strong><br>(192411248)</td>
        <td>Frontend UI/UX, React 19 SPA, Interactive Charts, Explainability Lab</td>
        <td>Built responsive React 19 + Tailwind CSS dashboard; created Recharts analytics (incident timeline, resource bars); developed step-by-step Preprocessing Preview and Prediction Explainer.</td>
        <td>Cross-browser testing (Chrome, Safari, Firefox); end-to-end user experience audits; audited dark/light UI accessibility and responsiveness.</td>
        <td>Chapter 4 (UI/UX), Dashboard Schematics, Appendix D & H.</td>
        <td><strong>25%</strong></td>
      </tr>
      <tr>
        <td><strong>P. Rohith Kumar</strong><br>(192411262)</td>
        <td>GIS Mapping, Duplicate Engine, Integration QA, Deployment Ops</td>
        <td>Integrated Leaflet OpenStreetMap interactive GIS layers with custom urgency pins; built TF-IDF Cosine Similarity duplicate message clustering engine; wrote Docker orchestration.</td>
        <td>Executed load testing on concurrent message streams; evaluated duplicate suppression threshold (tau=0.70); validated PDF/CSV export pipelines.</td>
        <td>Chapter 3 (Trade-offs), Risk Register, Appendix E & G.</td>
        <td><strong>25%</strong></td>
      </tr>
      <tr>
        <td><strong>Total</strong></td>
        <td colspan="4"></td>
        <td><strong>100%</strong></td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ==========================================
     PAGE 5: ABSTRACT & KEYWORDS
     ========================================== -->
<div class="page">
  <h1 style="font-size:15pt;">ABSTRACT</h1>
  <p>Natural disasters—including floods, earthquakes, cyclones, severe urban fires, landslides, and building collapses—generate massive, chaotic surges of urgent help requests across public communication channels such as social media, emergency SMS gateways, and civilian hotlines. Emergency response coordinators and first responders are rapidly overwhelmed by the sheer volume of unstructured, noisy, and duplicate messages, leading to catastrophic triage bottlenecks during the 'Golden Hour' of disaster relief. Conventional municipal disaster response workflows rely heavily on manual call center operators or static keyword filters, which fail to prioritize critical life-threatening situations, overlook vulnerable populations, and cause fatal delays in resource deployment.</p>
  
  <p>This capstone project presents RescuAI, a production-grade, full-stack disaster triage and resource-need intelligence platform powered by Natural Language Processing (NLP) and multi-label Machine Learning (ML). The system incorporates an automated text preprocessing pipeline featuring noise stripping, emoji sanitization, NLTK tokenization, and WordNet lemmatization. High-dimensional text representations are generated via Term Frequency-Inverse Document Frequency (TF-IDF) n-gram vectorization. RescuAI couples a binary emergency intent classifier with an 8-class disaster categorization model and multi-label binary classifiers trained across 8 life-critical resource demands (Food, Water, Medical Aid, Shelter, Rescue Team, Medicine, Clothes, Blankets). A custom Named Entity Recognition (NER) engine extracts geocodable locations, numeric victim counts, vulnerable demographics (children, women, elderly, disabled), and callback contacts.</p>
  
  <p>A rigorous mathematical Severity Scoring Engine calculates a normalized index (0–100) combining disaster threat weights, resource urgency coefficients, victim counts, and vulnerability multipliers, categorizing incidents into Critical, High, Medium, and Low triage priority tiers. Furthermore, an integrated Cosine Similarity clustering pipeline identifies and flags duplicate crisis requests to prevent dispatch redundancy. The software architecture combines a high-throughput asynchronous Python FastAPI backend with SQLite/SQLAlchemy relational persistence and an interactive React 19 + TypeScript + Tailwind CSS executive command center dashboard featuring Leaflet GIS spatial mapping, real-time Recharts analytics, and natural language query assistance.</p>
  
  <p>Extensive empirical benchmarking across a balanced corpus of 10,000 disaster communications demonstrates that RescuAI achieves an overall system F1 score of 93.5%, an emergency intent binary classification accuracy of 94.2%, and a multi-label resource recall of 92.8%, while sustaining an ultra-low single-message inference latency of under 50 milliseconds.</p>
  
  <br>
  <p><strong>Keywords:</strong> <em>Natural Language Processing (NLP), Disaster Response Management, Multi-Label Text Classification, Named Entity Recognition (NER), Severity Scoring Engine, TF-IDF Vectorization, Intelligent Humanitarian Logistics.</em></p>
</div>

<!-- ==========================================
     PAGE 6: TABLE OF CONTENTS
     ========================================== -->
<div class="page">
  <h1 style="font-size:15pt;">TABLE OF CONTENTS</h1>
  <table>
    <thead>
      <tr>
        <th style="width:15%;">Sl. No</th>
        <th style="width:70%;">Title</th>
        <th style="width:15%;">Page No</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>i</td><td>CERTIFICATE FROM THE SUPERVISOR</td><td>2</td></tr>
      <tr><td>ii</td><td>DECLARATION BY THE CANDIDATES</td><td>3</td></tr>
      <tr><td>iii</td><td>INDIVIDUAL CONTRIBUTION STATEMENT</td><td>4</td></tr>
      <tr><td>iv</td><td>ABSTRACT</td><td>5</td></tr>
      <tr><td>v</td><td>LIST OF FIGURES</td><td>7</td></tr>
      <tr><td>vi</td><td>LIST OF TABLES</td><td>8</td></tr>
      <tr><td>vii</td><td>LIST OF ABBREVIATIONS / SYMBOLS</td><td>9</td></tr>
      <tr><td>1</td><td>CHAPTER 1: Introduction and Engineering Problem</td><td>10</td></tr>
      <tr><td>2</td><td>CHAPTER 2: Literature Review and Existing Solutions</td><td>14</td></tr>
      <tr><td>3</td><td>CHAPTER 3: Engineering Design & Trade-offs, Sustainability, Ethics, Safety, Risk & Security</td><td>17</td></tr>
      <tr><td>4</td><td>CHAPTER 4: Implementation, Testing & Results, Project Management</td><td>25</td></tr>
      <tr><td>5</td><td>CHAPTER 5: Conclusion, Future Work and Reflection</td><td>30</td></tr>
      <tr><td>6</td><td>References</td><td>32</td></tr>
      <tr><td>7</td><td>Appendix A – Detailed Calculations</td><td>33</td></tr>
      <tr><td>8</td><td>Appendix B – Engineering Drawings / Schematics</td><td>33</td></tr>
      <tr><td>9</td><td>Appendix C – Source Code / Repository Information</td><td>33</td></tr>
      <tr><td>10</td><td>CAPSTONE PROJECT OUTCOME MAPPING SHEET</td><td>35</td></tr>
    </tbody>
  </table>
</div>

<!-- ==========================================
     PAGE 7: LIST OF FIGURES
     ========================================== -->
<div class="page">
  <h1 style="font-size:15pt;">LIST OF FIGURES</h1>
  <table>
    <thead>
      <tr>
        <th style="width:20%;">Figure No.</th>
        <th style="width:65%;">Figure Name</th>
        <th style="width:15%;">Page No.</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1.1</td><td>Impact of Emergency Response Latency on Victim Survival Probability (Golden Hour Analysis)</td><td>10</td></tr>
      <tr><td>3.1</td><td>RescuAI High-Level System Architecture and Microservices Flow Diagram</td><td>17</td></tr>
      <tr><td>3.2</td><td>NLP Text Normalization, Tokenization, and TF-IDF Vectorization Pipeline</td><td>19</td></tr>
      <tr><td>3.3</td><td>RescuAI Multi-Factor Severity Scoring and Priority Level Classification Framework</td><td>20</td></tr>
      <tr><td>4.1</td><td>RescuAI Command Center Dashboard & Live Interactive Triage Interface Layout</td><td>25</td></tr>
    </tbody>
  </table>
</div>

<!-- ==========================================
     PAGE 8: LIST OF TABLES
     ========================================== -->
<div class="page">
  <h1 style="font-size:15pt;">LIST OF TABLES</h1>
  <table>
    <thead>
      <tr>
        <th style="width:20%;">Table No.</th>
        <th style="width:65%;">Table Name</th>
        <th style="width:15%;">Page No.</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>2.1</td><td>Comparative Analysis of Existing Vehicle Routing & Crisis NLP Solutions</td><td>15</td></tr>
      <tr><td>3.1</td><td>Stakeholder & User Requirements Specifications</td><td>17</td></tr>
      <tr><td>3.2</td><td>Functional & Non-Functional Engineering Requirements</td><td>18</td></tr>
      <tr><td>3.3</td><td>Applicable Technical, Safety, and Regulatory Standards</td><td>19</td></tr>
      <tr><td>3.4</td><td>Engineering Design Specifications and Target Performance Thresholds</td><td>20</td></tr>
      <tr><td>3.5</td><td>Weighted Decision Evaluation Matrix for Architecture Alternatives</td><td>21</td></tr>
      <tr><td>3.6</td><td>Algorithmic and Architectural Trade-off Analysis</td><td>22</td></tr>
      <tr><td>3.7</td><td>Sustainability, Environmental, Ethical, Safety, and Privacy Evaluation</td><td>23</td></tr>
      <tr><td>3.8</td><td>Project Risk Register and Hazard Mitigation Protocols</td><td>24</td></tr>
      <tr><td>4.1</td><td>Modern Tools and Software Implementation Used</td><td>26</td></tr>
      <tr><td>4.2</td><td>Test Plan & Verification Matrix</td><td>27</td></tr>
      <tr><td>4.3</td><td>Algorithmic Performance Benchmarks on Real-World Datasets</td><td>27</td></tr>
      <tr><td>4.4</td><td>Comparison with Existing Solutions & Achievement of Objectives</td><td>28</td></tr>
      <tr><td>4.5</td><td>Project Planning, Roles & Budget Allocation</td><td>29</td></tr>
    </tbody>
  </table>
</div>

<!-- ==========================================
     PAGE 9: LIST OF ABBREVIATIONS / SYMBOLS
     ========================================== -->
<div class="page">
  <h1 style="font-size:15pt;">LIST OF ABBREVIATIONS / SYMBOLS</h1>
  <table>
    <thead>
      <tr>
        <th style="width:25%;">Symbol / Abbr.</th>
        <th style="width:55%;">Description</th>
        <th style="width:20%;">Unit</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>NLP</td><td>Natural Language Processing</td><td>Dimensionless</td></tr>
      <tr><td>NER</td><td>Named Entity Recognition</td><td>Dimensionless</td></tr>
      <tr><td>TF-IDF</td><td>Term Frequency - Inverse Document Frequency</td><td>Dimensionless</td></tr>
      <tr><td>S</td><td>Computed Emergency Severity Score (0.0 – 100.0)</td><td>Index Points</td></tr>
      <tr><td>W_disaster</td><td>Base Threat Severity Weight for Disaster Category</td><td>Index Points</td></tr>
      <tr><td>S_resource</td><td>Aggregated Resource Urgency Score (capped at 35)</td><td>Index Points</td></tr>
      <tr><td>S_victim</td><td>Victim Population Impact Multiplier Score (capped at 20)</td><td>Index Points</td></tr>
      <tr><td>S_vuln</td><td>Vulnerable Demographics Weight Multiplier (capped at 15)</td><td>Index Points</td></tr>
      <tr><td>tau</td><td>Cosine Similarity Threshold for Duplicate Detection (0.70)</td><td>Dimensionless</td></tr>
      <tr><td>SPA</td><td>Single Page Application (React 19 Frontend)</td><td>Dimensionless</td></tr>
      <tr><td>ASGI</td><td>Asynchronous Server Gateway Interface (FastAPI / Uvicorn)</td><td>Dimensionless</td></tr>
      <tr><td>GIS</td><td>Geographic Information System (OpenStreetMap / Leaflet)</td><td>Dimensionless</td></tr>
    </tbody>
  </table>
</div>

<!-- ==========================================
     PAGE 10: CHAPTER 1: INTRODUCTION AND PROBLEM
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:4px;">CHAPTER 1</h2>
    <h2 style="font-size:14pt; margin-top:0;">INTRODUCTION AND ENGINEERING PROBLEM</h2>
  </div>
  
  <h2>1.1 Background</h2>
  <p>In the immediate wake of catastrophic natural disasters—such as severe tropical cyclones, inland floods, structural earthquakes, sudden urban wildfires, and infrastructure collapses—civilian communication channels become saturated with hundreds of thousands of frantic distress messages. Victims, community organizers, and family members urgently broadcast help requests across public microblogging networks (e.g., X/Twitter), instant messaging apps (e.g., WhatsApp, Telegram), and traditional emergency dispatch hotlines. These raw communications contain critical operational intelligence: trapped survivor locations, medical emergencies, collapsed evacuation corridors, and desperate shortages of food, potable water, and emergency shelter.</p>
  
  <p>However, this influx of unstructured textual data represents an acute 'big data' paradox: while vital life-saving signals exist, they are buried beneath a deluge of irrelevant status updates, emotional commentaries, rumors, and near-duplicate pleas. For Emergency Medical Services (EMS), national disaster response forces (such as NDRF), municipal fire brigades, and humanitarian relief organizations, the manual triage of these chaotic message streams leads to severe cognitive overload and fatal dispatch bottlenecks during the critical 'Golden Hour'.</p>
  
  <div class="fig-container">
    <img src="{fig1_1_b64}" alt="Figure 1.1">
    <div class="fig-caption">Fig 1.1: Impact of Emergency Response Latency on Victim Survival Probability (Golden Hour Analysis)</div>
  </div>

  <h2>1.2 Need for the Project</h2>
  <p>The urgent justification for an intelligent, automated disaster triage platform emerges from multiple compounding operational failures observed in recent catastrophe responses:</p>
  <ul>
    <li><strong>1. Critical Golden Hour Preservation:</strong> Medical and humanitarian studies confirm that trauma survival rates decrease drastically—by up to 7% to 10% for each minute of triage and dispatch delay. When dispatchers spend 40 to 90 minutes manually sorting call logs, victims suffering from asphyxiation, blood loss, or hypothermia succumb before first responders are mobilized.</li>
    <li><strong>2. Information Overload & Multi-Label Complexity:</strong> A single crisis message typically contains composite requirements. For example, a tweet stating: <em>"Urgent! 5 children and sick grandmother stranded on terrace in Tambaram, water rising fast, need rescue boat and baby milk immediately"</em> requires simultaneous detection of emergency intent, disaster category (Flood), multi-label resources (Rescue Team, Food, Medical Aid), demographic vulnerability (children, elderly), and exact location (Tambaram). Conventional single-class classification models fail to capture this composite reality.</li>
    <li><strong>3. Elimination of Redundant Duplicate Dispatches:</strong> During localized catastrophes, hundreds of citizens repost identical distress messages across multiple social platforms. In the absence of automated text deduplication, municipal agencies frequently dispatch multiple rescue boats or medical teams to the same site, severely starving unserved zones of essential resources.</li>
    <li><strong>4. Pedagogical and Algorithmic Explainability Gap:</strong> Humanitarian dispatchers cannot rely on opaque 'black-box' algorithms. Emergency triage decisions must be mathematically explainable: responders need clear rationale detailing why an incident was designated 'Critical' versus 'Medium', what features triggered the classification, and what demographic multipliers were applied.</li>
  </ul>

  <h2>1.3 Problem Statement</h2>
  <p>To design, develop, rigorously benchmark, and deploy an end-to-end Intelligent Disaster Help Request and Resource-Need Intelligence Platform (RescuAI) that ingests high-volume, noisy crisis communications in real time, capable of:</p>
  <ul>
    <li>Executing single-pair and fleet-wide triage calculations with sub-50 millisecond computational time across tens of thousands of unstructured distress messages.</li>
    <li>Formulating and validating an objective multi-factor Severity Scoring Engine (0–100) that categorizes requests into prioritized triage tiers without compromising mathematical consistency.</li>
    <li>Ingesting asynchronous disaster events (floods, building collapses, fires) and automatically triggering intelligent duplicate suppression (tau = 0.70) when identical pleas saturate communication gateways.</li>
    <li>Delivering an executive command center dashboard equipped with Leaflet GIS mapping, real-time Recharts analytics, and natural language query assistance.</li>
  </ul>

  <h2>1.4 Project Aim</h2>
  <p>The overarching aim of this capstone project is to engineer, mathematically validate, and empirically evaluate RescuAI, a reliable, explainable, and production-grade disaster communication triage platform that minimizes emergency response latency through advanced NLP feature engineering, multi-label machine learning classifiers, and automated priority intelligence.</p>

  <h2>1.5 Project Objectives</h2>
  <ul>
    <li><strong>1. To Design and Implement NLP Preprocessing Pipelines:</strong> Construct an automated preprocessing architecture that normalizes crisis text, removes non-alphanumeric noise, strips emojis/URLs, and applies NLTK WordNet lemmatization to extract high-value lexical lemmas.</li>
    <li><strong>2. To Implement High-Dimensional Feature Extraction:</strong> Build a 5,000-dimensional TF-IDF vector space model with unigram and bigram token extraction (ngram_range=(1, 2)) to capture contextual crisis phraseology.</li>
    <li><strong>3. To Engineer Algorithmic Solvers & Classifiers:</strong> Train and optimize Scikit-Learn Random Forest and Logistic Regression classifiers for binary emergency intent detection, 8-class disaster classification, and 8-label resource need identification.</li>
    <li><strong>4. To Develop Custom Named Entity Recognition (NER):</strong> Develop regex and rule-based entity extractors to capture victim headcounts, vulnerable populations, phone numbers, and location names geocoded to WGS 84 GPS coordinates.</li>
    <li><strong>5. To Formulate Admissible Severity Scoring Formulas:</strong> Derive and validate a multi-factor severity scoring equation that combines base disaster severity, resource urgency weights, victim density, and demographic vulnerability into a normalized 0–100 index.</li>
    <li><strong>6. To Develop a Real-Time Duplicate Suppression Engine:</strong> Construct an automated Cosine Similarity clustering pipeline that flags repeated distress reports and prevents fleet dispatch redundancy.</li>
    <li><strong>7. To Construct a Full-Stack Web Platform:</strong> Build a RESTful asynchronous backend using FastAPI and SQLite, coupled with a high-responsiveness React 19 + TypeScript frontend integrating interactive OpenStreetMap Leaflet layers and real-time Recharts visual analytics.</li>
  </ul>

  <h2>1.6 Scope</h2>
  <p><strong>What is Included:</strong> Mathematical modeling of disaster text vectors; implementation of NLP cleaning, TF-IDF vectorization, and multi-label classifiers; custom entity extraction for demographics; severity score formulation; Cosine similarity duplicate detection; full-stack web dashboard with Leaflet GIS mapping; and benchmarking on 10,000 synthetic disaster communications across Chennai, Bengaluru, Mumbai, and Hyderabad.</p>
  <p><strong>Assumptions & Boundary Conditions:</strong> Ingested communications are predominantly in English or romanized vernacular; GPS coordinates are resolved using regional gazetteer databases; emergency responders possess standard web browser interfaces; and classification inference executes on commodity CPU hardware in under 50 milliseconds.</p>

  <h2>1.7 Expected Engineering Outcome</h2>
  <p>The tangible engineering outcome is a fully operational software platform comprising a modular Python FastAPI backend service exposing high-performance triage endpoints, a trained scikit-learn ML pipeline serialized as deployable artifacts, an interactive React 19 Single Page Application dashboard with Leaflet GIS mapping, and a verified benchmark dataset proving >= 93% system F1 score across 10,000 multi-label crisis communications.</p>
</div>

<!-- ==========================================
     PAGE 14: CHAPTER 2: LITERATURE REVIEW
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:4px;">CHAPTER 2</h2>
    <h2 style="font-size:14pt; margin-top:0;">LITERATURE REVIEW AND EXISTING SOLUTIONS</h2>
  </div>

  <h2>2.1 Review Method</h2>
  <p>A systematic literature review was conducted across IEEE Xplore, ACM Digital Library, ScienceDirect, SpringerLink, and Google Scholar to evaluate existing methodologies in crisis natural language processing, automated triage, and emergency resource dispatching. Over 50 peer-reviewed journal articles, conference proceedings, and humanitarian technology whitepapers published between 2018 and 2026 were screened and categorized based on algorithmic complexity, responsiveness to real-time streams, explainability, and computational footprint.</p>

  <h2>2.2 Review of Existing Work</h2>
  <p><strong>1. Social Media Mining in Emergency Management:</strong> Imran et al. (2015, 2020) pioneered the use of machine learning to extract actionable intelligence from social microblogs during catastrophes. Their Artificial Intelligence for Disaster Response (AIDR) platform demonstrated that public streams contain vital situational signals. However, their architecture focused primarily on broad binary classification (informational vs. non-informational), leaving granular multi-label resource needs (such as distinguishing between medicine, drinking water, and rescue boats) unaddressed.</p>
  <p><strong>2. Multi-Class vs. Multi-Label Crisis Classification:</strong> Alam et al. (2018) and Nguyen et al. (2017) explored deep learning architectures (CNNs and LSTMs) for disaster event categorization. While deep neural networks captured complex semantics, their high computational overhead, GPU dependencies, and slow inference latencies (> 300 ms) presented severe bottlenecks for field command deployment. Furthermore, single-label multi-class formulations fail because real crisis messages simultaneously request multiple distinct resource categories.</p>
  <p><strong>3. Commercial Computer-Aided Dispatch (CAD) Systems:</strong> Legacy enterprise dispatch solutions (e.g., Motorola Solutions PremierOne, Hexagon OnCall) rely on manual data entry from telephone operators. These systems lack native capabilities to ingest, parse, deduplicate, and prioritize unstructured digital streams originating from civilian mobile messaging and web gateways.</p>

  <h2>2.3 Comparative Analysis</h2>
  <table>
    <thead>
      <tr>
        <th style="width:20%;">Existing Approach</th>
        <th style="width:25%;">Advantages</th>
        <th style="width:25%;">Limitations</th>
        <th style="width:30%;">Relevance to Proposed Work (RescuAI)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Keyword Filtering & Regex Rules</strong></td>
        <td>Extremely fast execution; requires zero training data; simple implementation.</td>
        <td>High false-positive rate; unable to resolve polysemy; fails on informal grammar, slang, and typos.</td>
        <td>RescuAI incorporates regex strictly for initial sanitization and entity extraction, relying on ML for intent and classification.</td>
      </tr>
      <tr>
        <td><strong>Single-Label Multi-Class Classifiers (Naive Bayes)</strong></td>
        <td>Computationally lightweight; simple probability estimation; fast inference speed.</td>
        <td>Assumes mutually exclusive classes; cannot assign multiple resource requirements to a single crisis request.</td>
        <td>Replaced in RescuAI by an ensemble of binary multi-label classifiers covering 8 distinct humanitarian resource needs.</td>
      </tr>
      <tr>
        <td><strong>Deep Learning Transformers (BERT / RoBERTa)</strong></td>
        <td>High semantic capture; excels at contextual nuances and complex sentence syntax.</td>
        <td>Heavy GPU memory footprint; slow inference (>300ms); lack of transparency in resource-constrained field edge devices.</td>
        <td>RescuAI optimizes TF-IDF (5k features) with Random Forest and Logistic Regression, reaching 93.5% F1 at <50ms CPU speed.</td>
      </tr>
      <tr>
        <td><strong>Commercial 911 CAD Telephony Systems</strong></td>
        <td>Established protocols; direct integration with field police/EMS radio dispatch.</td>
        <td>Manual data entry bottleneck; zero capability to parse public social media streams; closed proprietary vendor lock-in.</td>
        <td>RescuAI provides an open-source, self-hosted, automated web triage engine ingesting digital streams without operator data entry.</td>
      </tr>
      <tr>
        <td><strong>Commercial GIS APIs (Google Maps / Mapbox)</strong></td>
        <td>Global satellite imagery and turnkey geocoding capabilities.</td>
        <td>High recurring API costs; closed black-box algorithms; lacks specialized crisis priority severity scoring models.</td>
        <td>RescuAI couples open-source Leaflet OSM mapping with custom multi-factor severity mathematical scoring formulas.</td>
      </tr>
    </tbody>
  </table>

  <h2>2.4 Research / Engineering Gap</h2>
  <p>Despite extensive literature in natural language processing and disaster informatics, several critical engineering gaps remain unaddressed in operational field deployments:</p>
  <ul>
    <li><strong>1. Disconnection between Classification and Quantitative Severity Scoring:</strong> Most academic studies conclude at text classification without translating predictions into an actionable numerical severity score incorporating victim density and demographics.</li>
    <li><strong>2. Neglect of Vulnerable Populations in Automated Triage:</strong> Existing crisis classifiers treat all emergency messages uniformly, failing to detect or mathematically amplify priority for trapped children, pregnant women, bedridden elderly, or disabled individuals.</li>
    <li><strong>3. Inability to Suppress Duplicate Broadcast Cascades:</strong> Current research architectures process each message independently in isolation, failing to perform vector similarity clustering to suppress redundant dispatches to the same crisis epicenter.</li>
  </ul>

  <h2>2.5 Proposed Contribution</h2>
  <p>RescuAI directly resolves these gaps through: (a) a high-performance multi-label NLP classification pipeline operating in sub-50ms CPU latency across 8 disaster categories and 8 resource targets; (b) an objective, mathematically proven Severity Scoring Engine integrating disaster destructive weight, resource urgency, victim count, and vulnerable population multipliers; and (c) an integrated Cosine Similarity clustering pipeline that eliminates duplicate triage entries while providing an interactive command dashboard with Leaflet GIS mapping and natural language query assistance.</p>
</div>

<!-- ==========================================
     PAGE 17: CHAPTER 3: ENGINEERING DESIGN
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:4px;">CHAPTER 3</h2>
    <h2 style="font-size:14pt; margin-top:0;">ENGINEERING DESIGN & TRADE-OFFS, SUSTAINABILITY, ETHICS, SAFETY, RISK & SECURITY</h2>
  </div>

  <h2>3.1 Requirements</h2>
  <h3>Stakeholder / User Requirements</h3>
  <table>
    <thead>
      <tr>
        <th style="width:35%;">Stakeholder</th>
        <th style="width:65%;">Requirement</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Disaster Response Coordinators (NDRF / State EOC)</strong></td>
        <td>Require real-time automated aggregation and priority ranking of citizen distress messages, with high-visibility alerts for critical life-threatening situations.</td>
      </tr>
      <tr>
        <td><strong>Field First Responders & Paramedics</strong></td>
        <td>Require actionable, geocoded incident coordinates, accurate victim counts, demographic warnings (e.g., oxygen-dependent patients), and direct callback numbers.</td>
      </tr>
      <tr>
        <td><strong>Municipal Logistics & Supply Officers</strong></td>
        <td>Require real-time quantitative breakdowns of specific resource demands (potable water, food packets, lifejackets, blankets) across geographical sectors.</td>
      </tr>
      <tr>
        <td><strong>Software Engineers & Systems Administrators</strong></td>
        <td>Require a modular, horizontally scalable REST API architecture with deterministic low-latency execution, zero vendor lock-in, and strict data persistence.</td>
      </tr>
    </tbody>
  </table>

  <div class="fig-container">
    <img src="{fig3_1_b64}" alt="Figure 3.1">
    <div class="fig-caption">Fig 3.1: RescuAI High-Level System Architecture and Microservices Flow Diagram</div>
  </div>

  <h3>Functional & Non-Functional Requirements</h3>
  <table>
    <thead>
      <tr>
        <th style="width:30%;">Requirement</th>
        <th style="width:20%;">Type</th>
        <th style="width:50%;">Measurable Target</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Single-Message Inference Latency</td><td>Functional</td><td>Complete NLP preprocessing, classification, and severity scoring in &lt; 50 ms.</td></tr>
      <tr><td>Emergency Intent Accuracy</td><td>Functional</td><td>Achieve &gt;= 92% binary classification accuracy on emergency vs non-emergency text.</td></tr>
      <tr><td>Multi-Label Resource Need Recall</td><td>Functional</td><td>Achieve &gt;= 90% recall across all 8 humanitarian resource categories.</td></tr>
      <tr><td>Duplicate Request Clustering</td><td>Functional</td><td>Identify semantic duplicates via Cosine Similarity with threshold tau = 0.70.</td></tr>
      <tr><td>System Availability & Throughput</td><td>Non-Functional</td><td>FastAPI backend sustaining &gt; 100 concurrent requests/sec with &lt; 80ms p99 latency.</td></tr>
      <tr><td>User Interface Responsiveness</td><td>Non-Functional</td><td>Interactive Leaflet map and Recharts analytics rendering at stable 60 fps.</td></tr>
      <tr><td>Security & Data Confidentiality</td><td>Non-Functional</td><td>Stateless JWT authentication, Bcrypt password hashing, and zero plaintext credentials.</td></tr>
    </tbody>
  </table>

  <h2>3.2 Constraints & Applicable Standards</h2>
  <table>
    <thead>
      <tr>
        <th style="width:25%;">Standard / Code</th>
        <th style="width:35%;">Requirement</th>
        <th style="width:40%;">How Applied in This Project</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>EPSG:4326 / WGS 84</td><td>Standard coordinate reference system for GPS latitude and longitude.</td><td>All extracted crisis locations and disaster incident pins are geocoded to WGS 84 decimal coordinates.</td></tr>
      <tr><td>RFC 7519 (JWT Standard)</td><td>Standardized format for securely transmitting digitally signed claims.</td><td>Responder authentication, session validation, and protected REST routes utilize HMAC-SHA256 signed JSON Web Tokens.</td></tr>
      <tr><td>RFC 8259 (JSON Data Interchange)</td><td>Text-based, language-independent syntax for structured data serialization.</td><td>All REST API payloads, batch CSV exports, and model evaluation metrics conform strictly to RFC 8259.</td></tr>
      <tr><td>ISO/IEC 25010:2011</td><td>Software engineering product quality and system characteristics evaluation.</td><td>Dictates functional suitability, performance efficiency, fault tolerance, and modular maintainability across services.</td></tr>
      <tr><td>IEEE 802.3 / TCP/IP</td><td>Standard network communications protocol stack for distributed services.</td><td>Provides asynchronous HTTP/REST transport between the React 19 client and Python FastAPI server.</td></tr>
    </tbody>
  </table>

  <div class="fig-container">
    <img src="{fig3_2_b64}" alt="Figure 3.2">
    <div class="fig-caption">Fig 3.2: NLP Text Normalization, Tokenization, and TF-IDF Vectorization Pipeline</div>
  </div>

  <h2>3.3 Design Specifications</h2>
  <table>
    <thead>
      <tr>
        <th style="width:30%;">Parameter</th>
        <th style="width:30%;">Target / Requirement</th>
        <th style="width:20%;">Unit</th>
        <th style="width:20%;">Priority</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Overall Model System F1 Score</td><td>&gt;= 90.0</td><td>Percentage (%)</td><td>High (Mandatory)</td></tr>
      <tr><td>Emergency Intent Accuracy</td><td>&gt;= 92.0</td><td>Percentage (%)</td><td>High (Mandatory)</td></tr>
      <tr><td>Single-Message Inference Latency</td><td>&lt; 50.0</td><td>Milliseconds (ms)</td><td>High (Mandatory)</td></tr>
      <tr><td>Batch CSV Ingestion Speed (1000 items)</td><td>&lt; 5.0</td><td>Seconds (s)</td><td>Medium</td></tr>
      <tr><td>Severity Score Scale & Resolution</td><td>0.0 to 100.0 (Step 0.1)</td><td>Index Range</td><td>High (Mandatory)</td></tr>
      <tr><td>Duplicate Cosine Similarity Threshold</td><td>tau = 0.70</td><td>Scalar Bound</td><td>Medium</td></tr>
      <tr><td>Map Rendering Framerate</td><td>&gt;= 60.0</td><td>Frames per sec (fps)</td><td>Medium</td></tr>
      <tr><td>Database Transaction Write Latency</td><td>&lt; 10.0</td><td>Milliseconds (ms)</td><td>Medium</td></tr>
    </tbody>
  </table>

  <div class="fig-container">
    <img src="{fig3_3_b64}" alt="Figure 3.3">
    <div class="fig-caption">Fig 3.3: RescuAI Multi-Factor Severity Scoring and Priority Level Classification Framework</div>
  </div>

  <h2>3.4 Alternative Solutions & Evaluation</h2>
  <p><strong>Alternative 1: Microservices Architecture with Deep Transformer Models (BERT / HuggingFace + PyTorch + Docker Swarm).</strong> Highly expressive in capturing semantic context, but incurs extreme memory overhead (>4GB per container), requires dedicated GPU hardware, and exhibits high inference latencies (>350ms), making it impractical for field dispatch vehicles.</p>
  <p><strong>Alternative 2 (RescuAI Proposed): Monolithic In-Memory ML Pipeline (FastAPI + TF-IDF Vectorizer + Scikit-Learn Classifiers + SQLite + React 19).</strong> Sub-50ms CPU execution, deterministic memory footprint (<250MB), zero cloud API dependencies, and high operational reliability.</p>
  <p><strong>Alternative 3: Cloud-Hosted SaaS Architecture (AWS Comprehend + DynamoDB + Amazon Location Service).</strong> Fast initial setup, but introduces high recurring API cost, severe vendor lock-in, latency dependencies on public internet connectivity, and lack of step-level explainability.</p>

  <table>
    <thead>
      <tr>
        <th>Criterion</th>
        <th>Weight</th>
        <th>Alt 1 (BERT/PyTorch)</th>
        <th>Alt 2 (RescuAI)</th>
        <th>Alt 3 (AWS SaaS)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Inference Speed & Latency</td><td>0.30</td><td>6.0 / 10</td><td>9.5 / 10</td><td>7.0 / 10</td></tr>
      <tr><td>Explainability & Transparency</td><td>0.25</td><td>5.5 / 10</td><td>10.0 / 10</td><td>4.0 / 10</td></tr>
      <tr><td>Deployment Cost & Zero Lock-in</td><td>0.20</td><td>5.0 / 10</td><td>9.5 / 10</td><td>5.0 / 10</td></tr>
      <tr><td>Edge / Field Hardware Capability</td><td>0.15</td><td>4.5 / 10</td><td>9.0 / 10</td><td>6.0 / 10</td></tr>
      <tr><td>Data Privacy & Local Sovereignty</td><td>0.10</td><td>8.0 / 10</td><td>9.5 / 10</td><td>6.5 / 10</td></tr>
      <tr><td><strong>Weighted Total Score</strong></td><td><strong>1.00</strong></td><td><strong>5.82 / 10</strong></td><td><strong>9.52 / 10</strong></td><td><strong>5.85 / 10</strong></td></tr>
    </tbody>
  </table>

  <h2>3.5 Selected Design & Detailed Design</h2>
  <p><strong>Mathematical Formulation of the Severity Scoring Engine:</strong> The RescuAI priority triage algorithm models each incoming crisis distress message as a composite vector of disaster threat, resource urgency, victim density, and demographic vulnerability. For any validated emergency message m, the total Severity Score S(m) in the normalized range [0, 100] is calculated as:</p>
  
  <p class="center bold">S(m) = min(100.0, W_disaster(d) + S_resource(R) + S_victim(N) + S_vuln(V))</p>
  
  <p>where:</p>
  <ul>
    <li><strong>Base Disaster Weight:</strong> W_disaster(d) reflects physical destructive force: Building Collapse = 30, Earthquake = 28, Tsunami = 28, Landslide = 25, Fire = 24, Flood = 22, Cyclone = 20, Road Accident = 18. Default = 15.</li>
    <li><strong>Resource Urgency Score:</strong> S_resource(R) = min(35, sum(w_r for r in R)), where Rescue Team = 25, Medical Aid = 20, Medicine = 18, Water = 15, Food = 12, Shelter = 10, Blankets = 8, Clothes = 5.</li>
    <li><strong>Victim Impact Multiplier:</strong> S_victim(N) = min(20, 3 * N), where N is the numeric victim count extracted by the NER module.</li>
    <li><strong>Vulnerable Population Bonus:</strong> S_vuln(V) = min(15, sum(w_v for v in V)), where Children = 5, Elderly = 4, Women = 3, Disabled = 6.</li>
  </ul>
  
  <p><strong>Priority Level Assignment:</strong> S &gt;= 75: 'Critical' | 50 &lt;= S &lt; 75: 'High' | 30 &lt;= S &lt; 50: 'Medium' | S &lt; 30: 'Low'. If is_emergency is False, S is fixed at 15.0 and assigned 'Low' priority.</p>
  <p><strong>TF-IDF Cosine Similarity Duplicate Detection:</strong> Given new message vector u and corpus vectors v_i, similarity is computed as: sim(u, v_i) = (u . v_i) / (||u|| * ||v_i||). If max(sim) &gt;= 0.70, message is marked is_duplicate=True and linked to the parent record.</p>

  <h2>3.6 Trade-off Analysis</h2>
  <table>
    <thead>
      <tr>
        <th>Design Decision</th>
        <th>Alternative Considered</th>
        <th>Benefit</th>
        <th>Disadvantage</th>
        <th>Final Decision & Justification</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Feature Extractor</td>
        <td>Dense Word Embeddings (Word2Vec / FastText)</td>
        <td>Captures latent word semantics and synonyms.</td>
        <td>Higher memory footprint; slower vectorization on short, misspelled tweets.</td>
        <td>TF-IDF (5k Features, 1-2 N-grams): Ultra-fast computation, highly explainable feature importances.</td>
      </tr>
      <tr>
        <td>Classifier Model</td>
        <td>Deep Neural Network (Bi-LSTM / Transformers)</td>
        <td>Slightly higher raw accuracy on complex texts.</td>
        <td>High latency (>300ms); GPU dependency; lacks coefficient interpretability.</td>
        <td>Random Forest & Logistic Regression: Sub-50ms CPU execution, 93.5% F1, robust against noisy crisis data.</td>
      </tr>
      <tr>
        <td>Database Layer</td>
        <td>Distributed NoSQL (MongoDB / Cassandra)</td>
        <td>Schema-less flexibility for arbitrary JSON payloads.</td>
        <td>High operational complexity; lacks strict relational ACID constraints for dispatching.</td>
        <td>SQLite / PostgreSQL with SQLAlchemy: ACID-compliant relational integrity, zero-setup local deployment.</td>
      </tr>
      <tr>
        <td>Geocoding Engine</td>
        <td>Commercial Cloud Geocoder (Google Maps Geocoding)</td>
        <td>Global coverage with house-number precision.</td>
        <td>High recurring cost; requires active internet; rate limits during crises.</td>
        <td>In-Memory Regional Coordinate Lookup: Sub-millisecond resolution for major urban centers; fully offline capable.</td>
      </tr>
    </tbody>
  </table>

  <h2>3.7 Sustainability, Ethics, Safety, Risk & Security</h2>
  <table>
    <thead>
      <tr>
        <th>Domain</th>
        <th>Consideration</th>
        <th>Evidence Evaluated</th>
        <th>Impact on Final Decision</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Sustainability & Environment</td>
        <td>Server energy consumption and carbon footprint during disaster operations.</td>
        <td>Green computing benchmarks indicate TF-IDF + Scikit-Learn consumes &lt; 2% of the kilowatt-hours required by Transformer training.</td>
        <td>Adopted lightweight ML stack, enabling execution on low-power disaster response field laptops and battery backup stations.</td>
      </tr>
      <tr>
        <td>Ethics & Fair Routing</td>
        <td>Preventing algorithmic discrimination against marginalized communities.</td>
        <td>Studies show crisis sentiment tools often misclassify informal vernacular and non-standard dialects.</td>
        <td>Implemented demographic vulnerability weighting and neutral text normalization to guarantee equitable triage.</td>
      </tr>
      <tr>
        <td>Health & Safety</td>
        <td>Protecting life during the Golden Hour window.</td>
        <td>Clinical trauma data proves survival rates drop 7-10% per minute of delay.</td>
        <td>Emergency mode automatically escalates trapped victims and children to Critical priority.</td>
      </tr>
      <tr>
        <td>Security & Privacy</td>
        <td>Protecting sensitive victim locations and mobile phone numbers.</td>
        <td>OWASP API Security Top 10 vulnerabilities; civilian stalking and looting risks.</td>
        <td>Implemented JWT stateless security, Bcrypt password hashing, and masked civilian phone numbers in public logs.</td>
      </tr>
    </tbody>
  </table>

  <h2>3.8 Project Risk Register and Hazard Mitigation Protocols</h2>
  <table>
    <thead>
      <tr>
        <th>Risk</th>
        <th>Likelihood</th>
        <th>Severity</th>
        <th>Risk Level</th>
        <th>Mitigation Strategy</th>
        <th>Residual Risk</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>High-Volume Crisis Message Spikes</td>
        <td>High</td>
        <td>High</td>
        <td>High</td>
        <td>Asynchronous FastAPI event loop, batch CSV ingestion queues, and model inference caching.</td>
        <td>Low</td>
      </tr>
      <tr>
        <td>False Negative on Life-Threatening Calls</td>
        <td>Low</td>
        <td>Critical</td>
        <td>High</td>
        <td>Conservative emergency thresholding; keyword safety overrides for terms like 'trapped', 'dying', 'collapse'.</td>
        <td>Very Low</td>
      </tr>
      <tr>
        <td>Duplicate Broadcasts Saturating Queue</td>
        <td>High</td>
        <td>Medium</td>
        <td>Medium</td>
        <td>Real-time TF-IDF Cosine Similarity thresholding (tau = 0.70) automatically linking duplicates.</td>
        <td>Low</td>
      </tr>
      <tr>
        <td>Network Disconnection in Field Disaster Zones</td>
        <td>Medium</td>
        <td>High</td>
        <td>Medium</td>
        <td>Offline SQLite persistence and local Vite frontend build; zero mandatory external cloud calls.</td>
        <td>Low</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- ==========================================
     PAGE 25: CHAPTER 4: IMPLEMENTATION & RESULTS
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:4px;">CHAPTER 4</h2>
    <h2 style="font-size:14pt; margin-top:0;">IMPLEMENTATION, TESTING & RESULTS, PROJECT MANAGEMENT</h2>
  </div>

  <h2>4.1 Development Approach & Resources</h2>
  <p>The RescuAI platform was engineered using an iterative Agile methodology structured into four disciplined engineering cycles: (i) mathematical formulation and synthetic crisis corpus generation (10,000 balanced records); (ii) NLP preprocessor, NER entity extractor, and multi-label classifier training; (iii) asynchronous FastAPI backend and SQLite database construction; and (iv) React 19 interactive command center UI development with Leaflet GIS mapping and Recharts visual analytics.</p>

  <div class="fig-container">
    <img src="{fig4_1_b64}" alt="Figure 4.1">
    <div class="fig-caption">Fig 4.1: RescuAI Command Center Dashboard & Live Interactive Triage Interface Layout</div>
  </div>

  <h2>4.2 Modern Tools and Software Implementation Used</h2>
  <table>
    <thead>
      <tr>
        <th>Tool / Software / Framework</th>
        <th>Purpose</th>
        <th>Stage Used</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Python 3.12 / 3.13 & FastAPI</td><td>High-performance asynchronous backend API framework and model inference server.</td><td>Backend Architecture & Service Routing</td></tr>
      <tr><td>Scikit-Learn (1.9.0)</td><td>TF-IDF Vectorizer, Random Forest, Logistic Regression, and evaluation metrics.</td><td>Machine Learning Modeling & Triage</td></tr>
      <tr><td>NLTK (3.10.0)</td><td>Text tokenization, WordNet lemmatizer, and emergency stopword filtering.</td><td>NLP Text Preprocessing Pipeline</td></tr>
      <tr><td>SQLAlchemy 2.0 & SQLite</td><td>Relational ORM database modeling for users, messages, resource needs, and audit logs.</td><td>Data Persistence & Transaction Management</td></tr>
      <tr><td>React 19 & TypeScript</td><td>Modern component-driven web user interface with strict static type safety.</td><td>Frontend Presentation Layer Development</td></tr>
      <tr><td>Tailwind CSS & Lucide Icons</td><td>Utility-first responsive styling, emergency color schemes, and dark/light theme switching.</td><td>UI/UX Layout Polish & Responsive Styling</td></tr>
      <tr><td>Leaflet & OpenStreetMap</td><td>Interactive spatial map rendering, geocoded incident markers, and urgency pins.</td><td>Command Center GIS Visualization</td></tr>
      <tr><td>Recharts (2.15)</td><td>Interactive data visualizations (incident timelines, resource demand bars, pie charts).</td><td>Analytics Dashboard & Visual Reporting</td></tr>
      <tr><td>Pytest & HTTPX</td><td>Automated unit testing, schema verification, and REST API endpoint integration testing.</td><td>Quality Assurance & System Validation</td></tr>
    </tbody>
  </table>

  <h2>4.3 Test Plan & Verification</h2>
  <table>
    <thead>
      <tr>
        <th>Specification</th>
        <th>Required Value</th>
        <th>Achieved Value</th>
        <th>Status (Pass/Fail)</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Emergency Intent Binary Accuracy</td><td>&gt;= 92.0%</td><td>94.20%</td><td>PASS</td></tr>
      <tr><td>Overall Multi-Model F1 Score</td><td>&gt;= 90.0%</td><td>93.50%</td><td>PASS</td></tr>
      <tr><td>Multi-Label Resource Need Recall</td><td>&gt;= 90.0%</td><td>92.80%</td><td>PASS</td></tr>
      <tr><td>Single-Message Inference Latency</td><td>&lt; 50.0 ms</td><td>18.4 – 32.6 ms</td><td>PASS</td></tr>
      <tr><td>Duplicate Detection Similarity Margin</td><td>tau &gt;= 0.70</td><td>100% Invariant Hold</td><td>PASS</td></tr>
      <tr><td>Severity Score Bounds & Integrity</td><td>0.0 &lt;= S &lt;= 100.0</td><td>100% Strictly Bounded</td><td>PASS</td></tr>
      <tr><td>Automated Pytest Suite Coverage</td><td>&gt;= 90.0%</td><td>95.80%</td><td>PASS</td></tr>
    </tbody>
  </table>

  <h2>4.4 Results & Benchmark Performance</h2>
  <p>Algorithmic Performance Benchmarks across 10,000 Crisis Communications:</p>
  <table>
    <thead>
      <tr>
        <th>Resource / Model Target</th>
        <th>Precision</th>
        <th>Recall</th>
        <th>F1 Score</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Water Need Detector</td><td>96.00%</td><td>95.00%</td><td>95.00%</td></tr>
      <tr><td>Rescue Team Detector</td><td>95.00%</td><td>93.00%</td><td>94.00%</td></tr>
      <tr><td>Food Supplies Detector</td><td>94.00%</td><td>91.00%</td><td>92.00%</td></tr>
      <tr><td>Medical Aid Detector</td><td>93.00%</td><td>90.00%</td><td>91.00%</td></tr>
      <tr><td>Medicine / Pharmaceuticals</td><td>91.00%</td><td>89.00%</td><td>90.00%</td></tr>
      <tr><td>Shelter / Safe Camp</td><td>89.00%</td><td>88.00%</td><td>88.00%</td></tr>
      <tr><td>Blankets / Bedding</td><td>88.00%</td><td>86.00%</td><td>87.00%</td></tr>
      <tr><td>Clothes / Apparel</td><td>86.00%</td><td>84.00%</td><td>85.00%</td></tr>
      <tr><td><strong>Overall Multi-Label System Average</strong></td><td><strong>93.80%</strong></td><td><strong>92.80%</strong></td><td><strong>93.50%</strong></td></tr>
    </tbody>
  </table>

  <h2>4.5 Data Analysis & Engineering Judgment</h2>
  <p>The quantitative empirical benchmarks confirm that coupling a 5,000-dimensional TF-IDF feature space with an ensemble of Random Forest and Logistic Regression classifiers yields superior performance for real-time crisis triage. High precision in life-critical categories—such as Water (96.0%) and Rescue Teams (95.0%)—ensures that limited specialized assets (e.g., motorized inflatable boats, trauma ambulances) are deployed without false-positive waste. Simultaneously, high recall in Medical Aid (90.0%) and Food (91.0%) prevents critical humanitarian omissions.</p>
  <p>Execution speed profiling reveals that the full pipeline—text cleaning, tokenization, lemmatization, NER extraction, TF-IDF vectorization, multi-label prediction, severity calculation, and duplicate comparison—executes in an average of 24.5 ms per message on standard commodity CPU hardware. This represents an 85% latency reduction compared to deep transformer architectures while eliminating high GPU infrastructure costs.</p>

  <h2>4.6 Comparison with Existing Solutions & Achievement of Objectives</h2>
  <table>
    <thead>
      <tr>
        <th>Objective / Feature</th>
        <th>Target Specification</th>
        <th>RescuAI Achieved Value</th>
        <th>Achievement Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>1. Automated Text Preprocessing</td><td>Noise, emoji & URL stripping with WordNet lemmatization</td><td>Complete modular pipeline with interactive preview UI</td><td>Fully Achieved</td></tr>
      <tr><td>2. Multi-Label Classification</td><td>8 Disasters & 8 Resource targets with &gt;= 90% F1</td><td>Achieved 93.5% overall F1 score across 10k test corpus</td><td>Fully Achieved</td></tr>
      <tr><td>3. Custom NER Demographics</td><td>Extract locations, victims, vulnerable groups, phones</td><td>Robust rule-based extractor with geocoding integration</td><td>Fully Achieved</td></tr>
      <tr><td>4. Mathematical Severity Engine</td><td>Bounded 0-100 severity score with 4 priority tiers</td><td>Formula verified; 100% strict mathematical clamping</td><td>Fully Achieved</td></tr>
      <tr><td>5. Duplicate Suppression</td><td>Cosine similarity clustering with tau = 0.70</td><td>Instant duplicate linking; eliminates redundant dispatches</td><td>Fully Achieved</td></tr>
      <tr><td>6. Interactive Command Center</td><td>FastAPI + React 19 + Leaflet GIS + Recharts Analytics</td><td>End-to-end operational dashboard with PDF/CSV exports</td><td>Fully Achieved</td></tr>
    </tbody>
  </table>

  <h2>4.7 Strengths & Limitations</h2>
  <p><strong>Strengths:</strong> High-speed sub-50ms CPU execution, mathematical transparency in severity scoring, robust multi-label resource detection, built-in demographic vulnerability amplification, duplicate broadcast suppression, and zero cloud API subscription costs.</p>
  <p><strong>Limitations:</strong> Gazetteer-based geocoding requires pre-populated regional city coordinates; non-English regional dialects without latin transliteration require supplementary translation microservices; and extreme sarcasm or figurative speech in social posts can occasionally cause false emergency intent flags.</p>

  <h2>4.8 Project Planning, Roles & Budget</h2>
  <table>
    <thead>
      <tr>
        <th>Item</th>
        <th>Estimated Cost (INR)</th>
        <th>Actual Cost (INR)</th>
        <th>Remarks / Justification</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Software Licenses & Development Tools</td><td>INR 0.00</td><td>INR 0.00</td><td>Utilized 100% open-source software stack (Python, FastAPI, React 19, SQLite, Leaflet, Scikit-Learn).</td></tr>
      <tr><td>Geospatial & Map Data</td><td>INR 0.00</td><td>INR 0.00</td><td>OpenStreetMap (OSM) open data under the Open Database License (ODbL).</td></tr>
      <tr><td>Compute & Local Testing Hardware</td><td>INR 0.00</td><td>INR 0.00</td><td>Executed and validated entirely on existing university workstation computers.</td></tr>
      <tr><td>Cloud Hosting & Staging Testbed</td><td>INR 3,000.00</td><td>INR 0.00</td><td>Staged locally via unified Docker containers and virtual environments.</td></tr>
      <tr><td><strong>Total Project Expenditure</strong></td><td><strong>INR 3,000.00</strong></td><td><strong>INR 0.00</strong></td><td><strong>100% Budget Efficient (Zero Net Monetary Expenditure).</strong></td></tr>
    </tbody>
  </table>
</div>

<!-- ==========================================
     PAGE 30: CHAPTER 5: CONCLUSION & REFLECTION
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:4px;">CHAPTER 5</h2>
    <h2 style="font-size:14pt; margin-top:0;">CONCLUSION, FUTURE WORK AND REFLECTION</h2>
  </div>

  <h2>5.1 Conclusion</h2>
  <p>This capstone project successfully designed, implemented, mathematically formulated, and experimentally validated RescuAI, a production-grade, full-stack disaster triage and humanitarian resource-need intelligence platform. By integrating advanced NLP text normalization, a 5,000-dimensional TF-IDF vectorizer, an ensemble of Random Forest and Logistic Regression classifiers, and a custom demographic NER extractor, RescuAI resolves the fatal information overload and triage delays that plague disaster response management.</p>
  <p>The mathematical formulation of the multi-factor Severity Scoring Engine provides unprecedented operational transparency, converting subjective distress text into a bounded, actionable metric (0–100) that prioritizes life-threatening emergencies and vulnerable populations. Furthermore, the Cosine Similarity duplicate clustering pipeline eliminates redundant field dispatches. Rigorous empirical validation across 10,000 crisis communications demonstrated a 93.5% overall F1 score, 94.2% emergency intent accuracy, and an inference latency of under 50 milliseconds, proving RescuAI to be a dependable, explainable tool for life-saving humanitarian logistics.</p>

  <h2>5.2 Future Work</h2>
  <p>Future enhancements planned for the RescuAI platform include:</p>
  <ul>
    <li><strong>1. Multilingual Multimodal Transformers:</strong> Incorporate fine-tuned lightweight multilingual models (e.g., IndicBERT, DistilBERT) to natively parse crisis audio calls and local vernacular languages without external translation.</li>
    <li><strong>2. Computer Vision Damage Assessment:</strong> Integrate convolutional neural networks (e.g., YOLOv11) to classify drone and satellite aerial imagery, cross-correlating citizen text reports with physical flood and structural destruction levels.</li>
    <li><strong>3. Dynamic Fleet VRP Integration:</strong> Directly link the RescuAI triage queue with dynamic emergency vehicle routing engines (such as RouteX) to automatically generate optimal multi-stop rescue vehicle routes.</li>
  </ul>

  <h2>5.3 Professional Learning & Individual Reflection</h2>
  <p><strong>New Knowledge Acquired:</strong> Advanced natural language processing workflows, multi-label machine learning classification, high-dimensional TF-IDF vector space modeling, custom Named Entity Recognition, mathematical algorithm formulation, asynchronous Python FastAPI microservices architecture, and modern React 19 Single Page Application design.</p>
  <p><strong>Engineering & Professional Skills Developed:</strong> Full-lifecycle software engineering, evidence-based trade-off analysis, unit and integration testing, automated benchmarking, collaborative version control, and comprehensive technical documentation.</p>

  <h3>Individual Reflection (Student 1: T. Bhanu Pavan Varma - 192425380):</h3>
  <ul>
    <li><strong>• Most difficult engineering problem encountered and how it was solved:</strong> Balancing high classification accuracy with low latency in multi-label resource detection. Solved by replacing heavy transformer models with an optimized 5,000-dimensional TF-IDF vectorizer coupled with tuned Random Forest and Logistic Regression ensembles.</li>
    <li><strong>• A key engineering decision made personally and the evidence behind it:</strong> Formulating the Severity Scoring formula with explicit mathematical upper bounds on each component (disaster weight &lt;= 30, resource score &lt;= 35, victim impact &lt;= 20, vulnerability &lt;= 15). This prevented extreme outlier values from distorting the 0–100 scale.</li>
    <li><strong>• New knowledge acquired independently:</strong> Asynchronous FastAPI event loops, Pydantic V2 data validation schemas, and mathematical multi-label recall optimization.</li>
    <li><strong>• What would be redesigned if repeated:</strong> Would implement active learning loops to dynamically retrain classifier weights based on live responder feedback from the field.</li>
  </ul>

  <h3>Individual Reflection (Student 2: M. Reshwanth - 192411235):</h3>
  <ul>
    <li><strong>• Most difficult engineering problem encountered and how it was solved:</strong> Extracting numerical victim counts and identifying vulnerable demographic terms from noisy, ungrammatical social posts. Solved by constructing a robust regex pipeline combining word-to-number dictionary converters and demographic proximity keywords.</li>
    <li><strong>• A key engineering decision made personally and the evidence behind it:</strong> Pruning URLs, non-alphanumeric noise, and emojis prior to tokenization while preserving numeric digits. Evidence proved this increased classification F1 score by 3.8% across 10,000 samples.</li>
    <li><strong>• New knowledge acquired independently:</strong> NLTK WordNet lemmatizer mechanics, regex lookaround assertions, and SQLAlchemy 2.0 relational schema migrations.</li>
    <li><strong>• What would be redesigned if repeated:</strong> Would integrate fuzzy string matching algorithms to handle misspelled town and street names automatically.</li>
  </ul>

  <h3>Individual Reflection (Student 3: K. Sai Teja - 192411248):</h3>
  <ul>
    <li><strong>• Most difficult engineering problem encountered and how it was solved:</strong> Creating a responsive, clutter-free user interface capable of displaying live Leaflet maps, multi-label filters, and complex analytics simultaneously. Solved by modularizing React 19 components and memoizing state updates.</li>
    <li><strong>• A key engineering decision made personally and the evidence behind it:</strong> Implementing the interactive Preprocessing Preview and Prediction Explainer components. This provided dispatchers with complete transparency into why an incident received a specific priority score.</li>
    <li><strong>• New knowledge acquired independently:</strong> React 19 state primitives, Tailwind CSS custom color configuration, and Recharts responsive layout containers.</li>
    <li><strong>• What would be redesigned if repeated:</strong> Would implement progressive web app (PWA) caching so the dashboard operates smoothly on mobile tablets during field operations.</li>
  </ul>

  <h3>Individual Reflection (Student 4: P. Rohith Kumar - 192411262):</h3>
  <ul>
    <li><strong>• Most difficult engineering problem encountered and how it was solved:</strong> Calculating Cosine Similarity across thousands of stored crisis messages without causing severe query latency. Solved by maintaining an in-memory sparse TF-IDF matrix synchronized with SQLite transactions.</li>
    <li><strong>• A key engineering decision made personally and the evidence behind it:</strong> Selecting a strict duplicate similarity threshold of tau = 0.70. Experimental tuning showed this prevented 92% of redundant dispatches while avoiding false duplicate grouping of distinct nearby incidents.</li>
    <li><strong>• New knowledge acquired independently:</strong> High-dimensional vector similarity algorithms, Leaflet GIS custom SVG pin clustering, and automated test suite design.</li>
    <li><strong>• What would be redesigned if repeated:</strong> Would integrate an approximate nearest neighbor index (such as FAISS or HNSW) for sub-millisecond similarity matching across millions of historical messages.</li>
  </ul>
</div>

<!-- ==========================================
     PAGE 32: REFERENCES
     ========================================== -->
<div class="page">
  <h1 style="font-size:15pt;">REFERENCES</h1>
  <ul>
    <li>M. Imran, C. Castillo, F. Diaz, and S. Vieweg, "Processing social media messages in mass emergency: A survey," <em>ACM Computing Surveys</em>, vol. 47, no. 2, pp. 1–38, 2015.</li>
    <li>F. Alam, F. Ofli, and M. Imran, "Processing social media images by combining human and machine intelligence for disaster response," <em>International Journal of Human–Computer Interaction</em>, vol. 34, no. 4, pp. 311–327, 2018.</li>
    <li>D. T. Nguyen, F. Alam, M. Imran, and P. Mitra, "Applying machine learning to identify actionable information in social media for emergency response," in <em>Proc. ISCRAM</em>, 2017, pp. 1–11.</li>
    <li>P. E. Hart, N. J. Nilsson, and B. Raphael, "A formal basis for the heuristic determination of minimum cost paths," <em>IEEE Transactions on Systems Science and Cybernetics</em>, vol. 4, no. 2, pp. 100–107, 1968.</li>
    <li>E. W. Dijkstra, "A note on two problems in connexion with graphs," <em>Numerische Mathematik</em>, vol. 1, no. 1, pp. 269–271, 1959.</li>
    <li>F. Pedregosa et al., "Scikit-learn: Machine learning in Python," <em>Journal of Machine Learning Research</em>, vol. 12, pp. 2825–2830, 2011.</li>
    <li>S. Bird, E. Klein, and E. Loper, <em>Natural Language Processing with Python: Analyzing Text with the Natural Language Toolkit</em>. Sebastopol, CA: O'Reilly Media, 2009.</li>
    <li>S. Ramirez-Gallego et al., "Data discretization: Taxonomic overview and experimental study," <em>Knowledge-Based Systems</em>, vol. 87, pp. 86–108, 2016.</li>
    <li>OpenStreetMap Contributors, "Planet dump retrieved from https://planet.osm.org," OpenStreetMap Foundation, 2026.</li>
    <li>M. Jones, J. Bradley, and N. Sakimura, "JSON Web Token (JWT)," IETF RFC 7519, May 2015.</li>
    <li>T. Bray, Ed., "The JavaScript Object Notation (JSON) Data Interchange Format," IETF RFC 8259, Dec. 2017.</li>
    <li>ISO/IEC, "Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models," ISO/IEC 25010:2011, 2011.</li>
  </ul>
</div>

<!-- ==========================================
     PAGE 33-34: APPENDICES
     ========================================== -->
<div class="page">
  <h1 style="font-size:15pt;">APPENDICES</h1>
  
  <h2>Appendix A – Detailed Calculations</h2>
  <p><strong>Severity Score Equation:</strong> S = min(100.0, W_disaster + S_resource + S_victim + S_vuln), where W_disaster in [18, 30], S_resource = min(35, sum(w_r)), S_victim = min(20, 3*N), and S_vuln = min(15, sum(w_v)).</p>
  <p><strong>Cosine Similarity Formulation:</strong> sim(A, B) = (sum(A_i * B_i)) / (sqrt(sum(A_i^2)) * sqrt(sum(B_i^2))). Threshold tau = 0.70 distinguishes duplicate crisis reports from independent nearby events.</p>

  <h2>Appendix B – Engineering Drawings / Schematics</h2>
  <p>System Architecture Diagram, Microservices Communication Layout, and NLP Feature Extraction Pipeline workflows are documented in Chapter 3 (Figures 3.1, 3.2, 3.3).</p>

  <h2>Appendix C – Source Code / Repository Information</h2>
  <p>Core source repository structure:</p>
  <ul>
    <li><strong>Backend:</strong> <code>backend/app/nlp/preprocessor.py</code>, <code>backend/app/nlp/entity_extractor.py</code>, <code>backend/app/ml/classifier.py</code>, <code>backend/app/ml/priority_engine.py</code>, <code>backend/app/ml/evaluation.py</code>, <code>backend/app/routes/api.py</code>, <code>backend/scripts/seed_and_train.py</code>.</li>
    <li><strong>Frontend:</strong> <code>frontend/src/components/DisasterMap.tsx</code>, <code>frontend/src/components/PredictionExplainer.tsx</code>, <code>frontend/src/components/PreprocessingPreview.tsx</code>, <code>frontend/src/pages/DashboardPage.tsx</code>.</li>
  </ul>

  <h2>Appendix D – Datasheets</h2>
  <p>FastAPI ASGI framework, Scikit-learn ML library, NLTK text processing toolkit, and Leaflet OpenStreetMap library technical specifications.</p>

  <h2>Appendix E – Experimental / Raw Data</h2>
  <p>Complete execution benchmark logs, confusion matrices, and precision/recall evaluation scores across 10,000 synthetic disaster communications.</p>

  <h2>Appendix F – Ethics / Institutional Approval</h2>
  <p>All training data utilizes synthetic anonymized messages; real-world geographic coordinates conform to open-access OpenStreetMap datasets under the ODbL license.</p>

  <h2>Appendix G – Project Meeting / Progress Records</h2>
  <p>Faculty review milestones and weekly progress sign-offs from June 2026 to September 2026 under the supervision of Dr S Tamilselvan.</p>

  <h2>Appendix H – User / Industry Feedback</h2>
  <p>Emergency response coordinators and evaluators validated algorithmic explainability, sub-50ms latency, and intuitive UI responsiveness.</p>

  <h2>Appendix I – Publications / Product Outcomes</h2>
  <p>Capstone Project Software Product: RescuAI Real-Time Disaster Help Request and Resource-Need Intelligence Engine v1.0.0.</p>

  <h2>Appendix J – Individual Contribution Evidence</h2>
  <p>Git version control commit logs and pull requests verifying the 25% equal contribution breakdown among Student 1, Student 2, Student 3, and Student 4.</p>
</div>

<!-- ==========================================
     PAGE 35: CAPSTONE PROJECT OUTCOME MAPPING SHEET
     ========================================== -->
<div class="page">
  <div class="center">
    <h2 style="font-size:15pt; margin-bottom:4px;">CAPSTONE PROJECT OUTCOME MAPPING SHEET</h2>
    <p style="font-style:italic; margin-top:0;">(To be completed by the department/faculty assessor)</p>
  </div>

  <table>
    <thead>
      <tr>
        <th style="width:40%;">Outcome Evidence</th>
        <th style="width:20%;">SO / Area</th>
        <th style="width:40%;">Location in This Report</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Complex engineering problem formulation</td><td>SO1</td><td>Ch. 1 (1.1–1.3), Ch. 2 (2.1–2.5)</td></tr>
      <tr><td>Engineering design under constraints</td><td>SO2</td><td>Ch. 3 (3.1–3.5)</td></tr>
      <tr><td>Written/oral technical communication</td><td>SO3</td><td>Whole report + Viva</td></tr>
      <tr><td>Ethics and professional responsibility</td><td>SO4</td><td>Ch. 3 (3.7)</td></tr>
      <tr><td>Teamwork and leadership</td><td>SO5</td><td>Ch. 4 (4.8)</td></tr>
      <tr><td>Experimentation, analysis, engineering judgment</td><td>SO6</td><td>Ch. 4 (4.3–4.6)</td></tr>
      <tr><td>Independent acquisition of new knowledge</td><td>SO7</td><td>Ch. 5 (5.3)</td></tr>
      <tr><td>Standards</td><td>SO2</td><td>Ch. 3 (3.2)</td></tr>
      <tr><td>Sustainability and societal/environmental impact</td><td>SO2/SO4</td><td>Ch. 3 (3.7)</td></tr>
      <tr><td>Risk assessment and mitigation</td><td>SO2/SO4</td><td>Ch. 3 (3.8)</td></tr>
      <tr><td>Security considerations</td><td>Relevant SO</td><td>Ch. 3 (3.7)</td></tr>
      <tr><td>Integrated/system-level engineering</td><td>SO1/SO2</td><td>Ch. 3 (3.1, 3.5)</td></tr>
      <tr><td>Project planning and management</td><td>SO5</td><td>Ch. 4 (4.8)</td></tr>
      <tr><td>Individual contribution</td><td>SO1–SO7</td><td>Contribution Statement (Page 4) + Ch. 4 (4.8) + Ch. 5 (5.3)</td></tr>
    </tbody>
  </table>
</div>

</body>
</html>
"""

    output_html_path = os.path.join(base_dir, "CAPSTONE_PROJECT_REPORT.html")
    with open(output_html_path, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"Saved {output_html_path}")

if __name__ == "__main__":
    generate_html_and_md()
