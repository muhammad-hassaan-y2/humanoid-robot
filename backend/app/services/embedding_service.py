import os
import aiofiles
import asyncio
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
from typing import List, Dict, Any
import hashlib
from bs4 import BeautifulSoup
import markdown
from app.core.config import settings


class EmbeddingService:
    def __init__(self):
        self.model = SentenceTransformer(settings.EMBEDDING_MODEL)

        # Initialize Google AI
        if settings.GOOGLE_API_KEY:
            genai.configure(api_key=settings.GOOGLE_API_KEY)
            self.gemini_model = genai.GenerativeModel('gemini-pro')
        else:
            self.gemini_model = None

    async def embed_text(self, text: str) -> List[float]:
        """Generate embedding for a single text"""
        embedding = self.model.encode(text, convert_to_numpy=True)
        return embedding.tolist()

    async def embed_texts(self, texts: List[str]) -> List[List[float]]:
        """Generate embeddings for multiple texts"""
        embeddings = self.model.encode(texts, convert_to_numpy=True)
        return [embedding.tolist() for embedding in embeddings]

    async def process_markdown_files(self, docs_path: str) -> List[Dict[str, Any]]:
        """Process all markdown files in the docs directory"""
        documents = []

        if not os.path.exists(docs_path):
            print(f"Docs path {docs_path} does not exist")
            return documents

        # Walk through all markdown files
        for root, dirs, files in os.walk(docs_path):
            for file in files:
                if file.endswith('.md'):
                    file_path = os.path.join(root, file)
                    try:
                        async with aiofiles.open(file_path, 'r', encoding='utf-8') as f:
                            content = await f.read()

                        # Parse markdown to HTML for better processing
                        html_content = markdown.markdown(content)
                        soup = BeautifulSoup(html_content, 'html.parser')

                        # Extract text content
                        clean_content = soup.get_text()

                        # Split into chunks
                        chunks = await self._split_text_into_chunks(clean_content)

                        for i, chunk in enumerate(chunks):
                            document = {
                                'content': chunk,
                                'source': f"{file_path}#chunk-{i}",
                                'metadata': {
                                    'filename': file,
                                    'file_path': file_path,
                                    'chunk_index': i,
                                    'total_chunks': len(chunks)
                                }
                            }
                            documents.append(document)

                    except Exception as e:
                        print(f"Error processing {file_path}: {e}")

        return documents

    async def _split_text_into_chunks(
        self,
        text: str,
        chunk_size: int = 500,
        overlap: int = 50
    ) -> List[str]:
        """Split text into overlapping chunks"""
        if len(text) <= chunk_size:
            return [text]

        chunks = []
        start = 0

        while start < len(text):
            end = start + chunk_size

            if end >= len(text):
                chunks.append(text[start:])
                break

            # Try to break at sentence boundary
            chunk = text[start:end]
            last_sentence_end = max(
                chunk.rfind('. '),
                chunk.rfind('! '),
                chunk.rfind('? ')
            )

            if last_sentence_end > chunk_size * 0.7:  # If we found a good sentence boundary
                end = start + last_sentence_end + 2
                chunks.append(text[start:end])
            else:
                chunks.append(chunk)

            start = end - overlap

        return [chunk.strip() for chunk in chunks if chunk.strip()]

    async def generate_response_with_context(
        self,
        query: str,
        context_docs: List[Dict[str, Any]]
    ) -> str:
        """Generate a response using Google Gemini with context"""
        if not self.gemini_model:
            return "Google AI is not configured. Please check your API key."

        # Prepare context
        context_text = "\n\n".join([
            f"Document: {doc['source']}\nContent: {doc['content']}"
            for doc in context_docs
        ])

        # Create prompt with context
        prompt = f"""
        You are a helpful AI assistant that answers questions based on the provided context.

        Context from the book/documentation:
        {context_text}

        User Question: {query}

        Please provide a helpful and accurate answer based on the context provided.
        If the context doesn't contain enough information to answer the question,
        please say so and suggest what additional information might be needed.
        """

        try:
            response = self.gemini_model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating response: {str(e)}"


# Global embedding service instance
embedding_service = EmbeddingService()