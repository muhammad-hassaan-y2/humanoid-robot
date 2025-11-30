# RAG Chatbot System - Complete Setup Guide

This guide will help you set up and run the complete RAG Chatbot system with document processing, vector search, and AI-powered chat.

## 🚀 Quick Start

### 1. Prerequisites

Ensure you have the following:

- **Node.js 18+** and **npm**
- **Python 3.9+** and **pip**
- **Google AI API Key** (for Gemini)
- **Qdrant Cloud Account** (free tier available)
- **Neon PostgreSQL Account** (free tier available)

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy and configure environment variables
cp .env.example .env
```

**Edit the `.env` file with your credentials:**

```env
# Get these from your respective services
NEON_DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/yourdb?sslmode=require
QDRANT_URL=https://xxxxx-us-east-2.aws.cloud.qdrant.io:6333
QDRANT_API_KEY=your-qdrant-api-key
GOOGLE_API_KEY=your-google-api-key

# You can leave these as defaults
APP_NAME=RAG Chatbot
APP_VERSION=1.0.0
DEBUG=True
ALLOWED_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

### 3. Start Backend Server

```bash
# From the backend directory
python -m app.main
```

The backend should start at `http://localhost:8000`

### 4. Process Documents

```bash
# In a new terminal, process the book documents
curl -X POST http://localhost:8000/api/v1/documents/process
```

### 5. Start Frontend

```bash
# Navigate to the frontend directory (my-book)
cd ../my-book

# Install dependencies (if not already done)
npm install

# Start the development server
npm start
```

The frontend should start at `http://localhost:3000` or `http://localhost:5173`

## 🔧 Testing the System

1. **Open your browser** and go to the frontend URL
2. **Click "💬 Chat"** to open the AI assistant
3. **Try these sample questions**:
   - "What is this book about?"
   - "How do I get started?"
   - "What are the key features mentioned?"
4. **Check the "📚 Docs" button** to see the documentation modal

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  Hero Section  │  Chat Modal  │  Docs Modal          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────┬───────────────────────────┘
                              │ HTTP API
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                       │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────┐ │
│  │  Chat API      │  │  Docs API      │  │  Health API │ │
│  └─────────────────┘  └─────────────────┘  └─────────────┘ │
└─────────────────────────┬───────────────────────────────────┘
                          │
        ┌─────────────────┼─────────────────┐
        │                 │                 │
        ▼                 ▼                 ▼
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│   Google AI │  │   Qdrant    │  │    Neon     │
│  (Gemini)   │  │  (Vector DB)│  │ (PostgreSQL)│
└─────────────┘  └─────────────┘  └─────────────┘
```

## 🛠️ API Endpoints

### Chat Endpoints
- `POST /api/v1/chat/ask` - Ask questions to the AI
- `GET /api/v1/chat/history/{session_id}` - Get conversation history
- `DELETE /api/v1/chat/sessions/{session_id}` - Clear a session

### Document Endpoints
- `POST /api/v1/documents/process` - Process book documents
- `GET /api/v1/documents/status` - Check processing status
- `GET /api/v1/documents/search?query=...` - Search documents
- `DELETE /api/v1/documents/clear` - Clear all documents

### System Endpoints
- `GET /` - API information
- `GET /health` - System health check

## 🔍 Troubleshooting

### Backend Won't Start
- Check Python version (3.9+ required)
- Verify all dependencies installed: `pip list`
- Check `.env` file has correct values

### Document Processing Fails
- Ensure `DOCS_PATH` in `.env` points to `../my-book/docs`
- Check file permissions on docs folder
- Verify markdown files exist in the docs directory

### Chat Not Working
- Verify Google AI API key is valid
- Check Qdrant connection (URL and API key)
- Ensure documents have been processed first
- Check CORS settings in `ALLOWED_ORIGINS`

### Database Connection Issues
- Verify Neon database URL format
- Check if database was created in Neon dashboard
- Ensure SSL is enabled in connection string

## 📈 Performance Optimization

1. **Document Processing**: Process documents in batches for large books
2. **Vector Search**: Adjust `SIMILARITY_THRESHOLD` for better results
3. **Caching**: Enable response caching for frequently asked questions
4. **Database**: Use connection pooling for better performance

## 🔒 Security Considerations

1. **API Keys**: Never commit API keys to version control
2. **CORS**: Configure `ALLOWED_ORIGINS` appropriately
3. **Input Validation**: Sanitize user inputs in production
4. **Rate Limiting**: Implement rate limiting for API endpoints

## 📝 Customization

### Adding New Documents
Simply add new markdown files to the `my-book/docs/` directory and re-run:
```bash
curl -X POST http://localhost:8000/api/v1/documents/process
```

### Changing the AI Model
Edit `app/services/embedding_service.py` to use different models or modify prompts.

### Adjusting Search Parameters
Update these values in `app/core/config.py`:
- `SIMILARITY_THRESHOLD`: Minimum similarity score (0.0-1.0)
- `MAX_RETRIEVED_DOCS`: Maximum documents to retrieve
- `EMBEDDING_MODEL`: Sentence transformer model to use

## 🚀 Production Deployment

1. **Environment Variables**: Set production values in `.env`
2. **Database**: Use production Neon database
3. **Vector DB**: Use production Qdrant cluster
4. **Frontend**: Build and deploy to hosting service
5. **Backend**: Deploy with Gunicorn/Uvicorn
6. **Monitoring**: Set up logging and monitoring

## 📞 Support

If you encounter issues:
1. Check the backend logs for detailed error messages
2. Verify all external service connections
3. Ensure proper API key configuration
4. Test individual components separately

---

**Happy chatting with your AI-powered book assistant!** 🤖📚