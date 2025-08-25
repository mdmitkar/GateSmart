from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.quiz import Quiz
from app.models.quiz_attempt import QuizAttempt
from app.models.user import User
from app.schemas.quizzes import QuizCreate, QuizResponse
from app.schemas.quiz_attempt import QuizAttemptCreate, QuizAttemptResponse
from app.utils.auth import get_current_user
import logging
from datetime import datetime
import uuid
from typing import List

router = APIRouter(
    prefix="/api/quizzes",
    tags=["quizzes"],
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SmartStudyApp")

# Default user ID for shared quizzes (same as in populate_mock_tests.py)
DEFAULT_USER_ID = "026bbd66-baec-4d36-b9cf-a98695a672b9"

@router.get("/", response_model=List[QuizResponse])
async def get_quizzes(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    logger.info(f"Fetching quizzes for user ID: {current_user.id}")
    # Fetch global quizzes for the default user
    quizzes = db.query(Quiz).filter(Quiz.user_id == DEFAULT_USER_ID).all()
    
    # Fetch the current user's attempts for these quizzes
    quiz_attempts = db.query(QuizAttempt).filter(
        QuizAttempt.user_id == current_user.id,
        QuizAttempt.quiz_id.in_([quiz.id for quiz in quizzes])
    ).all()
    
    # Map attempts to a dictionary for quick lookup
    attempt_map = {attempt.quiz_id: attempt for attempt in quiz_attempts}
    
    # Update quizzes with user-specific attempt data
    for quiz in quizzes:
        attempt = attempt_map.get(quiz.id)
        if attempt:
            quiz.status = attempt.status
            quiz.score = attempt.score
            quiz.last_attempt = attempt.completed_at
    
    return quizzes

@router.post("/", response_model=QuizResponse)
async def create_quiz(quiz: QuizCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    logger.info(f"Creating quiz for user ID: {current_user.id}")
    # Check for existing quiz with the same title
    existing_quiz = db.query(Quiz).filter(
        Quiz.user_id == current_user.id,
        Quiz.title == quiz.title
    ).first()
    if existing_quiz:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A quiz with this title already exists for this user"
        )
    
    # Convert the list of MCQQuestion objects to a list of dictionaries
    questions_dict = [question.dict() for question in quiz.questions]
    
    db_quiz = Quiz(
        id=uuid.uuid4(),
        user_id=current_user.id,
        title=quiz.title,
        description=quiz.description,
        subject=quiz.subject,
        topic=quiz.topic,
        difficulty=quiz.difficulty,
        questions=questions_dict,  # Use the list of dictionaries
        time_limit=quiz.time_limit,
        status="not-started"
    )
    db.add(db_quiz)
    db.commit()
    db.refresh(db_quiz)
    logger.info(f"Quiz created with ID: {db_quiz.id}")
    return db_quiz

@router.get("/{quiz_id}", response_model=QuizResponse)
async def get_quiz(quiz_id: str, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    logger.info(f"Fetching quiz ID: {quiz_id} for user ID: {current_user.id}")
    # Fetch quiz for the default user
    db_quiz = db.query(Quiz).filter(Quiz.id == quiz_id, Quiz.user_id == DEFAULT_USER_ID).first()
    if not db_quiz:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quiz not found")
    
    # Fetch the current user's attempt for this quiz
    attempt = db.query(QuizAttempt).filter(
        QuizAttempt.user_id == current_user.id,
        QuizAttempt.quiz_id == quiz_id
    ).first()
    
    if attempt:
        db_quiz.status = attempt.status
        db_quiz.score = attempt.score
        db_quiz.last_attempt = attempt.completed_at
    
    return db_quiz

@router.post("/{quiz_id}/attempt", response_model=QuizAttemptResponse)
async def start_quiz_attempt(quiz_id: str, attempt: QuizAttemptCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    logger.info(f"Starting quiz attempt for quiz ID: {quiz_id} by user ID: {current_user.id}")
    # Verify the quiz exists
    db_quiz = db.query(Quiz).filter(Quiz.id == quiz_id, Quiz.user_id == DEFAULT_USER_ID).first()
    if not db_quiz:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Quiz not found")
    
    # Check if an attempt already exists
    existing_attempt = db.query(QuizAttempt).filter(
        QuizAttempt.user_id == current_user.id,
        QuizAttempt.quiz_id == quiz_id
    ).first()
    
    if existing_attempt:
        # Update the existing attempt if it's not completed
        if existing_attempt.status != "completed":
            existing_attempt.status = attempt.status
            existing_attempt.score = attempt.score
            existing_attempt.completed_at = attempt.completed_at
            db.commit()
            db.refresh(existing_attempt)
            return existing_attempt
        else:
            # If completed, create a new attempt (for retake)
            db_attempt = QuizAttempt(
                id=uuid.uuid4(),
                user_id=current_user.id,
                quiz_id=quiz_id,
                status=attempt.status,
                score=attempt.score,
                started_at=datetime.utcnow(),
                completed_at=attempt.completed_at
            )
            db.add(db_attempt)
            db.commit()
            db.refresh(db_attempt)
            return db_attempt
    
    # Create a new attempt
    db_attempt = QuizAttempt(
        id=uuid.uuid4(),
        user_id=current_user.id,
        quiz_id=quiz_id,
        status=attempt.status,
        score=attempt.score,
        started_at=datetime.utcnow(),
        completed_at=attempt.completed_at
    )
    db.add(db_attempt)
    db.commit()
    db.refresh(db_attempt)
    logger.info(f"Quiz attempt created with ID: {db_attempt.id}")
    return db_attempt