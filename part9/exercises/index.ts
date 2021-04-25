import express = require('express');
import { isArray } from 'lodash';
import { calculateBMI } from './calculateBMI';
import { calculateExercises, NonEmptyArray } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello FullStack');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (height && weight) {
        const bmi = calculateBMI(height, weight);
        res.json({
            height,
            weight,
            bmi,
        });
    } else {
        res.status(400).json({ error: 'params missing' });
    }
});

app.post('/exercises', (req, res, _next) => {
    const body = req.body;
    const daily_exercises: Array<number> = body.daily_exercises;
    const target: number = body.target;

    if (!isArray(daily_exercises) || !target) {
        res.status(400).json({ error: 'Invalid params' });
    }

    const result = calculateExercises(
        daily_exercises as NonEmptyArray<number>,
        target
    );

    res.json(result);
});

const errorHandler = (
    err: Error,
    _req: express.Request,
    res: express.Response
) => {
    res.status(400).json({ error: err.message });
};

app.use(errorHandler);

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
