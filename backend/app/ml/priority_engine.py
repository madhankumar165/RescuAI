from typing import Dict, List, Tuple, Any, Optional
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

DISASTER_WEIGHTS = {
    "Building Collapse": 30,
    "Earthquake": 28,
    "Tsunami": 28,
    "Landslide": 25,
    "Flood": 22,
    "Fire": 24,
    "Cyclone": 20,
    "Road Accident": 18
}

RESOURCE_URGENCY_WEIGHTS = {
    "Rescue Team": 25,
    "Medical Aid": 20,
    "Medicine": 18,
    "Water": 15,
    "Food": 12,
    "Shelter": 10,
    "Blankets": 8,
    "Clothes": 5
}

class PriorityEngine:
    def __init__(self):
        pass

    def calculate_severity_score(
        self,
        disaster_type: str,
        resources_needed: List[str],
        victim_count: int,
        vulnerable_groups: Dict[str, bool],
        is_emergency: bool
    ) -> Tuple[float, str]:
        if not is_emergency:
            return 15.0, "Low"

        # Base score from disaster type
        base_score = DISASTER_WEIGHTS.get(disaster_type, 15)

        # Resource urgency additions
        resource_score = sum(RESOURCE_URGENCY_WEIGHTS.get(r, 5) for r in resources_needed)
        resource_score = min(resource_score, 35)  # cap at 35

        # Victim impact
        victim_score = min(victim_count * 3, 20)  # cap at 20

        # Vulnerable groups bonus
        vuln_score = 0
        if vulnerable_groups.get("contains_children"):
            vuln_score += 5
        if vulnerable_groups.get("contains_women"):
            vuln_score += 3
        if vulnerable_groups.get("contains_elderly"):
            vuln_score += 4
        if vulnerable_groups.get("contains_disabled"):
            vuln_score += 6
        vuln_score = min(vuln_score, 15)

        total_score = float(base_score + resource_score + victim_score + vuln_score)
        total_score = max(0.0, min(100.0, total_score))

        # Priority Level mapping
        if total_score >= 75.0:
            priority = "Critical"
        elif total_score >= 50.0:
            priority = "High"
        elif total_score >= 30.0:
            priority = "Medium"
        else:
            priority = "Low"

        return round(total_score, 1), priority

    def check_duplicate_similarity(
        self,
        new_text: str,
        existing_texts: List[Tuple[int, str]],
        threshold: float = 0.70
    ) -> Tuple[bool, Optional[int], float]:
        if not existing_texts:
            return False, None, 0.0

        all_corpus = [new_text] + [item[1] for item in existing_texts]
        
        vectorizer = TfidfVectorizer(ngram_range=(1, 2)).fit(all_corpus)
        vectors = vectorizer.transform(all_corpus)
        
        new_vec = vectors[0]
        exist_vecs = vectors[1:]
        
        sims = cosine_similarity(new_vec, exist_vecs)[0]
        max_idx = np.argmax(sims)
        max_sim = float(sims[max_idx])

        if max_sim >= threshold:
            matching_id = existing_texts[max_idx][0]
            return True, matching_id, round(max_sim, 3)

        return False, None, round(max_sim, 3)

priority_engine = PriorityEngine()
