import express from 'express';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello FullStack');
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
