import os
import sys
import random
from datetime import datetime, timedelta, timezone

# Add backend root to path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database import engine, SessionLocal, Base
from app.models.schema import User, Message, ResourceNeed, DisasterCategory
from app.auth.security import get_password_hash
from app.nlp.preprocessor import preprocessor
from app.nlp.entity_extractor import entity_extractor
from app.ml.classifier import ml_classifier, DISASTER_TYPES, RESOURCE_TYPES
from app.ml.priority_engine import priority_engine

LOCATIONS = [
    ("Houston, TX", 29.7604, -95.3698),
    ("Miami, FL", 25.7617, -80.1918),
    ("New Orleans, LA", 29.9511, -90.0715),
    ("San Francisco, CA", 37.7749, -122.4194),
    ("Tokyo, Japan", 35.6762, 139.6503),
    ("Jakarta, Indonesia", -6.2088, 106.8456),
    ("Manila, Philippines", 14.5995, 120.9842),
    ("Port-au-Prince, Haiti", 18.5944, -72.3074),
    ("Chennai, India", 13.0827, 80.2707),
    ("Mumbai, India", 19.0760, 72.8777),
    ("Kerala, India", 10.8505, 76.2711),
    ("Valencia, Spain", 39.4699, -0.3763),
    ("Kathmandu, Nepal", 27.7172, 85.3240),
    ("San Juan, Puerto Rico", 18.4655, -66.1057),
    ("Istanbul, Turkey", 41.0082, 28.9784),
    ("Sydney, Australia", -33.8688, 151.2093),
    ("Los Angeles, CA", 34.0522, -118.2437),
    ("Seattle, WA", 47.6062, -122.3321),
    ("Dallas, TX", 32.7767, -96.7970),
    ("Orlando, FL", 28.5383, -81.3792)
]

MESSAGE_TEMPLATES = {
    "Flood": [
        "Urgent! Water levels rising fast in {loc}. {victims} family members trapped on roof without drinking water or food. Call {phone}!",
        "Severe flooding in {loc}. Need rescue boat and medical aid immediately for {victims} people including elderly.",
        "Flash flood inundated our house in {loc}. We need clean water, blankets, and emergency shelter."
    ],
    "Earthquake": [
        "Major earthquake tremor in {loc}! {victims} people trapped in building debris. Send rescue team and medical aid now!",
        "Cracks in walls and structural collapse near {loc}. We desperately need doctors, bandages, and medicine for injured victims.",
        "Ground shaking caused heavy rubble in {loc}. {victims} children trapped under concrete. Urgent SOS!"
    ],
    "Cyclone": [
        "Category 4 hurricane winds destroying roofs in {loc}. Need tarps, emergency shelter, and dry clothes for {victims} victims.",
        "Storm surge flooding coastal area in {loc}. Power is out, we need food rations, clean water, and flashlight batteries.",
        "Gale force winds hit {loc}. Several trees downed, {victims} people stranded needing evacuation boat and rescue team."
    ],
    "Fire": [
        "Wildfire spreading near {loc}! Dense smoke filling homes. We need firefighter assistance, burn ointment, and oxygen masks.",
        "Massive building fire in {loc}. {victims} people trapped on 3rd floor. Please send fire brigade and ambulance!",
        "Home engulfed in flames in {loc}. Lost everything, need clothes, food, and temporary shelter."
    ],
    "Landslide": [
        "Massive mudslide blocked the main road near {loc}. {victims} cars crushed under mud and rock debris.",
        "Hillside collapsed onto houses in {loc}. Heavy excavation equipment and rescue teams urgently needed for {victims} trapped.",
        "Debris flow trapped families in {loc}. Need medical aid, water, and rescue squad immediately."
    ],
    "Tsunami": [
        "Giant ocean wave warning issued for coast near {loc}! People fleeing to high ground. Need emergency shelter and water.",
        "Tsunami surge inundated lower village in {loc}. {victims} displaced families needing blankets and medical attention.",
        "Coastal seawall destroyed in {loc}. High urgency for rescue teams and clean drinking water."
    ],
    "Building Collapse": [
        "Multi-story apartment collapsed in {loc}! Hear cries under rubble, {victims} victims trapped inside.",
        "Structural failure in commercial block near {loc}. Need heavy crane, search dogs, and paramedics urgently.",
        "Balcony caved in near {loc}. 3 injured people require ambulance and medical aid immediately."
    ],
    "Road Accident": [
        "Severe multi-vehicle highway crash on route near {loc}. {victims} people injured, need immediate ambulance and medical aid.",
        "Overturned tanker truck blocked expressway near {loc}. Paramedics needed for injured driver.",
        "Bus collision near {loc}. Passengers trapped inside, need heavy cutters and emergency medical team."
    ]
}

def generate_synthetic_dataset(num_samples: int = 10000):
    print(f"Generating {num_samples} synthetic disaster messages for ML model training...")
    texts = []
    emergencies = []
    disasters = []
    resources_matrix = {r: [] for r in RESOURCE_TYPES}

    for i in range(num_samples):
        is_emg = 1 if random.random() < 0.85 else 0
        d_type = random.choice(DISASTER_TYPES)
        template = random.choice(MESSAGE_TEMPLATES[d_type])
        loc_name, lat, lng = random.choice(LOCATIONS)
        victims = random.randint(1, 12)
        phone = f"555-{random.randint(100,999):03d}-{random.randint(1000,9999):04d}"

        txt = template.format(loc=loc_name.split(',')[0], victims=victims, phone=phone)
        
        req_resources = []
        if "water" in txt.lower() or random.random() < 0.4:
            req_resources.append("Water")
        if "food" in txt.lower() or "rations" in txt.lower() or random.random() < 0.35:
            req_resources.append("Food")
        if "medical" in txt.lower() or "doctor" in txt.lower() or "injured" in txt.lower() or random.random() < 0.45:
            req_resources.append("Medical Aid")
        if "rescue" in txt.lower() or "trapped" in txt.lower() or random.random() < 0.5:
            req_resources.append("Rescue Team")
        if "shelter" in txt.lower() or "tarp" in txt.lower() or random.random() < 0.3:
            req_resources.append("Shelter")
        if "medicine" in txt.lower() or "ointment" in txt.lower() or random.random() < 0.25:
            req_resources.append("Medicine")
        if "blanket" in txt.lower() or random.random() < 0.2:
            req_resources.append("Blankets")
        if "clothes" in txt.lower() or random.random() < 0.2:
            req_resources.append("Clothes")

        texts.append(txt)
        emergencies.append(is_emg)
        disasters.append(d_type)

        for r_name in RESOURCE_TYPES:
            resources_matrix[r_name].append(1 if r_name in req_resources else 0)

    return texts, emergencies, disasters, resources_matrix

def main():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    # 1. Train ML Classifier
    texts, emergencies, disasters, resources_matrix = generate_synthetic_dataset(10000)
    print("Fitting TF-IDF Vectorizer & ML Classifiers...")
    ml_classifier.train_on_dataset(texts, emergencies, disasters, resources_matrix)
    print("ML Models successfully trained and artifacts saved!")

    # 2. Seed Default Users
    if not db.query(User).filter(User.email == "admin@disasterhelp.gov").first():
        admin = User(
            email="admin@disasterhelp.gov",
            full_name="Chief Response Officer",
            hashed_password=get_password_hash("admin123"),
            role="admin"
        )
        responder = User(
            email="responder@disasterhelp.gov",
            full_name="Field Operations Lead",
            hashed_password=get_password_hash("responder123"),
            role="responder"
        )
        db.add_all([admin, responder])
        db.commit()
        print("Default users seeded: admin@disasterhelp.gov / admin123")

    # Clear old messages to re-seed with diverse realistic coordinates & severity distribution
    db.query(ResourceNeed).delete()
    db.query(Message).delete()
    db.commit()

    print("Seeding database with 70 realistic incidents across global regions...")
    statuses = ["Pending", "Assigned", "In Progress", "Resolved"]
    
    sample_prompts = [
        "CRITICAL! Massive flood water rising in Houston TX near Main St. 4 elderly people trapped inside bungalow without drinking water and insulin. Call 555-0199!",
        "Earthquake tremor damaged multi-story building in San Francisco CA. 6 family members stuck under concrete rubble, need rescue team and paramedics!",
        "Hurricane storm surge flooded coastal homes in Miami FL. Need evacuation boat, clean water, and dry clothes for 8 victims including 2 babies.",
        "Wildfire broke out in Los Angeles hills. Smoke inhalation hazard, urgent need for medical aid and temporary shelter for 5 residents.",
        "Landslide on hillside near Seattle WA blocked road. 3 vehicles trapped under mud. Need heavy cutters and rescue squad.",
        "Building collapse reported in New Orleans LA after storm. 2 people trapped under brick wall, need immediate medical attention.",
        "Tsunami alert near San Juan coast. 10 displaced families at community hall need clean water, food rations, and blankets.",
        "Severe multi-car highway accident near Dallas TX. 3 passengers injured, ambulance and emergency rescue needed urgently.",
        "Flash flood in Kerala near river bank. Family of 5 trapped on roof needing immediate boat rescue and drinking water.",
        "Structural collapse in apartment block in Kathmandu Nepal. Hear cries under rubble, 4 victims trapped inside.",
        "Cyclone winds blew roof off shelter in Manila Philippines. 12 displaced victims needing dry clothes, medicine, and food.",
        "Wildfire spreading near Valencia Spain. Dense smoke filling homes, urgent burn ointment and firefighter assistance needed."
    ]

    now = datetime.now(timezone.utc)
    for i in range(70):
        d_type = random.choice(DISASTER_TYPES)
        loc_name, lat, lng = random.choice(LOCATIONS)
        base_prompt = random.choice(sample_prompts)
        
        # NLP & Entity
        nlp_res = preprocessor.preprocess_full(base_prompt)
        entities = entity_extractor.extract_all(base_prompt)
        ml_res = ml_classifier.predict(base_prompt)
        
        # Priority & Severity Engine calculation
        sev, prio = priority_engine.calculate_severity_score(
            d_type, ml_res["resources_needed"], entities["victim_count"], entities["vulnerable_groups"], True
        )

        # Force a diverse spread of severity scores across Critical, High, Medium, Low for realistic map rendering
        rand_val = random.random()
        if rand_val < 0.3:
            sev = round(random.uniform(75.0, 98.0), 1)
            prio = "Critical"
        elif rand_val < 0.6:
            sev = round(random.uniform(50.0, 74.0), 1)
            prio = "High"
        elif rand_val < 0.85:
            sev = round(random.uniform(30.0, 49.0), 1)
            prio = "Medium"
        else:
            sev = round(random.uniform(15.0, 29.0), 1)
            prio = "Low"

        created_time = now - timedelta(hours=random.randint(1, 72), minutes=random.randint(0, 59))
        status_val = random.choice(statuses)

        # Realistic GPS offset so pins spread naturally around city zones
        offset_lat = random.uniform(-0.18, 0.18)
        offset_lng = random.uniform(-0.18, 0.18)

        msg = Message(
            original_text=base_prompt,
            cleaned_text=nlp_res["cleaned_text"],
            language="en",
            is_emergency=True,
            disaster_type=d_type,
            priority_level=prio,
            severity_score=sev,
            location_name=loc_name,
            latitude=round(lat + offset_lat, 4),
            longitude=round(lng + offset_lng, 4),
            victim_count=random.randint(1, 10),
            contains_children=random.choice([True, False]),
            contains_women=random.choice([True, False]),
            contains_elderly=random.choice([True, False]),
            contains_disabled=random.choice([True, False]),
            status=status_val,
            assigned_to="Field Response Unit Alpha" if status_val != "Pending" else None,
            confidence_score=round(random.uniform(0.85, 0.98), 2),
            explanation=ml_res["explanation"],
            created_at=created_time
        )
        db.add(msg)
        db.flush()

        for r_name in ml_res["resources_needed"]:
            rn = ResourceNeed(message_id=msg.id, resource_name=r_name, urgency_level="High")
            db.add(rn)

    db.commit()
    db.close()
    print("Re-seeded database with 70 incidents with realistic GPS coordinates and severity scores!")

if __name__ == "__main__":
    main()
