import re
from typing import Dict, Any, List

HOAX_PRANK_KEYWORDS = [
    "haha", "lol", "joke", "fake", "prank", "test message", "just testing", "lmao", 
    "alien invasion", "zombie", "free money", "troll", "click here", "subscribe", "buy now", "asdf"
]

CONTRADICTORY_PHRASES = [
    "no emergency", "nothing happened", "never mind", "just kidding", "all good"
]

class AuthenticityDetector:
    def detect_authenticity(
        self, 
        text: str, 
        is_emergency: bool, 
        location_name: str, 
        phone_number: str, 
        victim_count: int, 
        is_duplicate: bool
    ) -> Dict[str, Any]:
        text_lower = text.lower()
        score = 80.0  # Base score
        flags = []

        # 1. Check for prank / joke / spam keywords
        has_hoax = any(k in text_lower for k in HOAX_PRANK_KEYWORDS)
        has_contradict = any(c in text_lower for c in CONTRADICTORY_PHRASES)

        if has_hoax or has_contradict:
            score -= 55.0
            flags.append("Contains suspicious or prank keywords")
        else:
            flags.append("Text passes linguistic authenticity check")

        # 2. Check location verifiability
        if location_name and location_name.lower() != "unknown":
            score += 10.0
            flags.append(f"Specific location verified ({location_name})")
        else:
            score -= 10.0
            flags.append("Missing specific geographic location")

        # 3. Check contact phone number
        if phone_number:
            score += 10.0
            flags.append("Emergency contact phone number provided")
        else:
            score -= 5.0
            flags.append("No callback phone number provided")

        # 4. Check victim count sanity
        if victim_count > 500:
            score -= 20.0
            flags.append("Unusual or unverified victim count")
        else:
            flags.append(f"Realistic victim count ({victim_count} people)")

        # 5. Check duplicate / spam flooding
        if is_duplicate:
            score -= 15.0
            flags.append("Duplicate report detected")

        # 6. Non-emergency filter
        if not is_emergency:
            score -= 25.0
            flags.append("Non-emergency informational message")

        final_score = max(5.0, min(99.0, round(score, 1)))

        if final_score >= 80:
            status = "Verified Genuine"
            is_real = True
        elif final_score >= 50:
            status = "Needs Verification"
            is_real = True
        else:
            status = "Suspected Fake"
            is_real = False

        return {
            "is_real": is_real,
            "authenticity_score": final_score,
            "authenticity_status": status,
            "verification_flags": flags
        }

authenticity_detector = AuthenticityDetector()
