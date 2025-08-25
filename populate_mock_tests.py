import requests
import uuid
import sys
import argparse
from datetime import datetime
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "backend", ".env"))

# Credentials for login from .env as fallback
DEFAULT_EMAIL = os.getenv("EMAIL")
DEFAULT_PASSWORD = os.getenv("PASSWORD")

# Base URL for the API
BASE_URL = "http://localhost:8000/api/quizzes/"
LOGIN_URL = "http://localhost:8000/api/auth/login"

# Function to get JWT token
def get_jwt_token(email: str, password: str):
    response = requests.post(
        LOGIN_URL,
        json={"email": email, "password": password}
    )
    if response.status_code == 200:
        return response.json()["access_token"]
    else:
        raise Exception(f"Login failed: {response.json()}")

# Parse command-line arguments
def parse_args():
    parser = argparse.ArgumentParser(description="Populate mock tests with user credentials.")
    parser.add_argument("--email", type=str, help="Email for login (overrides .env EMAIL)", default=DEFAULT_EMAIL)
    parser.add_argument("--password", type=str, help="Password for login (overrides .env PASSWORD)", default=DEFAULT_PASSWORD)
    return parser.parse_args()

# Mock user ID
USER_ID = "026bbd66-baec-4d36-b9cf-a98695a672b9"

# Get credentials from command-line arguments or .env
args = parse_args()
EMAIL = args.email
PASSWORD = args.password

# Validate credentials
if not EMAIL or not PASSWORD:
    raise ValueError("Email and password must be provided via command-line arguments or .env file")

# Fetch JWT token with the provided credentials
TOKEN = get_jwt_token(EMAIL, PASSWORD)

# Full-Length Mock Test 1 (6 questions)
full_length_mock_1 = {
    "id": str(uuid.uuid4()),
    "title": "GATE CS 2025 Full-Length Mock Test 1",
    "description": "A comprehensive mock test covering all GATE CS 2025 subjects.",
    "subject": "GATE CS 2025",
    "topic": "Full-Length Mock",
    "difficulty": "Hard",
    "time_limit": 180,
    "status": "not-started",
    "questions": [
        {
            "question_text": "If the day after tomorrow is Wednesday, what day is it today?",
            "options": ["Monday", "Tuesday", "Wednesday", "Thursday"],
            "correct_answer": 0,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "A train travels 120 km in 2 hours. What is its speed in km/h?",
            "options": ["50", "60", "70", "80"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": -0.667,
            "type": "MCQ"
        },
        {
            "question_text": "What is the determinant of the matrix [[1, 2], [3, 4]]?",
            "options": ["-2", "0", "2", "4"],
            "correct_answer": 0,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "What is the value of x in the equation: 2x + 3 = 7?",
            "options": ["1", "2", "3", "4"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        },
        {
            "question_text": "Which of the following is a deadlock prevention technique?",
            "options": ["Banker's Algorithm", "Round Robin", "Shortest Job First", "Priority Scheduling"],
            "correct_answer": 0,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "How many layers are there in the TCP/IP model that include Application, Transport, and Network?",
            "options": ["2", "3", "4", "5"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        }
    ]
}

# Full-Length Mock Test 2 (3 questions)
full_length_mock_2 = {
    "id": str(uuid.uuid4()),
    "title": "GATE CS 2025 Full-Length Mock Test 2",
    "description": "Another full-length mock test for GATE CS 2025 preparation.",
    "subject": "GATE CS 2025",
    "topic": "Full-Length Mock",
    "difficulty": "Hard",
    "time_limit": 180,
    "status": "not-started",
    "questions": [
        {
            "question_text": "Find the next number in the sequence: 2, 4, 6, 8, ?",
            "options": ["9", "10", "11", "12"],
            "correct_answer": 1,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "What is the time complexity of QuickSort in the average case?",
            "options": ["O(n)", "O(n log n)", "O(n^2)", "O(log n)"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": -0.667,
            "type": "MCQ"
        },
        {
            "question_text": "Calculate the value of 5! (factorial of 5).",
            "options": ["100", "110", "120", "130"],
            "correct_answer": 2,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        }
    ]
}

# Subject-Wise Mock Test: Operating Systems (3 questions)
os_mock = {
    "id": str(uuid.uuid4()),
    "title": "GATE CS 2025 OS Mock Test",
    "description": "Practice Operating Systems for GATE CS 2025.",
    "subject": "Operating Systems",
    "topic": "OS Mock",
    "difficulty": "Medium",
    "time_limit": 45,
    "status": "not-started",
    "questions": [
        {
            "question_text": "What is the main function of an operating system?",
            "options": ["Manage hardware", "Run applications", "Provide UI", "Store data"],
            "correct_answer": 0,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "Which scheduling algorithm is non-preemptive?",
            "options": ["Round Robin", "FCFS", "SJF", "Priority"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": -0.667,
            "type": "MCQ"
        },
        {
            "question_text": "How many of the following are synchronization mechanisms: Semaphore, Monitor, FIFO, Mutex?",
            "options": ["1", "2", "3", "4"],
            "correct_answer": 2,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        }
    ]
}

# Subject-Wise Mock Test: DBMS (2 questions)
dbms_mock = {
    "id": str(uuid.uuid4()),
    "title": "GATE CS 2025 DBMS Mock Test",
    "description": "Practice Databases for GATE CS 2025.",
    "subject": "Databases",
    "topic": "DBMS Mock",
    "difficulty": "Medium",
    "time_limit": 45,
    "status": "not-started",
    "questions": [
        {
            "question_text": "What is the primary key in a relational database?",
            "options": ["A unique identifier", "A foreign key", "A composite key", "A secondary key"],
            "correct_answer": 0,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "What does ACID stand for in DBMS?",
            "options": ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Consistency, Integrity, Dependability", "Atomicity, Concurrency, Isolation, Dependability", "Accuracy, Concurrency, Integrity, Durability"],
            "correct_answer": 0,
            "marks": 2,
            "negative_marks": -0.667,
            "type": "MCQ"
        }
    ]
}

# Subject-Wise Mock Test: Computer Networks (3 questions)
networks_mock = {
    "id": str(uuid.uuid4()),
    "title": "GATE CS 2025 Computer Networks Mock Test",
    "description": "Practice Computer Networks for GATE CS 2025.",
    "subject": "Computer Networks",
    "topic": "Networks Mock",
    "difficulty": "Medium",
    "time_limit": 45,
    "status": "not-started",
    "questions": [
        {
            "question_text": "What layer of the OSI model is responsible for routing?",
            "options": ["Data Link", "Network", "Transport", "Application"],
            "correct_answer": 1,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "Which protocol is used for reliable data transfer?",
            "options": ["UDP", "TCP", "IP", "ICMP"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": -0.667,
            "type": "MCQ"
        },
        {
            "question_text": "What is the port number for HTTP?",
            "options": ["70", "80", "90", "100"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        }
    ]
}

# Subject-Wise Mock Test: Algorithms (3 questions)
algorithms_mock = {
    "id": str(uuid.uuid4()),
    "title": "GATE CS 2025 Algorithms Mock Test",
    "description": "Practice Algorithms for GATE CS 2025.",
    "subject": "Algorithms",
    "topic": "Algorithms Mock",
    "difficulty": "Medium",
    "time_limit": 45,
    "status": "not-started",
    "questions": [
        {
            "question_text": "What is the time complexity of Binary Search?",
            "options": ["O(n)", "O(log n)", "O(n log n)", "O(n^2)"],
            "correct_answer": 1,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "How many of the following are greedy algorithms: Kruskal's, Prim's, Dijkstra's, Bellman-Ford?",
            "options": ["1", "2", "3", "4"],
            "correct_answer": 2,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        },
        {
            "question_text": "How many comparisons are needed to merge two sorted arrays of size 3 and 4?",
            "options": ["4", "5", "6", "7"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        }
    ]
}

# Subject-Wise Mock Test: Theory of Computation (3 questions)
toc_mock = {
    "id": str(uuid.uuid4()),
    "title": "GATE CS 2025 Theory of Computation Mock Test",
    "description": "Practice Theory of Computation for GATE CS 2025.",
    "subject": "Theory of Computation",
    "topic": "TOC Mock",
    "difficulty": "Hard",
    "time_limit": 45,
    "status": "not-started",
    "questions": [
        {
            "question_text": "Which language is accepted by a DFA?",
            "options": ["Regular", "Context-Free", "Context-Sensitive", "Recursively Enumerable"],
            "correct_answer": 0,
            "marks": 1,
            "negative_marks": -0.333,
            "type": "MCQ"
        },
        {
            "question_text": "What is the minimum number of states in a DFA accepting strings with an even number of 0s?",
            "options": ["1", "2", "3", "4"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        },
        {
            "question_text": "How many of the following are undecidable problems: Halting Problem, Emptiness of CFG, Finiteness of Regular Language, Equivalence of DFAs?",
            "options": ["1", "2", "3", "4"],
            "correct_answer": 1,
            "marks": 2,
            "negative_marks": 0,
            "type": "MCQ"
        }
    ]
}

# Function to create a quiz
def create_quiz(quiz_data):
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    response = requests.post(BASE_URL, json=quiz_data, headers=headers)
    print(f"Creating {quiz_data['title']}: {response.status_code} - {response.json()}")

# Create the mock tests
create_quiz(full_length_mock_1)
create_quiz(full_length_mock_2)
create_quiz(os_mock)
create_quiz(dbms_mock)
create_quiz(networks_mock)
create_quiz(algorithms_mock)
create_quiz(toc_mock)