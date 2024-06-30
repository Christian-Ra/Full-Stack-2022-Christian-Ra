import express from 'express'
import bmiCalculator from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack Open!')
})

app.get('/bmi', (_req, res) => {
        const height = Number(_req.query.height)
        const weight = Number(_req.query.weight)
        if(!isNaN(height) && !isNaN(weight)) {
            res.send(bmiCalculator.calculateBmi(height, weight))
        } else
        res.send({error: "malformatted data"})
    
})

const PORT = 3003

app.listen(PORT, ()=> {
    console.log(`Server running on ${PORT}`)
})