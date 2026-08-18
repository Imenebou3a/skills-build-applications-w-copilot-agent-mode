import { Schema, model, type Document } from 'mongoose';

export interface WorkoutDocument extends Document {
  name: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
  coachNote: string;
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
    durationMinutes: { type: Number, required: true, min: 1 },
    exercises: { type: [String], required: true },
    coachNote: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

export const Workout = model<WorkoutDocument>('Workout', workoutSchema);
