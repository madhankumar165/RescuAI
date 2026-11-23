from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey, Text, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.database import Base

def utc_now():
    return datetime.now(timezone.utc)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), default="responder")  # admin, responder, viewer
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=utc_now)

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    original_text = Column(Text, nullable=False)
    cleaned_text = Column(Text, nullable=True)
    language = Column(String(10), default="en")
    
    # Intent & Classification
    is_emergency = Column(Boolean, default=True, index=True)
    disaster_type = Column(String(100), default="Unknown", index=True)
    priority_level = Column(String(20), default="Medium", index=True)  # Critical, High, Medium, Low
    severity_score = Column(Float, default=50.0)  # 0.0 to 100.0
    
    # Authenticity & Fake Request Detection
    is_real = Column(Boolean, default=True, index=True)
    authenticity_score = Column(Float, default=90.0)  # 0.0 to 100.0
    authenticity_status = Column(String(50), default="Verified Genuine")  # Verified Genuine, Needs Verification, Suspected Fake
    verification_flags = Column(JSON, nullable=True)
    
    # Entity Extraction
    location_name = Column(String(255), nullable=True, index=True)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    victim_count = Column(Integer, default=1)
    phone_number = Column(String(50), nullable=True)
    organization = Column(String(255), nullable=True)
    
    # Vulnerable Groups
    contains_children = Column(Boolean, default=False)
    contains_women = Column(Boolean, default=False)
    contains_elderly = Column(Boolean, default=False)
    contains_disabled = Column(Boolean, default=False)
    
    # Lifecycle Status
    status = Column(String(50), default="Pending", index=True)  # Pending, Assigned, In Progress, Resolved
    assigned_to = Column(String(255), nullable=True)
    
    # AI Explanation & Metrics
    confidence_score = Column(Float, default=0.85)
    explanation = Column(Text, nullable=True)
    
    # Duplicate Detection
    is_duplicate = Column(Boolean, default=False, index=True)
    duplicate_of_id = Column(Integer, ForeignKey("messages.id"), nullable=True)
    
    created_at = Column(DateTime, default=utc_now, index=True)
    updated_at = Column(DateTime, default=utc_now, onupdate=utc_now)

    # Relationships
    resources = relationship("ResourceNeed", back_populates="message", cascade="all, delete-orphan")
    prediction_logs = relationship("PredictionLog", back_populates="message", cascade="all, delete-orphan")


class ResourceNeed(Base):
    __tablename__ = "resource_needs"

    id = Column(Integer, primary_key=True, index=True)
    message_id = Column(Integer, ForeignKey("messages.id"), nullable=False)
    resource_name = Column(String(100), nullable=False, index=True)
    urgency_level = Column(String(20), default="High")
    quantity_estimate = Column(String(50), nullable=True)

    message = relationship("Message", back_populates="resources")


class PredictionLog(Base):
    __tablename__ = "prediction_logs"

    id = Column(Integer, primary_key=True, index=True)
    message_id = Column(Integer, ForeignKey("messages.id"), nullable=True)
    raw_input = Column(Text, nullable=False)
    model_version = Column(String(50), default="v1.0-tfidf-rf")
    execution_time_ms = Column(Float, default=0.0)
    features_detected = Column(JSON, nullable=True)
    created_at = Column(DateTime, default=utc_now)

    message = relationship("Message", back_populates="prediction_logs")


class DisasterCategory(Base):
    __tablename__ = "disaster_categories"

    id = Column(Integer, primary_key=True, index=True)
    code = Column(String(50), unique=True, index=True, nullable=False)
    title = Column(String(100), nullable=False)
    description = Column(Text, nullable=True)
    icon = Column(String(50), default="AlertTriangle")


class AnalyticsSnapshot(Base):
    __tablename__ = "analytics_snapshots"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=utc_now, index=True)
    total_requests = Column(Integer, default=0)
    critical_count = Column(Integer, default=0)
    high_count = Column(Integer, default=0)
    medium_count = Column(Integer, default=0)
    low_count = Column(Integer, default=0)
    pending_count = Column(Integer, default=0)
    assigned_count = Column(Integer, default=0)
    in_progress_count = Column(Integer, default=0)
    resolved_count = Column(Integer, default=0)
