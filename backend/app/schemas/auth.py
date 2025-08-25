from pydantic import BaseModel
from datetime import datetime
from typing import Optional, Dict

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    created_at: datetime
    updated_at: datetime
    profile_image: Optional[str] = None
    preferences: Optional[Dict] = None

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str