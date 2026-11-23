from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional, Dict, Any
from datetime import datetime

# --- Auth Schemas ---
class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: Optional[str] = "responder"

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    is_active: bool
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# --- NLP & Preprocess Schemas ---
class PreprocessRequest(BaseModel):
    text: str

class PreprocessResponse(BaseModel):
    original_text: str
    cleaned_text: str
    language: str
    tokens: List[str]
    lemmas: List[str]
    removed_stopwords: List[str]
    removed_emojis: List[str]
    removed_urls: List[str]

# --- Message & Prediction Schemas ---
class PredictRequest(BaseModel):
    text: str

class ResourceNeedSchema(BaseModel):
    resource_name: str
    urgency_level: str = "High"

    model_config = ConfigDict(from_attributes=True)

class PredictionResult(BaseModel):
    original_text: str
    cleaned_text: str
    is_emergency: bool
    disaster_type: str
    resources_needed: List[str]
    priority_level: str
    severity_score: float
    location_name: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    victim_count: int = 1
    phone_number: Optional[str] = None
    organization: Optional[str] = None
    vulnerable_groups: List[str] = []
    confidence_score: float
    explanation: str
    is_duplicate: bool = False
    duplicate_of_id: Optional[int] = None
    is_real: bool = True
    authenticity_score: float = 90.0
    authenticity_status: str = "Verified Genuine"
    verification_flags: Optional[List[str]] = None

class MessageCreate(BaseModel):
    text: str

class MessageUpdateStatus(BaseModel):
    status: str  # Pending, Assigned, In Progress, Resolved
    assigned_to: Optional[str] = None

class MessageResponse(BaseModel):
    id: int
    original_text: str
    cleaned_text: Optional[str]
    language: str
    is_emergency: bool
    disaster_type: str
    priority_level: str
    severity_score: float
    is_real: bool = True
    authenticity_score: float = 90.0
    authenticity_status: str = "Verified Genuine"
    verification_flags: Optional[List[str]] = None
    location_name: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]
    victim_count: int
    phone_number: Optional[str]
    organization: Optional[str]
    contains_children: bool
    contains_women: bool
    contains_elderly: bool
    contains_disabled: bool
    status: str
    assigned_to: Optional[str]
    confidence_score: float
    explanation: Optional[str]
    is_duplicate: bool
    duplicate_of_id: Optional[int]
    created_at: datetime
    resources: List[ResourceNeedSchema] = []

    model_config = ConfigDict(from_attributes=True)

# --- Dashboard & Analytics Schemas ---
class DashboardStats(BaseModel):
    total_requests: int
    critical_requests: int
    high_requests: int
    medium_requests: int
    low_requests: int
    resolved_requests: int
    pending_requests: int
    in_progress_requests: int
    total_victims_impacted: int
    disaster_breakdown: Dict[str, int]
    resource_demands: Dict[str, int]
    priority_breakdown: Dict[str, int]
    status_breakdown: Dict[str, int]

class TimelinePoint(BaseModel):
    date: str
    critical: int
    high: int
    medium: int
    low: int
    total: int

# --- AI Chat Assistant Schemas ---
class ChatRequest(BaseModel):
    prompt: str

class ChatResponse(BaseModel):
    answer: str
    sql_intent: Optional[str] = None
    data: Optional[List[Dict[str, Any]]] = None
    total_matches: int = 0
