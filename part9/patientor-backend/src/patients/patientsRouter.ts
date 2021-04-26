import express from 'express';
import {toNewPatientEntry} from '../ultil/utils';
import patientsService from './patientsService';
import {Patient} from './patientsType';

const patientsRouter = express.Router();

patientsRouter.get('/', (_req, res) => {
    res.json(patientsService.getAllNoSensitive());
});

patientsRouter.post('/', (req, res) => {
    const body = req.body;

    const result: Patient = patientsService.addOne(toNewPatientEntry(body));
    res.json(result);
});


export default patientsRouter;
