import { Schema, model, type Document } from 'mongoose';

export interface UserDocument extends Document {
  username: string;
  email: string;
  displayName: string;
  goal: string;
  createdAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    displayName: { type: String, required: true, trim: true },
    goal: { type: String, required: true, trim: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const User = model<UserDocument>('User', userSchema);
