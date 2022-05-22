import express from 'express';
import { calculateBMI }  from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight) || !height || !weight) {
    return res.send({ error: 'malformatted parameters'}).status(400);
  } 

  const BMI = calculateBMI(height, weight);
  const result = {
    height,
    weight,
    BMI
  };
  return res.json(result);
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.send({ error: 'parameters missing'}).status(400);
  }

  let numbersOnly = false;
  if (Array.isArray(daily_exercises)) {
    numbersOnly = daily_exercises.every(h => {
      return typeof h === 'number';
    });
  } else {
    return res.send({ error: 'malformatted parameters'}).status(400);
  }
  console.log(numbersOnly);
  if (!numbersOnly || isNaN(Number(target))) {
    return res.send({ error: 'malformatted parameters'}).status(400);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const result = exerciseCalculator(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});