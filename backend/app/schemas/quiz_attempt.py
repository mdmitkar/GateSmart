from pydantic import BaseModel, validator
from datetime import datetime
from typing import Optional
import uuid

class QuizAttemptCreate(BaseModel):
    status: str  # "not-started", "in-progress", "completed"
    score: Optional[int] = None  # Percentage score
    completed_at: Optional[datetime] = None

class QuizAttemptResponse(BaseModel):
    id: str
    user_id: str
    quiz_id: str
    status: str
    score: Optional[int]
    started_at: datetime
    completed_at: Optional[datetime]

    @validator('id', 'user_id', 'quiz_id', pre=True)
    def convert_uuid_to_str(cls, v):
        if isinstance(v, uuid.UUID):
            return str(v)
        return v

    class Config:
        orm_mode = True