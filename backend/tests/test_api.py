import sys
import os
import pytest
from fastapi.testclient import TestClient

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "online"

def test_nlp_preprocess():
    payload = {"text": "Urgent! Flood waters rising in Houston 🆘 🌊 https://emergency.org"}
    response = client.post("/api/v1/nlp/preprocess", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "flood" in data["cleaned_text"].lower()
    assert "houston" in data["cleaned_text"].lower()
    assert len(data["removed_urls"]) > 0

def test_predict_single_message():
    payload = {"text": "SOS! Earthquake in San Francisco. 4 people trapped under building debris without drinking water!"}
    response = client.post("/api/v1/predict", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_emergency"] is True
    assert data["disaster_type"] in ["Earthquake", "Building Collapse"]
    assert data["priority_level"] in ["Critical", "High"]
    assert data["victim_count"] == 4
    assert "San Francisco" in data["location_name"]

def test_dashboard_stats():
    response = client.get("/api/v1/dashboard/stats")
    assert response.status_code == 200
    data = response.json()
    assert "total_requests" in data
    assert "priority_breakdown" in data

def test_model_evaluation():
    response = client.get("/api/v1/evaluation")
    assert response.status_code == 200
    data = response.json()
    assert "emergency_model" in data
    assert "disaster_model" in data

def test_ai_chat_assistant():
    payload = {"prompt": "Show critical flood cases"}
    response = client.post("/api/v1/chat", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "answer" in data
