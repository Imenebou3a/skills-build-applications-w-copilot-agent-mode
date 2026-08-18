import express from 'express';
import mongoose from 'mongoose';
import { Activity } from './models/Activity';
import { LeaderboardEntry } from './models/LeaderboardEntry';
import { Team } from './models/Team';
import { User } from './models/User';
import { Workout } from './models/Workout';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

// Middleware
app.use(express.json());

// Basic Routes
app.get('/', (req, res) => {
  res.json({ message: 'OctoFit Tracker API' });
});

app.get('/api/users', async (_req, res) => {
  res.json(await User.find().sort({ displayName: 1 }).lean());
});

app.get('/api/teams', async (_req, res) => {
  res.json(await Team.find().populate('memberIds', 'displayName username').sort({ name: 1 }).lean());
});

app.get('/api/activities', async (_req, res) => {
  res.json(await Activity.find().populate('userId', 'displayName username').sort({ completedAt: -1 }).lean());
});

app.get('/api/leaderboard', async (_req, res) => {
  res.json(await LeaderboardEntry.find()
    .populate('userId', 'displayName username')
    .populate('teamId', 'name')
    .sort({ rank: 1 })
    .lean());
});

app.get('/api/workouts', async (_req, res) => {
  res.json(await Workout.find().sort({ category: 1, name: 1 }).lean());
});

async function startServer(): Promise<void> {
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB database ${mongoose.connection.name}`);
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('MongoDB connection error:', error);
  process.exitCode = 1;
});
