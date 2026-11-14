import os
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseModel):
    APP_NAME: str = "Eureka Enterprise Intelligence Platform"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "info")
    DEBUG: bool = os.getenv("DEBUG", "true").lower() == "true"
    PORT: int = int(os.getenv("PORT", "8000"))
    
    # Active Organization
    ACTIVE_ORG_ID: str = os.getenv("ACTIVE_ORG_ID", "org_tangentia_global")
    ACTIVE_ORG_NAME: str = os.getenv("ACTIVE_ORG_NAME", "Tangentia Inc.")
    ACTIVE_ORG_DOMAIN: str = os.getenv("ACTIVE_ORG_DOMAIN", "tangentia.com")
    
    # API & CORS
    API_V1_PREFIX: str = "/api/v1"
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "*"
    ]
    
    # Gemini API
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-1.5-pro")

settings = Settings()
