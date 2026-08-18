# OctoFit Tracker - Multi-Tier Application

A modern multi-tier fitness tracking application built with React 19, Node.js/Express, and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite (Port: 5173)
└── backend/           # Node.js + Express + TypeScript (Port: 8000)
```

## Technologies

### Frontend
- **React 19** - Latest React framework
- **Vite** - Modern frontend build tool
- **Port**: 5173

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **TypeScript** - Type-safe JavaScript
- **Mongoose** - MongoDB ODM
- **Port**: 8000

### Database
- **MongoDB** - NoSQL database
- **Port**: 27017

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB running on localhost:27017

### Frontend Setup

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

Frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

Backend API will be available at `http://localhost:8000`

### Build Backend for Production

```bash
cd octofit-tracker/backend
npm run build
npm start
```

## Environment

The backend is configured to connect to MongoDB at:
```
mongodb://localhost:27017/octofit-tracker
```

## Development

- **Frontend dev**: `npm run dev` (from frontend directory)
- **Backend dev**: `npm run dev` (from backend directory)
- **Backend build**: `npm run build` (from backend directory)
- **Backend start**: `npm start` (from backend directory)

## API Endpoints

- `GET /` - Welcome endpoint returning `{ message: "OctoFit Tracker API" }`

## Next Steps

1. Start MongoDB: `mongod`
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`
4. Open `http://localhost:5173` in your browser
