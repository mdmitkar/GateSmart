# Smart Study App 🧠📚

A comprehensive study management application with AI-powered tutoring, quiz management, and personalized learning plans.

## Features ✨

- **AI Tutor**: Get personalized help with your studies
- **Quiz Management**: Create and take quizzes with detailed analytics
- **Study Planning**: Personalized study schedules and progress tracking
- **User Management**: Secure authentication and user profiles
- **Progress Analytics**: Track your learning journey with detailed insights

## Tech Stack 🛠️

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.11+, SQLAlchemy
- **Database**: PostgreSQL
- **Authentication**: JWT tokens with bcrypt
- **AI**: Machine learning models for personalized tutoring

## Quick Start 🚀

### Prerequisites
- Node.js 18+
- Python 3.11+
- PostgreSQL database

### Frontend Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload
```

## Environment Variables 🔐

Create `.env` files with the following variables:

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Backend (.env)
```env
DATABASE_URL=postgresql://username:password@localhost:5432/smart_study_db
SECRET_KEY=your-secret-key-here
```

## Deployment 📦

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request



## License 📄

This project is licensed under the MIT License.

# FOR MD
HOW TO RUN MD 
abc123@gmail.com
abc123
FRONTEND 
 C:\Users\Muhammad Mitkar\Desktop\GateSmart\smart-study-app\app>  
 npm run dev
 BACKEND 
 (ss) PS C:\Users\Muhammad Mitkar\Desktop\GateSmart\smart-study-app\backend> deactivate
PS C:\Users\Muhammad Mitkar\Desktop\GateSmart\smart-study-app\backend> cd .\ss\Scripts\
PS C:\Users\Muhammad Mitkar\Desktop\GateSmart\smart-study-app\backend\ss\Scripts> .\activate
(ss) PS C:\Users\Muhammad Mitkar\Desktop\GateSmart\smart-study-app\backend\ss\Scripts> cd ..
(ss) PS C:\Users\Muhammad Mitkar\Desktop\GateSmart\smart-study-app\backend\ss> cd ..
(ss) PS C:\Users\Muhammad Mitkar\Desktop\GateSmart\smart-study-app\backend> uvicorn app.main:app --reload


hi bhai 