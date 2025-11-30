from pydantic_settings import BaseSettings
from typing import List
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    # App Configuration
    APP_NAME: str = "RAG Chatbot"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = False

    # Database Configuration
    NEON_DATABASE_URL: str = ""

    # Vector Database Configuration
    QDRANT_URL: str = ""
    QDRANT_API_KEY: str = ""

    # Google AI Configuration
    GOOGLE_API_KEY: str = ""

    # Document Processing
    DOCS_PATH: str = "../my-book/docs"
    EMBEDDING_MODEL: str = "sentence-transformers/all-MiniLM-L6-v2"

    # CORS Configuration
    ALLOWED_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:5173"]

    # Chat Configuration
    MAX_CONTEXT_LENGTH: int = 4000
    SIMILARITY_THRESHOLD: float = 0.7
    MAX_RETRIEVED_DOCS: int = 5

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()