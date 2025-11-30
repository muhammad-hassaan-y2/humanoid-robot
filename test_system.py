#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Simple test script to verify RAG chatbot system components
"""

import asyncio
import httpx
import json
import os
from pathlib import Path

# Test configuration
BACKEND_URL = "http://localhost:8000"
FRONTEND_URL = "http://localhost:3000"

async def test_backend():
    """Test backend API endpoints"""
    print("Testing Backend API...")

    async with httpx.AsyncClient() as client:
        try:
            # Test health endpoint
            print("\n1. Testing health endpoint...")
            response = await client.get(f"{BACKEND_URL}/health")
            if response.status_code == 200:
                health = response.json()
                print(f"   Backend is healthy: {health['status']}")
            else:
                print(f"   Health check failed: {response.status_code}")

            # Test document processing
            print("\n2. Testing document processing...")
            response = await client.post(f"{BACKEND_URL}/api/v1/documents/process")
            if response.status_code == 200:
                result = response.json()
                print(f"   Documents processed: {result['processed']} chunks")
                if result['errors']:
                    print(f"   Errors: {len(result['errors'])}")
            else:
                print(f"   Document processing failed: {response.status_code}")

            # Test document status
            print("\n3. Testing document status...")
            response = await client.get(f"{BACKEND_URL}/api/v1/documents/status")
            if response.status_code == 200:
                status = response.json()
                print(f"   Documents stored: {status['document_files_processed']}")
                print(f"   Vector embeddings: {status['vector_embeddings_stored']}")
            else:
                print(f"   Status check failed: {response.status_code}")

            # Test chat endpoint
            print("\n4. Testing chat endpoint...")
            test_question = "What is this book about?"
            chat_data = {
                "message": test_question,
                "session_id": "test-session-123",
                "max_context_docs": 3
            }

            response = await client.post(
                f"{BACKEND_URL}/api/v1/chat/ask",
                json=chat_data
            )

            if response.status_code == 200:
                chat_response = response.json()
                print(f"   Chat response received")
                print(f"   Response: {chat_response['response'][:100]}...")
                print(f"   Sources: {len(chat_response['sources'])}")
            else:
                print(f"   Chat request failed: {response.status_code}")
                print(f"   Error: {response.text}")

        except httpx.ConnectError:
            print("   Cannot connect to backend. Is it running?")
        except Exception as e:
            print(f"   Unexpected error: {e}")

def test_file_structure():
    """Test if required files exist"""
    print("\nChecking File Structure...")

    required_files = [
        "backend/app/main.py",
        "backend/app/core/config.py",
        "backend/app/core/database.py",
        "backend/app/core/vector_db.py",
        "backend/app/services/embedding_service.py",
        "backend/app/api/v1/chat.py",
        "backend/app/api/v1/documents.py",
        "backend/requirements.txt",
        "backend/.env.example",
        "my-book/src/components/ChatInterface/index.tsx",
        "my-book/src/pages/index.tsx",
        "my-book/src/css/custom.css",
        "my-book/docs/chapter-1.md",
        "RUN_SYSTEM.md"
    ]

    missing_files = []
    for file_path in required_files:
        if not Path(file_path).exists():
            missing_files.append(file_path)

    if missing_files:
        print(f"   Missing files: {missing_files}")
        return False
    else:
        print("   All required files present")
        return True

def check_environment():
    """Check environment setup"""
    print("\nChecking Environment...")

    # Check if backend .env exists
    if Path("backend/.env").exists():
        print("   Backend .env file exists")
    else:
        print("   Backend .env file missing - copy from .env.example")

    # Check docs directory
    docs_path = Path("my-book/docs")
    if docs_path.exists():
        md_files = list(docs_path.glob("*.md"))
        print(f"   Found {len(md_files)} markdown files in docs/")
    else:
        print("   docs directory not found")

    # Check if node_modules exists
    if Path("my-book/node_modules").exists():
        print("   Frontend dependencies installed")
    else:
        print("   Frontend dependencies not installed - run 'npm install'")

def print_next_steps():
    """Print next steps for user"""
    print("\nNext Steps:")
    print("1. Setup environment variables in 'backend/.env'")
    print("2. Start backend: cd backend && python -m app.main")
    print("3. Process documents: curl -X POST http://localhost:8000/api/v1/documents/process")
    print("4. Start frontend: cd my-book && npm start")
    print("5. Open browser to http://localhost:3000")
    print("6. Click Chat to test AI assistant")
    print("7. Click Docs to browse documentation")
    print("\nFor detailed setup, see RUN_SYSTEM.md")

async def main():
    """Run all tests"""
    print("RAG Chatbot System Test")
    print("=" * 50)

    # Check file structure
    if not test_file_structure():
        return

    # Check environment
    check_environment()

    # Test backend
    await test_backend()

    print("\nTest completed!")
    print("For complete setup instructions, see RUN_SYSTEM.md")

if __name__ == "__main__":
    asyncio.run(main())