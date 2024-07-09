/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import express from 'express';
import bmiCalculator from './bmiCalculator';
import {calculateExercises} from './excerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack Open!');
});

app.get('/bmi', (_req, res) => {
        const height = Number(_req.query.height);
        const weight = Number(_req.query.weight);
        if(!isNaN(height) && !isNaN(weight)) {
            res.send(bmiCalculator.calculateBmi(height, weight));
        } else
        res.send({error: "malformatted data"});
    
});

app.post('/exercises', (_req, res) => {
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    const body = _req.body;

    if (!body.trackedData || !body.target) {
        return res.status(400).json({error: 'content missing'});
    }

    if (isNaN(Number(body.target))) {
        return res.status(400).json({error: 'malformatted parameters'});
    }
    const result = calculateExercises(body.trackedData, body.target);

    return res.send({result}); 

});



const PORT = 3003;

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`);
});