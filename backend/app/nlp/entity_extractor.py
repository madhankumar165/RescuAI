import re
from typing import Dict, List, Optional, Tuple, Any

# Geocoding lookup dictionary for common disaster hubs / locations with Lat/Lng
KNOWN_LOCATIONS = {
    # --- India Locations ---
    "delhi": (28.6139, 77.2090, "Delhi, India"),
    "new delhi": (28.6139, 77.2090, "New Delhi, India"),
    "mumbai": (19.0760, 72.8777, "Mumbai, India"),
    "bangalore": (12.9716, 77.5946, "Bangalore, India"),
    "bengaluru": (12.9716, 77.5946, "Bengaluru, India"),
    "chennai": (13.0827, 80.2707, "Chennai, India"),
    "kolkata": (22.5726, 88.3639, "Kolkata, India"),
    "hyderabad": (17.3850, 78.4867, "Hyderabad, India"),
    "kerala": (10.8505, 76.2711, "Kerala, India"),
    "wayanad": (11.6854, 76.1320, "Wayanad, Kerala, India"),
    "ahmedabad": (23.0225, 72.5714, "Ahmedabad, India"),
    "pune": (18.5204, 73.8567, "Pune, India"),
    "jaipur": (26.9124, 75.7873, "Jaipur, India"),
    "lucknow": (26.8467, 80.9462, "Lucknow, India"),
    "guwahati": (26.1445, 91.7362, "Guwahati, Assam, India"),
    "patna": (25.5941, 85.1376, "Patna, Bihar, India"),
    "bhubaneswar": (20.2961, 85.8245, "Bhubaneswar, Odisha, India"),
    "cuttack": (20.4625, 85.8828, "Cuttack, Odisha, India"),
    "visakhapatnam": (17.6868, 83.2185, "Visakhapatnam, India"),
    "dehradun": (30.3165, 78.0322, "Dehradun, Uttarakhand, India"),
    "kedarnath": (30.7346, 79.0669, "Kedarnath, Uttarakhand, India"),
    "srinagar": (34.0837, 74.7973, "Srinagar, J&K, India"),
    "bhopal": (23.2599, 77.4126, "Bhopal, India"),
    "goa": (15.2993, 74.1240, "Goa, India"),
    "shimla": (31.1048, 77.1734, "Shimla, Himachal, India"),
    "surat": (21.1702, 72.8311, "Surat, Gujarat, India"),

    # --- Global World Locations ---
    "houston": (29.7604, -95.3698, "Houston TX, USA"),
    "miami": (25.7617, -80.1918, "Miami FL, USA"),
    "new orleans": (29.9511, -90.0715, "New Orleans LA, USA"),
    "san francisco": (37.7749, -122.4194, "San Francisco CA, USA"),
    "los angeles": (34.0522, -118.2437, "Los Angeles CA, USA"),
    "new york": (40.7128, -74.0060, "New York NY, USA"),
    "london": (51.5074, -0.1278, "London, UK"),
    "paris": (48.8566, 2.3522, "Paris, France"),
    "berlin": (52.5200, 13.4050, "Berlin, Germany"),
    "rome": (41.9028, 12.4964, "Rome, Italy"),
    "tokyo": (35.6762, 139.6503, "Tokyo, Japan"),
    "osaka": (34.6937, 135.5023, "Osaka, Japan"),
    "beijing": (39.9042, 116.4074, "Beijing, China"),
    "shanghai": (31.2304, 121.4737, "Shanghai, China"),
    "seoul": (37.5665, 126.9780, "Seoul, South Korea"),
    "bangkok": (13.7563, 100.5018, "Bangkok, Thailand"),
    "jakarta": (-6.2088, 106.8456, "Jakarta, Indonesia"),
    "manila": (14.5995, 120.9842, "Manila, Philippines"),
    "sydney": (-33.8688, 151.2093, "Sydney, Australia"),
    "melbourne": (-37.8136, 144.9631, "Melbourne, Australia"),
    "auckland": (-36.8485, 174.7633, "Auckland, New Zealand"),
    "cairo": (30.0444, 31.2357, "Cairo, Egypt"),
    "nairobi": (-1.2921, 36.8219, "Nairobi, Kenya"),
    "cape town": (-33.9249, 18.4241, "Cape Town, South Africa"),
    "rio de janeiro": (-22.9068, -43.1729, "Rio de Janeiro, Brazil"),
    "buenos aires": (-34.6037, -58.3816, "Buenos Aires, Argentina"),
    "mexico city": (19.4326, -99.1332, "Mexico City, Mexico"),
    "toronto": (43.6532, -79.3832, "Toronto, Canada"),
    "vancouver": (49.2827, -123.1207, "Vancouver, Canada"),
    "kathmandu": (27.7172, 85.3240, "Kathmandu, Nepal"),
    "dhaka": (23.8103, 90.4125, "Dhaka, Bangladesh"),
    "colombo": (6.9271, 79.8612, "Colombo, Sri Lanka"),
    "dubai": (25.2048, 55.2708, "Dubai, UAE"),
    "istanbul": (41.0082, 28.9784, "Istanbul, Turkey"),
    "valencia": (39.4699, -0.3763, "Valencia, Spain"),
    "port-au-prince": (18.5944, -72.3074, "Port-au-Prince, Haiti"),
    "san juan": (18.4655, -66.1057, "San Juan, Puerto Rico"),
    "dakar": (14.7167, -17.4677, "Dakar, Senegal"),
    "santiago": (-33.4489, -70.6693, "Santiago, Chile"),
    "charleston": (32.7765, -79.9311, "Charleston SC, USA"),
    "tampa": (27.9506, -82.4572, "Tampa FL, USA"),
    "orlando": (28.5383, -81.3792, "Orlando FL, USA"),
    "dallas": (32.7767, -96.7970, "Dallas TX, USA"),
    "seattle": (47.6062, -122.3321, "Seattle WA, USA")
}

ORGANIZATIONS = [
    "red cross", "fema", "national guard", "coast guard", "unicef",
    "salvation army", "who", "local police", "fire department", "army",
    "ndrf", "sdrf", "disaster management authority", "state police", "emergency response"
]

NUMBER_WORDS = {
    "one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "seven": 7,
    "eight": 8, "nine": 9, "ten": 10, "eleven": 11, "twelve": 12, "twenty": 20,
    "thirty": 30, "fifty": 50, "hundred": 100
}

class EntityExtractor:
    def __init__(self):
        pass

    def extract_location(self, text: str) -> Tuple[Optional[str], Optional[float], Optional[float]]:
        text_lower = text.lower()
        for loc_key, (lat, lng, display_name) in KNOWN_LOCATIONS.items():
            if re.search(rf'\b{re.escape(loc_key)}\b', text_lower):
                return display_name, lat, lng
        
        # Regex search for "in <City>", "at <Location>", "near <Place>"
        match = re.search(r'\b(?:in|at|near|around|from|of)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)', text)
        if match:
            extracted_name = match.group(1)
            # Generate deterministic fallback coordinates based on hash
            loc_hash = abs(hash(extracted_name))
            lat = 20.0 + (loc_hash % 3000) / 100.0
            lng = -100.0 + ((loc_hash // 3000) % 6000) / 100.0
            return extracted_name, round(lat, 4), round(lng, 4)
        
        return "Unknown Region", 29.7604, -95.3698

    def extract_victim_count(self, text: str) -> int:
        text_lower = text.lower()
        
        # Digit followed by victims/people/trapped/injured/family
        match = re.search(r'\b(\d+)\s*(?:people|persons|victims|family|individuals|adults|children|kids|elderly|trapped|injured|dead)?\b', text_lower)
        if match:
            val = int(match.group(1))
            if 1 <= val <= 10000:
                return val
        
        # Word numbers
        for num_str, num_val in NUMBER_WORDS.items():
            if re.search(rf'\b{num_str}\s+(?:people|persons|victims|family|trapped|injured)\b', text_lower):
                return num_val
        
        if any(w in text_lower for w in ["family", "group", "several", "many", "multiple"]):
            return 4
        
        return 1

    def extract_vulnerable_groups(self, text: str) -> Dict[str, bool]:
        text_lower = text.lower()
        contains_children = any(w in text_lower for w in ["child", "children", "baby", "babies", "infant", "toddler", "kid", "kids", "son", "daughter"])
        contains_women = any(w in text_lower for w in ["woman", "women", "mother", "pregnant", "girl", "female", "wife"])
        contains_elderly = any(w in text_lower for w in ["elderly", "senior", "old man", "old woman", "grandma", "grandpa", "aged", "70", "80"])
        contains_disabled = any(w in text_lower for w in ["disabled", "handicapped", "wheelchair", "blind", "deaf", "bedridden", "paralyzed"])

        return {
            "contains_children": contains_children,
            "contains_women": contains_women,
            "contains_elderly": contains_elderly,
            "contains_disabled": contains_disabled
        }

    def extract_phone(self, text: str) -> Optional[str]:
        match = re.search(r'\b(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b', text)
        return match.group(0) if match else None

    def extract_organization(self, text: str) -> Optional[str]:
        text_lower = text.lower()
        for org in ORGANIZATIONS:
            if org in text_lower:
                return org.title()
        return None

    def extract_all(self, text: str) -> Dict[str, Any]:
        loc_name, lat, lng = self.extract_location(text)
        victims = self.extract_victim_count(text)
        groups = self.extract_vulnerable_groups(text)
        phone = self.extract_phone(text)
        org = self.extract_organization(text)

        return {
            "location_name": loc_name,
            "latitude": lat,
            "longitude": lng,
            "victim_count": victims,
            "vulnerable_groups": groups,
            "phone_number": phone,
            "organization": org
        }

entity_extractor = EntityExtractor()
