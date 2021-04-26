import express from 'express';
import patientsService from './patientsService';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.json(patientsService.getAllNoSensitive());
});

export default patientsRouter;
