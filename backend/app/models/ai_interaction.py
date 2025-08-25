from sqlalchemy import Column, String, DateTime, ForeignKey
from sqlalchemy.dialects.postgresql import UUID, TEXT
from sqlalchemy.sql import func
import uuid
from app.database import Base
from sqlalchemy.orm import relationship

class AIInteraction(Base):
    __tablename__ = "ai_interactions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    query = Column(TEXT, nullable=False)
    response = Column(TEXT, nullable=False)
    created_at = Column(DateTime(timezone=False), server_default=func.now())

    user = relationship("User", back_populates="ai_interactions")