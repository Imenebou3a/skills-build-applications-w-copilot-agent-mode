import { Schema, model, type Document, type Types } from 'mongoose';

export interface ActivityDocument extends Document {
  userId: Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  completedAt: Date;
}

const activitySchema = new Schema<ActivityDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 1 },
    calories: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Activity = model<ActivityDocument>('Activity', activitySchema);
