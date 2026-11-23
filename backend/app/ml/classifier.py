import os
import joblib
import numpy as np
from typing import Dict, List, Tuple, Any
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from app.config import settings
from app.nlp.preprocessor import preprocessor

DISASTER_TYPES = [
    "Flood", "Earthquake", "Cyclone", "Fire", 
    "Landslide", "Tsunami", "Building Collapse", "Road Accident"
]

RESOURCE_TYPES = [
    "Food", "Water", "Medical Aid", "Shelter", 
    "Rescue Team", "Medicine", "Clothes", "Blankets"
]

# Rule-assisted keyword dictionaries for fast fallback / explanation scoring
DISASTER_KEYWORDS = {
    "Flood": ["flood", "flooding", "drowning", "submerged", "overflow", "deluge", "dam"],
    "Earthquake": ["earthquake", "quake", "tremor", "rubble", "shaking", "seismic", "richter", "cracks"],
    "Cyclone": ["cyclone", "hurricane", "typhoon", "storm", "gale", "wind", "winds", "surge", "tornado"],
    "Fire": ["fire", "blaze", "flames", "smoke", "wildfire", "burning", "burnt", "inferno", "combustion"],
    "Landslide": ["landslide", "mudslide", "rockslide", "slump", "hillside", "slope"],
    "Tsunami": ["tsunami", "wavefront", "ocean wave", "coastal wave", "seawall"],
    "Building Collapse": ["collapse", "building collapse", "structure collapse", "trapped under debris", "caved in"],
    "Road Accident": ["accident", "crash", "collision", "vehicle crash", "highway crash", "overturned truck"]
}

RESOURCE_KEYWORDS = {
    "Food": ["food", "hungry", "eat", "meals", "rations", "nutrition", "bread", "cereal"],
    "Water": ["water", "drinking", "thirsty", "clean water", "bottles", "dehydrated", "hydration"],
    "Medical Aid": ["medical", "doctor", "ambulance", "paramedic", "injured", "wound", "bleeding", "first aid"],
    "Shelter": ["shelter", "tent", "tarp", "roof", "homeless", "displaced", "stay", "camp"],
    "Rescue Team": ["rescue", "trapped", "save", "evacuate", "boat", "helicopter", "team", "stuck"],
    "Medicine": ["medicine", "pills", "insulin", "drugs", "prescription", "antibiotics", "meds"],
    "Clothes": ["clothes", "clothing", "wear", "pants", "shirt", "shoes", "dry clothes"],
    "Blankets": ["blanket", "blankets", "warmth", "cold", "hypothermia", "quilt", "sleeping bag"]
}

EMERGENCY_KEYWORDS = ["urgent", "emergency", "help", "sos", "danger", "trapped", "dying", "bleeding", "critical", "immediately", "save us", "stuck"]

class DisasterMLClassifier:
    def __init__(self):
        self.vectorizer = None
        self.emergency_model = None
        self.disaster_model = None
        self.resource_models = {}
        self.is_trained = False
        
        self.model_dir = settings.MODEL_DIR
        os.makedirs(self.model_dir, exist_ok=True)
        self.load_models()

    def load_models(self):
        try:
            vec_path = os.path.join(self.model_dir, "vectorizer.joblib")
            emg_path = os.path.join(self.model_dir, "emergency_model.joblib")
            dis_path = os.path.join(self.model_dir, "disaster_model.joblib")
            res_path = os.path.join(self.model_dir, "resource_models.joblib")

            if os.path.exists(vec_path) and os.path.exists(dis_path):
                self.vectorizer = joblib.load(vec_path)
                self.emergency_model = joblib.load(emg_path)
                self.disaster_model = joblib.load(dis_path)
                self.resource_models = joblib.load(res_path)
                self.is_trained = True
        except Exception as e:
            print(f"[MLClassifier] Model load info: {e}. Will use rule-assisted ML fallback.")

    def save_models(self):
        joblib.dump(self.vectorizer, os.path.join(self.model_dir, "vectorizer.joblib"))
        joblib.dump(self.emergency_model, os.path.join(self.model_dir, "emergency_model.joblib"))
        joblib.dump(self.disaster_model, os.path.join(self.model_dir, "disaster_model.joblib"))
        joblib.dump(self.resource_models, os.path.join(self.model_dir, "resource_models.joblib"))
        self.is_trained = True

    def train_on_dataset(self, texts: List[str], emergencies: List[int], disasters: List[str], resources_matrix: Dict[str, List[int]]):
        cleaned_texts = [preprocessor.clean_text(t)[0] for t in texts]
        self.vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
        X = self.vectorizer.fit_transform(cleaned_texts)

        # Train Emergency model
        self.emergency_model = LogisticRegression(C=2.0, max_iter=500)
        self.emergency_model.fit(X, emergencies)

        # Train Disaster Type model
        self.disaster_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.disaster_model.fit(X, disasters)

        # Train Multi-label Resource models
        self.resource_models = {}
        for r_name in RESOURCE_TYPES:
            r_y = resources_matrix.get(r_name, [0]*len(texts))
            r_clf = LogisticRegression(C=1.5, max_iter=500)
            r_clf.fit(X, r_y)
            self.resource_models[r_name] = r_clf

        self.save_models()

    def predict(self, text: str) -> Dict[str, Any]:
        p_res = preprocessor.preprocess_full(text)
        cleaned = p_res["cleaned_text"]

        # Rule-assisted keyword detection
        detected_keywords = []
        is_emergency = any(k in cleaned.lower() for k in EMERGENCY_KEYWORDS)
        
        # Calculate disaster type score
        disaster_type = "Flood"
        max_disaster_score = 0
        disaster_scores = {}

        for d_type, kws in DISASTER_KEYWORDS.items():
            matches = [k for k in kws if k in cleaned.lower()]
            score = len(matches)
            disaster_scores[d_type] = score
            if score > max_disaster_score:
                max_disaster_score = score
                disaster_type = d_type
                detected_keywords.extend(matches)

        # Multi-label resources detection
        detected_resources = []
        for r_type, kws in RESOURCE_KEYWORDS.items():
            matches = [k for k in kws if k in cleaned.lower()]
            if matches:
                detected_resources.append(r_type)
                detected_keywords.extend(matches)

        # Model Inference if trained
        confidence_score = 0.88
        if self.is_trained and self.vectorizer is not None:
            try:
                vec = self.vectorizer.transform([cleaned])
                
                # Emergency prediction
                emg_prob = self.emergency_model.predict_proba(vec)[0][1]
                is_emergency = bool(emg_prob > 0.45 or is_emergency)
                
                # Disaster prediction
                dis_prob = self.disaster_model.predict_proba(vec)[0]
                best_idx = np.argmax(dis_prob)
                model_disaster = self.disaster_model.classes_[best_idx]
                
                if max_disaster_score > 0:
                    disaster_type = max(disaster_scores, key=disaster_scores.get)
                else:
                    disaster_type = model_disaster
                    
                confidence_score = float(dis_prob[best_idx])
                
                # Resource multi-label prediction
                for r_name, r_clf in self.resource_models.items():
                    r_prob = r_clf.predict_proba(vec)[0][1]
                    if r_prob > 0.35 and r_name not in detected_resources:
                        detected_resources.append(r_name)
            except Exception as ex:
                print(f"[MLClassifier Predict Error]: {ex}")

        # Fallback resource default if emergency is true but no resource matched
        if is_emergency and not detected_resources:
            detected_resources = ["Rescue Team", "Water"]

        # Deduplicate keywords
        unique_kws = list(set(detected_keywords))
        
        # Build explanation string
        explanation_parts = []
        if is_emergency:
            explanation_parts.append("Message flagged as EMERGENCY based on urgency keywords.")
        explanation_parts.append(f"Disaster categorized as '{disaster_type}' due to semantic signals.")
        if detected_resources:
            explanation_parts.append(f"Identified resource requirements: {', '.join(detected_resources)}.")
        if unique_kws:
            explanation_parts.append(f"Key trigger words: {', '.join(unique_kws[:5])}.")
        explanation = " ".join(explanation_parts)

        return {
            "is_emergency": is_emergency,
            "disaster_type": disaster_type,
            "resources_needed": detected_resources,
            "confidence_score": round(confidence_score, 3),
            "explanation": explanation,
            "keywords": unique_kws
        }

ml_classifier = DisasterMLClassifier()
