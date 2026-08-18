import express from 'express';
import connectDB from './config/database';

import { Activity } from './models/Activity';
import { LeaderboardEntry } from './models/LeaderboardEntry';
import { Team } from './models/Team';
import { User } from './models/User';
import { Workout } from './models/Workout';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API' });
});

app.get('/api/users', async (_req, res) => {
  res.json(await User.find().sort({ displayName: 1 }).lean());
});

app.get('/api/teams', async (_req, res) => {
  res.json(
    await Team.find()
      .populate('memberIds', 'displayName username')
      .sort({ name: 1 })
      .lean()
  );
});

app.get('/api/activities', async (_req, res) => {
  res.json(
    await Activity.find()
      .populate('userId', 'displayName username')
      .sort({ completedAt: -1 })
      .lean()
  );
});

app.get('/api/leaderboard', async (_req, res) => {
  res.json(
    await LeaderboardEntry.find()
      .populate('userId', 'displayName username')
      .populate('teamId', 'name')
      .sort({ rank: 1 })
      .lean()
  );
});

app.get('/api/workouts', async (_req, res) => {
  res.json(
    await Workout.find()
      .sort({ category: 1, name: 1 })
      .lean()
  );
});

async function startServer(): Promise<void> {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Server startup error:', error);
  process.exitCode = 1;
});