# RAG Chatbot Backend

A FastAPI-based backend for the RAG (Retrieval-Augmented Generation) chatbot system with Google AI integration.

## Features

- **Document Processing**: Automatically processes markdown files from the book
- **Vector Search**: Uses Qdrant for semantic search with sentence transformers
- **Google AI Integration**: Leverages Google Gemini for intelligent responses
- **Neon PostgreSQL**: Serverless database for conversation storage
- **Real-time Chat**: WebSocket-style chat with session management

## Setup

### Prerequisites

- Python 3.9+
- Node.js 18+
- Google AI API key
- Qdrant Cloud account
- Neon PostgreSQL database

### Installation

1. **Create virtual environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your credentials:
   ```env
   NEON_DATABASE_URL=postgresql://username:password@ep-xxx.us-east-2.aws.neon.tech/yourdb?sslmode=require
   QDRANT_URL=https://xxxxx-us-east-2.aws.cloud.qdrant.io:6333
   QDRANT_API_KEY=your-qdrant-api-key
   GOOGLE_API_KEY=your-google-api-key
   ```

### Running the Backend

1. **Start the server**:
   ```bash
   cd backend
   python -m app.main
   ```

   The server will start on `http://localhost:8000`

2. **Process documents** (one-time setup):
   ```bash
   curl -X POST http://localhost:8000/api/v1/documents/process
   ```

### API Endpoints

#### Chat
- `POST /api/v1/chat/ask` - Ask a question
- `GET /api/v1/chat/history/{session_id}` - Get conversation history
- `DELETE /api/v1/chat/sessions/{session_id}` - Delete a session

#### Documents
- `POST /api/v1/documents/process` - Process book documents
- `GET /api/v1/documents/status` - Get document processing status
- `GET /api/v1/documents/search?query=...` - Search documents
- `DELETE /api/v1/documents/clear` - Clear all documents

#### Health
- `GET /health` - Health check
- `GET /` - API info

### Example Usage

```javascript
// Ask a question
const response = await fetch('http://localhost:8000/api/v1/chat/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'What is this book about?',
    session_id: 'my-session-123',
    max_context_docs: 5
  })
});

const data = await response.json();
console.log(data.response);
```

### Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend     │    │   Backend       │    │  External APIs  │
│   (React)      │◄──►│   (FastAPI)     │◄──►│  (Google AI)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  Vector DB     │
                       │  (Qdrant)      │
                       └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │  SQL Database  │
                       │  (Neon)       │
                       └─────────────────┘
```

### Troubleshooting

1. **Google AI API Issues**: Make sure your API key is valid and has sufficient quota
2. **Qdrant Connection**: Verify your Qdrant URL and API key
3. **Neon Database**: Check connection string and ensure database exists
4. **Document Processing**: Ensure the `DOCS_PATH` points to your book's docs folder

### Development

The backend uses async/await patterns throughout for optimal performance. Key components:

- `app/core/config.py` - Configuration management
- `app/core/database.py` - PostgreSQL connection and queries
- `app/core/vector_db.py` - Qdrant vector database operations
- `app/services/embedding_service.py` - Document processing and embeddings
- `app/api/v1/chat.py` - Chat API endpoints
- `app/api/v1/documents.py` - Document management endpoints

### Performance Tips

- Use sentence transformers for fast local embeddings
- Batch document processing for efficiency
- Implement caching for frequent queries
- Monitor database connection pooling
- Set appropriate similarity thresholds