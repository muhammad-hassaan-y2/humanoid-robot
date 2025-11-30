import asyncpg
from app.core.config import settings
from typing import Optional


class Database:
    pool: Optional[asyncpg.Pool] = None

    @classmethod
    async def init_db(cls):
        """Initialize the database connection pool"""
        if not cls.pool:
            cls.pool = await asyncpg.create_pool(
                settings.NEON_DATABASE_URL,
                min_size=2,
                max_size=10,
                command_timeout=60
            )

            # Create tables if they don't exist
            await cls.create_tables()

    @classmethod
    async def create_tables(cls):
        """Create necessary database tables"""
        if not cls.pool:
            return

        async with cls.pool.acquire() as conn:
            # Create conversations table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS conversations (
                    id SERIAL PRIMARY KEY,
                    session_id VARCHAR(255) NOT NULL,
                    user_message TEXT NOT NULL,
                    bot_response TEXT NOT NULL,
                    context_used TEXT[],
                    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            """)

            # Create documents table
            await conn.execute("""
                CREATE TABLE IF NOT EXISTS documents (
                    id SERIAL PRIMARY KEY,
                    filename VARCHAR(255) NOT NULL,
                    file_path TEXT NOT NULL,
                    content_hash VARCHAR(64) NOT NULL,
                    processed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
                );
            """)

            # Create indexes
            await conn.execute("""
                CREATE INDEX IF NOT EXISTS idx_conversations_session_id
                ON conversations(session_id);
            """)

            await conn.execute("""
                CREATE INDEX IF NOT EXISTS idx_documents_content_hash
                ON documents(content_hash);
            """)

    @classmethod
    async def get_connection(cls):
        """Get a database connection from the pool"""
        if not cls.pool:
            await cls.init_db()
        return cls.pool.acquire()

    @classmethod
    async def close_pool(cls):
        """Close the database connection pool"""
        if cls.pool:
            await cls.pool.close()
            cls.pool = None


async def init_db():
    """Initialize the database"""
    await Database.init_db()