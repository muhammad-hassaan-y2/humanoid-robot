import qdrant_client
from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct
from app.core.config import settings
import hashlib
import json
from typing import List, Dict, Any, Optional


class VectorDatabase:
    client: Optional[QdrantClient] = None
    collection_name = "documents"

    @classmethod
    async def init_vector_db(cls):
        """Initialize Qdrant client and create collection if needed"""
        if not cls.client:
            cls.client = QdrantClient(
                url=settings.QDRANT_URL,
                api_key=settings.QDRANT_API_KEY
            )

            # Create collection if it doesn't exist
            try:
                collections = cls.client.get_collections().collections
                collection_exists = any(
                    collection.name == cls.collection_name
                    for collection in collections
                )

                if not collection_exists:
                    cls.client.create_collection(
                        collection_name=cls.collection_name,
                        vectors_config=VectorParams(
                            size=384,  # Size for sentence-transformers embeddings
                            distance=Distance.COSINE
                        )
                    )
            except Exception as e:
                print(f"Error initializing vector database: {e}")

    @classmethod
    async def add_documents(cls, documents: List[Dict[str, Any]]):
        """Add documents to the vector database"""
        if not cls.client:
            await cls.init_vector_db()

        points = []
        for i, doc in enumerate(documents):
            # Create a unique ID based on content hash
            content_hash = hashlib.md5(
                doc['content'].encode('utf-8')
            ).hexdigest()

            points.append(PointStruct(
                id=content_hash,
                vector=doc['embedding'],
                payload={
                    'content': doc['content'],
                    'source': doc['source'],
                    'metadata': doc.get('metadata', {})
                }
            ))

        try:
            cls.client.upsert(
                collection_name=cls.collection_name,
                points=points
            )
            return True
        except Exception as e:
            print(f"Error adding documents to vector DB: {e}")
            return False

    @classmethod
    async def search_documents(
        cls,
        query_embedding: List[float],
        limit: int = 5,
        score_threshold: float = 0.5
    ) -> List[Dict[str, Any]]:
        """Search for similar documents"""
        if not cls.client:
            await cls.init_vector_db()

        try:
            search_result = cls.client.search(
                collection_name=cls.collection_name,
                query_vector=query_embedding,
                query_filter=None,
                limit=limit,
                score_threshold=score_threshold
            )

            results = []
            for result in search_result:
                results.append({
                    'content': result.payload['content'],
                    'source': result.payload['source'],
                    'metadata': result.payload.get('metadata', {}),
                    'score': result.score
                })

            return results
        except Exception as e:
            print(f"Error searching documents: {e}")
            return []

    @classmethod
    async def delete_documents(cls, document_filter: Dict[str, Any]):
        """Delete documents based on filter"""
        if not cls.client:
            await cls.init_vector_db()

        try:
            cls.client.delete(
                collection_name=cls.collection_name,
                points_selector=document_filter
            )
            return True
        except Exception as e:
            print(f"Error deleting documents: {e}")
            return False


async def init_vector_db():
    """Initialize the vector database"""
    await VectorDatabase.init_vector_db()