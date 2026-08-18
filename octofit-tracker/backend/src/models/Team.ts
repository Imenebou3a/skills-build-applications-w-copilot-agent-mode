import { Schema, model, type Document, type Types } from 'mongoose';

export interface TeamDocument extends Document {
  name: string;
  description: string;
  memberIds: Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const Team = model<TeamDocument>('Team', teamSchema);
