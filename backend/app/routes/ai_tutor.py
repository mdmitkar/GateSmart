from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from app.database import get_db
from app.models.ai_interaction import AIInteraction
from app.models.user import User
from app.schemas.ai_interaction import AIInteractionCreate, AIInteractionResponse
from app.utils.auth import get_current_user
from together import Together
import logging
import uuid
import time
import os

router = APIRouter(
    prefix="/api/ai-tutor",
    tags=["ai-tutor"],
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SmartStudyApp")

# Together AI API configuration - Get from environment variable
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
if not TOGETHER_API_KEY:
    logger.error("TOGETHER_API_KEY environment variable not set")
    raise HTTPException(status_code=500, detail="AI service not configured")

client = Together(api_key=TOGETHER_API_KEY)

# Use only models available on the free tier
FALLBACK_MODELS = [
    "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",  # Primary - the one that was working
]

# Optimized retry settings
MAX_RETRIES = 2  # Reduced from 3 to 2
RETRY_DELAY = 5  # Reduced from 2 to 5 seconds
RATE_LIMIT_WAIT = 15  # Reduced from 30 to 15 seconds

@router.post("/ask", response_model=AIInteractionResponse)
async def ask_ai_tutor(request: AIInteractionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    logger.info(f"AI Tutor request from user ID: {current_user.id} with query: {request.query}")
    
    # Quick responses for simple questions to avoid API calls
    query_lower = request.query.lower().strip()
    if query_lower in ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening']:
        ai_response = "Hello! I'm your AI tutor. How can I help you with your studies today? Feel free to ask me any questions about computer science, engineering, or any other academic topics!"
        logger.info("Quick response generated for simple greeting")
    else:
        # Regular AI processing for complex questions
        ai_response = await generate_ai_response(request.query)
    
    # Store the interaction in the database
    db_interaction = AIInteraction(
        id=uuid.uuid4(),
        user_id=current_user.id,
        query=request.query,
        response=ai_response,
        created_at=func.now(),
    )
    db.add(db_interaction)
    db.commit()
    db.refresh(db_interaction)
    
    logger.info(f"AI interaction stored with ID: {db_interaction.id}")
    return db_interaction

async def generate_ai_response(query: str):
    """Generate AI response with optimized retry logic"""
    ai_response = None
    
    # Retry logic with different models
    for attempt in range(MAX_RETRIES):
        try:
            # Use the primary model
            current_model = FALLBACK_MODELS[0]
            logger.info(f"Attempt {attempt + 1}/{MAX_RETRIES} using model: {current_model}")
            
            response = client.chat.completions.create(
                model=current_model,
                messages=[
                    {"role": "system", "content": "You are a helpful AI tutor for computer science and engineering students. Provide clear, concise explanations with examples when helpful."},
                    {"role": "user", "content": query}
                ],
                max_tokens=1000,
                temperature=0.7,
            )
            
            ai_response = response.choices[0].message.content
            logger.info(f"AI response generated successfully using model: {current_model}")
            break
            
        except Exception as e:
            error_msg = str(e)
            logger.error(f"Attempt {attempt + 1}/{MAX_RETRIES} - Failed to generate Together AI response using model {current_model}: {error_msg}")
            
            if attempt < MAX_RETRIES - 1:
                # Wait longer between attempts for rate limits
                if "rate limit" in error_msg.lower() or "429" in error_msg:
                    wait_time = RATE_LIMIT_WAIT
                    logger.info(f"Rate limit detected, waiting {wait_time} seconds before retry")
                    time.sleep(wait_time)
                else:
                    time.sleep(RETRY_DELAY)
                continue
            else:
                # All attempts failed
                if "rate limit" in error_msg.lower() or "429" in error_msg:
                    raise HTTPException(
                        status_code=429,
                        detail="AI service is currently busy due to rate limits. Please wait 1-2 minutes before asking another question. This is a limitation of the free tier."
                    )
                else:
                    raise HTTPException(
                        status_code=500, 
                        detail=f"AI service temporarily unavailable. Please try again in a few minutes. Error: {error_msg}"
                    )
    
    return ai_response