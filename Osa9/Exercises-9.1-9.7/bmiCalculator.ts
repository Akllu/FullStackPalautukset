interface BMIInputValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BMIInputValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBMI = (height: number, weight: number): string => {
  const BMI = weight / (height / 100) ** 2;

  switch (true) {
    case BMI < 16:
      return 'Underweight (Severe thinness)';
    case BMI >= 16 && BMI <= 17.0:
      return 'Underweight (Moderate thinness)';
    case BMI >= 17 && BMI <= 18.4:
      return 'Underweight (Mild thinness)';
    case BMI >= 18.5 && BMI <= 24.9:
      return 'Normal range';
    case BMI >= 25 && BMI <= 29.9:
      return 'Overweight (Pre-obese)';
    case BMI >= 30 && BMI <= 34.9:
      return 'Obese (Class I)';
    case BMI >= 35 && BMI <= 39.9:
      return 'Obese (Class II)';
    case BMI >= 40:
      return 'Obese (Class III)';
    default:
      throw new Error('Invalid values');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBMI(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}