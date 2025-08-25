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

router = APIRouter(
    prefix="/api/ai-tutor",
    tags=["ai-tutor"],
)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SmartStudyApp")

# Together AI API configuration
TOGETHER_API_KEY = "tgp_v1_90x79k2ETI7VeQp-soWse4ijv45dCYW4OqQ0qgR-hiQ"  # Your API key
client = Together(api_key=TOGETHER_API_KEY)
MAX_RETRIES = 3
RETRY_DELAY = 2  # seconds

# List of models to try (in order of preference)
MODELS = [
    "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free"  # Primary model
]

@router.post("/ask", response_model=AIInteractionResponse)
async def ask_ai_tutor(request: AIInteractionCreate, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    logger.info(f"AI Tutor request from user ID: {current_user.id} with query: {request.query}")
    
    ai_response = None
    for model in MODELS:
        attempt = 0
        while attempt < MAX_RETRIES:
            try:
                # Call Together AI API to generate a response
                response = client.chat.completions.create(
                    model=model,
                    messages=[
                        {
                            "role": "system",
                            "content": "You are an AI Tutor helping with GATE preparation. Provide concise, accurate, and complete answers suitable for exam study, ensuring all key points are covered."
                        },
                        {
                            "role": "user",
                            "content": f"For GATE preparation: {request.query}"
                        }
                    ],
                    max_tokens=300,  # Increased to allow for more complete answers
                    temperature=0.7,
                )
                
                # Extract the generated response
                ai_response = response.choices[0].message.content.strip()
                
                # If the response is empty, provide a fallback
                if not ai_response:
                    ai_response = "I'm sorry, I couldn't generate a response. Please try rephrasing your question."
                logger.info(f"Successfully generated response using model: {model}")
                break  # Success, exit retry loop
            
            except Exception as e:
                attempt += 1
                logger.error(f"Attempt {attempt}/{MAX_RETRIES} - Failed to generate Together AI response using model {model}: {str(e)}")
                if attempt == MAX_RETRIES:
                    if model == MODELS[-1]:  # Last model, last attempt
                        ai_response = "I'm sorry, there was an error generating a response. Please try again later."
                    break  # Move to the next model
                time.sleep(RETRY_DELAY)  # Wait before retrying
        
        if ai_response:  # If we got a response, stop trying other models
            break
    
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