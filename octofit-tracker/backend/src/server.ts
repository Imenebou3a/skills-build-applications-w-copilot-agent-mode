import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/database';

import { Activity } from './models/Activity';
import { LeaderboardEntry } from './models/LeaderboardEntry';
import { Team } from './models/Team';
import { User } from './models/User';
import { Workout } from './models/Workout';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);

app.use(express.json());

/**
 * API base URL
 *
 * Codespaces:
 * https://$CODESPACE_NAME-8000.app.github.dev
 *
 * Localhost:
 * http://localhost:8000
 */
const API_BASE_URL = process.env.CODESPACE_NAME
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.get('/', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    apiBaseUrl: API_BASE_URL,
  });
});

app.get('/api/users', async (_req, res) => {
  try {
    const users = await User.find()
      .sort({ displayName: 1 })
      .lean();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/teams', async (_req, res) => {
  try {
    const teams = await Team.find()
      .populate('memberIds', 'displayName username')
      .sort({ name: 1 })
      .lean();

    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

app.get('/api/activities', async (_req, res) => {
  try {
    const activities = await Activity.find()
      .populate('userId', 'displayName username')
      .sort({ completedAt: -1 })
      .lean();

    res.json(activities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch activities' });
  }
});

app.get('/api/leaderboard', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find()
      .populate('userId', 'displayName username')
      .populate('teamId', 'name')
      .sort({ rank: 1 })
      .lean();

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

app.get('/api/workouts', async (_req, res) => {
  try {
    const workouts = await Workout.find()
      .sort({ category: 1, name: 1 })
      .lean();

    res.json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch workouts' });
  }
});

async function startServer(): Promise<void> {
  try {
    await connectDB();

    console.log(`API base URL: ${API_BASE_URL}`);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`API available at ${API_BASE_URL}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();