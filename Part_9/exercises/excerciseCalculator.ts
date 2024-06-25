interface exerciseMetrics {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

const parseArguments = (args: string[]): number[] => {
    if(args.length < 4) throw new Error('Not enough arguments') 

    let input: number[] = []

    for (let i = 3; i < args.length; i++) {
        if (!isNaN(Number(args[i]))) {
            console.log(args[i])
            input.push(Number(args[i]))
        }
    }

    return input;
}

const calculateExercises = (trackedData: number[], target: number): exerciseMetrics => {
    const periodLength = trackedData.length;
    const trainingDays = trackedData.filter(d => d !== 0 ).length
    const average = trackedData.reduce((a, b) => a + b, 0) / periodLength
    let ratingDescription
    let rating
    if (average - target >= 0) {
        rating = 3
        ratingDescription = 'Goal hit: great job!'
    } else if (average - target > -1) {
        rating = 2
        ratingDescription = 'Close to goal, push yourself a little further next time!'
    } else {
        rating = 1
        ratingDescription = "Goal missed, Go get em next time tiger!"
    }
    const success = ((rating > 2) ? true : false)

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
}

const rating: number = Number(process.argv[2])

try {
    const data = parseArguments(process.argv)
    console.log(calculateExercises(data, rating))
} catch(error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
}