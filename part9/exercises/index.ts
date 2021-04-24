import express from 'express';
import { calculateBMI } from './calculateBMI';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
