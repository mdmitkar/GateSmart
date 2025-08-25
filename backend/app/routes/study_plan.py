# app/routes/study_plan.py
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.study_plan import StudySessionCreate, StudySessionResponse, StudyTopicCreate, StudyTopicResponse, StudySessionWithTopicResponse
from app.models.study_session import StudySession
from app.models.study_topic import StudyTopic
from app.utils.auth import get_current_user
from app.database import get_db
from app.models.user import User
from sqlalchemy.orm import Session
import uuid
from datetime import datetime, timedelta
from app.utils.logging import setup_logging
from datetime import datetime as dt
from typing import List
from app.ml.revision_model import predict_next_revision, calculate_duration

router = APIRouter(prefix="/api/study-plan", tags=["Study Plan"])
logger = setup_logging()

# Study Topic Endpoints
@router.post("/topics", response_model=StudyTopicResponse, status_code=201)
def create_study_topic(
    topic: StudyTopicCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    logger.info(f"Creating study topic for user ID: {current_user.id}")
    
    db_topic = StudyTopic(
        id=uuid.uuid4(),
        user_id=current_user.id,
        title=topic.title,
        subject=topic.subject,
        estimated_hours=topic.estimated_hours,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    try:
        db.add(db_topic)
        db.commit()
        db.refresh(db_topic)
        logger.info(f"Study topic created with ID: {db_topic.id}")
        return db_topic  # Pydantic model handles serialization
    except Exception as e:
        logger.error(f"Error creating study topic: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not create study topic")

@router.get("/topics", response_model=List[StudyTopicResponse])
def get_study_topics(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
):
    logger.info(f"Fetching study topics for user ID: {current_user.id}")
    study_topics = db.query(StudyTopic).filter(
        StudyTopic.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    return study_topics  # Pydantic model handles serialization

# Study Session Endpoints
@router.post("/sessions", response_model=StudySessionWithTopicResponse, status_code=201)
def create_study_session(
    session: StudySessionCreate,
    topic_id: str = None,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    logger.info(f"Creating study session for user ID: {current_user.id}")
    
    # Validate topic_id if provided
    study_topic = None
    if topic_id:
        study_topic = db.query(StudyTopic).filter(
            StudyTopic.id == topic_id,
            StudyTopic.user_id == current_user.id
        ).first()
        if not study_topic:
            raise HTTPException(status_code=404, detail="Study topic not found")

    # Manually parse date, start_time, and end_time
    date_obj = None
    if session.date:
        date_obj = dt.strptime(session.date, '%Y-%m-%d').date()
    
    start_time_obj = None
    if session.start_time:
        start_time_obj = dt.strptime(session.start_time, '%H:%M:%S').time()
    
    end_time_obj = None
    if session.end_time:
        end_time_obj = dt.strptime(session.end_time, '%H:%M:%S').time()

    # Calculate duration
    duration = 0.0
    if session.start_time and session.end_time:
        duration = calculate_duration(session.start_time, session.end_time)

    # Create the study session
    db_session = StudySession(
        id=uuid.uuid4(),
        user_id=current_user.id,
        topic_id=topic_id,
        title=session.title,
        date=date_obj,
        start_time=start_time_obj,
        end_time=end_time_obj,
        subject=session.subject,
        topic=session.topic,
        priority=session.priority,
        completed=session.completed,
        comprehension_level=session.comprehension_level,
        notes=session.notes,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    
    try:
        db.add(db_session)
        # Update the study topic with ML-based next_revision
        if study_topic and session.comprehension_level and duration > 0:
            study_topic.actual_hours += duration / 60
            study_topic.last_studied = date_obj
            study_topic.status = "completed" if study_topic.actual_hours >= study_topic.estimated_hours else "in-progress"
            revision_days = predict_next_revision(session.comprehension_level, duration)
            study_topic.next_revision = date_obj + timedelta(days=revision_days)
        db.commit()
        db.refresh(db_session)
        if study_topic:
            db.refresh(study_topic)
        logger.info(f"Study session created with ID: {db_session.id}")
        
        # Manually serialize session to ensure date, start_time, and end_time are strings
        session_response = {
            "id": db_session.id,
            "user_id": db_session.user_id,
            "topic_id": db_session.topic_id,
            "title": db_session.title,
            "date": db_session.date.strftime('%Y-%m-%d') if db_session.date else None,
            "start_time": db_session.start_time.strftime('%H:%M:%S') if db_session.start_time else None,
            "end_time": db_session.end_time.strftime('%H:%M:%S') if db_session.end_time else None,
            "subject": db_session.subject,
            "topic": db_session.topic,
            "priority": db_session.priority,
            "completed": db_session.completed,
            "comprehension_level": db_session.comprehension_level,
            "notes": db_session.notes,
            "created_at": db_session.created_at,
            "updated_at": db_session.updated_at
        }
        
        # Return session and updated topic
        response = {
            "session": session_response,
            "topic": study_topic if topic_id else None
        }
        return response
    except Exception as e:
        logger.error(f"Error creating study session: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not create study session")

@router.get("/sessions", response_model=List[StudySessionResponse])
def get_study_sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    skip: int = 0,
    limit: int = 100
):
    logger.info(f"Fetching study sessions for user ID: {current_user.id}")
    study_sessions = db.query(StudySession).filter(
        StudySession.user_id == current_user.id
    ).offset(skip).limit(limit).all()
    
    # Manually serialize each session
    return [
        {
            "id": session.id,
            "user_id": session.user_id,
            "topic_id": session.topic_id,
            "title": session.title,
            "date": session.date.strftime('%Y-%m-%d') if session.date else None,
            "start_time": session.start_time.strftime('%H:%M:%S') if session.start_time else None,
            "end_time": session.end_time.strftime('%H:%M:%S') if session.end_time else None,
            "subject": session.subject,
            "topic": session.topic,
            "priority": session.priority,
            "completed": session.completed,
            "comprehension_level": session.comprehension_level,
            "notes": session.notes,
            "created_at": session.created_at,
            "updated_at": session.updated_at
        }
        for session in study_sessions
    ]

@router.get("/sessions/{session_id}", response_model=StudySessionResponse)
def get_study_session(
    session_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    logger.info(f"Fetching study session ID: {session_id} for user ID: {current_user.id}")
    study_session = db.query(StudySession).filter(
        StudySession.id == session_id,
        StudySession.user_id == current_user.id
    ).first()
    
    if not study_session:
        raise HTTPException(status_code=404, detail="Study session not found")
    
    # Manually serialize the session
    return {
        "id": study_session.id,
        "user_id": study_session.user_id,
        "topic_id": study_session.topic_id,
        "title": study_session.title,
        "date": study_session.date.strftime('%Y-%m-%d') if study_session.date else None,
        "start_time": study_session.start_time.strftime('%H:%M:%S') if study_session.start_time else None,
        "end_time": study_session.end_time.strftime('%H:%M:%S') if study_session.end_time else None,
        "subject": study_session.subject,
        "topic": study_session.topic,
        "priority": study_session.priority,
        "completed": study_session.completed,
        "comprehension_level": study_session.comprehension_level,
        "notes": study_session.notes,
        "created_at": study_session.created_at,
        "updated_at": study_session.updated_at
    }

@router.put("/sessions/{session_id}", response_model=StudySessionResponse)
def update_study_session(
    session_id: str,
    session: StudySessionCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    logger.info(f"Updating study session ID: {session_id} for user ID: {current_user.id}")
    db_session = db.query(StudySession).filter(
        StudySession.id == session_id,
        StudySession.user_id == current_user.id
    ).first()
    
    if not db_session:
        raise HTTPException(status_code=404, detail="Study session not found")
    
    # Manually parse date, start_time, and end_time
    if session.date:
        db_session.date = dt.strptime(session.date, '%Y-%m-%d').date()
    if session.start_time:
        db_session.start_time = dt.strptime(session.start_time, '%H:%M:%S').time()
    if session.end_time:
        db_session.end_time = dt.strptime(session.end_time, '%H:%M:%S').time()
        
    # Update other fields
    db_session.title = session.title
    db_session.subject = session.subject
    db_session.topic = session.topic
    db_session.priority = session.priority
    db_session.completed = session.completed
    db_session.comprehension_level = session.comprehension_level
    db_session.notes = session.notes
    db_session.updated_at = datetime.utcnow()
    
    try:
        db.commit()
        db.refresh(db_session)
        logger.info(f"Study session ID: {session_id} updated successfully")
        # Manually serialize the session
        return {
            "id": db_session.id,
            "user_id": db_session.user_id,
            "topic_id": db_session.topic_id,
            "title": db_session.title,
            "date": db_session.date.strftime('%Y-%m-%d') if db_session.date else None,
            "start_time": db_session.start_time.strftime('%H:%M:%S') if db_session.start_time else None,
            "end_time": db_session.end_time.strftime('%H:%M:%S') if db_session.end_time else None,
            "subject": db_session.subject,
            "topic": db_session.topic,
            "priority": db_session.priority,
            "completed": db_session.completed,
            "comprehension_level": db_session.comprehension_level,
            "notes": db_session.notes,
            "created_at": db_session.created_at,
            "updated_at": db_session.updated_at
        }
    except Exception as e:
        logger.error(f"Error updating study session: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not update study session")

@router.delete("/sessions/{session_id}", status_code=204)
def delete_study_session(
    session_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    logger.info(f"Deleting study session ID: {session_id} for user ID: {current_user.id}")
    db_session = db.query(StudySession).filter(
        StudySession.id == session_id,
        StudySession.user_id == current_user.id
    ).first()
    
    if not db_session:
        raise HTTPException(status_code=404, detail="Study session not found")
    
    try:
        db.delete(db_session)
        db.commit()
        logger.info(f"Study session ID: {session_id} deleted successfully")
    except Exception as e:
        logger.error(f"Error deleting study session: {str(e)}")
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not delete study session")