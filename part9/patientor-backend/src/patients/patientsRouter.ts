import express from 'express';
import patientsService from './patientsService';
import {AddNewPatientType, Patient} from './patientsType';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.json(patientsService.getAllNoSensitive());
});

patientsRouter.post('/', (req:unknown, res) => {
    console.log(req.body);
    const body = req.body as AddNewPatientType;
    const result: Patient = patientsService.addOne(body);
    res.json(result);
});

export default patientsRouter;
