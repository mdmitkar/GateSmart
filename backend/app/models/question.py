from sqlalchemy import Column, String, Integer, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.sql import func
import uuid
from app.database import Base  # Absolute import

class Question(Base):
    __tablename__ = "questions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    quiz_id = Column(UUID(as_uuid=True), ForeignKey("quizzes.id"), nullable=False)
    text = Column(String, nullable=False)
    options = Column(ARRAY(String), nullable=False)
    correct_answer = Column(Integer, nullable=False)
    explanation = Column(String)
    difficulty = Column(String)  # "easy", "medium", "hard"
    tags = Column(ARRAY(String))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())