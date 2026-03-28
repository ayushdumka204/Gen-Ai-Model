# YT GenAI - Simple Interview Prep App

## What is it?

AI app to prepare for job interviews. Upload resume → Get AI questions + answers + PDF resume.

## How to use (Flow)

```
1. Register/Login ──→
     ↓
2. Home (Your Interviews) ──→
     ↓ (New Interview)
3. Upload: Resume PDF + About Me + Job Desc ──→
     ↓
4. AI Magic ✨ (Google GenAI) ──→
     ↓
5. View Report + Download Resume PDF
```

## Tech

- **Backend**: Node.js + Express + MongoDB + Google AI
- **Frontend**: React + Vite

## Quick Run

**Backend:**

```
cd Backend
npm i
# Add .env: DB_URI, JWT_SECRET, GOOGLE_AI_API_KEY
npm run dev
```

**Frontend:**

```
cd Frontend
npm i
npm run dev
```

Ports: Backend 3000 | Frontend 5173

## APIs

| Do            | URL                                | Login? |
| ------------- | ---------------------------------- | ------ |
| Register      | POST /api/auth/register            | No     |
| Login         | POST /api/auth/login               | No     |
| List Reports  | GET /api/interview/                | Yes    |
| Create Report | POST /api/interview/ (resume file) | Yes    |

That's it! Simple & fast. 🚀
