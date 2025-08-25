hen # Deployment Guide for Smart Study App

## Prerequisites
- Node.js 18+ 
- Python 3.11+
- PostgreSQL database
- Environment variables configured
- Together AI API key (for AI tutor feature)

## Frontend Deployment (Next.js)

### 1. Build the Application
```bash
npm run build
```

### 2. Start Production Server
```bash
npm start
```

### 3. Environment Variables Needed
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_APP_NAME=Smart Study App
```

## Backend Deployment (FastAPI)

### 1. Install Dependencies
```bash
cd backend
pip install -r requirements.txt
```

### 2. Environment Variables
Create a `.env` file in the backend directory:
```env
# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/smart_study_db

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# AI Tutor Configuration
TOGETHER_API_KEY=your-together-ai-api-key-here

# CORS Settings
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com

# Logging
LOG_LEVEL=INFO
LOG_FILE=logs/app.log
```

### 3. Run the Backend
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Production Considerations

### Security
- ✅ Use strong SECRET_KEY
- ✅ Configure CORS properly
- ✅ Use HTTPS in production
- ✅ Set up proper database credentials
- ✅ Keep API keys secure in environment variables

### Performance
- ✅ Use production database (PostgreSQL)
- ✅ Configure proper logging
- ✅ Set up monitoring
- ✅ Use reverse proxy (nginx)

### Deployment Platforms
- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Railway, Render, Heroku, or VPS
- **Database**: Supabase, Railway, or managed PostgreSQL

## Health Check
After deployment, test these endpoints:
- Frontend: `https://yourdomain.com`
- Backend: `https://yourdomain.com/api/`
- Health: `https://yourdomain.com/api/health`

## Feature Status
- ✅ **Authentication**: Login/Register working
- ✅ **Quizzes**: Create, take, and track quizzes
- ✅ **AI Tutor**: Requires TOGETHER_API_KEY
- ✅ **Study Plans**: Basic functionality
- ✅ **User Management**: Profile and settings
- ⚠️ **Database**: Requires proper PostgreSQL setup
