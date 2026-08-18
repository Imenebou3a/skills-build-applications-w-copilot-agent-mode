import { Schema, model, type Document, type Types } from 'mongoose';

export interface LeaderboardEntryDocument extends Document {
  userId: Types.ObjectId;
  teamId: Types.ObjectId;
  points: number;
  rank: number;
  weekStarting: Date;
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weekStarting: { type: Date, required: true },
  },
  { timestamps: true },
);

leaderboardEntrySchema.index({ weekStarting: 1, rank: 1 });

export const LeaderboardEntry = model<LeaderboardEntryDocument>('Leaderboard', leaderboardEntrySchema);
