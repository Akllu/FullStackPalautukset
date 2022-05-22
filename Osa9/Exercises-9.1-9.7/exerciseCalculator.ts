interface ExerciseValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseInputValues {
  exerciseHours: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseInputValues => {
  let target = 0;
  const exerciseHours = [];
  for (let i = 2; i < args.length; i++) {
    if (isNaN(Number(args[i]))) throw new Error('Provided values were not numbers!');

    if (i === 2) {
      target = Number(args[i]);
    }
    exerciseHours.push(Number(args[i]));
  }

  return {
    exerciseHours,
    target
  };
};

export const exerciseCalculator = (exerciseHours: Array<number>, target: number): ExerciseValues => {
  const periodLength = exerciseHours.length;
  const trainingDays = exerciseHours.filter(h => h !== 0).length;
  const trainingHours = exerciseHours.reduce((acc, h) => acc + h);
  const average = trainingHours / periodLength;
  const success = average > target;

  let rating = 0;
  let ratingDescription = '';
  switch (true) {
    case average < (target / 2):
      rating = 1;
      ratingDescription = 'did you even try?';
      break;
    case average < target:
      rating = 2;
      ratingDescription = 'not too bad but could be better';
      break;
    case average >= target:
      rating = 3;
      ratingDescription = 'perfect week!';
      break;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { exerciseHours, target } = parseExerciseArguments(process.argv);
  console.log(exerciseCalculator(exerciseHours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}