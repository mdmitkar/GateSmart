import os

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres:masss@localhost:5432/smartstudy_db"  # local fallback
)
