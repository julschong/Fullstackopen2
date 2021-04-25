import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import diagnosesRouter from './diagonoses/diagnosesRouter';
import patientsRouter from './patients/patientsRouter';

const app = express();

app.use(cors());
app.use(morgan('dev'));

app.get('/', (_req, res) => {
  res.send('hhello');
});

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

export default app;
