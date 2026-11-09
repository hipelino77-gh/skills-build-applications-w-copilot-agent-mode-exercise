import { Router } from 'express';
import {
  ActivityModel,
  LeaderboardEntryModel,
  TeamModel,
  UserModel,
  WorkoutModel,
} from '../models/index.js';

const apiRouter = Router();

apiRouter.get('/users/', async (_request, response) => {
  response.json(await UserModel.find().lean());
});

apiRouter.get('/teams/', async (_request, response) => {
  response.json(await TeamModel.find().lean());
});

apiRouter.get('/activities/', async (_request, response) => {
  response.json(await ActivityModel.find().lean());
});

apiRouter.get('/leaderboard/', async (_request, response) => {
  response.json(await LeaderboardEntryModel.find().sort({ rank: 1 }).lean());
});

apiRouter.get('/workouts/', async (_request, response) => {
  response.json(await WorkoutModel.find().lean());
});

export default apiRouter;
