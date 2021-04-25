import express from 'express';
import diagnosesService from './diagnosesService';

const diagnosesRouter = express.Router();

diagnosesRouter.get('/', (_req, res) => {
  res.json(diagnosesService.getAll());
});

export default diagnosesRouter;
