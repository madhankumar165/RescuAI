import os
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Disaster Help Request & Resource-Need Detection System"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Security & Auth
    SECRET_KEY: str = "disaster_help_super_secret_jwt_key_2026_capstone_project"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Database
    DATABASE_URL: str = "sqlite:///./disaster_help.db"
    
    # NLP & ML
    MODEL_DIR: str = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ml_artifacts")
    SIMILARITY_THRESHOLD: float = 0.75
    
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
