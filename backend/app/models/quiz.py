from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, text
from sqlalchemy.dialects.postgresql import UUID, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import uuid

class Quiz(Base):
    __tablename__ = "quizzes"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String)
    subject = Column(String)
    topic = Column(String)
    difficulty = Column(String)
    questions = Column(JSON)  # Changed to JSON to store MCQ structure
    time_limit = Column(Integer)
    created_at = Column(DateTime(timezone=False), server_default=func.now())
    updated_at = Column(DateTime(timezone=False), onupdate=func.now())
    status = Column(String, nullable=False, server_default=text("'not-started'"))
    score = Column(Integer)
    last_attempt = Column(DateTime(timezone=False))

    user = relationship("User", back_populates="quizzes")
    attempts = relationship("QuizAttempt", back_populates="quiz", cascade="all, delete-orphan")