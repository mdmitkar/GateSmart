from pydantic import BaseModel
from datetime import date, time, datetime
from typing import Optional
from uuid import UUID

# Study Topic Schemas
class StudyTopicCreate(BaseModel):
    title: str
    subject: str
    estimated_hours: float

class StudyTopicResponse(BaseModel):
    id: UUID
    user_id: UUID
    title: str
    subject: str
    estimated_hours: float
    actual_hours: float
    status: str
    last_studied: Optional[date]
    next_revision: Optional[date]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            date: lambda v: v.strftime('%Y-%m-%d') if v else None,
            datetime: lambda v: v.isoformat() if v else None,
            UUID: lambda v: str(v)
        }

# Study Session Schemas
class StudySessionCreate(BaseModel):
    title: str
    date: Optional[str] = None
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    subject: Optional[str] = None
    topic: Optional[str] = None
    priority: Optional[str] = None
    completed: bool = False
    comprehension_level: Optional[int] = None  # 1-5 scale
    notes: Optional[str] = None

class StudySessionResponse(BaseModel):
    id: UUID
    user_id: UUID
    topic_id: Optional[UUID]
    title: str
    date: Optional[str]
    start_time: Optional[str]
    end_time: Optional[str]
    subject: Optional[str]
    topic: Optional[str]
    priority: Optional[str]
    completed: bool
    comprehension_level: Optional[int]
    notes: Optional[str]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
        json_encoders = {
            date: lambda v: v.strftime('%Y-%m-%d') if v else None,
            time: lambda v: v.strftime('%H:%M:%S') if v else None,
            datetime: lambda v: v.isoformat() if v else None,
            UUID: lambda v: str(v)
        }

# New response model to include session and updated topic
class StudySessionWithTopicResponse(BaseModel):
    session: StudySessionResponse
    topic: Optional[StudyTopicResponse]

    class Config:
        from_attributes = True
        json_encoders = {
            date: lambda v: v.strftime('%Y-%m-%d') if v else None,
            time: lambda v: v.strftime('%H:%M:%S') if v else None,
            datetime: lambda v: v.isoformat() if v else None,
            UUID: lambda v: str(v)
        }