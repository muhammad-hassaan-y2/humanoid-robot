from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from typing import List, Optional
import os
import hashlib
import aiofiles
from app.models.schemas import DocumentProcessResponse
from app.services.embedding_service import embedding_service
from app.core.database import Database
from app.core.vector_db import VectorDatabase
from app.core.config import settings

router = APIRouter()


@router.post("/process", response_model=DocumentProcessResponse)
async def process_documents():
    """Process all markdown documents and add to vector database"""
    try:
        # Process markdown files from the book directory
        documents = await embedding_service.process_markdown_files(
            settings.DOCS_PATH
        )

        if not documents:
            return DocumentProcessResponse(
                processed=0,
                errors=["No documents found to process"],
                message="No documents found in the specified path"
            )

        # Generate embeddings for all documents
        texts = [doc['content'] for doc in documents]
        embeddings = await embedding_service.embed_texts(texts)

        # Add embeddings to documents
        for i, doc in enumerate(documents):
            doc['embedding'] = embeddings[i]

        # Add documents to vector database
        success = await VectorDatabase.add_documents(documents)

        # Save document records to database
        saved_count = 0
        errors = []

        for doc in documents:
            try:
                content_hash = hashlib.md5(
                    doc['content'].encode('utf-8')
                ).hexdigest()

                pool = Database.pool
                if pool:
                    async with pool.acquire() as conn:
                        await conn.execute(
                            """
                            INSERT INTO documents (filename, file_path, content_hash)
                            VALUES ($1, $2, $3)
                            ON CONFLICT (content_hash) DO NOTHING
                            """,
                            doc['metadata']['filename'],
                            doc['metadata']['file_path'],
                            content_hash
                        )
                        saved_count += 1

            except Exception as e:
                errors.append(f"Error saving {doc['metadata']['filename']}: {str(e)}")

        return DocumentProcessResponse(
            processed=len(documents),
            errors=errors,
            message=f"Successfully processed {len(documents)} document chunks. {saved_count} new entries saved."
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing documents: {str(e)}"
        )


@router.get("/status")
async def get_document_status():
    """Get the status of processed documents"""
    try:
        pool = Database.pool
        if not pool:
            raise HTTPException(
                status_code=500,
                detail="Database not initialized"
            )

        async with pool.acquire() as conn:
            # Get document count
            doc_count = await conn.fetchval(
                "SELECT COUNT(*) FROM documents"
            )

            # Get vector database info
            vector_count = 0
            try:
                collection_info = VectorDatabase.client.get_collection(
                    VectorDatabase.collection_name
                )
                vector_count = collection_info.points_count
            except:
                pass  # Collection might not exist

            return {
                "document_files_processed": doc_count,
                "vector_embeddings_stored": vector_count,
                "docs_path": settings.DOCS_PATH,
                "embedding_model": settings.EMBEDDING_MODEL
            }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting document status: {str(e)}"
        )


@router.delete("/clear")
async def clear_all_documents():
    """Clear all processed documents and embeddings"""
    try:
        # Clear vector database
        vector_success = await VectorDatabase.delete_documents({})

        # Clear regular database
        pool = Database.pool
        db_success = False
        if pool:
            async with pool.acquire() as conn:
                result = await conn.execute("DELETE FROM documents")
                db_success = True

        return {
            "message": "Documents cleared successfully",
            "vector_database_cleared": vector_success,
            "database_cleared": db_success
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error clearing documents: {str(e)}"
        )


@router.get("/search")
async def search_documents(
    query: str,
    limit: int = 5,
    threshold: float = 0.5
):
    """Search for documents using semantic search"""
    try:
        # Embed the query
        query_embedding = await embedding_service.embed_text(query)

        # Search in vector database
        results = await VectorDatabase.search_documents(
            query_embedding=query_embedding,
            limit=limit,
            score_threshold=threshold
        )

        return {
            "query": query,
            "results": results,
            "total_found": len(results)
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error searching documents: {str(e)}"
        )