from sqlalchemy import Column, String, Float, ForeignKey, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
import uuid
from app.database import Base  # Absolute import

class Progress(Base):
    __tablename__ = "progress"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    subject = Column(String, nullable=False)
    topic = Column(String)
    progress_percentage = Column(Float, nullable=False)
    last_updated = Column(DateTime, default=func.now(), onupdate=func.now())