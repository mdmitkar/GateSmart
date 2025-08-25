from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine, SessionLocal
from app.routes.auth import router as auth_router
from app.routes.study_plan import router as study_plan_router
from app.routes.quizzes import router as quizzes_router
from app.routes.ai_tutor import router as ai_tutor_router
from .utils.logging import setup_logging
from app.models.user import User
from app.models.quiz import Quiz
from app.models.quiz_attempt import QuizAttempt
from app.models.ai_interaction import AIInteraction
from sqlalchemy.sql import text

# Set up logging
logger = setup_logging()

app = FastAPI()

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Test database connection
try:
    db = SessionLocal()
    db.execute(text("SELECT 1"))
    logger.info("Database connection successful!")
    db.close()
except Exception as e:
    logger.error(f"Failed to connect to database: {str(e)}")
    raise e

# Create all tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth_router)
app.include_router(study_plan_router)
app.include_router(quizzes_router)
app.include_router(ai_tutor_router)

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {"message": "Hello from Smart Study Backend!"}