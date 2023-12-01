import express = require('express');
import calculateBmi from './bmiCalculator';
const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    const objResponse = {
        weight, height, bmi: calculateBmi(height, weight)
    }
    res.send(objResponse)
})

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

export default app