# app/models/study_topic.py
from sqlalchemy import Column, String, Float, ForeignKey, Date, Enum, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database import Base
import enum
from datetime import datetime
import uuid

class StudyStatus(enum.Enum):
    not_started = "not-started"
    in_progress = "in-progress"
    completed = "completed"

class StudyTopic(Base):
    __tablename__ = "study_topics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    subject = Column(String, nullable=False)
    estimated_hours = Column(Float, nullable=False)
    actual_hours = Column(Float, default=0.0)
    status = Column(Enum(StudyStatus), default=StudyStatus.not_started)
    last_studied = Column(Date, nullable=True)
    next_revision = Column(Date, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="study_topics")
    sessions = relationship("StudySession", back_populates="study_topic", cascade="all, delete-orphan")