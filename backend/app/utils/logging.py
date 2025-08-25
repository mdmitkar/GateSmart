import logging
import os
from datetime import datetime

def setup_logging():
    # Create logs directory if it doesn't exist
    if not os.path.exists("logs"):
        os.makedirs("logs")

    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
        handlers=[
            logging.FileHandler(f"logs/app_{datetime.now().strftime('%Y%m%d')}.log"),
            logging.StreamHandler()  # Also log to console
        ]
    )

    return logging.getLogger("SmartStudyApp")