from pydantic import BaseModel
from typing import List, Dict, Any, Optional
from datetime import datetime


class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    max_context_docs: int = 5


class ChatResponse(BaseModel):
    response: str
    session_id: str
    context_used: List[Dict[str, Any]]
    sources: List[str]


class DocumentChunk(BaseModel):
    content: str
    source: str
    metadata: Dict[str, Any]


class DocumentProcessResponse(BaseModel):
    processed: int
    errors: List[str]
    message: str


class ConversationHistory(BaseModel):
    id: int
    session_id: str
    user_message: str
    bot_response: str
    context_used: List[str]
    created_at: datetime

    class Config:
        from_attributes = True


class HealthCheck(BaseModel):
    status: str
    service: str
    version: str
    timestamp: datetime = None