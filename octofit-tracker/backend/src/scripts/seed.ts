import mongoose, { Types } from 'mongoose';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const ids = {
  users: {
    maya: new Types.ObjectId('665f10000000000000000001'),
    leo: new Types.ObjectId('665f10000000000000000002'),
    ava: new Types.ObjectId('665f10000000000000000003'),
    noah: new Types.ObjectId('665f10000000000000000004'),
  },
  teams: {
    trailblazers: new Types.ObjectId('665f20000000000000000001'),
    citySprinters: new Types.ObjectId('665f20000000000000000002'),
  },
};

const daysAgo = (days: number) => new Date(Date.now() - days * 24 * 60 * 60 * 1000);

async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      UserModel.updateOne(
        { _id: ids.users.maya },
        { $set: { name: 'Maya Chen', email: 'maya.chen@example.com', age: 29, team: ids.teams.trailblazers } },
        { upsert: true },
      ),
      UserModel.updateOne(
        { _id: ids.users.leo },
        { $set: { name: 'Leo Martinez', email: 'leo.martinez@example.com', age: 34, team: ids.teams.trailblazers } },
        { upsert: true },
      ),
      UserModel.updateOne(
        { _id: ids.users.ava },
        { $set: { name: 'Ava Patel', email: 'ava.patel@example.com', age: 26, team: ids.teams.citySprinters } },
        { upsert: true },
      ),
      UserModel.updateOne(
        { _id: ids.users.noah },
        { $set: { name: 'Noah Williams', email: 'noah.williams@example.com', age: 31, team: ids.teams.citySprinters } },
        { upsert: true },
      ),
    ]);

    await Promise.all([
      TeamModel.updateOne(
        { _id: ids.teams.trailblazers },
        {
          $set: {
            name: 'Trailblazers',
            description: 'Outdoor runners building distance together.',
            members: [ids.users.maya, ids.users.leo],
            points: 1840,
          },
        },
        { upsert: true },
      ),
      TeamModel.updateOne(
        { _id: ids.teams.citySprinters },
        {
          $set: {
            name: 'City Sprinters',
            description: 'A city-based team focused on speed and consistency.',
            members: [ids.users.ava, ids.users.noah],
            points: 1725,
          },
        },
        { upsert: true },
      ),
    ]);

    await Promise.all([
      ActivityModel.updateOne(
        { _id: new Types.ObjectId('665f30000000000000000001') },
        { $set: { user: ids.users.maya, type: 'running', durationMinutes: 38, caloriesBurned: 365, distanceKm: 6.2, date: daysAgo(1) } },
        { upsert: true },
      ),
      ActivityModel.updateOne(
        { _id: new Types.ObjectId('665f30000000000000000002') },
        { $set: { user: ids.users.leo, type: 'cycling', durationMinutes: 52, caloriesBurned: 430, distanceKm: 18.5, date: daysAgo(1) } },
        { upsert: true },
      ),
      ActivityModel.updateOne(
        { _id: new Types.ObjectId('665f30000000000000000003') },
        { $set: { user: ids.users.ava, type: 'strength', durationMinutes: 45, caloriesBurned: 290, date: daysAgo(2) } },
        { upsert: true },
      ),
      ActivityModel.updateOne(
        { _id: new Types.ObjectId('665f30000000000000000004') },
        { $set: { user: ids.users.noah, type: 'running', durationMinutes: 31, caloriesBurned: 315, distanceKm: 5.1, date: daysAgo(2) } },
        { upsert: true },
      ),
      ActivityModel.updateOne(
        { _id: new Types.ObjectId('665f30000000000000000005') },
        { $set: { user: ids.users.maya, type: 'yoga', durationMinutes: 25, caloriesBurned: 95, date: daysAgo(3) } },
        { upsert: true },
      ),
      ActivityModel.updateOne(
        { _id: new Types.ObjectId('665f30000000000000000006') },
        { $set: { user: ids.users.ava, type: 'walking', durationMinutes: 42, caloriesBurned: 180, distanceKm: 3.4, date: daysAgo(4) } },
        { upsert: true },
      ),
    ]);

    const leaderboardPeriod = new Date().toISOString().slice(0, 7);
    await Promise.all([
      LeaderboardEntryModel.updateOne(
        { _id: new Types.ObjectId('665f40000000000000000001') },
        { $set: { user: ids.users.maya, team: ids.teams.trailblazers, points: 980, rank: 1, period: leaderboardPeriod } },
        { upsert: true },
      ),
      LeaderboardEntryModel.updateOne(
        { _id: new Types.ObjectId('665f40000000000000000002') },
        { $set: { user: ids.users.leo, team: ids.teams.trailblazers, points: 860, rank: 2, period: leaderboardPeriod } },
        { upsert: true },
      ),
      LeaderboardEntryModel.updateOne(
        { _id: new Types.ObjectId('665f40000000000000000003') },
        { $set: { user: ids.users.ava, team: ids.teams.citySprinters, points: 795, rank: 3, period: leaderboardPeriod } },
        { upsert: true },
      ),
      LeaderboardEntryModel.updateOne(
        { _id: new Types.ObjectId('665f40000000000000000004') },
        { $set: { user: ids.users.noah, team: ids.teams.citySprinters, points: 710, rank: 4, period: leaderboardPeriod } },
        { upsert: true },
      ),
    ]);

    await Promise.all([
      WorkoutModel.updateOne(
        { _id: new Types.ObjectId('665f50000000000000000001') },
        { $set: { title: 'Steady 5K Builder', description: 'An easy-paced run with a short warm-up and cool-down.', type: 'cardio', durationMinutes: 35, difficulty: 'beginner', recommendedFor: ids.users.maya } },
        { upsert: true },
      ),
      WorkoutModel.updateOne(
        { _id: new Types.ObjectId('665f50000000000000000002') },
        { $set: { title: 'Cycling Endurance Ride', description: 'Build aerobic endurance with a steady outdoor or indoor ride.', type: 'cardio', durationMinutes: 50, difficulty: 'intermediate', recommendedFor: ids.users.leo } },
        { upsert: true },
      ),
      WorkoutModel.updateOne(
        { _id: new Types.ObjectId('665f50000000000000000003') },
        { $set: { title: 'Full-Body Strength', description: 'A balanced strength session with controlled, functional movements.', type: 'strength', durationMinutes: 40, difficulty: 'intermediate', recommendedFor: ids.users.ava } },
        { upsert: true },
      ),
      WorkoutModel.updateOne(
        { _id: new Types.ObjectId('665f50000000000000000004') },
        { $set: { title: 'Recovery Mobility Flow', description: 'Gentle mobility work to support recovery after running.', type: 'recovery', durationMinutes: 20, difficulty: 'beginner', recommendedFor: ids.users.noah } },
        { upsert: true },
      ),
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Seeded users, teams, activities, leaderboard entries, and workouts');
    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
