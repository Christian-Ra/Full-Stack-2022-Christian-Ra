interface exerciseMetrics {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
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

try {
    const data = [3, 0, 2, 4.5, 0, 3, 1]
    console.log(calculateExercises(data, 2))
} catch(error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
}