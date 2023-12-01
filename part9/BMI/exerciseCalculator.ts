interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

interface Dictionary<T> {
    [Key: string]: T;
}

const ratingLegend : Dictionary<string> = {
    1: "Below expectation",
    2: "Can be better",
    3: "Met expectation"
};

interface MultiplyValues {
    targetHours: number;
    dailyHours: number[];
}

const parseArguments = (args: string[]): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const argsValues = args.splice(2);
    const invalidValues = argsValues.filter(arg => { return isNaN(Number(arg)); });
    if (invalidValues.length > 0) {
        throw new Error('Provided values were not numbers!');
    }
    return {
        targetHours: Number(argsValues[0]),
        dailyHours: argsValues.splice(1).map(arg => { return Number(arg); })
    };
};

const calculateExercises = (dailyHours: number[], targetHours: number): Result => {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hour => hour > 0).length;
    const target = targetHours;
    const average = dailyHours.reduce((acc, cur) => { return acc + cur; }, 0) / dailyHours.length;
    const success = average < target ? false : true;
    let rating;
    const targetRatio = average / target;
    if (targetRatio >= 1) {
        rating = 3;
    }
    else if (targetRatio >= 0.8 && targetRatio < 1) {
        rating = 2;
    }
    else {
        rating = 1;
    }
    const ratingDescription = ratingLegend[rating];
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

try {
    const { targetHours, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, targetHours));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
}

export default calculateExercises;