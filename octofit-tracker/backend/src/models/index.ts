import { model, Schema, Types } from 'mongoose';

interface User {
  name: string;
  email: string;
  age: number;
  team: Types.ObjectId;
}

interface Team {
  name: string;
  description: string;
  members: Types.ObjectId[];
  points: number;
}

interface Activity {
  user: Types.ObjectId;
  type: 'running' | 'cycling' | 'strength' | 'walking' | 'yoga';
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  date: Date;
}

interface LeaderboardEntry {
  user: Types.ObjectId;
  team: Types.ObjectId;
  points: number;
  rank: number;
  period: string;
}

interface Workout {
  title: string;
  description: string;
  type: 'cardio' | 'strength' | 'flexibility' | 'recovery';
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  recommendedFor: Types.ObjectId;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13 },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  },
  { timestamps: true },
);

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    points: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true },
);

const activitySchema = new Schema<Activity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['running', 'cycling', 'strength', 'walking', 'yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    distanceKm: { type: Number, min: 0 },
    date: { type: Date, required: true },
  },
  { timestamps: true },
);

const leaderboardEntrySchema = new Schema<LeaderboardEntry>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    period: { type: String, required: true },
  },
  { timestamps: true },
);
leaderboardEntrySchema.index({ user: 1, period: 1 }, { unique: true });

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['cardio', 'strength', 'flexibility', 'recovery'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    difficulty: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      required: true,
    },
    recommendedFor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema, 'users');
export const TeamModel = model<Team>('Team', teamSchema, 'teams');
export const ActivityModel = model<Activity>('Activity', activitySchema, 'activities');
export const LeaderboardEntryModel = model<LeaderboardEntry>(
  'LeaderboardEntry',
  leaderboardEntrySchema,
  'leaderboard',
);
export const WorkoutModel = model<Workout>('Workout', workoutSchema, 'workouts');
