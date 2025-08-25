# app/models/study_session.py
from sqlalchemy import Column, String, Date, Time, Boolean, Integer, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
import uuid  # Added this import

class StudySession(Base):
    __tablename__ = "study_sessions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    topic_id = Column(UUID(as_uuid=True), ForeignKey("study_topics.id"), nullable=True)
    title = Column(String, nullable=False)
    date = Column(Date, nullable=True)
    start_time = Column(Time, nullable=True)
    end_time = Column(Time, nullable=True)
    subject = Column(String, nullable=True)
    topic = Column(String, nullable=True)
    priority = Column(String, nullable=True)
    completed = Column(Boolean, default=False)
    comprehension_level = Column(Integer, nullable=True)  # 1-5 scale for ML
    notes = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="study_sessions")
    study_topic = relationship("StudyTopic", back_populates="sessions")