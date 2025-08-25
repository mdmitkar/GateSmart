from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin, UserResponse, Token
from app.utils.auth import hash_password, create_access_token, verify_password
from app.utils.logging import setup_logging
from datetime import datetime
import uuid

logger = setup_logging()

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse, status_code=201)
def register(user: UserCreate, db: Session = Depends(get_db)):
    logger.info(f"Register attempt for email: {user.email}")
    # Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        logger.warning(f"Registration failed: Email {user.email} already registered")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new user
    hashed_password = hash_password(user.password)
    db_user = User(
        id=str(uuid.uuid4()),
        name=user.name,
        email=user.email,
        password_hash=hashed_password,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    logger.info(f"User registered successfully: {user.email}")
    
    # Convert the SQLAlchemy object to a dict explicitly to ensure serialization
    user_dict = {
        "id": str(db_user.id),
        "name": db_user.name,
        "email": db_user.email,
        "created_at": db_user.created_at,
        "updated_at": db_user.updated_at,
        "profile_image": db_user.profile_image,
        "preferences": db_user.preferences
    }
    return user_dict

@router.post("/login", response_model=Token)
def login(user: UserLogin, db: Session = Depends(get_db)):
    logger.info(f"Login attempt for email: {user.email}")
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user or not verify_password(user.password, db_user.password_hash):
        logger.warning(f"Login failed for email: {user.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": str(db_user.id)})
    logger.info(f"User logged in successfully: {user.email}")
    return {"access_token": access_token, "token_type": "bearer"}