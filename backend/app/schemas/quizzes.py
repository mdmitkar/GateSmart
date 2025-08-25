from pydantic import BaseModel, validator
from typing import List, Optional
from datetime import datetime
import uuid

class MCQQuestion(BaseModel):
    question_text: str
    options: List[str]
    correct_answer: int
    marks: float
    negative_marks: float

class QuizBase(BaseModel):
    title: str
    description: Optional[str] = None
    subject: str
    topic: str
    difficulty: str
    time_limit: int

class QuizCreate(QuizBase):
    questions: List[MCQQuestion]

class QuizResponse(QuizBase):
    id: str
    user_id: str
    questions: List[MCQQuestion]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    status: Optional[str] = "not-started"
    score: Optional[float] = None
    last_attempt: Optional[datetime] = None

    @validator('id', 'user_id', pre=True)
    def convert_uuid_to_str(cls, v):
        if isinstance(v, uuid.UUID):
            return str(v)
        return v

    class Config:
        orm_mode = True