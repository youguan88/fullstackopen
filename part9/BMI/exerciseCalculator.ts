interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const ratingLegend: any = {
    1: "Below expectation",
    2: "Met expectation",
    3: "Exceeded expectation"
}

const calculateExercises = (dailyHours: number[], targetHours: number): Result => {
    const periodLength = dailyHours.length
    const trainingDays = dailyHours.filter(hour => hour > 0).length
    const target = targetHours
    const average = dailyHours.reduce((acc, cur) => { return acc + cur }, 0) / dailyHours.length
    const success = average < target ? false : true
    let rating
    const targetRatio = average / target
    if (targetRatio >= 1)
    {
        rating = 3
    }
    else if (targetRatio >= 0.8 && targetRatio < 1)
    {
        rating = 2
    }
    else{
        rating = 1
    }
    const ratingDescription = ratingLegend[rating]
    return {periodLength, trainingDays, success, rating, ratingDescription, target, average}
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))