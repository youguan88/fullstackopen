import express = require('express');
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    const objResponse = {
        weight, height, bmi: calculateBmi(height, weight)
    };
    res.send(objResponse);
});

interface exerciseModel {
    daily_exercises: number[],
    target: number
}

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const body : exerciseModel = req.body ;
    if (!body.daily_exercises || !body.target){
        return res.status(400).json({
            error: "parameters missing"
          });
    }
    if (isNaN(body.target)){
        return res.status(400).json({
            error: "malformatted parameters: target"
        });
    }
    if (body.daily_exercises.some(isNaN)){
        return res.status(400).json({
            error: "malformatted parameters: daily_exercises"
        });
    }
    const response = calculateExercises(body.daily_exercises, body.target);
    return res.send(response);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;