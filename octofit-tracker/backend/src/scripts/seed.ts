import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { LeaderboardEntry } from '../models/LeaderboardEntry';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db';

async function seed(): Promise<void> {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGODB_URI);

  try {
    await Promise.all([
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        username: 'maya chen',
        email: 'maya.chen@example.com',
        displayName: 'Maya Chen',
        goal: 'Build consistent strength and mobility',
      },
      {
        username: 'jon bell',
        email: 'jon.bell@example.com',
        displayName: 'Jon Bell',
        goal: 'Improve 5K running pace',
      },
      {
        username: 'sofia ramirez',
        email: 'sofia.ramirez@example.com',
        displayName: 'Sofia Ramirez',
        goal: 'Increase daily activity and energy',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Summit Striders',
        description: 'A supportive team focused on steady progress.',
        memberIds: [users[0]._id, users[1]._id],
      },
      {
        name: 'Morning Motion',
        description: 'Short, energizing sessions before the day begins.',
        memberIds: [users[2]._id],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id,
        type: 'Strength training',
        durationMinutes: 42,
        calories: 320,
        completedAt: new Date('2026-08-17T07:15:00Z'),
      },
      {
        userId: users[1]._id,
        type: 'Outdoor run',
        durationMinutes: 31,
        calories: 410,
        completedAt: new Date('2026-08-17T06:45:00Z'),
      },
      {
        userId: users[2]._id,
        type: 'Yoga',
        durationMinutes: 25,
        calories: 140,
        completedAt: new Date('2026-08-16T08:00:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        userId: users[1]._id,
        teamId: teams[0]._id,
        points: 1240,
        rank: 1,
        weekStarting: new Date('2026-08-17T00:00:00Z'),
      },
      {
        userId: users[0]._id,
        teamId: teams[0]._id,
        points: 1085,
        rank: 2,
        weekStarting: new Date('2026-08-17T00:00:00Z'),
      },
      {
        userId: users[2]._id,
        teamId: teams[1]._id,
        points: 760,
        rank: 3,
        weekStarting: new Date('2026-08-17T00:00:00Z'),
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Full-body foundation',
        category: 'Strength',
        difficulty: 'beginner',
        durationMinutes: 30,
        exercises: ['Bodyweight squats', 'Incline push-ups', 'Glute bridges', 'Dead bugs'],
        coachNote: 'Move slowly and keep one or two repetitions in reserve.',
      },
      {
        name: 'Tempo 5K builder',
        category: 'Cardio',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Easy recovery', 'Cool-down walk'],
        coachNote: 'The hard intervals should feel controlled, not maximal.',
      },
      {
        name: 'Desk-break mobility',
        category: 'Mobility',
        difficulty: 'beginner',
        durationMinutes: 15,
        exercises: ['Neck rolls', 'Worlds greatest stretch', 'Thoracic rotations', 'Calf raises'],
        coachNote: 'Use this reset whenever your hips and shoulders feel stiff.',
      },
    ]);

    const counts = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      LeaderboardEntry.countDocuments(),
      Workout.countDocuments(),
    ]);
    console.log(`Seed complete: ${counts[0]} users, ${counts[1]} teams, ${counts[2]} activities, ${counts[3]} leaderboard entries, ${counts[4]} workouts.`);
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((error: unknown) => {
  console.error('Seed failed:', error);
  process.exitCode = 1;
});
