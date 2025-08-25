# app/ml/revision_model.py
import numpy as np
from sklearn.linear_model import LinearRegression
import pickle
import os
from datetime import datetime, timedelta
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("SmartStudyApp")

# Simulated training data: [comprehension_level, duration_minutes] -> days_until_revision
X_train = np.array([
    [1, 30], [1, 60], [2, 45], [2, 90], [3, 60], [3, 120], [4, 60], [4, 180], [5, 60], [5, 240]
])
y_train = np.array([1, 2, 2, 3, 4, 5, 7, 8, 14, 15])  # Days until next revision

# Train a simple linear regression model
model = LinearRegression()
model.fit(X_train, y_train)

# Save the model to a file
model_path = "revision_model.pkl"
with open(model_path, "wb") as f:
    pickle.dump(model, f)

def predict_next_revision(comprehension_level: int, duration: float) -> int:
    """
    Predict the number of days until the next revision using a linear regression model.
    
    Args:
        comprehension_level (int): User's comprehension level (1-5).
        duration (float): Study session duration in minutes.
    
    Returns:
        int: Number of days until the next revision (minimum 1 day).
    """
    if not os.path.exists(model_path):
        logger.warning("ML model file not found. Defaulting to 7 days.")
        return 7  # Fallback interval

    try:
        with open(model_path, "rb") as f:
            loaded_model = pickle.load(f)
        
        # Predict using the model
        features = np.array([[comprehension_level, duration]])
        days = loaded_model.predict(features)[0]
        return max(1, int(round(days)))  # Ensure at least 1 day
    except Exception as e:
        logger.error(f"Error in ML prediction: {str(e)}")
        return 7  # Fallback interval

def calculate_duration(start_time: str, end_time: str) -> float:
    """
    Calculate the duration in minutes between start_time and end_time.
    
    Args:
        start_time (str): Start time in 'HH:MM:SS' format.
        end_time (str): End time in 'HH:MM:SS' format.
    
    Returns:
        float: Duration in minutes.
    """
    try:
        start = datetime.strptime(start_time, '%H:%M:%S')
        end = datetime.strptime(end_time, '%H:%M:%S')
        delta = end - start
        if delta.total_seconds() < 0:
            delta += timedelta(days=1)  # Handle overnight sessions
        return delta.total_seconds() / 60
    except ValueError as e:
        logger.error(f"Error calculating duration: {str(e)}")
        return 0.0