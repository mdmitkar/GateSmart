from pydantic import BaseModel, validator
from datetime import datetime
from typing import Optional
import uuid

class AIInteractionCreate(BaseModel):
    query: str

class AIInteractionResponse(BaseModel):
    id: str
    user_id: str
    query: str
    response: str
    created_at: datetime

    @validator('id', 'user_id', pre=True)
    def convert_uuid_to_str(cls, v):
        if isinstance(v, uuid.UUID):
            return str(v)
        return v

    class Config:
        orm_mode = True