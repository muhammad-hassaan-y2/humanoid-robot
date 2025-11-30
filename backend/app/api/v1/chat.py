from fastapi import APIRouter, HTTPException, Depends
import uuid
from typing import List
from app.models.schemas import (
    ChatRequest,
    ChatResponse,
    ConversationHistory
)
from app.services.embedding_service import embedding_service
from app.core.database import Database
from app.core.vector_db import VectorDatabase
from app.core.config import settings
import json

router = APIRouter()


@router.post("/ask", response_model=ChatResponse)
async def chat_with_documents(request: ChatRequest):
    """Chat with the document collection using RAG"""
    try:
        # Generate session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())

        # Embed the user query
        query_embedding = await embedding_service.embed_text(request.message)

        # Search for relevant documents
        context_docs = await VectorDatabase.search_documents(
            query_embedding=query_embedding,
            limit=request.max_context_docs,
            score_threshold=settings.SIMILARITY_THRESHOLD
        )

        # Generate response using context
        if context_docs:
            response = await embedding_service.generate_response_with_context(
                query=request.message,
                context_docs=context_docs
            )
        else:
            response = "I couldn't find relevant information in the documents to answer your question. Please try rephrasing or ask about topics covered in the documentation."

        # Prepare sources list
        sources = [doc['source'] for doc in context_docs]

        # Save conversation to database
        await save_conversation(
            session_id=session_id,
            user_message=request.message,
            bot_response=response,
            context_used=sources
        )

        return ChatResponse(
            response=response,
            session_id=session_id,
            context_used=context_docs,
            sources=sources
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing chat request: {str(e)}"
        )


@router.get("/history/{session_id}")
async def get_chat_history(session_id: str):
    """Get chat history for a session"""
    try:
        pool = Database.pool
        if not pool:
            raise HTTPException(
                status_code=500,
                detail="Database not initialized"
            )

        async with pool.acquire() as conn:
            rows = await conn.fetch(
                """
                SELECT id, session_id, user_message, bot_response, context_used, created_at
                FROM conversations
                WHERE session_id = $1
                ORDER BY created_at ASC
                """,
                session_id
            )

            history = [
                ConversationHistory(
                    id=row['id'],
                    session_id=row['session_id'],
                    user_message=row['user_message'],
                    bot_response=row['bot_response'],
                    context_used=row['context_used'] if row['context_used'] else [],
                    created_at=row['created_at']
                )
                for row in rows
            ]

            return {"session_id": session_id, "history": history}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error retrieving chat history: {str(e)}"
        )


@router.delete("/sessions/{session_id}")
async def delete_chat_session(session_id: str):
    """Delete a chat session and its history"""
    try:
        pool = Database.pool
        if not pool:
            raise HTTPException(
                status_code=500,
                detail="Database not initialized"
            )

        async with pool.acquire() as conn:
            result = await conn.execute(
                "DELETE FROM conversations WHERE session_id = $1",
                session_id
            )

            return {
                "message": f"Session {session_id} deleted successfully",
                "affected_rows": int(result.split()[-1])
            }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error deleting chat session: {str(e)}"
        )


async def save_conversation(
    session_id: str,
    user_message: str,
    bot_response: str,
    context_used: List[str]
):
    """Save conversation to database"""
    pool = Database.pool
    if not pool:
        return False

    try:
        async with pool.acquire() as conn:
            await conn.execute(
                """
                INSERT INTO conversations (session_id, user_message, bot_response, context_used)
                VALUES ($1, $2, $3, $4)
                """,
                session_id,
                user_message,
                bot_response,
                context_used
            )
            return True
    except Exception as e:
        print(f"Error saving conversation: {e}")
        return False